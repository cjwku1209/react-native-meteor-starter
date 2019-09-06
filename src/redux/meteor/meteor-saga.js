import Meteor from "react-native-meteor";
import { call, takeLatest } from "redux-saga/effects";
import { MeteorAction } from "./meteor-action";

const connect = function* (action) {
	yield call((payload) => {
		return new Promise((resolve) => {
			Meteor.connect(payload.socket);
			resolve();
		});
	}, {
		socket: action.payload.socket
	});
};

export const MeteorSaga = function* () {
	yield takeLatest(MeteorAction.CONNECT, connect);
};
