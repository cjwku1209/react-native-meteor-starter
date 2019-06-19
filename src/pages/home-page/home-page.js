import React from 'react';
import { connect } from 'react-redux';
import Meteor, { withTracker } from 'react-native-meteor';
import { Text, View } from 'react-native';
import { LocaleAction } from "../../redux/actions/locale-action";
import { styles } from "./styles";

class Component extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{
						this.props.strings['welcome']
					}
				</Text>
				<Text style={styles.instructions}>
					{
						JSON.stringify(this.props.Meteor.status)
					}
				</Text>
			</View>
		);
	}

	componentDidMount() {
		this.props.dispatch(LocaleAction.load('en', require('./locale-en.json')));
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe('users_db');
	return {
		Meteor: {
			collection: {
				users: Meteor.collection('users').find()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

export const HomePage = connect((store) => {
	return {
		strings: store['LocaleReducer']['strings']
	};
})(Tracker);
