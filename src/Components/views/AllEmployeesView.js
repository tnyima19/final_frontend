import {Link} from "react-router-dom";


const AllEmployeesView = (props) =>{
    let {employees, deleteEmployees} = props;

    if(!employees.length){
        return(<div>
            <p>There are no EMployees</p>
            <Link to={`/newemployee`}>
                <button>Add a new Employee</button>
            </Link>
        </div>);
    }


    return(
        <div>
            {employees.map((employee) => {
                let name = employee.name;
                return(
                    <div key={employee.id}>
                    <Link to={`/employee/${employee.id}`}>
                        <h1>{name}</h1>
                    </Link>
                    <button onClick={()=> deleteEmployees(employee.id)}>Delete</button>
                    </div>
                );
            }
            )}
            <Link to={`/newemployee`}>
                <button>Add New Employee</button>
            </Link>
        </div>
    );
};

export default AllEmployeesView;