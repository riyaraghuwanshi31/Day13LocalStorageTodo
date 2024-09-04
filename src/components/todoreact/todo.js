import React, { useState, useEffect } from 'react';
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists); // parse will give the list in array format
    }
    else {
        return [];
    }

    //  
};

const Todo = () => {

    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items function
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data");
        } else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata }
                    }
                    return curElem;
                })
            );

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }

        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };


    //delete items
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });

        setItems(updatedItems);
    }

    // Remove All
    const removeAll = () => {
        setItems([]);
    }


    // edit item
    const editItem = (index) => {
        const updateItem = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(updateItem.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // Adding items to local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder='Add Items ✍️'
                            className='form-control'
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>)
                            : (
                                <i className="fa fa-plus add-btn" onClick={addItem}></i>
                            )}

                    </div>

                    {/* Show our item */}
                    <div className="showItems">

                        {
                            items.map((curElem) => {
                                return (
                                    <div className="eachItem" key={curElem.id}>
                                        <h3>{curElem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => {
                                                editItem(curElem.id)
                                            }}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => {
                                                deleteItem(curElem.id)
                                            }}></i>
                                        </div>
                                    </div>
                                );
                            })
                        }


                    </div>

                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
 
 

        </>
    )
}

export default Todo;
