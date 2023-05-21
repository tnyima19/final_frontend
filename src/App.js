import React from "react";
import { createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

  //pages. 
  import AllEmployeesView from './View/AllEmployeesView';
  import About from './View/AllTasksView';
  import RootLayout from "./layouts/Rootlayout";
  import Employee from "./View/EmployeeView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<AllEmployeesView />}>
        {/* <Route path="employee" element={<Employee />}></Route> */}
      </Route>
      <Route path="about" element={<About />} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
