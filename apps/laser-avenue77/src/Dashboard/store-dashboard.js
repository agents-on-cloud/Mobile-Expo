import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export const dashboard = createSlice({
  name: 'layout',
  initialState: {
    value: 66,
    userToken: {},
    ShowMenuFlag77: false,
    notificationModal: false,
    modalVisible: false,
    AdditionalAppointmentData: [],
    FullViewAppData: {},
    FullViewAppFlag: false,
    providerId: '',
    employeeId: '',
    statusModal: false,
    taskStatus: {},
    updateData: false,
  },
  reducers: {
    increment: (state, action) => {
      state.value = state.value + action.payload;
    },
    saveToken: (state, action) => {
      let decoded = jwt_decode(action.payload);

      state.userToken = decoded;
    },
    changeShowMenuFlag77: (state, action) => {
      state.ShowMenuFlag77 = !state.ShowMenuFlag77;
    },
    closeMenue: (state, action) => {
      state.ShowMenuFlag77 = false;
    },
    notificationModalHandler: (state, action) => {
      state.notificationModal = !state.notificationModal;
    },
    closeModalHandler: (state, action) => {
      state.notificationModal = false;
    },
    modalVisibleHandler: (state, action) => {
      state.modalVisible = !state.modalVisible;
    },
    AdditionalAppointmentDataHandler: (state, action) => {
      state.AdditionalAppointmentData = action.payload;
    },
    fullViewAppHandler: (state, action) => {
      state.FullViewAppData = action.payload;
      state.FullViewAppFlag = true;
    },
    FullViewCloseHandler: (state, action) => {
      state.FullViewAppFlag = false;
    },
    saveProviderId: (state, action) => {
      state.providerId = action.payload;
    },
    statusModalHandler: (state, actions) => {
      console.log('actionsactionsactions', actions.payload);
      state.taskStatus = actions.payload;
      state.statusModal = true;
    },
    SaveModalHandler: (state, actions) => {
      state.statusModal = false;
      state.updateData = !state.updateData;
    },
  },
});
export const {
  increment,
  saveToken,
  changeShowMenuFlag77,
  closeMenue,
  notificationModalHandler,
  closeModalHandler,
  modalVisibleHandler,
  AdditionalAppointmentDataHandler,
  fullViewAppHandler,
  FullViewCloseHandler,
  saveProviderId,
  statusModalHandler,
  SaveModalHandler,
} = dashboard.actions;
export default dashboard.reducer;
