// //routes reducer
import { ActionConst } from 'react-native-router-flux';

export default function reducer(state = {}, {type, scene}) {
  switch (type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene
      };

    // ...other actions

    default:
      return state;
  }
}
