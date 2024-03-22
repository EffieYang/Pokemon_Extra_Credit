const express = require('express');
const router = express.Router();

let pokemonColors = [
    {name: "pikachu", color: "yellow"},
    {name: "charizard", color: "red"},
];

router.post('/', function(req, res) {
    const requestBody = req.body;

    const newPokemon = {
        name: requestBody.name,
        color: requestBody.color,
    }

    pokemonColors.push(newPokemon);

    res.send("Pokemon " + requestBody.name + "successfully added!")
})

// -> /pokemon/pikachu => req.params.pokemonName === pikachu
// -> /pokemon/pikachu?food=banana
router.get('/:pkId', function(req, res) {
    const pokemonName = req.params.pkId;
    // const trainer = req.params.trainer;

    for(let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if(pokemonRow.name === pokemonName) {
            return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
        }
    }

    res.status(404);
    return res.send("Pokemon with name " + pokemonName + " not found :(");
})

router.get('/', function(req, res) {
    const pokemonName = req.query.name
    console.log(req.query);

    for(let i = 0; i < pokemonColors.length; i++) {
        const pokemonRow = pokemonColors[i];
        if(pokemonRow.name === pokemonName) {
            return res.send('The color of ' + pokemonName + " is " + pokemonRow.color);
        }
    }

    return res.send("Hello, I'm pikachu");
})

router.post('/', function(req, res) {
    res.send("Hello, I'm pikachu in the POST request");
})

router.put('/:pkId', function(req, res) {
  const pokemonName = req.params.pkId;
  const newColor = req.body.color;

  let found = false;
  for(let i = 0; i < pokemonColors.length; i++) {
    if(pokemonColors[i].name === pokemonName) {
      pokemonColors[i].color = newColor;
      found = true;
      break;
    }
  }
  if (found) {
    res.send(`Color of ${pokemonName} updated to ${newColor}.`);
  } else {
    res.status(404).send(`Pokemon with name ${pokemonName} not found.`);
  }
})


router.delete('/:pkId', function(req, res) {
  const pokemonName = req.params.pkId;
  const initialLength = pokemonColors.length;
  pokemonColors = pokemonColors.filter(pokemon => pokemon.name !== pokemonName);

  if (pokemonColors.length < initialLength) {
      res.send(`Pokemon ${pokemonName} was removed.`);
  } else {
      res.status(404).send(`Pokemon with name ${pokemonName} not found.`);
  }
});



module.exports = router;