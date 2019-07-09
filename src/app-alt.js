import React, {useState, useEffect} from 'react';
import './app.scss';

// import mockData from './mock.json';

const API = 'http://cdmarch-taskmaster-dev2.us-west-2.elasticbeanstalk.com/tasks'

// function Tasks() {

//   const [tasks, setTasks] = useState([]);

//   const _getTasks = () => {
//     fetch( API, {
//       mode:'cors',
//     })
//     .then( data => data.json() )
//     .then( task => setTasks(task) )
//     .catch( console.error );
//   };

//   const _toggleStatus = (e) => {
//     e.preventDefault();
//     let id = e.target.id;
//     // setTasks(tasks.map( (task) =>
//     //   task.id !== id ? task : {...task, status:!task.status}
//     // ));

//     // patch to Brooks api
//     fetch( `${API}/${id}/status`, {
//       mode:'cors',
//       method: 'PATCH'
//     })
//     .then(data => data.json())
//     .then(task => {
//       setTasks(tasks.map( (entry) => {
//           return entry.id === id ? task : entry;
//         }
//       ));
//     })
//     .catch( console.error );
//   };

//   useEffect(_getTasks, []);

//   return (
//     <ul>
//       {tasks.map( (task) =>
//         <li className={`status-${task.status}`} key={task.id}>
//           {/* <details> */}
//             {/* <summary> */}
//               <span>{task.title}</span>
//               {/* <span id={task.id}>{task.status.toString()}</span> */}
//               <span id={task.id}>{task.status}</span>
//             {/* </summary> */}
//             {/* <History history={person.history} /> */}
//           {/* </details> */}
//         </li>
//       )}
//     </ul>
//   )
// }

// function History(props) {
//   let history = props.history || [];
//   return (
//     <section>
//       {history.map( (item,idx) =>
//         <div>
//           <span>{item.itemName}</span>
//           <span>{item.price}</span>
//         </div>
//       )}
//     </section>
//   )
// }

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const _getTasks = () => {
    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( task => setTasks(task) )
    .catch( console.error );
  };

  const _toggleStatus = (e) => {
    e.preventDefault();
    let id = e.target.id;

    fetch( `${API}/${id}/status`, {
      mode:'cors',
      method: 'PATCH'
    })
    .then(data => data.json())
    .then(task => {
      setTasks(tasks.map( (entry) => {
          return entry.id === id ? task : entry;
        }
      ));
    })
    .catch( console.error );
  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {tasks.map( (task) =>
        <li className={`status-${task.status}`} key={task.id}>
          <span>{task.title}</span>
          <span id={task.id}>{task.status}</span>
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
