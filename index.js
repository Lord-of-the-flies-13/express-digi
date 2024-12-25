import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

let pokedata = []
let nextId = 1

app.post('/pokemon', (req, res) => {
    const {name, price} = req.body
    const newPoke = {id: nextId++, name, price}
    pokedata.push(newPoke)
    res.status(201).send(newPoke)
})

app.get('/pokemon', (req,res) => {
    res.status(200).send(pokedata)
})

app.get('/pokemon/:id', (req,res) => {
    pokedata.find(t => t.id === req.params.id)
})

app.listen(port, () => {
console.log(`Server is running at port: ${port} ...`);
})