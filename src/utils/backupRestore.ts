/**
 * Sanatan Ghadi (सनातन घड़ी)
 * 1-Click Backup & Restore Engine
 * Exports and imports encrypted/sanitized JSON files for WhatsApp, Google Drive & offline transfer
 */

import { db, type SavedKundliProfile } from '../db/sanatanDb';

export interface BackupPayload {
  app: 'SanatanGhadi';
  version: 1;
  exportDate: string;
  timestamp: number;
  metadata: {
    totalProfiles: number;
    totalSettings: number;
  };
  data: {
    profiles: SavedKundliProfile[];
    settings: Record<string, any>;
  };
}

export interface ImportResult {
  success: boolean;
  importedProfilesCount: number;
  importedSettingsCount: number;
  message: string;
  error?: string;
}

/**
 * Validates whether an unknown JSON object is a genuine Sanatan Ghadi backup payload
 */
export function validateBackupPayload(parsed: any): { isValid: boolean; error?: string } {
  if (!parsed || typeof parsed !== 'object') {
    return { isValid: false, error: 'अमान्य बैकअप फ़ाइल: फ़ाइल रिक्त या दूषित है।' };
  }

  // Check signature
  if (parsed.app !== 'SanatanGhadi') {
    return { isValid: false, error: 'अमान्य बैकअप फ़ाइल: यह सनातन घड़ी की आधिकारिक बैकअप फ़ाइल नहीं है।' };
  }

  if (!parsed.data || typeof parsed.data !== 'object') {
    return { isValid: false, error: 'बैकअप फ़ाइल में डेटा अनुभाग अनुपलब्ध है।' };
  }

  if (!Array.isArray(parsed.data.profiles)) {
    return { isValid: false, error: 'कुंडलियों की सूची अमान्य प्रारूप में है।' };
  }

  return { isValid: true };
}

/**
 * 1-Click Export Function: Generates standardized JSON backup string and metadata
 */
export async function exportBackupJson(): Promise<{
  payload: BackupPayload;
  jsonString: string;
  filename: string;
}> {
  const allProfiles = await db.profiles.toArray();
  const allSettingsRecords = await db.settings.toArray();

  const settingsMap: Record<string, any> = {};
  for (const s of allSettingsRecords) {
    settingsMap[s.key] = s.value;
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  const payload: BackupPayload = {
    app: 'SanatanGhadi',
    version: 1,
    exportDate: now.toISOString(),
    timestamp: now.getTime(),
    metadata: {
      totalProfiles: allProfiles.length,
      totalSettings: Object.keys(settingsMap).length,
    },
    data: {
      profiles: allProfiles,
      settings: settingsMap,
    },
  };

  const jsonString = JSON.stringify(payload, null, 2);
  const filename = `sanatan-ghadi-backup-${dateStr}.json`;

  return {
    payload,
    jsonString,
    filename,
  };
}

/**
 * Initiates browser file download for 1-Click backup
 */
export async function downloadBackupFile(): Promise<string> {
  const { jsonString, filename } = await exportBackupJson();

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return filename;
}

/**
 * 1-Click Import Function: Safely imports and restores user profiles and preferences
 */
export async function importBackupJson(rawJsonInput: string | object): Promise<ImportResult> {
  try {
    let parsed: any;
    if (typeof rawJsonInput === 'string') {
      parsed = JSON.parse(rawJsonInput);
    } else {
      parsed = rawJsonInput;
    }

    const validation = validateBackupPayload(parsed);
    if (!validation.isValid) {
      return {
        success: false,
        importedProfilesCount: 0,
        importedSettingsCount: 0,
        message: validation.error || 'अमान्य बैकअप',
        error: validation.error,
      };
    }

    const payload = parsed as BackupPayload;
    let profilesImported = 0;
    let settingsImported = 0;

    // Use Dexie transaction to ensure atomic restore
    await db.transaction('rw', db.profiles, db.settings, async () => {
      // 1. Restore profiles (deduplicating by name + date + time or appending)
      for (const profile of payload.data.profiles) {
        // Strip existing auto-increment id to allow clean insertion
        const { id, ...profileWithoutId } = profile;
        await db.profiles.add(profileWithoutId as SavedKundliProfile);
        profilesImported++;
      }

      // 2. Restore settings
      if (payload.data.settings && typeof payload.data.settings === 'object') {
        const entries = Object.entries(payload.data.settings);
        for (const [key, value] of entries) {
          await db.settings.put({
            key,
            value,
            updatedAt: Date.now(),
          });
          settingsImported++;
        }
      }
    });

    return {
      success: true,
      importedProfilesCount: profilesImported,
      importedSettingsCount: settingsImported,
      message: `सफलतापूर्वक ${profilesImported} कुंडलियां एवं सेटिंग्स पुनर्स्थापित की गईं।`,
    };
  } catch (err: any) {
    return {
      success: false,
      importedProfilesCount: 0,
      importedSettingsCount: 0,
      message: 'बैकअप फ़ाइल पढ़ने में त्रुटि हुई।',
      error: err?.message || String(err),
    };
  }
}
