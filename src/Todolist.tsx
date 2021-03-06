import React from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/checkBox';
import {AddItemForm} from './AddItemForm';

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
  const onRemoveHandler = (tID: string, tlID: string) => {
    props.removeTask(tID, tlID)
  }
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }
  return (
    <div>
     <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>

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

                <span>{t.title}</span>
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


