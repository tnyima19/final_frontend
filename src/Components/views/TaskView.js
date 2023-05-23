import {Link} from "react-router-dom";

const TaskView = (props) =>{
    const {task} = props;
    return(<div>
        <h1>{task.name}</h1>
        {task.employee ? <h3>{task.employee.firstname}</h3>: <h3>staff</h3>}
        <Link to={`/edittask/${task.id}`}>Task Edit information</Link>
        <br/>
        <Link to={`/tasks`}>View all tasks</Link>
    </div>);
};

export default TaskView;