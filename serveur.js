// Import des modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static')); // Remplace 'public' par 'static'
app.set('view engine', 'ejs');

// Configuration des sessions
app.use(session({
    secret: 'ton_secret',
    resave: false,
    saveUninitialized: true
}));

// Connexion à la base de données SQLite
const db = new sqlite3.Database('./bde.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connecté à la base SQLite');
});

// Tableau des membres
const members = [
    {
        name: 'Loïc - Pôle Création',
        age: 20,
        photo: 'loic.png',  // Ajout du champ photo
        favoritePhrase: 'J\'ai rien compris',
        favoriteDrink: 'La bière',
        favoriteMusic: 'Matuidi charo',
        passion: 'Son strabisme',
        email: 'loic.bsl@example.com'
    },
    {
        name: 'Adèle',
        photo: 'adele.png',  // Ajout du champ photo
        age: 21,
        favoritePhrase: 'Bientôt j\'arrête de fumer',
        passion: 'Inavouable, boire encore des biberons'
    },
    {
        name: 'Dounia - Présidente',
        age: 22,
        photo: 'Dounia.png',  // Ajout du champ photo
        favoritePhrase: 'La Marseillaise du 77',
        passion: 'Inavouable, mon mec'
    },
    {
        name: 'Paul - Trésorier',
        photo: 'paul.png',  // Ajout du champ photo
        favoritePhrase: 'Putain Lolo, il a encore vomi'
    },
    {
        name: 'Coline - Pôle Event',
        age: 20,
        photo: 'coline.png',  // Ajout du champ photo
        favoritePhrase: 'Si je rigole, c\'est pas parce que t\'es drôle, mais parce que j\'ai rien compris'
    },
    {
        name: 'Nathan - vice pre',
        age: 18,
        photo: 'nathan.png',  // Ajout du champ photo
        favoritePhrase: 'J ai jamais le bon timing avec les femmes'
    }
];

// Création des tables (si elles n'existent pas)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        description TEXT NOT NULL
    )`);
});

// Route principale
app.get('/', (req, res) => {
    res.render('index');
});

// Route pour la page boutique
app.get('/boutique', (req, res) => {
    const products = [
        {
            name: 'T-shirt BDE',
            description: 'T-shirt officiel du BDE Paris Ynov Campus, disponible en plusieurs tailles.',
            price: 15,
            imageUrl: '/images/tshirt.jpg'
        },
        {
            name: 'Mug BDE',
            description: 'Mug exclusif aux couleurs du BDE, idéal pour vos boissons.',
            price: 8,
            imageUrl: '/images/mug.jpg'
        },
        {
            name: 'Casquette BDE',
            description: 'Casquette stylée pour représenter le BDE, taille unique.',
            price: 12,
            imageUrl: '/images/casquette.jpg'
        }
    ];

    res.render('boutique', { products: products });
});

// Route pour récupérer et afficher les événements
app.get('/events', (req, res) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.render('events', { events: rows });
    });
});

// Route pour afficher le formulaire d'ajout d'événement
app.get('/events/new', (req, res) => {
    res.render('new_event');
});

// Route pour ajouter un événement
app.post('/events', (req, res) => {
    const { title, date, description } = req.body;
    db.run(`INSERT INTO events (title, date, description) VALUES (?, ?, ?)`,
        [title, date, description], (err) => {
            if (err) res.status(500).json({ error: err.message });
            else res.redirect('/events');
        });
});

// Route pour la page de contact
app.get('/contact', (req, res) => {
    res.render('contact', { members: members });
});

// Route pour la page de connexion
app.get('/login', (req, res) => {
    res.render('login');
});

// Route de connexion (simulée ici pour simplification)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Ici, tu devrais vérifier les informations avec la base de données
    req.session.user = { username: username, isAdmin: true }; // Exemple de connexion
    res.redirect('/');
});

// Route de déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/');
    });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
