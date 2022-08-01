import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from '@material-ui/core';
import classes from '*.module.css';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: TaskType[]
}

function App() {

  const changeCheckBox = (idTask: string, eValue: boolean, todoListId: string) => {

    setTasks({
      ...tasksObj,
      [todoListId]: tasksObj[todoListId].map(el => el.id === idTask ? {...el, isDone: eValue} : el)
    })
  }
  const changeTaskTitle = (idTask: string, newTitle: string, todoListId: string) => {

    setTasks({
      ...tasksObj,
      [todoListId]: tasksObj[todoListId].map(el => el.id === idTask ? {...el, title: newTitle} : el)
    })
  }

  const addTask = (todoListId: string, title: string) => {
    let NewTask = {id: v1(), title: title, isDone: false};
    let todoListTasks = tasksObj[todoListId]
    tasksObj[todoListId] = [NewTask, ...todoListTasks];
    setTasks({...tasksObj})
  }

  function removeTask(todoListId: string, id: string) {
    let todoListTasks = tasksObj[todoListId]
    tasksObj[todoListId] = todoListTasks.filter(t => t.id != id);
    setTasks({...tasksObj});

  }


  function changeFilter(value: FilterValuesType, todoListId: string) {
    debugger
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
    delete tasksObj[todoListId];
    setTasks({...tasksObj})

  }
  const changeTodoListTitle = (todoListId: string, newTitle: string) => {

    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
  }


  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListId1, title: "What to learn", filter: 'all'},
    {id: todoListId2, title: "What to buy", filter: 'all'},
  ])
  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: "Book", isDone: true},
      {id: v1(), title: "Pen", isDone: false}
    ],

  });

  const addTodoList = (title: string) => {
    let todoList: TodoListsType = {id: v1(), title: title, filter: 'all'};
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj, [todoList.id]: []
    });

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
        <Grid container >
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
              </Grid>

            })
          }
        </Grid>

      </Container>
    </div>
  );
}

export default App;
