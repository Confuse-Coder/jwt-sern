import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';

const app = express();

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

const PORT = 8080;

app.listen(PORT, () => {
  console.log('>>> JWT BackEnd is running on PORT =' + PORT);
});
