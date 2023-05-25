// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllEmployeesThunk, deleteEmployeeThunk } from "../../store/thunks";
// import { AllEmployeesView } from "../views";


// function AllEmployeesContainer() {
//   const allEmployees = useSelector((state) => state.allEmployees);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAllEmployeesThunk());
//   }, [dispatch]);

//   const handleDeleteEmployee = (employeeId) => {
//     dispatch(deleteEmployeeThunk(employeeId));
//   };

//   return (
//     <AllEmployeesView
//       allEmployees={allEmployees}
//       deleteEmployee={handleDeleteEmployee}
//     />
//   );
// }

// export default AllEmployeesContainer;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllEmployeesThunk, deleteEmployeeThunk } from '../../store/thunks';
import { AllEmployeesView } from '../views';

class AllEmployeesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAllEmployees();
  }

//   handleDeleteEmployee = (employeeId) => {
//     this.props.deleteEmployee(employeeId);
//   };

  render() {
    //const { allEmployees } = this.props;

    return (
      <AllEmployeesView
        allEmployees={this.props.allEmployees}
        deleteEmployee={this.props.deleteEmployee}
      />
    );
  }
}

const mapState = (state) => ({
  allEmployees: state.allEmployees,
});

const mapDispatch = (dispatch) => {
return {
  fetchAllEmployees: () => dispatch(fetchAllEmployeesThunk()),
  deleteEmployee: (employeeId) => dispatch(deleteEmployeeThunk(employeeId)),
};
};

export default connect(mapState, mapDispatch)(AllEmployeesContainer);
