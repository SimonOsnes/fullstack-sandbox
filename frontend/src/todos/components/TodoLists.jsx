import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const BASE_URL = "http://localhost:3001/todolist"

const getPersonalTodos = () => {
  
  return fetch(BASE_URL, {
    "method": "GET"
  })
    .then(response =>{
      if(!response.ok) {
        throw new Error(response.statusText)
      }
      return response
    })
    .then(response => response.json())
}

const sendData = (id, todoLists) => {
  fetch(BASE_URL + '/' + id, {
    "method": "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(todoLists)
  })
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My Todo Lists
        </Typography>
        <List>
          {Object.keys(todoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={todoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {todoLists[activeList] && <TodoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      todoList={todoLists[activeList]}
      saveTodoList={(id, { todos }) => {
        const listToUpdate = todoLists[id]
        setTodoLists({
          ...todoLists,
          [id]: { ...listToUpdate, todos }
        })
  
        //Make api call to backend to save the data
        sendData(id, {todos})
      }}
    />}
  </Fragment>
}
