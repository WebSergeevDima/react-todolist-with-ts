import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (id: string) => void;
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.ctrlKey && e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => props.changeFilter('all');

    const onActiveClickHandler = () => props.changeFilter('active');

    const onCompletedClickHandler = () => () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyUp={keyUpHandler}/>
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => props.removeTask(task.id);

                        return <li key={task.id}><input type="checkbox"
                                                        checked={task['isDone']}/><span>{task['title']}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}