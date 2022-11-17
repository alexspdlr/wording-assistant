import http from 'http';
import express from 'express';
import { ServerSocket } from './classes/ServerSocket/ServerSocket';
import basicAuth from 'express-basic-auth';
import path from 'path';

const app = express();

// Add Basic Authentication
app.use(
  basicAuth({
    challenge: true,
    users: { user: 'select-text-to-rephrase' },
  })
);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.static('public'));

// Create the server
const httpServer = http.createServer(app);

// Wrap the server in socket.io
new ServerSocket(httpServer);

// Parse the body of requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API rules
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Listen to port 80
httpServer.listen(80, () => console.info(`Server is running`));
