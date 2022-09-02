import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from './componenets/input';
import ButtonAppBar from './componenets/AppBar';
import {Container, Grid, Paper} from '@mui/material';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todoListsReducer
} from './state/todoLists-reducer';
import {addTaskAC, changeCheckBoxAC, editTaskAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

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

  function removeTask(todoListID: string, TaskId: string) {
    dispatchToTasks(removeTaskAC(todoListID, TaskId))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== TaskId)})

  }

  function addTask(todoListID: string, title: string) {
    dispatchToTasks(addTaskAC(todoListID, title))
    // let newTask = {id: v1(), title: title, isDone: false};
    // setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

  }

  const changeCheckBox = (todoListID: string, idTasks: string, value: boolean) => {
    dispatchToTasks(changeCheckBoxAC(todoListID, idTasks, value))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, isDone: value} : el)})

  }
  const editTask = (todoListID: string, idTasks: string, newTitle: string) => {
    dispatchToTasks(editTaskAC(todoListID, idTasks, newTitle))
    // setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, title: newTitle} : el)})
  }


  const removeTodoList = (todoListID: string) => {
    let action=removeTodoListAC(todoListID)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
    // setTodoLists(todoLists.filter(tl => tl.todoListID !== todoListID))
    // delete tasks[todoListID]
    // setTasks({...tasks});
  }
  const addTodoList = (title: string) => {
    let action=addTodoListAC(title)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
    // let newTodoListID = v1()
    // let newTodoList: TodoListPropsType = {todoListID: newTodoListID, title: title, filter: 'all'};
    // setTodoLists([newTodoList, ...todoLists]);
    // setTasks({...tasks, [newTodoListID]: []})
  }

  function changeFilter(todoListID: string, value: FilterValuesType) {
    dispatchToTodoLists(changeTodoListFilterAC(todoListID,value))
    // setTodoLists(todoLists.map(tl => tl.todoListID === todoListID ? {...tl, filter: value} : tl))

  }

  const editTodoTitle = (todoListID: string, newTitle: string) => {
    dispatchToTodoLists(changeTodoListTitleAC(todoListID,newTitle))
    // setTodoLists(todoLists.map(tl => tl.todoListID === todoListID ? {...tl, title: newTitle} : tl))

  }


  let todoListID1 = v1();
  let todoListID2 = v1();

  const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'}
  ])
  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todoListID2]: [
      {id: v1(), title: "book", isDone: true},
      {id: v1(), title: "milk", isDone: false},
      {id: v1(), title: "pen", isDone: true}
    ]
  });


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
              let tasksForTodolist = tasks[tl.todoListID];

              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              }
              return <Grid item>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    todoListID={tl.todoListID}
                    key={tl.todoListID}
                    title={tl.title}
                    filter={tl.filter}
                    changeCheckBox={changeCheckBox}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    editTask={editTask}
                    editTodoTitle={editTodoTitle}
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
