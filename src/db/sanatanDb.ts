/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Client-Side Persistent Database (Tier 3) via Dexie.js (IndexedDB)
 * Stores Saved Kundlis, Horoscope Profiles & User Preferences
 */

import Dexie, { type Table } from 'dexie';
import type { CityLocation } from '../types/location';

export interface SavedKundliProfile {
  id?: number;
  name: string;
  gender?: 'male' | 'female' | 'other';
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM:SS" (24-hour time)
  city: string; // City Name
  cityDetails?: CityLocation;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  notes?: string;
  tags?: string[];
  createdAt: number;
  updatedAt?: number;
}

export interface AppSettingRecord {
  key: string;
  value: any;
  updatedAt: number;
}

export class SanatanDatabase extends Dexie {
  profiles!: Table<SavedKundliProfile, number>;
  settings!: Table<AppSettingRecord, string>;

  constructor() {
    super('SanatanDB');

    // Schema Version 1
    this.version(1).stores({
      profiles: '++id, name, date, time, city',
      settings: 'key, value',
    });
  }
}

export const db = new SanatanDatabase();
