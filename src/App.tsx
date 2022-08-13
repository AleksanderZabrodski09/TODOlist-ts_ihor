import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  todolistId: string
  title: string
  filter: FilterValuesType
}

export type TasksPropsType={
  [key:string]:TaskType[];
}
function App() {

  const changeCheckBox = (idTasks: string, value: boolean) => {
    // setTasks(tasks.map(el => el.id === idTasks ? {...el, isDone: value} : el))
  }

  function removeTask(todolistId: string,id: string) {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el=>el.id!==id)})
  }

  function addTask(title: string) {
    // let task = {id: v1(), title: title, isDone: false};
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }


  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl,filter: value} : tl))
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {todolistId: todolistId1, title: "What to learn", filter: 'all'},
    {todolistId: todolistId2, title: "What to buy", filter: 'all'},

  ])
  let [tasks, setTasks] = useState<TasksPropsType>({
    [todolistId1]:[
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}],
  [todolistId2]:[
    {id: v1(), title: "car", isDone: true},
    {id: v1(), title: "house", isDone: true},
    {id: v1(), title: "business", isDone: false}]
  });

  return (
    <div className="App">
      {
        todolists.map(tl => {

          let tasksForTodolist = tasks[tl.todolistId];

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }


          return (
            <Todolist key={tl.todolistId}
                      todolistId={tl.todolistId}
                      title={tl.title}
                      filter={tl.filter}
                      changeCheckBox={changeCheckBox}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
          )
        })
      }

    </div>
  );
}

export default App;
