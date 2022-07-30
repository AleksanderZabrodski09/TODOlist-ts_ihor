import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {CheckBox} from './componenets/CheckBox';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListID:string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListID: string, taskId: string) => void
  removeTodoList: (todoListID: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, title: string) => void
  changeCheckBox: (todoListID: string, id: string, value: boolean) => void
  filter: FilterValuesType

}

export function Todolist(props: PropsType) {

  const [error, setError] = useState<string | null>(null)
  let [title, setTitle] = useState("")

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todoListID,title.trim());
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

  const onAllClickHandler = () => props.changeFilter( props.todoListID,"all");
  const onActiveClickHandler = () => props.changeFilter(props.todoListID,"active");
  const onCompletedClickHandler = () => props.changeFilter(props.todoListID,"completed");

  const changeCheckBoxHandler = (tlID: string, tID: string, eValue: boolean) => {
    props.changeCheckBox(tlID,tID, eValue)
  }
  const onClickRemoveHandler = (tLID: string, tID: string) => props.removeTask(tID,tLID)

  const removeTodoListHandler =()=>{
    props.removeTodoList(props.todoListID)
  }

  return <div>
    <h3>{props.title}
    <button onClick={removeTodoListHandler}>X</button>
    </h3>

    <div>
      <input className={error ? s.error : ''}
             value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
      />
      <button onClick={addTask}>+</button>
    {error && <div className={s.errorMessage}>{error}</div>}
    </div>
    <ul>
      {props.tasks.map(t => {

        return (
          <li key={t.id} className={t.isDone === true ? s.isDone : ''}>
            {/*<input*/}

            {/*  type="checkbox"*/}
            {/*  checked={t.isDone}*/}
            {/*  onChange={(e) => changeCheckBoxHandler(t.id, e.currentTarget.checked)}/>*/}
            <CheckBox
              checked={t.isDone}
              callBack={(eValue)=>changeCheckBoxHandler(props.todoListID,t.id,eValue)}/>
            <span>{t.title}</span>
            <button onClick={() => onClickRemoveHandler(t.id, props.todoListID)}>x</button>
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
