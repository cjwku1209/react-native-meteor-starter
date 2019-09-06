import { AppRegistry } from "react-native";
import Meteor from "react-native-meteor";
import { name as appName } from "./app.json";
import { App } from "./src/App";

AppRegistry.registerComponent(appName, () => {
	Meteor.connect("ws://10.0.2.2:3000/websocket");
	return App;
});
