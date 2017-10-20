import { FETCH_USER, AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from "../actions/types";

// export default function(state = null, action) {

// 	switch (action.type) {
// 		case FETCH_USER:
// 			return action.payload || false;
//    		case AUTH_USER:
//    		console.log({ ...state, authenticated: true })
//       		return action.payload || true;
// 	    case AUTH_ERROR:
// 	      return action.payload;
// 		default:
// 			return state;
// 	}
// }

export default function(state ={}, action) {
  switch(action.type){
  	case FETCH_USER:
  		 return action.payload;
    case AUTH_USER:
      return { ...state, authenticated: false}
    case UNAUTH_USER:
      return { ...state, authenticated: false  };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
    console.log(action.payload)
      return { ...state, message: action.payload };
    default:
     return state;
  }
}