import React, {Component} from "react";
import {connect} from "react-redux";
import {
    fetchEmployeeThunk,
    fetchAllTasksThunk,
    editTaskThunk
} from "../../store/thunks";

import {InstructorView} from "../views";

class EmployeeContainer extends Component {
    componentDidMount(){
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchTasks();
    }

    render(){
        return(
            <InstructorView
                employee={this.props.employee}
                editTask={this.props.editTask}
                allTasks={this.props.allTasks}
            />
        );
    }
}

const mapState = (state) =>{
    return{
        instructor: state.instructor,
        allCourses: state.allCourses,
    };
};

//map dispatch to props
const mapDispatch = (dispatch) => {
    return{
        fetchEmployee: (id) =>dispatch(fetchEmployeeThunk(id)),
        editTask: (id) =>dispatch(editTaskThunk(task)),
        fetchTasks: () => dispatch(fetchAllTasksThunk()),
    };

};

export default connect(mapState, mapDispatch)(EmployeeContainer);
