import React from 'react';
import {FilterValuesType} from './AppWithRedux';
import {CheckBox} from './Components/CheckBox';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';





export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  filter: string
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const tasksObj= useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todoListId])
  const dispatch=useDispatch()

  // console.log({tasksObj})

  // const changeCheckBox = (todoListId: string, idTask: string, eValue: boolean) => {
  //   dispatch(changeTaskStatusAC(todoListId, idTask, eValue))
  // }
  // const changeTaskTitle = (todoListId: string, idTask: string, newTitle: string) => {
  //   dispatch(changeTaskTitleAC(todoListId, idTask, newTitle))
  // }
  // const addTask = (todoListId: string, title: string) => {
  //
  // }
  // function removeTask(todoListId: string, idTask: string) {
  //   // const action=removeTaskAC(todoListId,idTask);
  //   // dispatchToTasksReducer(action);
  //   dispatch(removeTaskAC(todoListId, idTask));
  // }

  const addTask = (title: string) => dispatch(addTaskAC(props.todoListId, title))

  const onClickRemoveTaskHandler = (tID: string, tlID: string) => dispatch(removeTaskAC(tID, tlID));

  const onChangeTitleHandler = (tlID: string, idTask: string, newValue: string) => dispatch(changeTaskTitleAC(tlID, idTask, newValue))

  const onChangeCheckBoxHandler = (tlID: string, idTask: string, eValue: boolean) => dispatch(changeTaskStatusAC(tlID, idTask, eValue))


  const onAllClickHandler = () => {
    props.changeFilter(props.todoListId, "all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.todoListId, "active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.todoListId, "completed")
  }


  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
  }
  const changeTodoListTitle = (newTitle:string) => {
    props.changeTodoListTitle(props.todoListId,newTitle)
  }

  let tasksForTodolist = tasksObj;
  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
  }

  return <div>
    <h3>
      <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
      {/*<button onClick={removeTodoListHandler}>X</button>*/}
      <IconButton  onClick={removeTodoListHandler}>
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>

    <ul>
      {
        tasksForTodolist.map((t) => <li key={t.id} className={t.isDone ? 'isDone' : ''}>
          <CheckBox
            checked={t.isDone}
            callback={(eValue) => onChangeCheckBoxHandler(props.todoListId, t.id, eValue)}
            // callback={(eValue)=>props.changeCheckBox(t.id, eValue)}
          />
          <EditableSpan title={t.title} onChange={(newValue)=>onChangeTitleHandler(props.todoListId,t.id, newValue)}/>
          {/*<button onClick={() => onClickRemoveTaskHandler(props.todoListId, t.id)}>x</button>*/}
          <IconButton  onClick={() => onClickRemoveTaskHandler(props.todoListId, t.id)} size="small" >
            <Delete fontSize="small"/>
          </IconButton>
        </li>)
      }
    </ul>
    <div>
      <Button variant={props.filter === 'all' ? 'contained' : 'text'}  onClick={onAllClickHandler}>
        All
      </Button>
      <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>
        Active
      </Button>
      <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>
        Completed
      </Button>
    </div>
  </div>
}

