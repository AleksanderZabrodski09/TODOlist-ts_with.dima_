import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './Components/AddItemForm';
import ButtonAppBar from './Components/ButtonAppBar';


export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksObjType = {
  [key: string]: Array<TaskType>
}

function App() {

  const addTask = (title: string, todoListId: string) => {
    let newTask = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todoListId]
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj})
  }


  function removeTask(id: string, todoListId: string) {

    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

  const changeBox = (idTask: string, value: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(el => el.id === idTask);
    if (task) {
      task.isDone = value;
      setTasks({...tasksObj})
    }
  }


  const onChangeTaskTitle = (idTask: string, newTitle: string, todoListId: string) => {

    setTasks({
      ...tasksObj,
      [todoListId]: tasksObj[todoListId].map(el => el.id === idTask ? {...el, title: newTitle} : el)
    })
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  let todoListId1 = v1();//asdd-123kkk-sdd-fdgdg
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
    {id: todoListId1, title: "What to learn", filter: 'all'},
    {id: todoListId2, title: "What to buy", filter: 'all'},
  ])
  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({...tasksObj})
  }
  let [tasksObj, setTasks] = useState<TasksObjType>({
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: "bread", isDone: true},
      {id: v1(), title: "milk", isDone: false},

    ]
  })


  const addTodoList = (title: string) => {
    let todoList: TodoListsType = {id: v1(), title: title, filter: 'all'};
    setTodoLists([todoList, ...todoLists]);
    setTasks({...tasksObj, [todoList.id]: []})
  }
const changeTodoListTitle=(newTitle: string, todoListId: string)=>{
  setTodoLists(todoLists.map(tl=> tl.id===todoListId ? {...tl, title:newTitle} :tl))

}

  return (
    <div className="App">
      <ButtonAppBar/>
      <AddItemForm addItem={addTodoList}/>

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
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeBox={changeBox}
              onChangeTaskTitle={onChangeTaskTitle}
              changeTodoListTitle={changeTodoListTitle}
              filter={tl.filter}
              removeTodoList={removeTodoList}
            />
          }
        )}

    </div>
  );
}

export default App;
