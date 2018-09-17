import { chk } from '@/services/server';

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
