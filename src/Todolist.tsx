import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/CheckBox';


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeCheckBox: (idTask: string, eValue: boolean, todoListId: string) => void
  filter: string
  removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const addTaskHandler = () => {
    if (title.trim() !== '') {
      props.addTask(props.todoListId, title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  const onClickRemoveTaskHandler = (tID: string, tlID: string) => {
    props.removeTask(tID, tlID)
  }
  const onAllClickHandler = () => {
    props.changeFilter("all", props.todoListId)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.todoListId)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.todoListId)
  }
  const onChangeCheckBoxHandler = (idTask: string, eValue: boolean, tlID: string) => {
    props.changeCheckBox(idTask, eValue, tlID)
  }
  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
  }

  return <div>
    <h3>{props.title}
      <button onClick={removeTodoListHandler}>X</button>
    </h3>
    {/*  <AddItemForm todoListId={props.todoListId} addTask={props.addTask}/>*/}
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
        props.tasks.map((t) => <li key={t.id} className={t.isDone ? 'isDone' : ''}>
          <CheckBox
            checked={t.isDone}
            callback={(eValue) => onChangeCheckBoxHandler(t.id, eValue, props.todoListId)}
            // callback={(eValue)=>props.changeCheckBox(t.id, eValue)}
          />

          <span>{t.title}</span>
          <button onClick={() => onClickRemoveTaskHandler(props.todoListId, t.id)}>x
          </button>
        </li>)
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>
        All
      </button>
      <button className={props.filter === 'active' ? 'activeFilter' : ''} onClick={onActiveClickHandler}>
        Active
      </button>
      <button className={props.filter === 'completed' ? 'activeFilter' : ''} onClick={onCompletedClickHandler}>
        Completed
      </button>
    </div>
  </div>
}

// type AddItemFormPropsType = {
//   addTask: (title: string, todoListId: string) => void
//   todoListId: string
// }
//
// function AddItemForm(props: AddItemFormPropsType) {
//   const [title, setTitle] = useState('')
//   const [error, setError] = useState<string | null>(null)
//
//
//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.currentTarget.value)
//   }
//   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     setError('')
//     if (e.key === 'Enter') {
//       addTaskHandler()
//     }
//   }
//
//   const addTaskHandler = () => {
//     if (title.trim() !== '') {
//       props.addTask(props.todoListId, title.trim())
//       setTitle('')
//     } else {
//       setError('Title is required')
//     }
//   }
//
//   return (
//     <div>
//       <input
//         value={title}
//         onChange={onChangeHandler}
//         onKeyPress={onKeyPressHandler}
//         className={error ? 'error' : ''}
//       />
//       <button onClick={addTaskHandler}>+</button>
//       {error && <div className='errorMessage'>{error}</div>}
//     </div>
//   )
// }
