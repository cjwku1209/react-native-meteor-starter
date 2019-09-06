import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HomePage } from "./home-page/home-page";
import { MainPage } from "./main-page/main-page";

const Stack = createStackNavigator({
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

const Navigator = createAppContainer(Stack);

export const NavigationStack = Navigator;
