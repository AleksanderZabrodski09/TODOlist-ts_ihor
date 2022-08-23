import React from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {CheckBox} from './componenets/CheckBox';
import {Input} from './componenets/input';
import {EditableSpan} from './componenets/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListID: string, taskId: string) => void
  removeTodoList: (todoListID: string) => void
  changeFilter: (todoListID: string, value: FilterValuesType) => void
  addTask: (todoListID: string, title: string) => void
  changeCheckBox: (todoListID: string, id: string, value: boolean) => void
  filter: FilterValuesType
  editTask: (todoListID: string, idTasks: string, newTitle: string) => void
  editTodoTitle: (todoListID: string, newTitle: string) => void

}

export function Todolist(props: PropsType) {

  const addTaskHandler = (title: string) => {
    props.addTask(props.todoListID, title)
  }

  const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
  const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
  const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

  const changeCheckBoxHandler = (tlID: string, tID: string, eValue: boolean) => {
    props.changeCheckBox(tlID, tID, eValue)
  }
  const onClickRemoveHandler = (tLID: string, tID: string) => props.removeTask(tID, tLID)

  const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListID)
  }
  const editTaskHandler = (tID: string, newTitle: string) => {
    props.editTask(props.todoListID, tID, newTitle)
  }
  const editTodoTitleHandler=(newTitle: string)=>{
    props.editTodoTitle(props.todoListID, newTitle)
  }

  return <div>
    <h3>
      {/*{props.title}*/}
      <EditableSpan title={props.title} callBack={editTodoTitleHandler}/>

      <IconButton aria-label="delete" size="large" onClick={removeTodoListHandler}>
        <Delete fontSize="inherit" />
      </IconButton>
      {/*<button onClick={removeTodoListHandler}>X</button>*/}
    </h3>
    <Input
      callBack={addTaskHandler}/>

    <ul>
      {props.tasks.map(t => {

        return (
          <li key={t.id} className={t.isDone === true ? s.isDone : ''}>

            <CheckBox
              checked={t.isDone}
              callBack={(eValue) => changeCheckBoxHandler(props.todoListID, t.id, eValue)}/>
            <EditableSpan
              title={t.title}
              callBack={(newTitle) => editTaskHandler(t.id, newTitle)}
            />
            {/*<span>{t.title}</span>*/}
            <IconButton aria-label="delete" size="small" onClick={() => onClickRemoveHandler(t.id, props.todoListID)}>
              <Delete fontSize="inherit" />
            </IconButton>
            {/*<button onClick={() => onClickRemoveHandler(t.id, props.todoListID)}>x</button>*/}
          </li>
        )
      })
      }
    </ul>
    <div>
      <Button
              variant={props.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler} color='success'>All</Button>
      <Button
              variant={props.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler} color='secondary'>Active</Button>
      <Button
              variant={props.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler} color='info'>Completed</Button>
      {/*<Button className={props.filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active</Button>*/}
      {/*<Button className={props.filter === 'completed' ? s.activeFilter : ''}*/}
      {/*        onClick={onCompletedClickHandler}>Completed*/}
      {/*</Button>*/}
    </div>
  </div>
}



