const db = require('./database.js');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS repositories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contributors_count INTEGER NOT NULL,
    stars_count INTEGER NOT NULL
);
`;  

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table created successfully.');
    }
});

module.exports = db;
