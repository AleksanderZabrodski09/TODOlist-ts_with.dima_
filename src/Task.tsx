import {CheckBox} from './Components/CheckBox';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React from 'react';
import {TaskType} from './Todolist';

type TaskPropsType = {
  changeTaskStatus: (todoListId: string, idTask: string, eValue: boolean) => void
  changeTaskTitle: (todoListId: string, idTask: string, newValue: string) => void
  removeTask: (todoListId: string, idTask: string) => void
  task: TaskType
  todoListId: string
}
export const Task = React.memo( (props: TaskPropsType) => {
  return <li key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
    <CheckBox
      checked={props.task.isDone}
      callback={(eValue) => props.changeTaskStatus(props.todoListId, props.task.id, eValue)}
    />
    <EditableSpan title={props.task.title}
                  onChange={(newValue) => props.changeTaskTitle(props.todoListId, props.task.id, newValue)}/>
    <IconButton onClick={() => props.removeTask(props.todoListId, props.task.id)} size="small">
      <Delete fontSize="small"/>
    </IconButton>
    {/*<CheckBox*/}
    {/*  checked={props.task.isDone}*/}
    {/*  callback={(eValue) => onChangeCheckBoxHandler(props.todoListId, props.task.id, eValue)}*/}
    {/*/>*/}
    {/*<EditableSpan title={props.task.title}*/}
    {/*              onChange={(newValue) => onChangeTitleHandler(props.todoListId, props.task.id, newValue)}/>*/}
    {/*<IconButton onClick={() => onClickRemoveTaskHandler(props.todoListId, props.task.id)} size="small">*/}
    {/*  <Delete fontSize="small"/>*/}
    {/*</IconButton>*/}
  </li>
})