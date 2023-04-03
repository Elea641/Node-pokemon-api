const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const {success, successAll, getUniqueId} = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello, Express 2!'))

app.get('/api/pokemons', (req, res) => {
    const message = 'La liste a bien été trouvé.'
    res.json(successAll(message, pokemons))
})


app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id) 
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokemon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.post('./api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée`
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Notre appli Node démarre sur : http//localhost:${port}`))