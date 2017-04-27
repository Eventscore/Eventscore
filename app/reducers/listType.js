const initialState = {
  listType: false
};

export default function listTypeReducer(state = initialState, action) {  
  switch (action.type) {
    case 'SET_LIST_TYPE':
      return Object.assign({}, state, {
        listType: action.listType
      });
    case 'SET_LIST_TYPE_FAILED':
      return Object.assign({}, state, {
        listType: action.listType
      });
    default:
      return state;
  }
}