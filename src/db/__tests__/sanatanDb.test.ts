import { describe, it, expect } from 'vitest';
import { SanatanDatabase, db } from '../sanatanDb';
import {
  validateBackupPayload,
  type BackupPayload,
} from '../../utils/backupRestore';

describe('SanatanDB (Dexie IndexedDB) & Backup/Restore Architecture', () => {
  it('should verify SanatanDatabase class and schema configuration', () => {
    const testDb = new SanatanDatabase();
    expect(testDb.name).toBe('SanatanDB');
    expect(testDb.tables.map((t) => t.name).sort()).toEqual(['profiles', 'settings']);

    const profilesTable = testDb.table('profiles');
    expect(profilesTable).toBeDefined();

    const settingsTable = testDb.table('settings');
    expect(settingsTable).toBeDefined();
  });

  it('should verify singleton db instance exists with schema version 1', () => {
    expect(db).toBeInstanceOf(SanatanDatabase);
    expect(db.name).toBe('SanatanDB');
    expect(db.verno).toBe(1);
  });

  it('should correctly validate genuine Sanatan Ghadi backup payload', () => {
    const validPayload: BackupPayload = {
      app: 'SanatanGhadi',
      version: 1,
      exportDate: '2026-10-20T19:20:00.000Z',
      timestamp: Date.now(),
      metadata: {
        totalProfiles: 1,
        totalSettings: 2,
      },
      data: {
        profiles: [
          {
            name: 'श्री राम',
            date: '2026-04-18',
            time: '12:00:00',
            city: 'Ayodhya',
            createdAt: Date.now(),
          },
        ],
        settings: {
          language: 'hi',
          theme: 'light',
        },
      },
    };

    const result = validateBackupPayload(validPayload);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should reject invalid or malicious backup payloads', () => {
    // 1. null or primitive
    expect(validateBackupPayload(null).isValid).toBe(false);
    expect(validateBackupPayload('bad string').isValid).toBe(false);

    // 2. wrong app signature
    const fakeAppPayload = { app: 'FakeAstrologyApp', data: { profiles: [] } };
    const fakeResult = validateBackupPayload(fakeAppPayload);
    expect(fakeResult.isValid).toBe(false);
    expect(fakeResult.error).toContain('सनातन घड़ी की आधिकारिक बैकअप फ़ाइल नहीं');

    // 3. missing data or profiles
    const missingProfilesPayload = { app: 'SanatanGhadi', data: {} };
    const missingResult = validateBackupPayload(missingProfilesPayload);
    expect(missingResult.isValid).toBe(false);
    expect(missingResult.error).toContain('अमान्य प्रारूप');
  });

  it('should generate valid JSON string format from structured backup payload', () => {
    const samplePayload: BackupPayload = {
      app: 'SanatanGhadi',
      version: 1,
      exportDate: new Date().toISOString(),
      timestamp: Date.now(),
      metadata: { totalProfiles: 0, totalSettings: 0 },
      data: { profiles: [], settings: {} },
    };

    const serialized = JSON.stringify(samplePayload, null, 2);
    expect(typeof serialized).toBe('string');

    const reparsed = JSON.parse(serialized);
    expect(reparsed.app).toBe('SanatanGhadi');
    expect(reparsed.version).toBe(1);
    expect(validateBackupPayload(reparsed).isValid).toBe(true);
  });
});
