/**
 * Sanatan Ghadi (सनातन घड़ी) - Web Worker Bridge Adapter
 * 
 * Manages background Web Worker lifecycle, message dispatching, promise resolution,
 * and graceful fallback to main-thread execution when running in SSR or environments
 * where Web Workers are unavailable.
 * 
 * @license MIT
 * @author Vinayak Saxena
 */

import {
  calculatePanchang,
  calculateNatalChart,
  calculateAllDashas,
  getFestivalsForYear,
  getFestivalsForDay,
  type PanchangInfo
} from './index';

export interface YearlyPanchangDaySummary {
  date: string;
  tithiNumber: number;
  tithiName: string;
  tithiHindi: string;
  tithiEndTime: string;
  paksha: string;
  nakshatraName: string;
  nakshatraHindi: string;
  nakshatraPada: number;
  nakshatraEndTime: string;
  yogaHindi: string;
  karanaHindi: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  festivals: string[];
}

interface PendingTask {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  timeoutTimer: ReturnType<typeof setTimeout>;
}

class AstronomyWorkerManager {
  private worker: Worker | null = null;
  private pendingTasks = new Map<string, PendingTask>();
  private messageCounter = 0;
  private isTerminated = false;

  private isWorkerSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.Worker !== 'undefined'
    );
  }

  private initWorker(): Worker | null {
    if (this.worker) return this.worker;
    if (this.isTerminated || !this.isWorkerSupported()) return null;

    try {
      this.worker = new Worker(
        new URL('../workers/astronomyWorker.ts', import.meta.url),
        { type: 'module' }
      );

      this.worker.onmessage = (event: MessageEvent) => {
        const { id, success, payload, error } = event.data || {};
        const pending = this.pendingTasks.get(id);
        if (pending) {
          clearTimeout(pending.timeoutTimer);
          this.pendingTasks.delete(id);
          if (success) {
            pending.resolve(payload);
          } else {
            pending.reject(new Error(error || 'Worker task failed'));
          }
        }
      };

      this.worker.onerror = (err: ErrorEvent) => {
        console.warn('[AstronomyWorker] Worker error encountered, falling back to direct calculation:', err.message);
        // Clean up all pending tasks by rejecting them
        for (const [id, pending] of this.pendingTasks.entries()) {
          clearTimeout(pending.timeoutTimer);
          pending.reject(new Error(`Worker fatal error: ${err.message}`));
          this.pendingTasks.delete(id);
        }
        this.terminate();
      };

      return this.worker;
    } catch (e) {
      console.warn('[AstronomyWorker] Could not create Worker instance, using main-thread fallback:', e);
      return null;
    }
  }

  /**
   * Executes a task on the background worker, or falls back to main thread synchronously.
   */
  public async executeTask<T>(type: string, payload?: any, timeoutMs = 20000): Promise<T> {
    const worker = this.initWorker();

    if (worker) {
      return new Promise<T>((resolve, reject) => {
        const id = `task_${++this.messageCounter}_${Date.now()}`;
        const timeoutTimer = setTimeout(() => {
          if (this.pendingTasks.has(id)) {
            this.pendingTasks.delete(id);
            // Fall back to main thread calculation if worker times out
            console.warn(`[AstronomyWorker] Task ${type} (${id}) timed out after ${timeoutMs}ms. Executing fallback on main thread.`);
            try {
              const fallbackResult = this.executeMainThreadFallback(type, payload);
              resolve(fallbackResult as T);
            } catch (err) {
              reject(err);
            }
          }
        }, timeoutMs);

        this.pendingTasks.set(id, { resolve, reject, timeoutTimer });
        worker.postMessage({ id, type, payload });
      });
    }

    // Direct main-thread fallback
    return this.executeMainThreadFallback(type, payload) as T;
  }

  /**
   * Main-thread synchronous fallback computation.
   */
  private executeMainThreadFallback(type: string, payload?: any): any {
    switch (type) {
      case 'PING':
        return { pong: true, fallback: true, timestamp: Date.now() };

      case 'CALCULATE_YEARLY_PANCHANG': {
        const { year = new Date().getFullYear(), lat = 28.6139, lon = 77.2090 } = payload || {};
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDays = isLeap ? 366 : 365;
        const results: YearlyPanchangDaySummary[] = [];
        const startDate = new Date(Date.UTC(year, 0, 1, 12, 0, 0));

        for (let d = 0; d < totalDays; d++) {
          const curDate = new Date(startDate.getTime() + d * 86400000);
          const dateStr = curDate.toISOString().split('T')[0];
          const panchang = calculatePanchang(lat, lon, curDate);
          const dayFestivals = getFestivalsForDay(panchang).map(f => f.hindiName || f.name);

          results.push({
            date: dateStr,
            tithiNumber: panchang.hinduDate.tithi.value,
            tithiName: panchang.hinduDate.tithi.name,
            tithiHindi: panchang.hinduDate.tithi.hindiName,
            tithiEndTime: panchang.hinduDate.tithi.endTime,
            paksha: panchang.hinduDate.paksha,
            nakshatraName: panchang.hinduDate.nakshatra.name,
            nakshatraHindi: panchang.hinduDate.nakshatra.hindiName,
            nakshatraPada: panchang.hinduDate.nakshatra.pada || 1,
            nakshatraEndTime: panchang.hinduDate.nakshatra.endTime,
            yogaHindi: panchang.hinduDate.yoga.hindiName,
            karanaHindi: panchang.hinduDate.karana.hindiName,
            sunrise: panchang.sunrise,
            sunset: panchang.sunset,
            moonrise: panchang.moonrise,
            festivals: dayFestivals
          });
        }
        return results;
      }

      case 'CALCULATE_120_YEAR_VIMSHOTTARI': {
        const { birthDate = new Date().toISOString(), lat = 28.6139, lon = 77.2090 } = payload || {};
        const bDate = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
        const chart = calculateNatalChart(bDate, lat, lon);
        return calculateAllDashas(chart, new Date());
      }

      case 'CALCULATE_YEARLY_FESTIVALS': {
        const { year = new Date().getFullYear(), lat = 28.6139, lon = 77.2090 } = payload || {};
        return getFestivalsForYear(year, lat, lon);
      }

      case 'CALCULATE_RANGE_PANCHANG': {
        const { startDate, endDate, lat = 28.6139, lon = 77.2090 } = payload || {};
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.max(1, Math.min(60, Math.round((end.getTime() - start.getTime()) / 86400000) + 1));
        const results: PanchangInfo[] = [];

        for (let i = 0; i < diffDays; i++) {
          const curDate = new Date(start.getTime() + i * 86400000);
          results.push(calculatePanchang(lat, lon, curDate));
        }
        return results;
      }

      default:
        throw new Error(`Unknown task type: ${type}`);
    }
  }

  public terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.isTerminated = true;
    for (const [, pending] of this.pendingTasks.entries()) {
      clearTimeout(pending.timeoutTimer);
    }
    this.pendingTasks.clear();
  }

  public isActive(): boolean {
    return this.worker !== null;
  }
}

// Singleton Worker Manager Instance
export const workerManager = new AstronomyWorkerManager();

/**
 * Offloaded calculation: 365-day complete Panchang array for a year.
 */
export async function computeYearlyPanchangAsync(
  year: number,
  lat = 28.6139,
  lon = 77.2090
): Promise<YearlyPanchangDaySummary[]> {
  return workerManager.executeTask<YearlyPanchangDaySummary[]>('CALCULATE_YEARLY_PANCHANG', { year, lat, lon });
}

/**
 * Offloaded calculation: Complete 120-year Vimshottari & auxiliary Dashas.
 */
export async function compute120YearVimshottariAsync(
  birthDate: string | Date,
  lat = 28.6139,
  lon = 77.2090
): Promise<any> {
  return workerManager.executeTask('CALCULATE_120_YEAR_VIMSHOTTARI', { birthDate, lat, lon });
}

/**
 * Offloaded calculation: All Hindu festivals for a full calendar year.
 */
export async function computeYearlyFestivalsAsync(
  year: number,
  lat = 28.6139,
  lon = 77.2090
): Promise<any[]> {
  return workerManager.executeTask<any[]>('CALCULATE_YEARLY_FESTIVALS', { year, lat, lon });
}

/**
 * Offloaded calculation: Batch of Panchang days for a range.
 */
export async function computeRangePanchangAsync(
  startDate: string,
  endDate: string,
  lat = 28.6139,
  lon = 77.2090
): Promise<PanchangInfo[]> {
  return workerManager.executeTask<PanchangInfo[]>('CALCULATE_RANGE_PANCHANG', { startDate, endDate, lat, lon });
}

/**
 * Healthcheck ping to test worker responsiveness.
 */
export async function pingWorker(): Promise<boolean> {
  try {
    const res = await workerManager.executeTask<{ pong: boolean }>('PING', {}, 3000);
    return !!res?.pong;
  } catch {
    return false;
  }
}

/**
 * Terminates background worker when app unmounts or explicitly requested.
 */
export function terminateWorker(): void {
  workerManager.terminate();
}

/**
 * Returns worker active status.
 */
export function isWorkerActive(): boolean {
  return workerManager.isActive();
}
