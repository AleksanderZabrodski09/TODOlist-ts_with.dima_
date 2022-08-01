import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
  title: string
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.title)

  let activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  let activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return editMode
    ? <TextField
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
      variant="standard"
    />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>

}