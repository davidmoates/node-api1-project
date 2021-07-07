const express = require('express');
let db = require('./data/db');

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.json({ message: "h3110, w0r1d" })
})

server.get("/api/users", (req, res) => {
  db.find()
    .then(info => {
      res.json(info)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error Message", err })
    })
})

server.get("/api/users/:id", (req, res) => {

  const id = req.params.id

  db.findById(id)
    .then(info => {
      if (info) {
        res.json(info)
      } else {
        res.status(404).json({ message: "ID not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error Message", err })
    })
})

server.post("/api/users", (req, res) => {
  const newUser = req.body

  db.insert(newUser)
    .then(info => {
      if (info) {
        res.json(newUser)
      } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    })
})

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id
  const newUser = req.body

  db.update(id, newUser)
  .then(info => {
    if (info) {
      res.json(newUser)
    } else if (info){
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    }
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  })
})

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id
  db.remove(id)
  .then(info => {
    if (info) {
      res.status(204).end()
    } else {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    }
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
  })
})


const port = 9090;

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
