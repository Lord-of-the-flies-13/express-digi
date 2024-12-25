import 'dotenv/config'
import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

let pokedata = []
let nextId = 1

// add a new pokemon
app.post('/pokemon', (req, res) => {
    const {name, price} = req.body
    const newPoke = {id: nextId++, name, price}
    pokedata.push(newPoke)
    res.status(201).send(newPoke)
})

// get all pokemon
app.get('/pokemon', (req,res) => {
    res.status(200).send(pokedata)
})

// get a pokemon with id
app.get('/pokemon/:id', (req,res) => {
    const poke = pokedata.find(t => t.id === parseInt(req.params.id))
    if(!poke)
    {
        return res.status(404).send('Pokrmon not found')
    }
    res.status(200).send(poke)
})

// update pokemon
app.put('/pokemon/:id', (req,res) => {
    const poke = pokedata.find(t => t.id === parseInt(req.params.id))

    if(!poke)
    {
        return res.status(404).send('Pokrmon not found')
    }

    const {name, price} = req.body
    poke.name = name
    poke.price = price
    res.send(200).send(poke)
})

// delete pokemon
app.delete('/pokemon/:id', (req,res) => {
    const index = pokedata.findIndex(t => t.id === parseInt(req.params.id))

    if(index===-1)
    {
        return res.status(404).send('pokemon not found')
    }
    pokedata.splice(index, 1)
    return res.status(204).send('deleted')
})

app.listen(port, () => {
console.log(`Server is running at port: ${port} ...`);
})