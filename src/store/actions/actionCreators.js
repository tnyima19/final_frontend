import * as at from './actionTypes';

//ACTION CREATORS;

//all instructors

export const fetchAllEmployees = (employees) =>{
    return{
        type: at.FETCH_ALL_EMPLOYEES,
        payload: employees,
    };
};

export const fetchEmployee = (employees) =>{
    return{
        type: at.FETCH_EMPLOYEE,
        payload: employees,
    };
};

//all tasks. 
export const fetchAllTasks = (tasks) =>{
    return {
        type: at.FETCH_ALL_TASKS,
        payload: tasks,
    };
};

export const addTask = (task) =>{
    return{
        type: at.ADD_TASK,
        payload: task,
    };
};

export const deleteTask = (taskId) =>{
    return{
        type: at.DELETE_TASK,
        payload: taskId,
    };
};
export const editTask = (task) => {
    return{
        type: at.EDIT_TASK,
        payload: task,
    };
};

//Single task
export const fetchTask = (task) =>{
    return{
        type: at.FETCH_TASK,
        payload: task,
    };
};


