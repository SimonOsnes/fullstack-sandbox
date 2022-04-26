import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { PickCheckbox } from './PickCheckbox'
import { GetInfoText } from './GetInfoText'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = event => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  return (
    <Card sx={{margin: '0 1rem'}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title}
        </Typography>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          {todos.map((obj, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{margin: '8px'}} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{flexGrow: 1, marginTop: '1rem', margin: '8px'}}
                label='What to do?'                
                value={obj.title}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    {title: event.target.value, isDone: obj.isDone, dueDate: obj.dueDate},
                    ...todos.slice(index + 1)
                  ])
                }}
              />
              {/* Pick due date for todo */}
              <TextField
                id="date"
                label="Due Date"
                type="date"
                defaultValue={obj.dueDate}
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => {
                  setTodos([
                    ...todos.slice(0, index),
                    {title: obj.title, isDone: obj.isDone, dueDate: event.target.value},
                    ...todos.slice(index + 1)
                  ])
                }} 
              />
              {/* Possibility to mark a todo as complete */}
              <Tooltip placement='bottom' title='Check the box if the todo is completed'>
                <Button
                  sx={{margin: '8px'}}
                  size='small'
                  color='secondary'
                  onClick={() => {
                    setTodos([
                      ...todos.slice(0, index),
                      {title: obj.title, isDone: !obj.isDone, dueDate: obj.dueDate},
                      ...todos.slice(index + 1)
                    ])
                  }}
                >
                  {/* Changes the checkmark */}
                  <PickCheckbox
                    isDone={obj.isDone}
                  />
                </Button>
              </Tooltip>
              {/* Display info on due date for todo */}
              <GetInfoText
                dueDate={obj.dueDate}
                isDone={obj.isDone}
              />
              {/* Deletes a todo */}
              <Button
                sx={{margin: '8px'}}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                  deleteTodo(todoList.id, index)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {title:'', isDone: false, dueDate: new Date().toISOString().slice(0, 10)}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button> 
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

const deleteTodo = (id, indexToRemove) => {
  fetch("http://localhost:3001/todolist/" + id, {
    "method": "DELETE",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({ indexToRemove:indexToRemove })
  })
}