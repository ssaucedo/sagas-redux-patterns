import { takeLatest, call, put, take } from 'redux-saga/effects'
import basicFlowService from './sagasServices'

export default {
  * flow() {
    yield takeLatest('USER_STARTS_FLOW', basicFlow)
  },
};

export function updateState(type, payload) {
  return put({ type, payload });
}


const ui = {};

const user = {};

ui.change = {
  sidebarState: updateState('UPDATE_SIDEBAR_STATE'),
  sidebarLoading: updateState('UPDATE_SIDEBAR_LOADING', {loading: true}),
  sidebarStopLoading: updateState('UPDATE_SIDEBAR_LOADING', {loading: false}),
  modalState: updateState('UPDATE_MODAL_STATE'),
};

user.choice = {
  selection: take('USER_SELECTION_STEP'),
  confirmation: take('USER_CONFIRMATION_STEP'),
};

/**
 * Basic flow.
 * This generator coordinates:
 *  - Async calls to BE (check the basicFlowService) and the associated state updates.
 *  - User interactions, (check selection and confirmation steps).
 *  - UI components through redux state.
 *
 *  The idea of keeping all this logic on a centralized
 *  way comes from two main needs:
 *
 *   - Having a simple way to code flows, that can be easily understood by newcomers.
 *   - Code in such way that flows can be easily tested (app/sagas/tests/Pattern3/sagas.spec.js) and extended.
 *
 *  On the usual approach you configure the actions to dispatch on a container (e.g mapDispatchToProps).
 *  Then the user interacts with the application triggering those callbacks.
 *  My understanding is that the (e.g ConfirmationSidebarContainer) container just needs to define
 *  a API for user interactions and does not have to know how itself interacts with other components in a flow.
 *  The flow saga is the responsible of coordination.
 *
 *
 *  With a quick look on the following saga a developer can have an idea on how the Apps unique flow is
 *  composed.
 */
export function* basicFlow () {
  try {
    // Could be a simple action. This is kept as two for the sake of simplicity.
    yield ui.change.sidebarState;
    yield ui.change.sidebarLoading;
    const res = yield call(basicFlowService); // BE call.
    if (res.error) {
      return yield put(updateState('ERROR_ON_BASIC_FLOW', {...res}));   // BE error handling.
    }

    yield ui.change.sidebarStopLoading;
    const selectionStep = yield user.choice.selection            // Wait for user interaction
    if (selectionStep.cancel) {
      return yield updateState('RESET_FLOW')                       // Handle user cancelling.
    }
    yield updateState('UPDATE_MODAL_STATE')                        // UI update, open modal.
    const confirmationStep = yield user.choice.confirmation        // Wait for user interaction (on the Modal)
    if (confirmationStep.cancel) {
      return yield updateState('RESET_FLOW')                       // Handle user cancelling.
    }
    yield updateState('UPDATE_MODAL_STATE')                         // UI update, close modal.
    yield updateState('RESET_FLOW')                                 // Clean flow state.
  } catch (e) {                                                         // Handle unexpected error.
    return yield updateState('ERROR_ON_BASIC_FLOW', {error: 'Unexpected error on basicFlowService', reason: e})
  }
}
