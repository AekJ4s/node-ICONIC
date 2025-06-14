const express = require('express');
const app = express();

app.use(express.json());

const logTypesRoute = require('./routes/logTypes');
app.use('/logtypes', logTypesRoute);  // base path

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
