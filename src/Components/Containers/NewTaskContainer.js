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

    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event =>{
      event.preventDefault();
      if(this.state.description === ""){
        this.setState({error:"title is requires"});
        return;
      }
      let task = {
        description: this.state.description,
        priority: this.state.priority,
        isComplete: this.state.isComplete
      };
      let newTask = await this.props.addTask(task);
      this.setState({
        redirect: true,
        redirectId: newTask.id,
        error: ""
      });
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
