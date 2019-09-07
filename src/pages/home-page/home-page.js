import React from "react";
import { connect } from "react-redux";
import { Text, TouchableOpacity, View } from "react-native";
import { MeteorComponent } from "../../components/meteor-component/meteor-component";
import { LocaleAction } from "../../redux/locale/locale-action";
import { styles } from "./styles";

class Component extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					{this.props.LocaleReducer.strings["welcome"]}
				</Text>
				<MeteorComponent/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						this.props.navigation.navigate("MainPage");
					}}
				>
					<Text>
						{this.props.LocaleReducer.strings["finalizeSettings"]}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	componentDidMount() {
		this.props.dispatch(LocaleAction.load("en", require("../../assets/locale.en")));
	}

}

export const Redux = connect((store) => {
	return {
		LocaleReducer: {
			strings: store.LocaleReducer.strings
		}
	};
})(Component);

export const HomePage = Redux;
