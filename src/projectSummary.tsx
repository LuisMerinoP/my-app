import { IFirebaseProject } from './App';
import moment from 'moment';

const ProjectSummary = ( props : { project: IFirebaseProject, deleteCallback: (project: IFirebaseProject) => void }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{props.project.title}</span>
        <p>Whoever</p>
        <p className="grey-text">{moment(props.project.createdAt.toDate()).calendar()}</p>
        <button className="material-icons right" onClick={(e) => {
          e.preventDefault();
          props.deleteCallback(props.project);
        }}>delete</button>
        <br></br>
      </div>
    </div>
  )
}

export default ProjectSummary;