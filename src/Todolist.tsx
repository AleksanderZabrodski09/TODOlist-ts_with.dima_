import React from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/checkBox';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeBox: (idTask: string, value: boolean, todoListId: string) => void
  onChangeTaskTitle: (idTask: string, newTitle: string, todoListId: string) => void
  changeTodoListTitle: (newTitle: string, todoListId: string) => void
  filter: string
  removeTodoList: (todoListId: string) => void
}


export function Todolist(props: PropsType) {

  const addTask=(title:string)=>{
    props.addTask(title,props.id)
  }

  const onAllClickHandler = () => props.changeFilter("all", props.id)
  const onActiveClickHandler = () => props.changeFilter("active", props.id)
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

  const onChangeBoxHandler = (tID: string, eValue: boolean, tlID: string) => {
    props.changeBox(tID, eValue, tlID)
  }
  const changeTodoListTitleHandler = (newValue: string) => {
    props.changeTodoListTitle(newValue, props.id)
  }
  const onChangeTaskTitleHandler = (tID: string, newValue: string, tlID: string) => {
    props.onChangeTaskTitle(tID, newValue, tlID)
  }
  const onRemoveHandler = (tID: string, tlID: string) => {
    props.removeTask(tID, tlID)
  }
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }
  return (
    <div>
     <h3>
       {/*{props.title}*/}
       <EditableSpan title={props.title} onChange={changeTodoListTitleHandler}/>
       <button onClick={removeTodoList}>X</button>
       {/*<IconButton onClick={removeTodoList}>*/}
       {/*  <Delete />*/}
       {/*</IconButton>*/}
     </h3>

      <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasks.map(t => {

            return (
              <li className={t.isDone ? 'isDone' : ''} key={t.id}>
                <CheckBox
                  checked={t.isDone}
                  callBack={(eValue) => onChangeBoxHandler(t.id, eValue, props.id)}

                />
                <EditableSpan title={t.title} onChange={(newValue)=>onChangeTaskTitleHandler(t.id,newValue,props.id)}/>

                <button onClick={() => onRemoveHandler(t.id, props.id)}>x
                </button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}


