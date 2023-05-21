import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const AllTasksView = (props) =>{
    if(!props.allTasks.length){
        return<div>There are no tasks</div>
    }

    return(
        <div>
            {props.allTasks.map((task) =>{
                let taskName = task.name;
                return(
                    <div key={task.id}> 
                    <Link to={`/task/${task.id}`}>
                        <h1>{taskName}</h1>
                    </Link>
                    <p>{task.department}</p>
                    </div>
                );
            })}
        </div>
    );
};

AllTasksView.propTypes = {
    allTasks: PropTypes.array.isRequired,
};
export default AllTasksView;

