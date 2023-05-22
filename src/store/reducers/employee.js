import { FETCH_EMPLOYEE } from "../actions/actionTypes";

const intitialState = {
    tasks: [],
};


const employee = (state = initialState, action) =>{
    switch(action.types) {
        case FETCH_EMPLOYEE:
            return action.payload;
        default:
            return state;
    }
};

export default employee;
