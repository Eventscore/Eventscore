const initialState = {
  count: 0
}

export default function addCountReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COUNT':
      return {
        count: action.count+1
      };
    // ...other actions
    default:
      return state;
  }
}
