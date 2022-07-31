import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';


type InputPropsType = {
  callBack: (title: string) => void
}


export const Input = (props: InputPropsType) => {
  let [error, setError] = useState<string | null>(null)
  let [title, setTitle] = useState("")

  const addTask = () => {
    if (title.trim() !== '') {
      props.callBack(title.trim());
      setTitle("");
    } else {
      setError('Title is required')
    }
  }


  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  }
  return (
    <div>
      <input className={error ? s.error : ''}
             value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
      {error && <div className={s.errorMessage}>{error}</div>}

    </div>
  );
};
