import React, {ChangeEvent, useState} from 'react';

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
    ? <input value={title}
             onChange={onChangeTitleHandler}
             onBlur={activateViewMode}
             autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>

}