import { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk  } from '../../store/thunks';


class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          priority: "",
          employeeId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchEmployees();
        this.setState({
            name: this.props.task.name,
            id: this.props.task.id,
            priority: this.props.task.priority,
            employeeId: this.props.task.employeeId, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the employeeId based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned employee without having to manually enter in the 
      //employeeId like before
      if (event.target.value === "staff") {
        this.setState({employeeId:null});
      } else {
        this.setState({employeeId: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.name === "") {
          this.setState({error: "Error: name cannot be empty"});
          return;
        }

        //get new info for task from form input
        let task = {
            id: this.props.task.id,
            name: this.state.name,
            priority: this.state.priority,
            employeeId: this.state.employeeId
        };
        
        this.props.editTask(task);

        this.setState({
          redirect: true, 
          redirectId: this.props.task.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { task, allEmployees, editTask, fetchTask} = this.props;
        let assignedEmployee = task.employeeId;

        let otherEmployees = allEmployees.filter(employee => employee.id!==assignedEmployee);
      
        //go to single task view of the edited task
        if(this.state.redirect) {
          return (<Navigate to={`/task/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Name: </label>
            <input type="text" name="name" value={this.state.name || ''} placeholder={task.name} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Priority: </label>
            <input type="text" name="priority" value={this.state.priority || ''} placeholder={task.priority} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <select onChange={(e) => this.handleSelectChange(e)}>
              {task.employee!==null ?
                <option value={task.employeeId}>{task.employee.firstname+" (current)"}</option>
              : <option value="staff">Staff</option>
              }
              {otherEmployees.map(employee => {
                return (
                  <option value={employee.id} key={employee.id}>{employee.firstname}</option>
                )
              })}
              {task.employee!==null && <option value="staff">Staff</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {task.employeeId !== null ?
            <div> Current employee:  
            <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>
            <button onClick={async () => {await editTask({id:task.id, employeeId: null});  fetchTask(task.id)}}>Unassign</button>
            </div>
            : <div> No employee currently assigned </div>
          }

          <div> Other employees
          {otherEmployees.map(employee => {
            return (
            <div key={employee.id}>
                <Link to={`/employee/${employee.id}`}>
                  <h4>{employee.firstname}</h4>
                </Link>
                <button onClick={async() => {await editTask({id:task.id, employeeId: employee.id}); fetchTask(task.id)}}>Assign this employee</button>
            </div>
            )})
          }
          </div>
        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      task: state.task,
      allEmployees: state.allEmployees
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fetchTask: (id) => dispatch(fetchTaskThunk(id)),
        fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);