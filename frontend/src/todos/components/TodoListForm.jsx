import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Tooltip from '@mui/material/Tooltip'

// Helper function to compare the dueDate with todays date
// and write out the correct response
const getInfoText = (dueDate, isDone) => {
  // If the task is completed, no need for more work
  if (isDone) {
    return (
      <Typography sx={{margin: '8px', width: 175}} variant='h6'>
        {"Task done"}
      </Typography> 
    )
  }

  // If due date is removed, it should not crash 
  if (!dueDate) {
    return (
      <Typography sx={{margin: '8px', width: 175}} variant='h6'>
        {"No due date"}
      </Typography> 
    )
  }

  var today = new Date()
  var dueDate2 = new Date(dueDate)
  const ONE_DAY = 1000 * 60 * 60 * 24;

  if (today <= dueDate2) {
    return (
      <Typography sx={{margin: '8px', width: 175}} variant='h6'>
        {"Due in " + Math.ceil((dueDate2 - today)/ONE_DAY) + " day(s)"}
      </Typography>   
    )
  } else if (today.toISOString().slice(0, 10) === dueDate2.toISOString().slice(0, 10)) {
    return (
      <Typography sx={{margin: '8px', width: 175}} variant='h6' >
        {"Due today!"}
      </Typography>   
    )
  }
  // else-clause
  return (
    <Typography sx={{margin: '8px', width: 175}} variant='h6' color="red">
      {"Late by " + Math.floor((today - dueDate2)/ONE_DAY) + " day(s)"}
    </Typography>
  )
}

const pickCheckbox = isDone => {
  if (isDone) {
    return <CheckBoxIcon/>
  }
  // else-clause
  return <CheckBoxOutlineBlankIcon/>
}

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
              <Tooltip placement='bottom' title='Check the box if todo is completed'>
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
                  {pickCheckbox(obj.isDone)}
                </Button>
              </Tooltip>
              {/* Display info on due date for todo */}
              {getInfoText(obj.dueDate, obj.isDone)}
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
