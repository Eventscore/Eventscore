export default function addCountReducer(state = {count: 0}, action) {
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
