import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <button onClick={addTaskHandler}>+</button>
      {error && <div className='errorMessage'>{error}</div>}
    </div>
  )
}