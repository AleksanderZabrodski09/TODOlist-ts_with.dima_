import React from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/CheckBox';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';




export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  changeCheckBox: (todoListId: string, idTask: string, eValue: boolean) => void
  changeTaskTitle: (todoListId: string, idTask: string, newTitle: string) => void
  filter: string
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


  const onClickRemoveTaskHandler = (tID: string, tlID: string) => {
    props.removeTask(tID, tlID)
  }
  const onAllClickHandler = () => {
    props.changeFilter(props.todoListId, "all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.todoListId, "active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.todoListId, "completed")
  }
  const onChangeCheckBoxHandler = (tlID: string, idTask: string, eValue: boolean) => {
    props.changeCheckBox(tlID, idTask, eValue)
  }
  const onChangeTitleHandler = (tlID: string, idTask: string, newValue: string) => {
    props.changeTaskTitle(tlID, idTask, newValue)
  }
  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
  }
  const changeTodoListTitle = (newTitle:string) => {
    props.changeTodoListTitle(props.todoListId,newTitle)
  }

  const addTask = (title: string) => {
    props.addTask(props.todoListId, title)
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
        props.tasks.map((t) => <li key={t.id} className={t.isDone ? 'isDone' : ''}>
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

