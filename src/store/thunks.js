import * as ac from'./actions/actionCreators';
//import * as axios from 'axios';
const axios = require('axios');

//PATH (should be where your servier is rurning")
let path = "http://localhost:5001/api";

//THUNKS 
//ALL EMployers

export const fetchAllEmployeesThunk = () => async (dispatch) =>{
    try {
        let res =await axios.get(`${path}/employees`);
        dispatch(ac.fetchAllEmployees(res.data));
    } catch(err){
        console.error(err);
    }
};

//Single Employee
export const fetchEmployeeThunk = (id) => async (dispatch) => {
    try{
        let res = await axios.get(`${path}/employees/${id}`);
        dispatch(ac.fetchEmployee(res.data));
    } catch(err) {
        console.error(err);
    }
};

//ALL TASKS

export const fetchAllTasksThunk = () => async (dispatch) =>{
    try {
        let res = await axios.get(`${path}/tasks`);
        dispatch(ac.fetchAllTasks(res.data));
    } catch(err){
        console.error(err);
    }
};

export const addTaskThunk = (task) => async (dispatch) =>{
    //task = {name}
    try {
        //alert('I am at add Task thunk');
        let res = await axios.post(`${path}/tasks`, task);
        dispatch(ac.addTask(res.data));
        //alert(res);
        return res.data;
    } catch(err){
        console.error(err);
    }
};

export const deleteTaskThunk = taskId => async dispatch => {
    try {
      await axios.delete(`${path}/tasks/${taskId}`);
      //delete succesful so change state with dispatch
      dispatch(ac.deleteTask(taskId));
    } catch(err) {
      console.error(err);
    }
  };

export const editTaskThunk = task => async dispatch => {
    try {
        let res = await axios.put(`${path}/tasks/${task.id}`,task);
        //res.data is the updated task object
        dispatch(ac.editTask(res.data));

    }catch(err){
        console.error(err);
    }
};

//Single task
export const fetchTaskThunk = id => async dispatch =>{
    try{
        let res = await axios.get(`${path}/tasks/${id}`);
        dispatch(ac.fetchTask(res.data));
        console.log(res.data);
        return res.data;
    } catch(err){
        console.error(err);
    }
};