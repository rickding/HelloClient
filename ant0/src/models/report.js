import { updateReportData, chk,
  weeklyRelease, weeklyReleaseManday, weeklyStartPlan, weeklyStartPlanManday,
  weeklyReleasePlan, weeklyReleasePlanManday, releasePlan, releasePlanManday } from '../services/report';

export default {
  namespace: 'report',

  state: {
    data: {
      list: [],
      pagination: {},
      msg: '',
      error: '',
      url: '',
    },
  },

  effects: {
    *updateData({ payload }, { call, put }) {
      const response = yield call(updateReportData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *chk({ payload }, { call, put }) {
      const response = yield call(chk, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyRelease({ payload }, { call, put }) {
      const response = yield call(weeklyRelease, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyReleaseManday({ payload }, { call, put }) {
      const response = yield call(weeklyReleaseManday, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyStartPlan({ payload }, { call, put }) {
      const response = yield call(weeklyStartPlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyStartPlanManday({ payload }, { call, put }) {
      const response = yield call(weeklyStartPlanManday, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyReleasePlan({ payload }, { call, put }) {
      const response = yield call(weeklyReleasePlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchWeeklyReleasePlanManday({ payload }, { call, put }) {
      const response = yield call(weeklyReleasePlanManday, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchReleasePlan({ payload }, { call, put }) {
      const response = yield call(releasePlan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchReleasePlanManday({ payload }, { call, put }) {
      const response = yield call(releasePlanManday, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
