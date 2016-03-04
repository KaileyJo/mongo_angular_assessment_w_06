var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/iota');
mongoose.model(
    'Hero',
    new Schema({
            'alias': String,
            'first_name': String,
            'last_name': String,
            'city': String,
            'primary_power': String
        },
        {
            collection: 'Heroes'
        }
    )
);

var Hero = mongoose.model('Hero');

app.get('/heroes', function(req, res) {
    Hero.find({}, function(err, data) {
        if(err) {
            console.log(err);
        }
        res.send(data);
    });
});

mongoose.model(
    'Power',
    new Schema({
            'power_name': String
        },
        {
            collection: 'SuperPowers'
        }
    )
);

var Power = mongoose.model('Power');

app.get('/powers', function(req, res) {
    Power.find({}, function(err, data) {
        if(err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.post('/heroes', function(req, res) {
    var addHero = new Hero({
        "alias": req.body.alias,
        "first_name": req.body.first,
        "last_name": req.body.last,
        "city": req.body.city,
        "primary_power": req.body.power
    });

    addHero.save(function(err, data) {
        if(err) {
            console.log('ERR::', err);
        }

        Hero.find({}, function(err, data) {
            if(err) {
                console.log(err);
            }
            res.send(data);
        });
    });
});

app.delete('/heroes/:id', function(req, res) {
    Hero.findByIdAndRemove({_id: req.params.id}, function(err, data) {
        if(err) {
            console.log(err);
        }
        res.send(data);
    });
});

app.use(express.static('public/'));
app.use(express.static('public/views'));
app.use(express.static('public/vendors'));
app.use(express.static('public/styles'));
app.use(express.static('public/scripts'));


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});