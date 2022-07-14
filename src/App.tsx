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

  const changeCheckBox = (idTask: string, eValue: boolean, todoListId:string) => {
    // let todoListTasks=tasksObj[todoListId]
    // let task= todoListTasks.find(el=> el.id===idTask)
    // if(task){
    //   task.isDone=eValue
    //   setTasks({...tasksObj})
    // }
    // setTasks(task.map(el => el.id === idTask ? {...el, isDone: eValue} : el))
    setTasks({...tasksObj,[todoListId]: tasksObj[todoListId].map(el => el.id === idTask ? {...el, isDone: eValue} : el)})
  }

  const addTask = (title: string, todoListId:string) => {
    let NewTask = {id: v1(), title: title, isDone: false};
    let todoListTasks=tasksObj[todoListId]
    tasksObj[todoListId] = [NewTask, ...todoListTasks];
    setTasks({...tasksObj})
    //or// setTasks({...tasksObj, [todolistId]: [newTask,...tasksObj[todolistId]]})
  }

  function removeTask(id: string, todoListId:string) {
    // let todoListTasks=tasksObj[todoListId]
    // tasksObj[todoListId] = todoListTasks.filter(t => t.id != id);
    // setTasks({...tasksObj});
    setTasks({...tasksObj, [todoListId]:tasksObj[todoListId].filter(t => t.id != id)})

  }


  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
    // setFilter(value);
  }
const removeTodoList= (todoListId: string)=>{
  setTodoLists(todoLists.filter(tl=>tl.id!==todoListId));
  delete tasksObj[todoListId];
  setTasks({...tasksObj})
  //  delete tasksObj[todoListId]
  }
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListId1, title: "What to learn", filter: 'all'},
    {id: todoListId2, title: "What to buy", filter: 'all'},
  ])
  let [tasksObj, setTasks] = useState({
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
  return (
    <div className="App">
      {/*<input /> <button>x</button>*/}
      {
        todoLists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          return <Todolist
            todoListId={tl.id}
            key={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeCheckBox={changeCheckBox}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        })
      }

    </div>
  );
}

export default App;
