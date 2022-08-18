import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';

type InputFormPropsType = {
  addInputForm: (title:string)=>void
}
export const InputForm = (props: InputFormPropsType) => {

  let [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addInputForm(title.trim());
      setTitle("");
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  }

  return (
    <div>
      <input
        className={error ? s.error : ''}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}