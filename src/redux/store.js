import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all, call, fork } from "redux-saga/effects";
import { AuthReducer } from "./auth/auth-reducer";
import { LocaleReducer } from "./locale/locale-reducer";
import { LoggerSaga } from "./logger/logger-saga";
import { MeteorSaga } from "./meteor/meteor-saga";
import { AuthSaga } from "./auth/auth-saga";

const saga = createSagaMiddleware();

export const store = createStore(combineReducers({
	AuthReducer,
	LocaleReducer
}), applyMiddleware(saga));

saga.run(function* () {
	yield all([
		call(LoggerSaga),
		...[
			MeteorSaga,
			AuthSaga
		].map(fork)
	]);
});
