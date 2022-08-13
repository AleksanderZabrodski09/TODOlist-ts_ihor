import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);
    const changeCheckBox = (idTasks:string,value: boolean) => {
        // console.log(idTasks, value)
        setTasks(tasks.map(el=>el.id===idTasks ? {...el,isDone: value} : el))
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolist, setTodolist] = useState([
        { id: todolistId1, title: "What to learn", filter: 'all' },
        { id: todolistId2, title: "What to buy", filter: 'all' },

    ])


    return (
        <div className="App">
            <Todolist title={tl.id}
                      changeCheckBox={changeCheckBox}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={tl.filter}
            />
        </div>
    );
}

export default App;
