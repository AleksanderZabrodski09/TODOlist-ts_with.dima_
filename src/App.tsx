import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  const changeCheckBox = (idTask: string, eValue: boolean) => {
    // let task= tasks.find(el=> el.id===id)
    // if(task){
    //   task.isDone=eValue
    //   setTasks([...tasks])
    // }
    setTasks(tasks.map(el => el.id === idTask ? {...el, isDone: eValue} : el))
  }

  const addTask = (title: string) => {
    let task = {id: v1(), title: title, isDone: false};
    let NewTask = [task, ...tasks];
    setTasks(NewTask)
  }

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }


  function changeFilter(value: FilterValuesType, todolistId:string) {
    let todoList = todoLists.find(tl=>tl.id===todolistId)
    if(todoList){
      todoList.filter=value
      setTodoLists([...todoLists])
    }
    // setFilter(value);
  }

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: v1(), title: "What to learn", filter: 'active'},
    {id: v1(), title: "What to buy", filter: 'completed'},
  ])

  return (
    <div className="App">
      {
        todoLists.map((tl) => {
          let tasksForTodolist = tasks;

          if (tl.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true);
          }
          return <Todolist
            id={tl.id}
            key={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeCheckBox={changeCheckBox}
            filter={tl.filter}
          />
        })
      }

    </div>
  );
}

export default App;
