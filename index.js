const express = require('express')
const app = express()
// database connection
const pool = require('./db')

// to parse the request body in JSON
app.use(express.json())

// handling HTTP POST request - CREATE record
app.post('/adduser', (req, res) => {
    const data = req.body
    const name = data.name
    const city = data.city
    var q = `INSERT INTO users(name, city) VALUES($1, $2) returning *`
    pool.query(q, [name, city], (err, result) => {
        if (err) {
            console.log("Error: " + err.message)
            res.send(JSON.stringify({error: err.message}))
        } else if (result) {
            if (result.rows.length > 0) {
                res.send(JSON.stringify({message: "New record created."}))
            } else {
                res.send(JSON.stringify({message: "Record not created."}))
            }
        }
    })
})

// handling HTTP GET request - READ record
app.get('/getdetail/:id', (req, res) => {
    const id = req.params.id
    var q = `SELECT * FROM users WHERE userid=$1`
    pool.query(q, [id], (err, result) => {
        if (err) {
            console.log("Error: " + err.message)
            res.send(JSON.stringify({error: err.message}))
        } else if (result) {
            if (result.rows.length > 0) {
                res.send(JSON.stringify(result.rows[0]))
            } else {
                res.send(JSON.stringify({message: "No record found."}))
            }
        }
    })
})

// handling HTTP PUT request - UPDATE record
app.put('/updateuser/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
    const name = data.name
    const city = data.city
    var q = `UPDATE users SET name=$1, city=$2 WHERE userid=$3 returning *`
    pool.query(q, [name, city, id], (err, result) => {
        if (err) {
            console.log("Error: " + err.message)
            res.send(JSON.stringify({error: err.message}))
        } else if (result) {
            if (result.rows.length > 0) {
                res.send(JSON.stringify({message: "Record updated."}))
            } else {
                res.send(JSON.stringify({message: "Record not found/updated."}))
            }
        }
    })
})

// handling HTTP DELETE request - DELETE record
app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id
    var q = `DELETE FROM users WHERE userid=$1 returning *`
    pool.query(q, [id], (err, result) => {
        if (err) {
            console.log("Error: " + err.message)
            res.send(JSON.stringify({error: err.message}))
        } else if (result) {
            if (result.rows.length > 0) {
                res.send(JSON.stringify({message: "Record deleted."}))
            } else {
                res.send(JSON.stringify({message: "Record not found/deleted."}))
            }
        }
    })
})

const port = process.env.PORT || 8080
app.listen(port, ()=>{console.log(`Listening on PORT:${port}`)})