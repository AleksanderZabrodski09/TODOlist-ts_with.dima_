import React from 'react';
import {FilterValuesType} from './App';
import {CheckBox} from './Components/CheckBox';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';




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
  changeTaskTitle: (idTask: string, newTitle: string, todoListId: string) => void
  filter: string
  removeTodoList: (todoListId: string) => void
  changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


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
  const onChangeTitleHandler = (idTask: string, newValue: string, tlID: string) => {
    props.changeTaskTitle(idTask, newValue, tlID)
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
      <button onClick={removeTodoListHandler}>X</button>
    </h3>
    <AddItemForm addItem={addTask}/>

    <ul>
      {
        props.tasks.map((t) => <li key={t.id} className={t.isDone ? 'isDone' : ''}>
          <CheckBox
            checked={t.isDone}
            callback={(eValue) => onChangeCheckBoxHandler(t.id, eValue, props.todoListId)}
            // callback={(eValue)=>props.changeCheckBox(t.id, eValue)}
          />
          <EditableSpan title={t.title} onChange={(newValue)=>onChangeTitleHandler(t.id,newValue, props.todoListId)}/>
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

