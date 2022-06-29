import  {TYPES} from "../constants";

const INIT_STATE = {
  loggedIn: false,
  data: null,
 
};

const auth = (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case TYPES.AUTH.LOGIN:
      state = {
        ...state,
        loggedIn: true,
        data: action.payload,
     
      };
      break;
   
    default:
      return state;
  }
  return state;
};

export default auth;
