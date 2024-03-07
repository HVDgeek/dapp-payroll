export const globalActions = {
  setConnectedAccount: (state, action) => {
    state.connectedAccount = action.payload;
  },
  setFundTreasureModal: (state, action) => {
    state.fundTreasuryModal = action.payload;
  },
  setCreateOrgModal: (state, action) => {
    state.createOrgModal = action.payload;
  },
};
