//import { IFirebaseProject } from './projectList';
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import firebase from 'firebase/app';
import { useState } from 'react'; 
import { IFirebaseProject } from './App';

async function getFbProject(id: string) {
  console.log('project fetched!!')
  const project = {
    id: '3',
    authorFirstName: 'bart',
    authorId: '3',
    authorLastName: 'Homer',
    content: 'i didnt do  it',
    createdAt: firebase.firestore.Timestamp.now(),//firebase timestamp
    title: 'project1'
  } as IFirebaseProject;
  

  return project;
}

function getProjectId():string {
  const pathStr = window.location.pathname.toString();
  const parts = pathStr.split("/");
  const projStrIndex = parts.indexOf('project');
  const projectId = parts[projStrIndex + 1];
  return projectId;
}

const ProjectDetails = ({ project }: { project: IFirebaseProject } | { project: undefined }) => {
  const [stateProject, setStateProject] = useState<IFirebaseProject | undefined>(project);
  if (stateProject) {
    // const isTimestampInstance = stateProject?.createdAt instanceof firebase.firestore.Timestamp;
    // const toDateString = isTimestampInstance ? 
    //   moment(stateProject.createdAt.toDate()).calendar() :
    //   moment(new firebase.firestore.Timestamp(
    //     stateProject.createdAt.seconds, 
    //     stateProject.createdAt.nanoseconds).toDate()).calendar();
    return(
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{stateProject.title}</span>
            <p>
              {stateProject.content}
            </p>
          </div>
          <div className="card-action grey lighten-4">
            <div>{stateProject.authorFirstName} {stateProject.authorLastName}</div>
            <div>{moment(stateProject.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    //fetch project
    const projectId = getProjectId();
    getFbProject(projectId).then((project) => { 
      if (project) {
        setStateProject(project);
      }
    });

    return(
      <div>
        <p> Loading project... </p>
      </div>
    )
  }
}

export default ProjectDetails;