import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/CheckBox';

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
  changeCheckBox:(idTask:string,eValue:boolean)=>void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')


  const addTaskHandler = () => {
    props.addTask(title)
    setTitle('')
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)

  }
  const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      addTaskHandler()
    }
  }
const onClickRemoveTaskHandler=(tID:string)=>{
  props.removeTask(tID)
}
 const onAllClickHandler=()=>{props.changeFilter("all")}
 const onActiveClickHandler=()=>{props.changeFilter("active")}
 const onCompletedClickHandler=()=>{props.changeFilter("completed")}
const onChangeCheckBoxHandler=(idTask:string,eValue:boolean)=>{
    props.changeCheckBox(idTask, eValue)
}
  return <div>
    <h3>{props.title}</h3>
    <div>

      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTaskHandler}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => <li key={t.id}>
          <CheckBox
            checked={t.isDone}
            callback={(eValue)=>onChangeCheckBoxHandler(t.id,eValue)}
            // callback={(eValue)=>props.changeCheckBox(t.id, eValue)}
          />

          <span>{t.title}</span>
          <button onClick={()=>onClickRemoveTaskHandler(t.id)}>x
          </button>
        </li>)
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}>
        All
      </button>
      <button onClick={onActiveClickHandler}>
        Active
      </button>
      <button onClick={onCompletedClickHandler}>
        Completed
      </button>
    </div>
  </div>
}
