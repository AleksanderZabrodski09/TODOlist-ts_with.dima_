import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/CheckBox';


type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id:string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType, todolistId:string) => void
  addTask: (title: string) => void
  changeCheckBox: (idTask: string, eValue: boolean) => void
  filter:string
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const addTaskHandler = () => {
    if(title.trim()!==''){
      props.addTask(title.trim())
      setTitle('')
    }
    else {
      setError('Title is required')
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)

  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
    setError('')
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  const onClickRemoveTaskHandler = (tID: string) => {
    props.removeTask(tID)
  }
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id)
  }
  const onChangeCheckBoxHandler = (idTask: string, eValue: boolean) => {
    props.changeCheckBox(idTask, eValue)
  }
  return <div>
    <h3>{props.title}</h3>
    <div>

      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className='errorMessage'>{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map(t => <li className={t.isDone? 'isDone': ''} key={t.id}>
          <CheckBox
            checked={t.isDone}
            callback={(eValue) => onChangeCheckBoxHandler(t.id, eValue)}
            // callback={(eValue)=>props.changeCheckBox(t.id, eValue)}
          />

          <span>{t.title}</span>
          <button onClick={() => onClickRemoveTaskHandler(t.id)}>x
          </button>
        </li>)
      }
    </ul>
    <div>
      <button className={props.filter==='all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>
        All
      </button>
      <button className={props.filter==='active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>
        Active
      </button>
      <button className={props.filter==='completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>
        Completed
      </button>
    </div>
  </div>
}
