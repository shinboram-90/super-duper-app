const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isLoading: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isLoading: false,
        error: true,
      };
    // case "FOLLOW":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       followings: [...state.user.followings, action.payload],
    //     },
    //   };
    // case "UNFOLLOW":
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       followings: state.user.followings.filter(
    //         (following) => following !== action.payload
    //       ),
    //     },
    //   };
    default:
      return state;
  }
};

export default AuthReducer;
