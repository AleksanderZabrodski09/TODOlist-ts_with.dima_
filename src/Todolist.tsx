import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

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
  addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const [newTitle, setNewTitle] = useState('')

  const addTaskHandler = () => {
    props.addTask(newTitle)
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }
  /*const allChangeFilterHandler = () => {
    props.changeFilter("all")
  }
  const activeChangeFilterHandler = () => {
    props.changeFilter("active")
  }
  const completedChangeFilterHandler = () => {
    props.changeFilter("completed")
  }*/

  const oneChangeFilterHandler = (value: FilterValuesType) => {
    props.changeFilter(value)
    console.log(value)
  }

  const removeTaskHandler = (tID:string) => {
    props.removeTask(tID)
  }
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>

        {props.tasks.map(t => {
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
              <button onClick={() => removeTaskHandler(t.id)}>x
              </button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => oneChangeFilterHandler('all')}>All</button>
        <button onClick={() => oneChangeFilterHandler('active')}>Active</button>
        <button onClick={() => oneChangeFilterHandler('completed')}>Completed</button>
        {/*
      <button onClick={allChangeFilterHandler}>All</button>
      <button onClick={activeChangeFilterHandler}>Active</button>
      <button onClick={completedChangeFilterHandler}>Completed</button>*/}
      </div>
    </div>
  )
}
