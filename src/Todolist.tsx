import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/checkBox';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeBox:(idTask:string, value:boolean)=>void
}


export function Todolist(props: PropsType) {

  let [newTitle, setTitle] = useState('')

  const addTask = () => {
    props.addTask(newTitle)
    setTitle('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=> {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onAllClickHandler = ()=> props.changeFilter("all")
  const onActiveClickHandler = ()=> props.changeFilter("active")
  const onCompletedClickHandler = ()=> props.changeFilter("completed")

  const onChangeBoxHandler =(tID:string, eValue:boolean)=>{
    props.changeBox(tID, eValue)
  }
  const onRemoveHandler = (tID:string)=> {props.removeTask(tID)}
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {

            return(
              <li key={t.id}>
                <CheckBox
                  checked={t.isDone}
                  callBack={(eValue)=>onChangeBoxHandler(t.id,eValue )}

                />

              <span>{t.title}</span>
              <button onClick={()=>onRemoveHandler(t.id)}>x
              </button>
            </li>
            )})
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
