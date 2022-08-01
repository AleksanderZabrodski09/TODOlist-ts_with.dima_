import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddCircleOutlineOutlined} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      props.addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      {/*<input*/}
      {/*  value={title}*/}
      {/*  onChange={onChangeHandler}*/}
      {/*  onKeyPress={onKeyPressHandler}*/}
      {/*  className={error ? 'error' : ''}*/}
      {/*/>*/}
      <TextField
        variant={'outlined'}
        label="type title"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? 'error' : ''}
        error={!!error}
        helperText={error}
      />
      {/*<button onClick={addTaskHandler}>+</button>*/}
      <IconButton onClick={addTaskHandler}  color={'primary'}>
        <AddCircleOutlineOutlined color={'inherit'}/>
      </IconButton>
      {/*{error && <div className='errorMessage'>{error}</div>}*/}
    </div>
  )
}