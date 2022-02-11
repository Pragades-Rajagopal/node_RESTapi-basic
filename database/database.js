const sqlite = require('sqlite3').verbose();
const path = require('path');

filePath = path.resolve(__dirname, '../database', 'db.sqlite3');

const appDB = new sqlite.Database (filePath, (err) => {
    if (err) {
        console.log("Error at DB : ", err.message);
    }

    console.log("DB connected");
});

module.exports = { appDB };
