import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks !== null) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  if (tasks === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <AddTaskForm setTasks={setTasks} />
      <ul>
        {tasks.slice().reverse().map(task => <Task setTasks={setTasks} id={task.id} title={task.title} isDone={task.isDone} key={task.id} />)}
      </ul>
    </div>
  );
}

function Header() {
  return (
    <>
      <header>
        <h1>To Do List</h1>
      </header>
    </>
  );
}

function AddTaskForm(props) {
    const [title, setTitle] = useState()

    function handleSubmit(e) {
      e.preventDefault();
      props.setTasks(prev => prev.concat({title, id: Date.now(), isDone: false}));
      setTitle("")
    }
    return (
      <>
        <form onSubmit={handleSubmit}>
          <fieldset>
        <legend>Add new Task</legend>
        <div className="form-group">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Task" />
        <button>Add Task</button>
        </div>
        </fieldset>
        </form>
      </>
    )
}

function Task(props) {
  function handleDone() {
    props.setTasks(prev => prev.map(task => (task.id === props.id ? { ...task, isDone: !task.isDone } : task )));
  }
    
  function handleDelete() {
    props.setTasks(prev => prev.filter(task => task.id !== props.id));
  }
  return (
    <li className={props.isDone ? 'done' : ''}><p>{props.title}</p>
      <div className="btn">{!props.isDone && <button className="btn-done" onClick={handleDone}>Done</button>}
      <button className="btn-del" onClick={handleDelete}>Delete</button>
      </div>
    </li>
  )
}




export default App;
