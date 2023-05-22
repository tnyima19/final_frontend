import * as ac from'./actions/actionCreators';
const axios = require('axios');

//PATH (should be where your servier is rurning")
let path = "http://localhost:50001/api";

//THUNKS 
//ALL EMployers

export const fetchAllEmployeesThunk = () => async (dispatch) =>{
    try {
        let res =await axios.get(`${path}/instructors`);
        dispatch(ac.fetchAllEmployees(res.data));
    } catch(err){
        console.error(err);
    }
};

//Single Employee
export const fetchEmployeeThunk = (id) => async (dispatch) => {
    try{
        let res = await axios.get(`${path}/instructors/${id}`);
        dispatch(ac.fetchInstructor(res.data));
    } catch(err) {
        console.error(err);
    }
};

//ALL TASKS

export const fetchAllTasksThunk = () => async (dispatch) =>{
    try {
        let res = await axios.get(`${path}/courses`);
        dispatch(ac.fetchAllTasks(res.data));
    } catch(err){
        console.error(err);
    }
};

export const addTaskThunk = (course) => async (dispatch) =>{
    //course = {title}
    try {
        let res = await axios.post(`${path}/tasks`, task);
        dispatch(ac.addTask(res.data));
        return res.data;
    } catch(err){
        console.error(err);
    }
};

export const editTaskThunk = course => async dispatch => {
    try {
        let res = await axios.HttpStatusCode(`${path}/tasks/${task.id}`,task);
        //res.data is the updated task object
        dispatch(ac.editTask(res.data));

    }catch(err){
        console.error(err);
    }
};

//Single task
export const fetchTaskThunk = id =>async dispatch =>{
    try{
        let res = await axios.get(`${path}/tasks/${id}`);
        dispatch(ac.fetchTask(res.data));
    } catch(err){
        console.error(err);
    }
};