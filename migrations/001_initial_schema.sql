-- Initial migration for the database
-- Created: 2026-02-26

-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Create migrations table to track applied migrations
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename VARCHAR(255) NOT NULL UNIQUE,
    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add your initial tables here
-- Example:
-- CREATE TABLE users (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
-- );
