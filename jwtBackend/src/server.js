import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
require('dotenv').config();
// import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection DB
// connection();

initWebRoutes(app);

app.listen(PORT, () => {
  console.log('>>> JWT BackEnd is running on PORT =' + PORT);
});
