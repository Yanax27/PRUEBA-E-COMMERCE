const express = require('express');
const cors = require('cors')
const routerApi = require('./src/routes')


const {logErrors, errorHandler, boomErrorHandler} = require('./src/middlewares/errorHandler')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:5500', 'http://localhost:5173']
const options ={
  origin: (origin, callback) =>{
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors());

routerApi(app);

//middlewares se deben definir despues del routing
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});
