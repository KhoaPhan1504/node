const path = require('path');
const express = require('express');
const  app = express();
const bodyParser = require('body-parser')
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    const PATH = path.join(__dirname, 'home.html');
    res.sendFile(PATH);
})

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})
