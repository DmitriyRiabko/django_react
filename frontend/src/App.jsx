import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import styles from "./App.module.scss";
import "macro-css";
import axios from "axios";
import { API_URL } from "./config";

function App() {
  const [todos, setTodos] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTodo, setEditTodo] = useState({});
  const [name, setName] = useState('')

  const [isOpened, setIsOpened] = useState(false);

  const addTodoHandler = () => {
    const postTodo = async() =>{
      const postTodoData = {
        name:name
      }
    }
  };
  const deleteTodoHandler = () => {};
  const editTodoHandler = (id) => {};

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get(`${API_URL}/todos/`);
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.header}>Todo App</h1>
        <div className={styles.input_block}>
          <input placeholder="Add Todo here" type="text" className={styles.input} />
          <i onClick={addTodoHandler}>
            <PlusIcon width={30} className={styles.plus} />
          </i>
        </div>

        <div className={styles.todo_container}>
          {todos?.map((todo, index) => (
            <div key={todo.id} className={styles.todo_item}>
              {" "}
              <p
                onClick={() => {
                  setEditStatus(todo.status);
                  setEditName(todo.name);
                  setIsOpened(true);
                  setEditTodo(todo);
                }}
                className={styles.todo_name}
              >
                {todo.name}
              </p>
              {todo.status && (
                <span className={styles.status}>{"Completed"}</span>
              )}
              <i
                className={styles.delete}
                onClick={() => deleteTodoHandler(todo.id)}
              >
                <TrashIcon width={20} fill="red" />
              </i>
            </div>
          ))}
        </div>
      </div>

      {isOpened && (
        <div className={styles.edit_block}>
          <div className={styles.edit_header}>
            <h1>Edit Todos</h1>
            <i onClick={() => setIsOpened(false)}>
              <XMarkIcon width={20} className={styles.close} />
            </i>
          </div>
          <div>
            <input
              type="checkbox"
              className=""
              checked={editStatus}
              onChange={() => setEditStatus(!editStatus)}
            />
          </div>
          <div className={styles.rename_block}>
            <input
              className={styles.rename_input}
              type="text"
              placeholder="Change here name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <button
            className={styles.edit_btn}
            onClick={() => editTodoHandler(editTodo.id)}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
