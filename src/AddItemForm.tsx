import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null);

        if (e.ctrlKey && e.key === 'Enter') {
            addTask();
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }

    const addTask = () => {

        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }

    }

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyUp={keyUpHandler} className={error ? 'error' : ""}/>
            <button onClick={addTask}>+
            </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}