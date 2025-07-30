const initialState = {
  badges: []
};

export const badgeReducer = (state = initialState, action: { type: any, payload: any }) => {
  switch (action.type) {
    case "ADD_BADGE":
      return { ...state, badges: [...state.badges, action.payload] };
    default:
      return state;
  }
};