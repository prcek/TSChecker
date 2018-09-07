const status = (state = {online:null}, action) => {
    switch(action.type) {
        case 'SET_ONLINE': 
            return  Object.assign({}, state, {
              online: action.value
            });
        default:
            return state;
    }
}

export default status;