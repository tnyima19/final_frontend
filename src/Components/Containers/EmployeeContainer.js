import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeThunk, editTaskThunk, fetchAllTasksThunk } from "../../store/thunks";
import { EmployeeView } from "../views";
import { useParams } from "react-router-dom";

const EmployeeContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const employee = useSelector((state) => state.employee);
  const allTasks = useSelector((state) => state.allTasks);

  useEffect(() => {
    dispatch(fetchEmployeeThunk(id));
    dispatch(fetchAllTasksThunk());
  }, [dispatch, id]);

  const handleEditTask = (task) => {
    dispatch(editTaskThunk(task));
  };

  return (
    <EmployeeView
      employee={employee}
      editTask={handleEditTask}
      allTasks={allTasks}
    />
  );
};

export default EmployeeContainer;



// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchEmployeeThunk, editTaskThunk, fetchAllTasksThunk } from "../../store/thunks";
// import { EmployeeView } from "../views";

// class EmployeeContainer extends Component {

//     componentDidMount(){
//         this.props.fetchEmployee(this.props.match.params.id);
//         this.props.fetchTasks();
//         // console.log(this.props);
//     }

//     render() {
//         return (
//         <EmployeeView
//             employee={this.props.employee}
//             editTask={this.props.editTask}
//             allTasks={this.props.allTasks}
//         />
//         );
//     }
// }

// const mapState= (state) => {
//   return {
//     employee: state.employee,
//     allTasks: state.allTasks,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
//     editTask: (task) => dispatch(editTaskThunk(task)),
//     fetchTasks: () => dispatch(fetchAllTasksThunk()),
//   };
// };

// export default connect(mapState, mapDispatch)(EmployeeContainer);


