import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';


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

      <TextField
        error={!!error}
        size='small'
        value={newTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? 'error' : ''}
        id="outlined-basic"
        label={error}
        variant="outlined"
        // helperText={error}
      />

      <Button variant="contained"
              style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
              onClick={addItem}>
        <AddBox/>
      </Button>
      {/*{error && <div className='errorMessage'>{error}</div>}*/}

    </div>
  )
}