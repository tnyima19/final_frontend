import React from "react";
import {Switch, Rotute} from "react-router-dom";

import {
  HomePageContainer,
  EmployeesContainer,
  CourseContainer,
  AllEmployeesContainer,
  AllTasksContainer,
  NewTaskContainer,
  EditTaskContainer,
  TaskContainer
} from './Components/Containers';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/employees" component={AllEmployeesContainer} />
        <Route exact path="/employee/:id" component={EmployeesContainer} />
        <Route exact path="/tasks" component={AllTasksContainer} />
        <Route exact path="/newtask" component={NewTaskContainer} />
        <Route exact path="/task/:id" component={TaskContainer} />
        <Route exact path="/edittask/:id" component={EditTaskContainer} />
        
      </Switch>
    </div>
  );
}

export default App;
