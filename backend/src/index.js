const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// Sample data in todolists
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
    },
    '0000000003': {
        id: '0000000003',
        title: 'Party List',
        todos: [
            {
                title:'Eat',
                isDone: true,
                dueDate: "2022-04-21"
            },
            {
                title:'Sleep',
                isDone: true,
                dueDate: "2022-04-22"
            },
            {
                title:'Rave',
                isDone: false,
                dueDate: "2022-04-25"
            },
            {
                title:'Repeat',
                isDone: false,
                dueDate: "2022-04-26"
            }
        ]
    }
}

// Handle GET-requests
app.get('/todolist', (req, res) => {
    console.log("Sending jsonObject...")
    res.json(jsonObject)
})

// Handle POST-requests
app.post('/todolist/:id', (req, res) => {
    console.log("Receiving POST request...")

    // Update jsonObject here
    jsonObject[req.params.id].todos = req.body.todos
    console.log("Updated jsonObject")

    res.status(200) // Send if request succeeded
})

// Handle DELETE-request
app.delete('/todolist/:id', (req, res) => {
    console.log("Todo deleted")
    jsonObject[req.params.id].todos.splice(req.body.indexToRemove,1)

    res.status(200)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
