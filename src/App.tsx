// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import ProjectList from './projectList';
import ProjectDetails from './projectDetails';

import { Location } from 'history';
import firebase from 'firebase/app';

export interface IFirebaseProject {
  id: string,
  authorFirstName: string,
  authorId: string,
  authorLastName: string
  content: string
  createdAt: firebase.firestore.Timestamp //firebase timestamp
  title: string
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={ProjectList}/>
          <Route
            path='/project/:id'
            render={({ location }: {location: Location<{project: IFirebaseProject}>})  => {
                const { state } = location;
                const returnedComponent = state ? <ProjectDetails project={state.project} /> : <ProjectDetails project={undefined}/>;
                return returnedComponent;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

