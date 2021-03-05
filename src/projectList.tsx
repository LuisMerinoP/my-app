import ProjectSummary from './projectSummary';
import { IFirebaseProject } from './App';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ProjectList = () => {
  const ts1 = new firebase.firestore.Timestamp(0,0);
  const ts2 = new firebase.firestore.Timestamp(1,1);
  const [projects, setProjects] = useState<IFirebaseProject[]>([
    {
      id: '1',
      authorFirstName: 'bart',
      authorId: '1',
      authorLastName: 'simpson',
      content: 'i didnt do  it',
      createdAt: ts1,//firebase timestamp
      title: 'project1'
    },
    {
      id: '2',
      authorFirstName: 'lisa',
      authorId: '2',
      authorLastName: 'simpson',
      content: 'im clever',
      createdAt: ts2,//firebase timestamp
      title: 'project2'
    },
  ] as IFirebaseProject[]);

  const projectDelete = (project: IFirebaseProject ) => {
    const db = firebase.firestore();
    db.collection('projects')
      .doc(project.id)
      .delete().then(() => {
        console.log('DELETED')
      }).catch((err) => {
        console.log("Error deleting project from remote database")
    });
  }

  return(
    <div className="project-list section">
      { projects && projects.map( project => {
        const path = '/project/' + project.id;
        return (
          <Link to={{
            pathname:path, 
            state: {
              project
            },
          }} key={project.id}>
            <ProjectSummary project={project} deleteCallback={projectDelete}/>
          </Link>
        )
      })}  
    </div>
  )
}

export default ProjectList;