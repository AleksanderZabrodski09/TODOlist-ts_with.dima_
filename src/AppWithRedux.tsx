import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC
} from './state/todoLists-reducer';

import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {
  console.log('App is called')

  const dispatch=useDispatch()

 const todoLists= useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
 // const tasksObj= useSelector<AppRootState, TaskStateType>(state => state.tasks)


  const addTodoList = useCallback( (title: string) => {
    const action=addTodolistAC(title)
    dispatch(action)
  },[dispatch])

  const removeTodoList = useCallback(  (todoListId: string) => {
    const action=removeTodolistAC(todoListId)
    dispatch(action)
  },[dispatch])
  const changeFilter = useCallback( function (todoListId: string, value: FilterValuesType) {
    const action = changeTodoListFilterAC(todoListId, value)
    dispatch(action)

  },[dispatch])
  const changeTodoListTitle = useCallback(  (todoListId: string, newTitle: string) => {
    const action = changeTodoListTitleAC(todoListId, newTitle);
    dispatch(action)
  },[dispatch])




  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={1}>
          {
            todoLists.map((tl) => {
              // let tasksForTodolist = tasksObj[tl.id];
              //
              // if (tl.filter === "active") {
              //   tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              // }
              // if (tl.filter === "completed") {
              //   tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              // }


              return <Grid item>
                <Paper elevation={1} style={{padding: '10px'}}>
                  <Todolist
                    todoListId={tl.id}
                    key={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>

            })
          }
        </Grid>

      </Container>
    </div>
  );
}

export default AppWithRedux;
