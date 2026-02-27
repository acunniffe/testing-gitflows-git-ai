#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'database.sqlite');
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

class MigrationRunner {
    constructor() {
        this.db = new sqlite3.Database(DB_PATH);
    }

    async init() {
        return new Promise((resolve, reject) => {
            this.db.run('CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, filename VARCHAR(255) NOT NULL UNIQUE, executed_at DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    async getExecutedMigrations() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT filename FROM migrations ORDER BY filename', (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.filename));
            });
        });
    }

    async getPendingMigrations() {
        const executed = await this.getExecutedMigrations();
        const allMigrations = fs.readdirSync(MIGRATIONS_DIR)
            .filter(file => file.endsWith('.sql'))
            .sort();

        return allMigrations.filter(migration => !executed.includes(migration));
    }

    async executeMigration(filename) {
        const migrationPath = path.join(MIGRATIONS_DIR, filename);
        const sql = fs.readFileSync(migrationPath, 'utf8');

        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) reject(err);
                else {
                    this.db.run('INSERT INTO migrations (filename) VALUES (?)', [filename], (insertErr) => {
                        if (insertErr) reject(insertErr);
                        else resolve();
                    });
                }
            });
        });
    }

    async migrate() {
        try {
            await this.init();
            const pending = await this.getPendingMigrations();

            if (pending.length === 0) {
                console.log('No pending migrations.');
                return;
            }

            console.log(`Running ${pending.length} migration(s):`);
            
            for (const migration of pending) {
                console.log(`  → ${migration}`);
                await this.executeMigration(migration);
            }

            console.log('Migrations completed successfully!');
        } catch (error) {
            console.error('Migration failed:', error.message);
            process.exit(1);
        } finally {
            this.db.close();
        }
    }
}

// Run migrations if called directly
if (require.main === module) {
    const runner = new MigrationRunner();
    runner.migrate();
}

module.exports = MigrationRunner;
