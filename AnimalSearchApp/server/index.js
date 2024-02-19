import cors from 'cors';
import express from 'express';

import Chance from 'chance';

const App = express();
// secure
App.use(cors());

// pause to json
App.use(express.json());

// random generated
const chance = new Chance();

// create 250 animals
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  }
});


// get method for get results that is what user typed
App.get('', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const result = animals.filter((animal) => animal.type.toLowerCase().includes(q));

  res.send(result);
});

App.listen(8080, () => console.log('Listening on port http://localhost:8080'));
