const express = require('express');
const mongoose =  require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

require('dotenv/config');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'USER REST API',
            description: "A REST API built with Express and MongoDB. This API provides for CRUD(Create/Read/Update/Delete) operations for user management"
        },
    },
    apis: ["./src/routes/user.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//import routes
const userRoute = require('./src/routes/user');

//Middleware
app.use(express.json());


//Route Middleware
app.use('/api/user', userRoute);


//connecting to MongoDB
mongoose.connect(
    process.env.DB_CONNECTION,
    (err) => {
      if (err) {
        console.log('Some problem with the connection ' + err);
      } else {
        console.log('The Mongoose connection is ready');
      }
    }
);

app.listen(PORT , ()=> console.log(`server is up and running at ${PORT}`));

module.exports = app;