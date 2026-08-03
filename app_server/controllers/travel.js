var travel = async function(req, res) {
  try {
    var response = await fetch('http://localhost:3000/api/trips');

    if (!response.ok) {
      throw new Error('Trip API returned status ' + response.status);
    }

    var trips = await response.json();

    return res.render('travel', {
      title: 'Dive Sites - Bhaccasyoniztas Beach Resort Website Template',
      trips: trips,
      layout: false
    });
  } catch (err) {
    console.error('Unable to load trips from the API:', err);
    return res.status(500).send('Unable to load travel information.');
  }
};

module.exports = {
  travel
};
