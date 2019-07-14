export class MeteorAction {

	static CONNECT = "Meteor/CONNECT";

	static connect = (socket) => {
		return {
			type: MeteorAction.CONNECT,
			payload: {
				socket: socket
			}
		};
	};

}
