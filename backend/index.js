const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRO = require('./routers/authrouters');
const mongoose = require('mongoose');
const ProductRouter = require('./routers/productrouter');

require('dotenv').config();

const port = process.env.PORT || 8000;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', AuthRO);
app.use('/products', ProductRouter);





//.....................................................

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRO = require('./routers/authrouters');
// const mongoose = require('mongoose');
// const ProductRouter = require('./routers/productrouter');

// require('dotenv').config();

// const port = process.env.PORT || 8000;
// const mongo_url = process.env.MONGO_URL;

// mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log('Error connecting to MongoDB', err);
//   });

//   app.get('/ping', (req, res) => {
//     res.send('Hello World');
//   });

// app.use(bodyParser.json());
// app.use(cors());



// app.use('/auth', AuthRO);
// app.use('/products', ProductRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

