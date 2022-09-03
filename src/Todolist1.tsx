import React from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css';
import {CheckBox} from './componenets/CheckBox';
import {Input} from './componenets/input';
import {EditableSpan} from './componenets/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TasksPropsType, TodoListPropsType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeCheckBoxAC, editTaskAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todoLists-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  // todoListID: string
  todoList: TodoListPropsType

}

export function Todolist1({todoList}: PropsType) {
  const {todoListID, title, filter} = todoList

  let tasks=useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListID])

  // let state=useSelector<AppRootStateType, AppRootStateType>(state => state)
  // let tasks=state.tasks[todoListID]

  const dispatch=useDispatch()

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC(todoListID, title))
    // props.addTask(props.todoListID, title)
  }
  const changeCheckBoxHandler = (tlID: string, tID: string, eValue: boolean) => {
    // props.changeCheckBox(tlID, tID, eValue)
    dispatch(changeCheckBoxAC(tlID, tID, eValue))
  }
  const onClickRemoveHandler = (tLID: string, TaskId: string) => dispatch(removeTaskAC(todoListID, TaskId))

  const onAllClickHandler = () => dispatch(changeTodoListFilterAC(todoListID,"all"))
  const onActiveClickHandler = () => dispatch(changeTodoListFilterAC(todoListID,"active"))
  const onCompletedClickHandler = () => dispatch(changeTodoListFilterAC(todoListID,"completed"))
  const removeTodoListHandler = () => {
    let action=removeTodoListAC(todoListID)
    dispatch(action)
    // props.removeTodoList(props.todoListID)
  }



  const editTaskHandler = (tID: string, newTitle: string) => {
    dispatch(editTaskAC(todoListID, tID, newTitle))
    // props.editTask(props.todoListID, tID, newTitle)
  }
  const editTodoTitleHandler = (newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListID,newTitle))
    // props.editTodoTitle(props.todoListID, newTitle)
  }

  // let tasksForTodolist = tasks[tl.todoListID];

  if (filter === "active") {
    tasks = tasks.filter(t => t.isDone === false);
  }
  if (filter === "completed") {
    tasks = tasks.filter(t => t.isDone === true);
  }

  return <div>
    <h3>
      {/*{props.title}*/}
      <EditableSpan title={title} callBack={editTodoTitleHandler}/>

      <IconButton aria-label="delete" size="large" onClick={removeTodoListHandler}>
        <Delete fontSize="inherit"/>
      </IconButton>
      {/*<button onClick={removeTodoListHandler}>X</button>*/}
    </h3>
    <Input
      callBack={addTaskHandler}/>

    <ul>
      {
        tasks.map(t => {

        return (
          <li key={t.id} className={t.isDone === true ? s.isDone : ''}>

            <CheckBox
              checked={t.isDone}
              callBack={(eValue) => changeCheckBoxHandler(todoListID, t.id, eValue)}/>
            <EditableSpan
              title={t.title}
              callBack={(newTitle) => editTaskHandler(t.id, newTitle)}
            />
            {/*<span>{t.title}</span>*/}
            <IconButton aria-label="delete" size="small" onClick={() => onClickRemoveHandler(todoListID, t.id)}>
              <Delete fontSize="inherit"/>
            </IconButton>
            {/*<button onClick={() => onClickRemoveHandler(t.id, props.todoListID)}>x</button>*/}
          </li>
        )
      })
      }
    </ul>
    <div>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        onClick={onAllClickHandler} color='success'>All</Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        onClick={onActiveClickHandler} color='secondary'>Active</Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        onClick={onCompletedClickHandler} color='info'>Completed</Button>

    </div>
  </div>
}




