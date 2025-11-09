import * as SQLite from 'expo-sqlite'
import { Venue } from '../../models/DBVenueDataModel';
import { logger } from '../../utils/logger';

const db = SQLite.openDatabaseSync('venues.db');

class DatabaseService {

    async initDatabase() {
        try {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS venues (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lon REAL NOT NULL,
                    synced INTEGER DEFAULT 0,
                    created_at TEXT DEFAULT CURRENT_TIMESTAMP
                );
            `);
            logger.log('[Database Service] Database initialized successfully');
        } catch (error) {
            logger.error('[Database Service] Error initializing the database', error);
            throw error;
        }
    }

    async addVenue(venue: Omit<Venue, 'id' | 'created_at'>): Promise<number> {
        try {
            const result = await db.runAsync(
                'INSERT INTO venues (name, lat, lon, synced) VALUES (?, ?, ?, ?)',
                [venue.name, venue.lat, venue.lon, venue.synced]
            );
            logger.log('[Database Service] Venue added');
            return result.lastInsertRowId;
        } catch (error) {
            logger.error('[Database Service] Error adding venue:', error);
            throw error;
        }
    }

    async getAllVenues(): Promise<Venue[]> {
        try {
            const venues = await db.getAllAsync<Venue>('SELECT * FROM venues ORDER BY created_at DESC');
            return venues;
        } catch (error) {
            logger.error('[Database Service] Error getting all venues:', error);
            throw error;
        }
    }

    async getSyncedVenues(): Promise<Venue[]> {
        try {
            const venues = await db.getAllAsync<Venue>('SELECT * FROM venues WHERE synced = 1 ORDER BY created_at DESC');
            return venues;
        } catch (error) {
            logger.error('[Database Service] Error getting synced venues:', error);
            throw error;
        }
    }

    async getUnsyncedVenues(): Promise<Venue[]> {
        try {
            const venues = await db.getAllAsync<Venue>('SELECT * FROM venues WHERE synced = 0 ORDER BY created_at DESC');
            return venues;
        } catch (error) {
            logger.error('[Database Service] Error getting unsynced venues:', error);
            throw error;
        }
    }

    async markVenueAsSynced(id: number): Promise<void> {
        try {
            await db.runAsync('UPDATE venues SET synced = 1 WHERE id = ?', [id]);
            logger.log('[Database Service] Venue marked as synced');
        } catch (error) {
            logger.error('[Database Service] Error marking venue as synced:', error);
            throw error;
        }
    }

    async markAllAsSynced(): Promise<void> {
        try {
            await db.runAsync('UPDATE venues SET synced = 1 WHERE synced = 0');
            logger.log('[Database Service] All venues marked as synced');
        } catch (error) {
            logger.error('[Database Service] Error marking all venues as synced:', error);
            throw error;
        }
    }

    async getTotalCount(): Promise<number> {
        try {
            const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM venues');
            return result?.count || 0;
        } catch (error) {
            logger.error('[Database Service] Error getting total count:', error);
            throw error;
        }
    }

    async getSyncedCount(): Promise<number> {
        try {
            const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM venues WHERE synced = 1');
            return result?.count || 0;
        } catch (error) {
            logger.error('[Database Service] Error getting synced count:', error);
            throw error;
        }
    }

    async getUnsyncedCount(): Promise<number> {
        try {
            const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM venues WHERE synced = 0');
            return result?.count || 0;
        } catch (error) {
            logger.error('[Database Service] Error getting unsynced count:', error);
            throw error;
        }
    }

    async deleteVenue(id: number): Promise<void> {
        try {
            await db.runAsync('DELETE FROM venues WHERE id = ?', [id]);
            logger.log('[Database Service] Venue deleted');
        } catch (error) {
            logger.error('[Database Service] Error deleting venue:', error);
            throw error;
        }
    }
}

export default new DatabaseService();