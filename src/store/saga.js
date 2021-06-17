import axios from "axios";
import { all, takeLatest, call, put } from "redux-saga/effects";

const api = axios.create({
  baseURL: "http://77.120.241.80:8811/api/",
});

const getUsersApi = async () => api.get("users");

const deleteUserApi = async (userId) => api.delete(`user/${userId}`);

const editUserApi = async (user) => api.put(`user/${user.id}`, user);

const addUserApi = async (user) => api.post(`users`, user);

export function* rootSaga() {
  yield all([
    takeLatest("ACTION_GET_USERS", getUsers),
    takeLatest("ACTION_EDIT_USER", editUser),
    takeLatest("ACTION_DELETE_USER", deleteUser),
    takeLatest("ACTION_ADD_USER", addUser),
  ]);
}

function* getUsers() {
  console.log("getUsers");

  const response = yield call(getUsersApi);
  yield put({ type: "ACTION_STORE_USERS", payload: response.data });
}

function* deleteUser({ payload }) {
  yield call(deleteUserApi, payload);
  yield put({ type: "ACTION_GET_USERS", payload });
}

function* editUser({ payload }) {
  yield call(editUserApi, payload);
  yield put({ type: "ACTION_GET_USERS", payload });
}

function* addUser({ payload }) {
  console.log("debug > payload ==== ", payload);
  yield call(addUserApi, payload);
  yield put({ type: "ACTION_GET_USERS", payload });
}
