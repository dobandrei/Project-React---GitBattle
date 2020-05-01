const initialState = {
    usersList: [],
    loading : true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER' :
            const newState = {...state}; // const newState = Object.assign({},state)
            newState.usersList.push(action.data);
            return newState;
        case 'REMOVE_USER' :
            return state;
        default:
            return state;
    }

}

export default userReducer;