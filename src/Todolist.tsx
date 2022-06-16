import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';

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
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {

  const [error, setError] = useState<string | null>(null)
  let [title, setTitle] = useState("")

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(title.trim());
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

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  const changeCheckBoxHandler = (tID: string, eValue: boolean) => {
    props.changeCheckBox(tID, eValue)
  }
  const onClickHandler = (tID: string) => props.removeTask(tID)

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input className={error ? s.error : ''}
             value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
    </div>
    {error && <div className={s.errorMessage}>{error}</div>}
    <ul>
      {props.tasks.map(t => {


        return (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone}
                   onChange={(e) => changeCheckBoxHandler(t.id, e.currentTarget.checked)}/>
            <span>{t.title}</span>
            <button onClick={() => onClickHandler(t.id)}>x</button>
          </li>
        )
      })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
      <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === 'completed' ? s.activeFilter : ''}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}
