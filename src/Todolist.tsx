import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeCheckBox: (id: string, value: boolean) => void
}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState("")

  const addTask = () => {
    if(title.trim()!=='') {
      props.addTask(title.trim());
      setTitle("");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addTask();
    }
  }

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");
  const changeCheckBoxHandler = (tID:string,eValue: boolean) => {
    props.changeCheckBox(tID, eValue)
  }
  const onClickHandler = (tID:string) => {
    props.removeTask(tID)
  }

return (
  <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => {


            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>changeCheckBoxHandler(t.id, e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <button onClick={()=>onClickHandler(t.id)}>x</button>
              </li>)
          }
        )}
    </ul>
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
  </div>
)
}
