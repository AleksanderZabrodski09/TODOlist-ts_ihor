import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {CheckBox} from './components/CheckBox';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId:string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
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
    }
    else{
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

  const onAllClickHandler = () => props.changeFilter(props.todolistId,"all");
  const onActiveClickHandler = () => props.changeFilter(props.todolistId,"active");
  const onCompletedClickHandler = () => props.changeFilter(props.todolistId,"completed");
  // const changeCheckBoxHandler = (tID: string, eValue: boolean) => {
  //   props.changeCheckBox(tID, eValue)
  // }
  const changeCheckBoxHandler = (tID: string, eValue: boolean)=>{
props.changeCheckBox(tID, eValue)
  }
  const onClickHandler = (tID: string) => {
    props.removeTask(tID)
  }

  return (
    <div>
      <h3>{props.title}</h3>
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
      <ul>
        {
          props.tasks.map(t => {


              return (
                <li key={t.id} className={ t.isDone===true ? s.isDone : ''}>
                  {/*<input type="checkbox" checked={t.isDone}*/}
                  {/*       onChange={(e) => changeCheckBoxHandler(t.id, e.currentTarget.checked)}/>*/}
                  <CheckBox checked={t.isDone} callback={(eValue)=>changeCheckBoxHandler(t.id, eValue)}/>
                  <span>{t.title}</span>
                  <button onClick={() => onClickHandler(t.id)}>x</button>
                </li>)
            }
          )}
      </ul>
      <div>
        <button className={ props.filter=== 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter=== 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter=== 'completed' ? s.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}
