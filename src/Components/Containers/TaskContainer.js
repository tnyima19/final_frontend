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

// import {useEffect} from 'react';
// function TaskContainer() {
//     const task = useSelector((state) =>state.task);
//     const dispatch = useDispatch();

//     useEffect(()=> {
//         dispatch(fetchTaskThunk());
//     }, [dispatch]);
//     console.log(task)
//     return <TaskView task={task} />

// }
// const mapState = (state) => {
//     return{
//         task: state.task,
//     };
// };

// export default connect(mapState, useEffect)(TaskContainer);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";

const TaskContainer = (props) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.task);

  useEffect(() => {
    // Get task id from URL
    dispatch(fetchTaskThunk(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return <TaskView task={task} />;
};

export default TaskContainer;
