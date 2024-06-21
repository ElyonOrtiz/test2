import express from 'express';
import 'dotenv/config';
import './shared/services/TranslationYup';

import { routes } from './routes';

const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors({
  origin: '*',  // Permitir acesso de qualquer origem, você pode especificar uma origem específica se desejar
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Permitir estes métodos
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
server.use(routes);


export { server };
