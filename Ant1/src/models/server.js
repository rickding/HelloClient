import { chk, log } from '../services/server';

export default {
  namespace: 'server',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *chk({ payload }, { call, put }) {
      const response = yield call(chk, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *log({ payload, callback }, { call, put }) {
      const response = yield call(log, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
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
