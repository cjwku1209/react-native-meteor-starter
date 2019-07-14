import React from "react";
import { connect } from "react-redux";
import Meteor, { withTracker } from "react-native-meteor";
import { Text, View } from "react-native";
import { styles } from "../home-page/styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<View style={styles.container}>
					<Text style={styles.welcome}>
						{
							this.props.LocaleReducer.strings["welcome"]
						}
					</Text>
				</View>
			</React.Fragment>
		);
	}

}

const Tracker = withTracker(() => {
	return {
		Meteor: {
			collection: {},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

const Redux = connect((store) => {
	return {
		LocaleReducer: {
			strings: store.LocaleReducer.strings
		}
	};
})(Tracker);

export const MainPage = Redux;
