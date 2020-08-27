const INITIAL_STATE = {
  currentUser: null
}

// function returns values based on action
// (action contains type and payload)
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state;
  }
};

export default userReducer;