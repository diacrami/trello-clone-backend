const express =  require('express');
var cors = require('cors');

const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const boardRoutes = require("./routes/board");

/* retorna el obj de la app */
const app = express();
app.use(cors());
/* toma el puerto del servicio de hosting o el 3000 */
const port = process.env.PORT || 8080;

/* 
    ver si el server responde peticion de cliente, definiendo una ruta
*/

/* hace la llamada de las rutas */
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // or 'localhost:8888'
  res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
}); // sets headers before routes
app.use('/api', boardRoutes);



//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})


/* usas el obj y el metodo listen para decirle al server que escuche en una puerta especifica */
app.listen(port, () => console.log("Server listening on port", port));
/* nodemon reinicia el server automaticamente npm i nodemon -D lo instala como dependencia de desarrollo */

/* 
    Conectar la app de servidor con mongodb atlas
    la db que está en la nube, para eso se usa
    mongoose
*/
//Mongodb connection
/* colocar la clave en variable de ambiente customizada
instalando npm i dotenv */
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error) );

/* 
    Una vez que la conexión fue exitosa toca crear los endpoints
    Se crean en un archivo aparte, pero para que funcionen se las llama aquí
*/
