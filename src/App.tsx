import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (id: number) => {

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
