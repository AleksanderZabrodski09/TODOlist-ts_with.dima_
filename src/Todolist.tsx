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
  filter:string
}


export function Todolist(props: PropsType) {

  let [newTitle, setTitle] = useState('')
  const[error, setError]=useState<string|null>(null)

  const addTask = () => {
    if(newTitle.trim()){
      props.addTask(newTitle.trim())
      setTitle('')
    }
    else{
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=> {
    setError('')
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
          className={error?'error':''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='errorMessage'>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {

            return(
              <li className={t.isDone?'isDone':''} key={t.id}>
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
        <button className={props.filter==='all'?'activeFilter':''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter==='active'?'activeFilter':''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter==='completed'?'activeFilter':''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
