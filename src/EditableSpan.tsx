import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanType = {
  title: string
  onChange:(newValue:string)=>void
}
export const EditableSpan = (props: EditableSpanType) => {
  let [editMode, setEditMode]=useState(false)
  let [title, setTitle]=useState('')

  const activateEditMode= ()=>{
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewEditMode= ()=>{
    setEditMode(false)
    props.onChange(title)
  }
const onChangeTitleHandler =(e:ChangeEvent<HTMLInputElement>)=>{
  setTitle(e.currentTarget.value)
}

  return editMode
    ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewEditMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}