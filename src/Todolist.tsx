import React from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {CheckBox} from './components/CheckBox';
import {InputForm} from './components/InputForm';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId: string) => void
  removeTodolist:(todolistId: string)=>void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeCheckBox: (todolistId: string, id: string, value: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {


  const addTask =(title:string)=>{
    props.addTask(props.todolistId,title)
  }

  const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

  const changeCheckBoxHandler = (tlID: string, tID: string, eValue: boolean) => {
    props.changeCheckBox(tlID, tID, eValue)
  }
  const onClickHandler = (tlID: string, tID: string) => {
    props.removeTask(tlID, tID)
  }

  const removeTodolistHandler=()=>props.removeTodolist(props.todolistId)


  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolistHandler}>X</button>
      </h3>
      <InputForm addInputForm={addTask}/>


      <ul>
        {
          props.tasks.map(t => {


              return (
                <li key={t.id} className={t.isDone === true ? s.isDone : ''}>
                  <CheckBox
                    checked={t.isDone}
                    callback={(eValue) => changeCheckBoxHandler(props.todolistId,t.id, eValue)}
                  />
                  <span>{t.title}</span>
                  <button onClick={() => onClickHandler(props.todolistId, t.id)}>x</button>
                </li>)
            }
          )}
      </ul>
      <div>
        <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? s.activeFilter : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  )
}

