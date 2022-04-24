const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

var jsonObject = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [
            {
                title:'First todo of first list!',
                isDone: false,
                dueDate: "2022-04-20"
            }, 
            {
                title:'Sellpy code test',
                isDone: true,
                dueDate: "2022-04-27"
            }
        ]
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: [
            {
                title:'Feed guinea pigs',
                isDone: false,
                dueDate: "2022-04-25"
            }
        ]
    }
}

app.get('/todolist', (req, res) => {
    console.log("Sending jsonObject...")
    res.json(jsonObject)
})

app.post('/todolist', (req, res) => {
    console.log("Retreiving POST request...")

    // Update jsonObject here
    jsonObject[req.body.id] = req.body
    console.log("Updated jsonObject")

    res.status(200) // Send if request succeeded
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
