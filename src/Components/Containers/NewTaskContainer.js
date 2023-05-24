import { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';

class NewTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            description:"",
            priority:"",
            isComplete:false,
            employeeId: null,
            redirect: false,
            redirectId: null,
            error: ""

        };
        this.blankState = this.state;
        //From Bind
        this.changeDescription = this.changeDescription.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.changeDepartment = this.changeDepartment.bind(this);


        // Data
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    changeDescription(event){
      this.setState({
        description: event.target.value
      });
    }

    changePriority(event){
      this.setState({
        priority: event.target.value
      });
    }

    changeDepartment(event){
      this.setState({
        department: event.target.value
      });
    }

    handleSubmit(event){
      let newTask = {
        description: this.state.description,
        priority: this.state.priority,
        department: this.state.department
      };
      alert(`Form has been submiteed ${newTask.description}`);
      this.props.addTask(newTask);
     
    }
    
    componentWillUnmount(){
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        //go to single task view of newly created task
        if(this.state.redirect){
            //console.log(this.state.redirect.id);
            return(<Navigate to={`/task/${this.state.redirectId}`}/>);
        }
        return (
            <NewTaskView
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                error={this.state.error}
            />
        );
    }


}

const mapDispatch = (dispatch) => {
    return({
        addTask: (task) => dispatch(addTaskThunk(task)),
    })
}

export default connect(null, mapDispatch)(NewTaskContainer);
// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// import NewTaskView from '../views/NewTaskView';
// import { addTaskThunk } from '../../store/thunks';


// class NewTaskContainer extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           description: "", 
//           priority:"",
//           isComplete:false, 
//           employeeId: null, 
//           redirect: false, 
//           redirectId: null,
//           error: ""
//         };
//     }

//     handleChange = event => {
//       this.setState({
//         [event.target.name]: event.target.value
//       });
//     }

//     handleSubmit = async event => {
//         event.preventDefault();
//         //dont need ID because the course has not been created yet
//         if(this.state.description===""){
//           this.setState({error:"description field is required"});
//           return;
//         }
//         let task = {
//             title: this.state.description,
//             priority: this.state.priority,
//             department: this.state.department,
//             employeeId: this.state.employeeId
//         };
        
//         let newTask = await this.props.addTask(task);

//         this.setState({
//           redirect: true, 
//           redirectId: task.id,
//           error: ""
//         });
//     }

//     componentWillUnmount() {
//         this.setState({redirect: false, redirectId: null});
//     }

//     render() {
//       //go to single course view of newly created course
//         if(this.state.redirect) {
//           return (<Navigate to={`/task/${this.state.redirectId}`}/>)
//         }
//         return (
//           <NewTaskView 
//             handleChange={this.handleChange} 
//             handleSubmit={this.handleSubmit}
//             error={this.state.error}      
//           />
//         );
//     }
// }

// const mapDispatch = (dispatch) => {
//     return({
//         addTask: (task) => dispatch(addTaskThunk(task)),
//     })
// }

// export default connect(null, mapDispatch)(NewTaskContainer);