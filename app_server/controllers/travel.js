var fs = require('fs');

var trips = JSON.parse(
  fs.readFileSync('./data/trips.json', 'utf8')
);

var travel = function(req, res) {
  res.render('travel', {
    title: 'Dive Sites - Bhaccasyoniztas Beach Resort Website Template',
    trips: trips,
    layout: false
  });
};

module.exports = {
  travel
};
