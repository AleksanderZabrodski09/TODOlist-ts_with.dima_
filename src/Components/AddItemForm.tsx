import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '@mui/material';

export type AddItemFormType = {
  addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormType) => {

  let [newTitle, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (newTitle.trim()) {
      props.addItem(newTitle.trim())
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
      addItem()
    }
  }

  return (
    <div>
      <input
        value={newTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addItem}>+</button>
      {/*<Button onClick={addItem}>+</Button>*/}
      {error && <div className='errorMessage'>{error}</div>}
    </div>
  )
}