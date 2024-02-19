import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./mocks/handler";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    axios.get("/articles").then(({ data }) => setTodos(data));
  }, []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    axios
      .post("/articles", { content: text })
      .then(({ data }) => setTodos(data));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={text} />
        <button type="submit">전송</button>
      </form>

      <ul>
        {todos.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
