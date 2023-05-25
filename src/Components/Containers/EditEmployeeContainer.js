import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk } from '../../store/thunks';

function EditEmployeeContainer(props) {
  const { id } = useParams();
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    department: false,
    employeeId: null,
    redirect: false,
    redirectId: null,
    error: ''
  });

  useEffect(() => {
    props.fetchTask(id); // Update this line
    props.fetchEmployees();
    setState((prevState) => ({
      ...prevState,
      description: props.task.description,
      isComplete: props.task.isComplete,
      priority: props.task.priority,
      employeeId: props.task.employeeId
    }));
  }, []);

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const handleSelectChange = (event) => {
    if (event.target.value === 'staff') {
      setState((prevState) => ({
        ...prevState,
        employeeId: null
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        employeeId: event.target.value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.description === '') {
      setState((prevState) => ({
        ...prevState,
        error: 'Error: description cannot be empty'
      }));
      return;
    }

    const employee = {
      id: props.employee.id,
      firstname: state.firstname,
      lastname: state.department,
      department: state.department,
      //employeeId: state.employeeId
    };

    props.editEmployee(employee);

    setState((prevState) => ({
      ...prevState,
      redirect: true,
      redirectId: props.employee.id
    }));
  };

  useEffect(() => {
    return () => {
      setState((prevState) => ({
        ...prevState,
        redirect: false,
        redirectId: null
      }));
    };
  }, []);

  const { task, allEmployees, editTask, fetchTask } = props;
  const assignedEmployee = task.employeeId;
  const otherEmployees = allEmployees.filter((employee) => employee.id !== assignedEmployee);

  if (state.redirect) {
    return <Navigate to={`/employee/${state.redirectId}`} />;
  }

  return (
    <div>
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <label style={{ color: '#11153e', fontWeight: 'bold' }}>Firstname: </label>
        <input
          type="text"
          name="description"
          value={state.description || ''}
          placeholder={task.description}
          onChange={handleChange}
        />
        <br />

        <label style={{ color: '#11153e', fontWeight: 'bold' }}>latname: </label>
        <input
          type="text"
          name="priority"
          value={state.priority || ''}
          placeholder={task.priority}
          onChange={handleChange}
        />
        <br />

        <select onChange={handleSelectChange}>
          {task.employee !== null ? (
            <option value={task.employeeId}>{`${task.employee.firstname} (current)`}</option>
          ) : (
            <option value="staff">Staff</option>
          )}
          {otherEmployees.map((employee) => (
            <option value={employee.id} key={employee.id}>
              {employee.firstname}
            </option>
          ))}
          {task.employee !== null && <option value="staff">Staff</option>}
        </select>

        <button type="submit">Submit</button>
      </form>

      {state.error !== '' && <p>{state.error}</p>}

      {task.employeeId !== null ? (
        <div>
          Current employee: <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>
          <button
            onClick={async () => {
              await editTask({ id: task.id, employeeId: null });
              fetchTask(task.id);
            }}
          >
            Unassign
          </button>
        </div>
      ) : (
        <div>No employee currently assigned</div>
      )}

      <div>
        Other employees
        {otherEmployees.map((employee) => (
          <div key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h4>{employee.firstname}</h4>
            </Link>
            <button
              onClick={async () => {
                await editTask({ id: task.id, employeeId: employee.id });
                fetchTask(task.id);
              }}
            >
              Assign this employee
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees
  };
};

const mapDispatch = (dispatch) => {
  return {
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk())
  };
};

export default connect(mapState, mapDispatch)(EditTaskContainer);