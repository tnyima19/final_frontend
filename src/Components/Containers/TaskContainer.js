// import React, { Component } from "react";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { fetchTaskThunk } from "../../store/thunks";
// import { TaskView } from "../views";


// class TaskContainer extends Component {
//     componentDidMount(){
//         //get task id from URL
       
//         this.props.fetchTask(this.props.match.params.id);
//     }
//     render(){
//         return(
//             <TaskView 
//                 task={this.props.task}
//             />
//         );
//     }
// }

// const mapState = (state) => {
//     return{
//         task: state.task,
//     };
// };

// //map dispatch to props

// const mapDispatch = (dispatch) => {
//     return{
//         fetchTask: (id) => dispatch(fetchTaskThunk(id)),
//     };
// };

// export default connect(mapState, mapDispatch)(TaskContainer);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";
import { useParams } from "react-router-dom";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const task = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTaskThunk(id));
  }, [dispatch, id]);

  return <TaskView task={task} />;
};

export default TaskContainer;
