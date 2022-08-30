import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodolistAC,
  todoListsReducer
} from './state/todoLists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
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

  const dispatch=useDispatch()

 const todoLists= useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
 const tasksObj= useSelector<AppRootState, TaskStateType>(state => state.tasks)


  const changeCheckBox = (todoListId: string, idTask: string, eValue: boolean) => {
    dispatch(changeTaskStatusAC(todoListId, idTask, eValue))
  }
  const changeTaskTitle = (todoListId: string, idTask: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todoListId, idTask, newTitle))
  }
  const addTask = (todoListId: string, title: string) => {
    dispatch(addTaskAC(todoListId, title))
  }

  function removeTask(todoListId: string, idTask: string) {
    // const action=removeTaskAC(todoListId,idTask);
    // dispatchToTasksReducer(action);
    dispatch(removeTaskAC(todoListId, idTask));
  }


  const removeTodoList = (todoListId: string) => {
    const action=removeTodolistAC(todoListId)
    dispatch(action)
    // dispatchToTasksReducer(action)
    // setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
    // delete tasksObj[todoListId];
    // setTasks({...tasksObj})
  }
  const addTodoList = (title: string) => {
    const action=addTodolistAC(title)
    dispatch(action)
    // dispatchToTasksReducer(action)
    // let todoList: TodoListsType = {id: v1(), title: title, filter: 'all'};
    // setTodoLists([todoList, ...todoLists]);
    // setTasks({
    //   ...tasksObj, [todoList.id]: []
    // });
  }
  function changeFilter(todoListId: string, value: FilterValuesType) {
    const action = changeTodoListFilterAC(todoListId, value)
    dispatch(action)
    // let todoList = todoLists.find(tl => tl.id === todoListId)
    // if (todoList) {
    //   todoList.filter = value
    //   setTodoLists([...todoLists])
  }
  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    const action = changeTodoListTitleAC(todoListId, newTitle);
    dispatch(action)
    // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
  }




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
              let tasksForTodolist = tasksObj[tl.id];

              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              }


              return <Grid item>
                <Paper elevation={1} style={{padding: '10px'}}>
                  <Todolist
                    todoListId={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeCheckBox={changeCheckBox}
                    changeTaskTitle={changeTaskTitle}
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
