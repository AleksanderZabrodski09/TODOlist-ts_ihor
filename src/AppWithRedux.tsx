import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {Input} from './componenets/input';
import ButtonAppBar from './componenets/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from './state/todoLists-reducer';
import {addTaskAC, changeCheckBoxAC, editTaskAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {Todolist1} from './Todolist1';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListPropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}

export type TasksPropsType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  // let todoListID1 = v1();
  // let todoListID2 = v1();

  const todoLists = useSelector<AppRootStateType, Array<TodoListPropsType>>(state=>state.todoLists)
const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)
const dispatch=useDispatch()

  function removeTask(todoListID: string, TaskId: string) {
    dispatch(removeTaskAC(todoListID, TaskId))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== TaskId)})

  }
  function addTask(todoListID: string, title: string) {
    dispatch(addTaskAC(todoListID, title))
    // let newTask = {id: v1(), title: title, isDone: false};
    // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

  }

  const changeCheckBox = (todoListID: string, idTasks: string, value: boolean) => {
    dispatch(changeCheckBoxAC(todoListID, idTasks, value))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, isDone: value} : el)})

  }
  const editTask = (todoListID: string, idTasks: string, newTitle: string) => {
    dispatch(editTaskAC(todoListID, idTasks, newTitle))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, title: newTitle} : el)})
  }


  const removeTodoList = (todoListID: string) => {
    let action=removeTodoListAC(todoListID)
    dispatch(action)
    // setTodoLists(todoLists.filter(tl => tl.todoListID !== todoListID))
    // delete tasks[todoListID]
    // setTasks({...tasks});
  }
  const addTodoList = (title: string) => {
    let action=addTodoListAC(title)
    dispatch(action)
    // let newTodoListID = v1()
    // let newTodoList: TodoListPropsType = {todoListID: newTodoListID, title: title, filter: 'all'};
    // setTodoLists([newTodoList, ...todoLists]);
    // setTasks({...tasks, [newTodoListID]: []})
  }

  function changeFilter(todoListID: string, value: FilterValuesType) {
    dispatch(changeTodoListFilterAC(todoListID,value))
    // setTodoLists(todoLists.map(tl => tl.todoListID === todoListID ? {...tl, filter: value} : tl))

  }

  const editTodoTitle = (todoListID: string, newTitle: string) => {
    dispatch(changeTodoListTitleAC(todoListID,newTitle))
    // setTodoLists(todoLists.map(tl => tl.todoListID === todoListID ? {...tl, title: newTitle} : tl))

  }




  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container>
          <Input callBack={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todoLists.map(tl => {
              // let tasksForTodolist = tasks[tl.todoListID];
              //
              // if (tl.filter === "active") {
              //   tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              // }
              // if (tl.filter === "completed") {
              //   tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              // }
              return <Grid item key={tl.todoListID}>
                <Paper style={{padding: '10px'}}>
                  <Todolist1
                    todoList={tl}
                    // todoListID={tl.todoListID}
                    // title={tl.title}
                    // filter={tl.filter}
                    // changeCheckBox={changeCheckBox}
                    // tasks={tasksForTodolist}
                    // removeTask={removeTask}
                    // removeTodoList={removeTodoList}
                    // changeFilter={changeFilter}
                    // addTask={addTask}
                    // editTask={editTask}
                    // editTodoTitle={editTodoTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>

      </Container>


    </div>
  );
}

export default AppWithRedux;
