import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    removeTask: (todolistId: string, id: string) => void;
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null);

        if (e.ctrlKey && e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {

        if (newTaskTitle.trim() !== '') {
            props.addTask(props.todolistId, newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }


    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all');

    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active');

    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed');

    const onRemoveTodolistHandler = () => props.removeTodolist(props.todolistId);

    return (
        <div>
            <h3>{props.title}<button onClick={onRemoveTodolistHandler}>X</button></h3>
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

                        const onRemoveHandler = () => props.removeTask(props.todolistId, task.id);

                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.todolistId, task.id, e.currentTarget.checked);
                        }

                        return <li key={task.id} className={task['isDone'] ? 'task-grey' : ''}><input
                            onChange={changeStatusHandler} type="checkbox"
                            checked={task['isDone']}/><span>{task['title']}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}