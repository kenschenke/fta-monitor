import C from '../constants';
import { combineReducers } from 'redux';
import objectAssign from 'object-assign';

export const dataReducer = type => (state={}, action) => {
    if (type === action.type) {
        let newState = objectAssign({}, state);
        return objectAssign(newState, action.payload);
    } else {
        return state;
    }
};

const matchesReducer = (state=[], action) => {
    switch (action.type) {
        case C.SET_MATCHES:
            return action.payload;

        default:
            return state;
    }
};

export default combineReducers({
    statusBar: dataReducer(C.SET_STATUSBAR_DATA),
    matches: matchesReducer,
    teams: combineReducers({
        r1: dataReducer(C.SET_R1_DATA),
        r2: dataReducer(C.SET_R2_DATA),
        r3: dataReducer(C.SET_R3_DATA),
        b1: dataReducer(C.SET_B1_DATA),
        b2: dataReducer(C.SET_B2_DATA),
        b3: dataReducer(C.SET_B3_DATA)
    })
});
