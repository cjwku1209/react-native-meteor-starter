import React from "react";
import { connect } from "react-redux";
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
						{this.props.LocaleReducer.strings["welcome"]}
					</Text>
				</View>
			</React.Fragment>
		);
	}

}

const Redux = connect((store) => {
	return {
		LocaleReducer: {
			strings: store.LocaleReducer.strings
		}
	};
})(Component);

export const MainPage = Redux;
