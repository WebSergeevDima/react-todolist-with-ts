import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (id: string) => {

        const resultTasks = tasks.filter(task => {
            return task.id !== id;
        })

        setTasks(resultTasks);

    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let tasksForTodolist = tasks;

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }

    return (
        <div className="App">
            <Todolist title="title 1" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
