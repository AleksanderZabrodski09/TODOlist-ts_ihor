import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from '../Todolist.module.css';
import {Button, IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';


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
  // @ts-ignore
  return (
    <div>
      {/*<input className={error ? s.error : ''}*/}
      {/*       value={title}*/}
      {/*       onChange={onChangeHandler}*/}
      {/*       onKeyPress={onKeyPressHandler}*/}
      {/*/>*/}
      <TextField
        // id="outlined-multiline-flexible"
        label="Enter the title"
        helperText={error}
        size='small'
        // multiline
        maxRows={2}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        // className={error ? s.error : ''}
        error={!!error}
        style={{maxWidth: '170px', maxHeight: '30px', minWidth: '170px', minHeight: '30px'}}
      />
      <Button
        // variant="contained"
        onClick={addTask}
        style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>
        <AddBox/>
      </Button>

      {/*<button onClick={addTask}>+</button>*/}
      {/*{error && <div className={s.errorMessage}>{error}</div>}*/}

    </div>
  );
};
