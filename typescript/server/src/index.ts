import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

// body parser es un middleware que se usa para obtener el body en una consulta
app.use(bodyParser.urlencoded({ extended: true }));

// Indico a express que voy a usar cookieSession como middelware para almacenar el inicio de seción
app.use(cookieSession({ keys: ['claveParaCodificar'] }));

// Le indico a express que voy a usar los metadata definidos acá.
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening on port 3000');
})
