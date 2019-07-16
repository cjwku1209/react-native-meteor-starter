import Meteor from "react-native-meteor";
import { call, put, takeLatest } from "redux-saga/effects";
import { AuthAction } from "./auth-action";

const login = function* (action) {
	try {
		yield call(() => {
			return new Promise((resolve, reject) => {
				Meteor.loginWithPassword(action.payload.username, action.payload.password, (err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			});
		});
		yield put(AuthAction.loginSuccess());
	} catch (err) {
		yield put(AuthAction.error(err.error));
	}
};

const logout = function* () {
	try {
		yield call(() => {
			return new Promise((resolve, reject) => {
				Meteor.logout((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});
			});
		});
		yield put(AuthAction.logoutSuccess());
	} catch (err) {
		yield put(AuthAction.error(err.error));
	}
};

export const AuthSaga = function* () {
	yield takeLatest(AuthAction.LOGIN, login);
	yield takeLatest(AuthAction.LOGOUT, logout);
};
