import React, { useState, useEffect, useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../App';

import { TiEdit } from "react-icons/ti";
import './ToDo.css'
export default function ToDo() {
    const [value, setValue] = useState('')
    const [todos, setTodos] = useState([])
    const [completed, setCompleted] = useState([])
    const [editOn, setEditOn] = useState(false)
    const [editedTodoId, setEditedTodoId] = useState("");
    const [editDescription, setEditDescription] = useState(' ');
    const { openSidebar, setOpenSidebar } = useContext(Context);
    const { selectedDate, setSelectedDate } = useContext(Context)
    const date = new Date(selectedDate);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const dayWithOrdinal = formattedDate.replace(/(\d)(st|nd|rd|th)/, '$1<sup>$2</sup>');
    const f = new Intl.DateTimeFormat('en-us', {
        dateStyle: "full"
    })
    const notifyA = (err) => toast.error(err)
    const notifyB = (msg) => { toast.success(msg) }

    const [description, setValue1] = useState('');

    const fetchTodos = () => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options).replace(/\//g, '-');
        const url = `/getchecked?date=${formattedDate}`;
        const url1 = `/unchecked?date=${formattedDate}`;

        //getting pending data
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCompleted(data);
            })
            .catch(err => {
                console.log(err);
            });
        //getting completed data
        fetch(url1)
            .then(res => res.json())
            .then(data => {
                setTodos(data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchTodos();
    }, [formattedDate]);

    const PostTodo = () => {
        const date = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options).replace(/\//g, '-');


        if (description) {
            fetch("/postTodo", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: description,
                    status: "pending",
                    createdAt: formattedDate
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(savedTodo => {
                    const toPost = savedTodo.postedTodo;
                    setTodos([...todos, toPost]);
                    setValue1('');
                    notifyB(savedTodo.message);
                })
                .catch(error => {
                    console.error("Error while posting:", error);
                    notifyA(error.message);
                });
        } else {
            notifyA("Text field is empty.");
        }
    }


    const deleteTodo = (_id) => {
        //deleting todo
        fetch("/delete", {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: _id
            })
        })
            .then(response => response.json())
            .then(data => {
                notifyA(data.message);
                fetchTodos();
            })

            .catch(error => notifyA(error))
    }
    const valueTransfer = (e) => {
        setValue1(e.target.value)
    }
    const checkingEdit = (_id) => {
        setEditOn(!editOn);
        setEditedTodoId(_id);
        const currentTodo = todos.find((todo) => todo._id === _id);
        if (currentTodo) {
            setEditDescription(currentTodo.description);
        } else {
            setEditDescription('');
        }
    }
    const completedEdit = (_id) => {
        setEditOn(!editOn);
        setEditedTodoId(_id);
        const currentTodo = completed.find((todo) => todo._id === _id);
        if (currentTodo) {
            setEditDescription(currentTodo.description);
        } else {
            setEditDescription('');
        }
    }
    const editTodo = (_id) => {
        if (editOn) {
            const currentDate = new Date();

            fetch("/edit", {
                method: "put",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    id: _id,
                    description: editDescription,
                    updatedAt: currentDate
                })
            }).then(res => res.json())
                .then(data => {
                    fetchTodos();
                    notifyB("Todo is edited.")
                }).catch(err => console.log(err))

        }
        else {

        }

    }
    const Checkbox = (_id) => {
        fetch("/check", {
            method: "put",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => res.json())
            .then(data => {
                fetchTodos();
                notifyB("Todo is checked")
            }).catch(err => console.log(err))

    }
    const Uncheckbox = (_id) => {
        fetch("/uncheck", {
            method: "put",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: _id
            })
        }).then(res => {
            // Assuming the server is not sending a JSON response
            if (res.ok) {
                notifyA("Todo is unchecked")
                fetchTodos(); // Fetch todos after successful update
            } else {
                throw new Error("Error updating todo");
            }
        })

            .catch(err => console.log(err))

    }
    const toggleSidebar = () => {
        setOpenSidebar(true);
    };



    return (
        <>
          <div className='todo-bg'>
            <div className='todos-head'>
              <div className='history-btn'>
                <button onClick={toggleSidebar}>
                  History
                </button>
              </div>
              <div className='logo-container'>
                <div className='todo-logo'>
                  <p>TODO LISTS</p>
                </div>
                <div className='container'>
                  <p className='text1'>Overthinking? Write </p>
                  <span className='typing-animation'> Todolists. </span>
                </div>
              </div>
            </div>
            <div className='todos-date'>
              <p>{dayWithOrdinal}</p>
            </div>
      
            <div className='todos-body'>
              <div className='todos-completed'>
                <div className='heading'>
                  <h1>Completed Tasks</h1>
                  {/* Search input can be added here */}
                </div>
                <div className='body'>
                  {completed.length === 0 ? (
                    <p  style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>No completed tasks to display.</p>
                  ) : (
                    <ul>
                      {completed.map((todo) => (
                        <div className='flex-btn' key={todo._id}>
                          {editOn && editedTodoId === todo._id ? (
                            <input
                              type="text"
                              value={editDescription}
                              className='edit-description'
                              onChange={(e) => setEditDescription(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  PostTodo();
                                }
                              }}
                            />
                          ) : (
                            <li>
                              {todo.description}
                            </li>
                          )}
                          <button className='deleteBtn' onClick={() => deleteTodo(todo._id)}><AiOutlineDelete /></button>
                          <button className='checkBtn' onClick={() => Uncheckbox(todo._id)}><ImCheckboxChecked /></button>
                          <button className='editBtn' onClick={() => {
                            editTodo(todo._id)
                            completedEdit(todo._id)
                          }}><TiEdit /></button>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className='toDos'>
                <div className='heading'>
                  <h1>ToDos Tasks</h1>
                  <div className='search-btn'>
                    <input
                      type='text'
                      value={description}
                      id='completed'
                      placeholder='Add your Task'
                      onChange={valueTransfer}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          PostTodo();
                        }
                      }}
                    />
                    <button className='btn' onClick={PostTodo}>
                      <BsPlusSquareFill />
                    </button>
                  </div>
                </div>
                <div className='body'>
                  {todos.length === 0 ? (
                    <p style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>No todos to display.</p>
                  ) : (
                    <ul>
                      {todos.map((todo) => (
                        <div className='flex-btn' key={todo._id}>
                          {editOn && editedTodoId === todo._id ? (
                            <input
                              type="text"
                              value={editDescription}
                              className='edit-description'
                              onChange={(e) => setEditDescription(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  editTodo(todo._id);
                                  checkingEdit(todo._id)
                                }
                              }}
                            />
                          ) : (
                            <li>
                              {todo.description}
                            </li>
                          )}
                          <button className='deleteBtn' onClick={() => deleteTodo(todo._id)}><AiOutlineDelete /></button>
                          <button className='checkBtn' onClick={() => Checkbox(todo._id)}><ImCheckboxUnchecked /></button>
                          <button className='editBtn' onClick={() => {
                            editTodo(todo._id)
                            checkingEdit(todo._id)
                          }}><TiEdit /></button>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
      
}
