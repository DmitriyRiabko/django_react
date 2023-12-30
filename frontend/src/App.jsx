import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import styles from "./App.module.scss";
import "macro-css";
import axios from "axios";
import { API_URL } from "./config";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodoHandler = () => {};

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
          <input type="text" className={styles.input} />
          <i onClick={addTodoHandler}>
            <PlusIcon width={30} className={styles.plus} />
          </i>
        </div>

        <div className={styles.todo_container}>
          {todos?.map((todo, index) => (
            <div key={todo.id} className={styles.todo_item}>
              {" "}
              <p className={styles.todo_name}>{todo.name}</p>
              <p className={styles.todo_status}>{todo.status}</p>
              <p className={styles.todo_created}>{todo.created_at}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
