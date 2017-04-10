export default function invokeLoginReducer(state = {username: null, password: null}, action) {
  switch (action.type) {
    case 'INVOKE_LOGIN':
      return {
        username: action.username,
        password: action.password
      };
    // ...other actions
    default:
      return state;
  }
}
