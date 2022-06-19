require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCors from './config/cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

//Config CORS
configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//test connection DB
// connection();

initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
  return res.send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('>>> JWT BackEnd is running on PORT =' + PORT);
});
