import { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        if (headingInput.trim() !== ''){
            setTodos([...todos, {heading: headingInput, list: []}]);
            setHeadingInput('')
        }
    }

    const handleDeleteTodo = (idx) =>{
        const newTodos = [...todos];
        newTodos.splice(idx,1);
        setTodos(newTodos);
    }
    
    const handleAddList = (idx) => {
        if(listInputs[idx] && listInputs[idx].trim() !== ''){
            const newTodos = [...todos];
            newTodos[idx].list.push(listInputs[idx]);
            setTodos(newTodos);
            setListInputs({...listInputs, [idx]: ''});
        }
    }

    const handleListInputChange = (idx, value) => {
        setListInputs({...listInputs, [idx]: value});
    }

    const handleDeleteElement = (todoIdx, eleIdx) =>{
        const newTodos = [...todos];
        newTodos[todoIdx].list.splice(eleIdx,1);
        setTodos(newTodos);
    } 

return (
    <div className='page-wrapper'>
        <div className="todo-container">
            <h1 className="title">My Todo List</h1>
                <div className="input-container">
                <input
                    type="text"
                    className="heading-input"
                    placeholder="Enter heading"
                    value={headingInput}
                    onChange={(e) => setHeadingInput(e.target.value)}
                    />
                    <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
                </div>
        </div>
        <div className='todo-main-wrapper'>
            <div className="todo_main">
                {todos.map((todo, index) => (
                <div key={index} className="todo-card">
                    <div className="heading_todo">
                        <h3>{todo.heading}</h3> {/* Display the heading here */}
                        <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>
                    </div>
                    <div className='add-list'>
                        <input type="text" className='list-input' placeholder='Add List' value={listInputs[index] || ""} 
                        onChange={(e) => handleListInputChange(index, e.target.value)}/>
                        <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
                    </div>
                    <div className='list-items'>
                        {todo.list.length > 0?
                        (todo.list.map((item,idx) =>(
                            <div key={idx} className='todo_inside_list'>
                            <p>{item}</p>
                            <button className='delete-list-item-button' onClick={() => handleDeleteElement(index, idx)}>Done</button>
                            </div>
                        )
                        )
                        )
                        :
                        (<p>No Items Added Yet</p>)}
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
);
};

export default TodoList;
