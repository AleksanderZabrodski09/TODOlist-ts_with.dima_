import {CheckBox} from './Components/CheckBox';
import {EditableSpan} from './EditableSpan';
import {IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React from 'react';
import {TaskType} from './Todolist';

type TaskPropsType = {
  changeTaskStatus: ( idTask: string, eValue: boolean) => void
  changeTaskTitle: ( idTask: string, newValue: string) => void
  removeTask: ( idTask: string) => void
  task: TaskType
  // todoListId: string
}
export const Task = React.memo( (props: TaskPropsType) => {
  return <li key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
    <CheckBox
      checked={props.task.isDone}
      callback={(eValue) => props.changeTaskStatus( props.task.id, eValue)}
    />
    <EditableSpan title={props.task.title}
                  onChange={(newValue) => props.changeTaskTitle( props.task.id, newValue)}/>
    <IconButton onClick={() => props.removeTask( props.task.id)} size="small">
      <Delete fontSize="small"/>
    </IconButton>

  </li>
})