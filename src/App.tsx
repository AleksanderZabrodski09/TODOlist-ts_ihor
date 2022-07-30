import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListPropsType = {
  todoListID: string
  title: string
  filter: FilterValuesType
}

type TasksPropsType = {
  [key: string]: Array<TaskType>
}

function App() {


  const changeCheckBox = (todoListID: string, idTasks: string, value: boolean) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === idTasks ? {...el, isDone: value} : el)})

    // console.log(idTasks, value)
    // setTasks(tasks.map(el => el.id === idTasks ? {...el, isDone: value} : el))

  }

  function removeTask(todoListID: string, TaskId: string) {
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== TaskId)})

    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  }

  const removeTodoList=(todoListID: string)=>{
    setTodoLists(todoLists.filter(tl=>tl.todoListID!==todoListID))
  }

  function addTask(todoListID: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    delete tasks[todoListID]

    // let newTask = {id: v1(), title: title, isDone: false};
    // tasks[todoListID] = [newTask, ...tasks[todoListID]];
    // setTasks({...tasks});

  }


  function changeFilter(todoListID: string, value: FilterValuesType) {
    setTodoLists(todoLists.map(tl => tl.todoListID === todoListID ? {...tl, filter: value} : tl))

    // let todoList = todoLists.find(tl => tl.todoListID === todoListID)
    // if (todoList) {
    //   todoList.filter = value
    // }
    // setTodoLists([...todoLists])

  }

  let todoListID1 = v1();
  let todoListID2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListPropsType[]>([
    {todoListID: todoListID1, title: "What to learn", filter: 'all'},
    {todoListID: todoListID2, title: "What to buy", filter: 'all'},
  ])
  let [tasks, setTasks] = useState<TasksPropsType>({
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
      {
        todoLists.map(tl => {
          let tasksForTodolist = tasks[tl.todoListID];

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          return <Todolist
            todoListID={tl.todoListID}
            key={tl.todoListID}
            title={tl.title}
            filter={tl.filter}
            changeCheckBox={changeCheckBox}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeFilter={changeFilter}
            addTask={addTask}/>
        })
      }

    </div>
  );
}

export default App;
