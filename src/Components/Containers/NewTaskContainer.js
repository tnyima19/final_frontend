// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// import NewTaskView from '../views/NewTaskView';
// import { addTaskThunk } from '../../store/thunks';

// class NewTaskContainer extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             name:"",
//             priority:"",
//             isComplete:false,
//             employeeId: null,
//             redirect: false,
//             redirectId: null,
//             error: ""

//         };
//     }

//     handleChange = event =>{
//         this.setState({
//             [event.target.name]: event.target.value
//         });
//     }

//     handleSubmit = async event => {
//         event.preventDefault();
//         // Dont need ID because course has not yet been created.
//         if(this.state.name === ""){
//             this.setState({error: "Name of task required "})
//         }
//         let task = {
//             name: this.state.name,
//             priority: this.state.priority,
//             isComplete: this.state.isComplete,
//             //id: this.state.employeeId,
//             employeeId: this.state.employeeId
//         };
//         let newTask = await this.props.addTask(task);
//         console.log(newTask)

//         this.setState({
//             redirect: true,
//             redirectId: newTask.id,
//             error: ""
//         });
//     }

//     componentWillUnmount(){
//         this.setState({redirect: false, redirectId: null});
//     }

//     render() {
//         //go to single task view of newly created task
//         if(this.state.redirect){
//             //console.log(this.state.redirect.id);
//             return(<Navigate to={`/task/${this.state.redirectId}`}/>);
//         }
//         return (
//             <NewTaskView
//                 handleChange={this.handleChange}
//                 handleSubmit={this.handleSubmit}
//                 error={this.state.error}
//             />
//         );
//     }


// }

// const mapDispatch = (dispatch) => {
//     return({
//         addTask: (task) => dispatch(addTaskThunk(task)),
//     })
// }

// export default connect(null, mapDispatch)(NewTaskContainer);

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';

const NewTaskContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'priority') {
      setPriority(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '') {
      setError('Name of task required');
      return;
    }

    const task = {
      name,
      priority,
      isComplete,
      employeeId,
    };

    try {
      const newTask = await dispatch(addTaskThunk(task));
      //console.log(newTask);

      setRedirect(true);
      setRedirectId(newTask.id);
      setError('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = () => {
    navigate(`/task/${redirectId}`);
  };

  return (
    <>
      {redirect && <handleRedirect />}
      <NewTaskView
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
      />
    </>
  );
};

export default NewTaskContainer;