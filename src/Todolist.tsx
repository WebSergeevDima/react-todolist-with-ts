import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string) => void;
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null);

        if(e.ctrlKey && e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {

        if(newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }


    }

    const onAllClickHandler = () => props.changeFilter('all');

    const onActiveClickHandler = () => props.changeFilter('active');

    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyUp={keyUpHandler} className={error ? 'error' : ""}/>
                <button onClick={addTask}>+
                </button>

                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                        const onRemoveHandler = () => props.removeTask(task.id);

                        const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, e.currentTarget.checked);
                        }

                        return <li key={task.id} className={task['isDone'] ? 'task-grey' : '' }><input onChange={changeStatusHandler} type="checkbox"
                                                        checked={task['isDone']}/><span>{task['title']}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}