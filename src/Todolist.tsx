import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/checkBox';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id:string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId:string) => void
  changeFilter: (value: FilterValuesType, todoListId:string) => void
  addTask: (title: string, todoListId:string) => void
  changeBox:(idTask:string, value:boolean, todoListId:string)=>void
  filter:string
  removeTodoList:(todoListId:string)=>void
}


export function Todolist(props: PropsType) {

  let [newTitle, setTitle] = useState('')
  const[error, setError]=useState<string|null>(null)

  const addTask = () => {
    if(newTitle.trim()){
      props.addTask(newTitle.trim(), props.id)
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

  const onAllClickHandler = ()=> props.changeFilter("all", props.id)
  const onActiveClickHandler = ()=> props.changeFilter("active", props.id)
  const onCompletedClickHandler = ()=> props.changeFilter("completed", props.id)

  const onChangeBoxHandler =(tID:string, eValue:boolean, tlID:string)=>{
    props.changeBox(tID, eValue, tlID)
  }
  const onRemoveHandler = (tID:string, tlID:string)=> {props.removeTask(tID,tlID)}
  const removeTodoList =()=>{
    props.removeTodoList(props.id)
  }
  return (
    <div>
      <span><h3>{props.title}</h3></span>
      <button onClick={removeTodoList}>X</button>


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
                  callBack={(eValue)=>onChangeBoxHandler(t.id,eValue,props.id )}

                />

              <span>{t.title}</span>
              <button onClick={()=>onRemoveHandler(t.id, props.id)}>x
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
