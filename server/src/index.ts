import http from 'http';
import express from 'express';
import { ServerSocket } from './classes/ServerSocket/ServerSocket';

const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Start Socket */
const server = new ServerSocket(httpServer);
// server.printPuppets();
/** Log the request */

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Healthcheck */
app.get('/', (req, res, next) => {
  return res.status(200).json({ serverStatus: 'running' });
});

/** Socket Information */
app.get('/status', (req, res, next) => {
  return res.status(200).json({ sockets: ServerSocket.instance.activePuppets });
});

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

/** Listen */
httpServer.listen(3001, '0.0.0.0', () => console.info(`Server is running`));
