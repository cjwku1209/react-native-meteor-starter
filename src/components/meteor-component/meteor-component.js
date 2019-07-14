import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { MeteorAction } from "../../redux/meteor/meteor-action";
import { AuthAction } from "../../redux/auth/auth-action";
import { styles } from "./styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			server: "10.0.2.2:3000",
			username: "",
			password: ""
		};
	}

	render() {
		return (
			<React.Fragment>
				<View>
					<View style={styles.container}>
						<Text>
							{this.props.LocaleReducer.strings["serverIpAddress"]}
						</Text>
						<TextInput
							style={styles.input}
							value={this.state.server}
							onChangeText={(text) => {
								this.setState({
									server: text
								});
							}}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.props.dispatch(MeteorAction.connect("ws://" + this.state.server + "/websocket"));
							}}
						>
							<Text>
								Connect
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.container}>
						{
							(() => {
								if (this.props.Meteor.user === null) {
									return (
										<React.Fragment>
											<Text>
												{this.props.LocaleReducer.strings["username"]}
											</Text>
											<TextInput
												style={styles.input}
												value={this.state.username}
												onChangeText={(text) => {
													this.setState({
														username: text
													});
												}}
											/>
											<Text>
												{this.props.LocaleReducer.strings["password"]}
											</Text>
											<TextInput
												style={styles.input}
												value={this.state.password}
												onChangeText={(text) => {
													this.setState({
														password: text
													});
												}}
											/>
											<TouchableOpacity
												style={styles.button}
												onPress={() => {
													this.props.dispatch(AuthAction.login(this.state.username, this.state.password));
												}}
											>
												<Text>
													{this.props.LocaleReducer.strings["login"]}
												</Text>
											</TouchableOpacity>
										</React.Fragment>
									);
								}
								return (
									<React.Fragment>
										<TouchableOpacity
											style={styles.button}
											onPress={() => {
												this.props.dispatch(AuthAction.logout());
											}}
										>
											<Text>
												{this.props.LocaleReducer.strings["logout"]}
											</Text>
										</TouchableOpacity>
									</React.Fragment>
								);
							})()
						}
					</View>
					<View style={styles.container}>
						<Text>
							{this.props.LocaleReducer.strings["connected"] + ": " + JSON.stringify(this.props.Meteor.status.connected)}
						</Text>
						<Text>
							{this.props.LocaleReducer.strings["status"] + ": " + this.props.Meteor.status.status}
						</Text>
						<Text>
							{this.props.LocaleReducer.strings["authentication"] + ": " + this.props.Meteor.userId}
						</Text>
					</View>
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

const Navigation = withNavigation(Tracker);

const Redux = connect((store) => {
	return {
		LocaleReducer: {
			strings: store.LocaleReducer.strings
		}
	};
})(Navigation);

export const MeteorComponent = Redux;
