import React from "react";

export const Todolist = () => {
    return (
        <div>
            <h3>Title</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>CSS</span></li>
                <li><input type="checkbox" checked={true}/><span>HTML</span></li>
                <li><input type="checkbox" checked={false}/><span>JS</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}