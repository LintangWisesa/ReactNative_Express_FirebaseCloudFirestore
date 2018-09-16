var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var fire = require('./fire')

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res)=>{
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var wholeData = []
    db.collection('ninjas').orderBy('name', 'asc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        // console.log(doc.data().name + doc.data().age);
        // console.log(doc.data());
        wholeData.push(doc.data())
      });
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch(error => {
      console.log('Error!', error);
    })
})

app.post('/data', (req, res)=>{
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('ninjas').add({
      name: req.body.name,
      age: req.body.age
    });
    res.send({
        name: req.body.name,
        age: req.body.age,
        status: 'POST data sukses!'
    })
})

app.listen(3210, ()=>{
    console.log('Server aktif @port 3210!');
})