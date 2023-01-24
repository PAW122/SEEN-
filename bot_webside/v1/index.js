const path = require('path');
const express = require('express');
const port = '53134'
const app = express();

//discord login
app.use('',express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile('index.html', { root: '.'});
});

app.get('/auth/discord', (req, res) => {
    return res.sendFile('dashboard.html', { root: '.'});
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));