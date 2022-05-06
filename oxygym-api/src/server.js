const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
app.use(cors());
/* Middleware */
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/* Routes */
const route = require('./routes/Route')

app.use('/api', route)

const port = 3001

app.listen(port, () => {
  console.log("Listening on port: ", port)
})