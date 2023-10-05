import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
};

function App() {

    const [totdolists, setTodolists] = useState<TodoListType[]>([
        {id: v1(), title: 'Totdolist 1', filter: 'all'},
        {id: v1(), title: 'Totdolist 2', filter: 'completed'},
    ]);

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
    ]);


    const removeTask = (id: string) => {

        const resultTasks = tasks.filter(task => {
            return task.id !== id;
        })

        setTasks(resultTasks);

    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: true};
        setTasks([newTask, ...tasks]);
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const newTodolists = totdolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist);
        setTodolists(newTodolists);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {

        const task = tasks.find(task => task.id === taskId);

        if (task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }


    }


    return (
        <div className="App">
            {

                totdolists.map(todolist => {

                    let tasksForTodolist = tasks;

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasks.filter(task => task.isDone);
                    }

                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasks.filter(task => !task.isDone);
                    }

                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}/>;
                })
            }

        </div>
    );
}

export default App;
