const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
const routes = require('./routes');
const mongoose = require('mongoose');
const cors =  require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const listaBlanca = [ process.env.FRONTEND_URL ];
const corsOptions = {
    origin: (origin, callback) => {
        const existe = listaBlanca.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('Origen de la petición no valido'));
        }
    }
}

const app = express();
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
    console.log('Al lio');
});