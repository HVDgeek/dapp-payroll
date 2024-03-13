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
  setUpdateOrgModal: (state, action) => {
    state.updateOrgModal = action.payload;
  },
  setCreatePayrollModal: (state, action) => {
    state.createPayrollModal = action.payload;
  },
  setUpdatePayrollModal: (state, action) => {
    state.updatePayrollModal = action.payload;
  },
  setWorkerDetailsModal: (state, action) => {
    state.workerDetailsModal = action.payload;
  },
  setUpdateWorkerModal: (state, action) => {
    state.updateWorkerModal = action.payload;
  },
  setCreateWorkerModal: (state, action) => {
    state.createWorkerModal = action.payload;
  },
};
