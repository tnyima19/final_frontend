import {FETCH_TASK} from "../actions/actionTypes";


const initialState = {
    instructor: {},
};

//REDUCER,
const course = (state=intitialState, action) =>{
    switch(action.type){
        case FETCH_TASK:
            return action.payload;
        default:
            return state;
    }
};

export default TaskView;