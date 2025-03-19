const sqlite3 = require('sqlite3').verbose();

// Ouvrir une connexion à la base de données
let db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Créer une table
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
)`);

// Insérer des données
db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, ['John Doe', 'john@example.com'], function(err) {
  if (err) {
    return console.log(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// Fermer la connexion à la base de données
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});