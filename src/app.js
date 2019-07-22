import React, {useState, useEffect} from 'react';
import './app.scss';

const API = 'http://cdmarch-taskmaster-be-dev.us-west-2.elasticbeanstalk.com/tasks'
// const LOCAL_API = 'http://localhost:5000/tasks'

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const _getTasks = () => {
    fetch(API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( task => setTasks(task) )
    .catch( console.error );
  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {tasks.map( (task) =>
        <li className={`status-${task.status}`} key={task.id}>
          <details>
            <summary>
              <a href={task.pic}><img src={task.resizedPic} alt="resizedPic"></img></a>
              <span>{task.title}</span>
              <span id={task.id}>{task.status}</span>
              <span>{task.assignee}</span>
            </summary>
            <section>
              <div>
                <p>{task.description}</p>
              </div>
              <div>
                <form action={API + "/" + task.id + "/images"} method="post" encType="multipart/form-data">
                <label>
                  <span>Upload Image</span>
                  <input name="file" type="file" />
                </label>
                <button>Save</button>
              </form>
              </div>
            </section>
          </details>
        </li>
      )}
    </ul>
  )
}

function App() {
  return (
    <>
      <header>Taskmaster</header>
      <main>
        <Tasks />
      </main>
      <footer>&copy; 2019 Taskmaster</footer>
      </>
  );
}

export default App;
