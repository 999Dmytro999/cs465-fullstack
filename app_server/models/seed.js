const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('./travlr');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');

const seedDatabase = async () => {
  try {
    const trips = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 5000 });
    await Trip.deleteMany({});

    const insertedTrips = await Trip.insertMany(trips);
    console.log(`Inserted ${insertedTrips.length} trip records.`);
    console.log(insertedTrips.map((trip) => trip.name).join(', '));
  } catch (err) {
    console.error('Database seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
