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

