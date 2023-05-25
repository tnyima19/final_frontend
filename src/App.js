
import { Routes, Route } from "react-router-dom";

import {
  HomePageContainer,
  EmployeeContainer,
  AllEmployeesContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer,
  TaskContainer,
  NewEmployeeContainer
} from './Components/Containers';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={ <HomePageContainer/>} />
        <Route exact path="/employees" element={ <AllEmployeesContainer />} />
        <Route exact path="/employee/:id" element={<EmployeeContainer />} />
        <Route exact path="/tasks" element={<AllTasksContainer />} />
        <Route exact path="/newtask" element={<NewTaskContainer />} />
        <Route exact path="/newemployee" element={<NewEmployeeContainer/> } />
        <Route exact path='/task/:id' element={<TaskContainer />} />
        <Route exact path="/edittask/:id" element={<EditTaskContainer />} />
      </Routes>
    </div>
  );
}

export default App;
