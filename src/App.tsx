import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const task1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: false},
        {id: 3, title: 'JS', isDone: true},
    ];

    const task2 = [
        {id: 1, title: 'TS', isDone: true},
        {id: 2, title: 'REACT', isDone: false},
        {id: 3, title: 'REDUX', isDone: false},
    ];

    return (
        <div className="App">
            <Todolist title="title 1" tasks={task1}/>
            <Todolist title="title 2" tasks={task2}/>
        </div>
    );
}

export default App;
