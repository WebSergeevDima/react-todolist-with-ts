import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
};

type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodoListType[]>([
        {
            id: todolistId1, title: 'Totdolist 1', filter: 'all'
        },
        {
            id: todolistId2, title: 'Totdolist 2', filter: 'completed'
        },
    ]);

    const [allTasks, setAllTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
        ]
    })

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(todolist => todolist.id !== todolistId);
        delete allTasks[todolistId];
        setTodolists([...newTodolists]);
        setAllTasks({...allTasks})
    }

    const removeTask = (todolistId: string, taskId: string) => {

        const resultTasks = allTasks[todolistId].filter(task => {
            return task.id !== taskId;
        })

        setAllTasks({...allTasks, [todolistId]: [...resultTasks]});

    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setAllTasks({...allTasks, [todolistId]: [newTask, ...allTasks[todolistId]]});
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const newTodolists = todolists.map(todolist => todolist.id === todolistId ? {
            ...todolist,
            filter: value
        } : todolist);
        setTodolists(newTodolists);
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {

        const tasks = allTasks[todolistId];
        const task = tasks.find(task => task.id === taskId);

        if (task) {
            task.isDone = isDone;
            setAllTasks({...allTasks});
        }

    }

    const addTodolist = (title: string) => {
        const todolistId = v1();
        setTodolists([{id: todolistId, title: title, filter: 'all'}, ...todolists]);
        setAllTasks({...allTasks, [todolistId]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {

                todolists.map(todolist => {

                    let tasksForTodolist = allTasks[todolist.id];

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                    }

                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
                    }

                    return <Todolist
                        key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        filter={todolist.filter}
                        tasks={tasksForTodolist}
                        removeTodolist={removeTodolist}
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
