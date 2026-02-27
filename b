cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  1) #!/usr/bin/env node
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  2) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  3) const fs = require('fs');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  4) const path = require('path');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  5) const sqlite3 = require('sqlite3').verbose();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  6) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  7) const DB_PATH = path.join(__dirname, 'database.sqlite');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  8) const MIGRATIONS_DIR = path.join(__dirname, 'migrations');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500  9) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 10) class MigrationRunner {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 11)     constructor() {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 12)         this.db = new sqlite3.Database(DB_PATH);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 13)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 14) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 15)     async init() {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 16)         return new Promise((resolve, reject) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 17)             this.db.run('CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, filename VARCHAR(255) NOT NULL UNIQUE, executed_at DATETIME DEFAULT CURRENT_TIMESTAMP)', (err) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 18)                 if (err) reject(err);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 19)                 else resolve();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 20)             });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 21)         });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 22)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 23) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 24)     async getExecutedMigrations() {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 25)         return new Promise((resolve, reject) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 26)             this.db.all('SELECT filename FROM migrations ORDER BY filename', (err, rows) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 27)                 if (err) reject(err);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 28)                 else resolve(rows.map(row => row.filename));
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 29)             });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 30)         });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 31)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 32) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 33)     async getPendingMigrations() {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 34)         const executed = await this.getExecutedMigrations();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 35)         const allMigrations = fs.readdirSync(MIGRATIONS_DIR)
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 36)             .filter(file => file.endsWith('.sql'))
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 37)             .sort();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 38) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 39)         return allMigrations.filter(migration => !executed.includes(migration));
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 40)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 41) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 42)     async executeMigration(filename) {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 43)         const migrationPath = path.join(MIGRATIONS_DIR, filename);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 44)         const sql = fs.readFileSync(migrationPath, 'utf8');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 45) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 46)         return new Promise((resolve, reject) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 47)             this.db.exec(sql, (err) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 48)                 if (err) reject(err);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 49)                 else {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 50)                     this.db.run('INSERT INTO migrations (filename) VALUES (?)', [filename], (insertErr) => {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 51)                         if (insertErr) reject(insertErr);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 52)                         else resolve();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 53)                     });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 54)                 }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 55)             });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 56)         });
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 57)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 58) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 59)     async migrate() {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 60)         try {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 61)             await this.init();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 62)             const pending = await this.getPendingMigrations();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 63) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 64)             if (pending.length === 0) {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 65)                 console.log('No pending migrations.');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 66)                 return;
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 67)             }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 68) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 69)             console.log(`Running ${pending.length} migration(s):`);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 70)             
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 71)             for (const migration of pending) {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 72)                 console.log(`  → ${migration}`);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 73)                 await this.executeMigration(migration);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 74)             }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 75) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 76)             console.log('Migrations completed successfully!');
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 77)         } catch (error) {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 78)             console.error('Migration failed:', error.message);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 79)             process.exit(1);
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 80)         } finally {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 81)             this.db.close();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 82)         }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 83)     }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 84) }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 85) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 86) // Run migrations if called directly
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 87) if (require.main === module) {
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 88)     const runner = new MigrationRunner();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 89)     runner.migrate();
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 90) }
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 91) 
cd7f120 (windsurf [c9570ca] 2026-02-26 21:24:29 -0500 92) module.exports = MigrationRunner;
---
Prompt [c9570ca]
[]

