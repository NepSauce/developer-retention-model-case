import db from './database.js';

db.run('PRAGMA foreign_keys = ON', (err) => {
    if (err) console.error('Error enabling foreign keys:', err.message);
});

const createRepositoriesTableQuery = `
CREATE TABLE IF NOT EXISTS repositories (
    repository_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contributors_count INTEGER NOT NULL,
    stars_count INTEGER NOT NULL
);
`;

const createContributorsTableQuery = `
CREATE TABLE IF NOT EXISTS contributors (
    contributor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    github_id INTEGER NOT NULL,
    login TEXT NOT NULL,
    repository_id INTEGER NOT NULL,
    total_contributions INTEGER NOT NULL,
    total_commits INTEGER DEFAULT 0,
    commit_frequency REAL,
    last_commit_date TEXT,
    FOREIGN KEY (repository_id) REFERENCES repositories(repository_id),
    UNIQUE(repository_id, github_id)
);
`;

db.run(createRepositoriesTableQuery, (err) => {
    if (err) {
        console.error('Error creating repositories table:', err.message);
    } else {
        console.log('Repositories table created successfully.');
    }
});

db.run(createContributorsTableQuery, (err) => {
    if (err) {
        console.error('Error creating contributors table:', err.message);
    } else {
        console.log('Contributors table created successfully.');
        db.run(
            'CREATE INDEX IF NOT EXISTS idx_contributors_repository_id ON contributors(repository_id)',
            (indexErr) => {
                if (indexErr) console.error('Error creating index:', indexErr.message);
            }
        );
    }
});

export default db;
