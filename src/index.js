const express = require('express');
const mongoose = require('mongoose');
const route = require('./route');

const app = express();
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://VikasYadav:GbyO7Za9g5SifgNk@cluster-assign.igpdsqt.mongodb.net/test',
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('MongoDb is connected'))
  .catch((err) => console.log(err));

app.use('/', route);

app.listen(8080, () => {
  console.log('server is connected with port no. 8080');
});