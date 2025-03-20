module.exports = function(app, db) {
    // Page d'accueil
    app.get('/', (req, res) => {
        res.render('index');
    });

    // Page de présentation
    app.get('/about', (req, res) => {
        res.render('about');
    });

    // Page de calendrier
    app.get('/calendar', (req, res) => {
        db.all('SELECT * FROM events ORDER BY date', [], (err, rows) => {
            if (err) res.status(500).json({ error: err.message });
            else res.render('calendar', { events: rows });
        });
    });

    // Page équipe
    app.get('/team', (req, res) => {
        db.all('SELECT * FROM team', [], (err, rows) => {
            if (err) res.status(500).json({ error: err.message });
            else res.render('team', { team: rows });
        });
    });

    // Page de contact
    app.get('/contact', (req, res) => {
        res.render('contact');
    });

    // Page login/inscription
    app.get('/login', (req, res) => {
        res.render('login');
    });

    // Page admin
    app.get('/admin', (req, res) => {
        if (req.session.user && req.session.user.isAdmin) {
            res.render('admin');
        } else {
            res.redirect('/');
        }
    });

    // Route pour ajouter un événement
    app.post('/events', (req, res) => {
        const { title, date, description } = req.body;
        db.run(`INSERT INTO events (title, date, description) VALUES (?, ?, ?)`,
            [title, date, description], (err) => {
                if (err) res.status(500).json({ error: err.message });
                else res.redirect('/calendar');
            });
    });

    // Route de connexion (simulée ici pour simplification)
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        // Ici, tu devrais vérifier les informations avec la base de données
        req.session.user = { email: email, isAdmin: true }; // Juste un exemple
        res.redirect('/');
    });

    // Route de déconnexion
    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) console.log(err);
            res.redirect('/');
        });
    });
};
