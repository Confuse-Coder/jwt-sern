import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCors from './config/cors';
require('dotenv').config();
import { createJWT, verifyToken } from './middleware/JWTActions';

const app = express();
const PORT = process.env.PORT || 8080;

//Config CORS
configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

//test JWT
createJWT();
let decodedData = verifyToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9vIiwiYWRkcmVzcyI6IkhDTSIsImlhdCI6MTY1NTU0NTQ1NX0.cCvMko1eI6I5AigBCgGoDg4UYwGeJmMFjc12yz-xwLM'
);
console.log(decodedData);

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log('>>> JWT BackEnd is running on PORT =' + PORT);
});
