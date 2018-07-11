const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const Contact = mongoose.model('Contact', {
  name: String,
  phone: String,
  birthday: String,
})

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())

app.post('/contact/create', function (req, res) {
  console.log(req.body)
  new Contact(req.body)
    .save()
    .then((doc) => res.json({id: doc.id}))
    .catch((err) => res.status(500).end(err.message))
    console.log('contact saved to MongoDB')
});

app.get('/contacts', function (req, res) {
  Contact.find({}, (err, results) => {
    if(err) res.status(500).send(err.message)
    else {
      res.send({results})
    }
  })
});

app.get('/contact/:id', function (req, res) {
  Contact.findById(req.params.id, (err, doc) => {
    if(err) res.status(500).send(err.message)
    else res.json(doc)
  })
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/delete/:id', function (req, res) {
  Contact.findByIdAndRemove(req.params.id, (err, result) => {
    if(err) res.status(500).send(err.message)
      else res.json(result)
  })
})

app.post('/saveChanges/:id', function(req, res) {
  console.log(req.body)
  Contact.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    birthday: req.body.birthday,
    phone: req.body.phone
  }, (err, result) => {
    if(err) res.status(500).send(err.message)
      else res.json(result)
  })
})

app.listen(process.env.PORT || 1337);
