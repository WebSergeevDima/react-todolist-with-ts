import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title)

    const activateEditModeHandler = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewModeHandler = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ? <input type="text" value={title} onChange={changeTitleHandler} onBlur={activateViewModeHandler} autoFocus={true} /> : <span onDoubleClick={activateEditModeHandler}>{title}</span>;
}