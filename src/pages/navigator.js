import React from "react";
import { createStackNavigator } from "react-navigation";
import { HomePage } from "./home-page/home-page";
import { MainPage } from "./main-page/main-page";

export const NavigationStack = createStackNavigator({
	HomePage: {
		screen: HomePage
	},
	MainPage: {
		screen: MainPage
	}
}, {
	initialRouteName: "HomePage",
	headerMode: "none"
});
