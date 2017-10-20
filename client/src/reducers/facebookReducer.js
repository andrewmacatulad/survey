import { FETCH_FB } from "../actions/types";

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_FB:
			return action.payload;
		default:
		return state;
	}
}
