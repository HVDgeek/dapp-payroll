export const globalActions = {
  setConnectedAccount: (state, action) => {
    state.connectedAccount = action.payload;
  },
};
