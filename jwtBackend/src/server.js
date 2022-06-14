import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';

const app = express();

configViewEngine(app);

initWebRoutes(app);

const PORT = 8080;

app.listen(PORT, () => {
  console.log('>>> JWT BackEnd is running on PORT =' + PORT);
});
