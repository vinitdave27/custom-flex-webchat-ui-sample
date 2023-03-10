import React from 'react';
import * as FlexWebChat from '@twilio/flex-webchat-ui';
import CustomEmojiPicker from './components/CustomEmojiPicker.js';

class App extends React.Component {
	state = {};

	constructor(props) {
		super(props);

		const { configuration } = props;

		FlexWebChat.MessageInput.Content.add(<CustomEmojiPicker key={'custom-emoji-picker'} />, { sortOrder: 1 });

		FlexWebChat.Manager.create(configuration)
			.then((manager) => this.setState({ manager }))
			.catch((error) => this.setState({ error }));
	}

	render() {
		const { manager, error } = this.state;
		if (manager) {
			return (
				<FlexWebChat.ContextProvider manager={manager}>
					<FlexWebChat.RootContainer />
				</FlexWebChat.ContextProvider>
			);
		}

		if (error) {
			console.error('Failed to initialize Flex Web Chat', error);
		}

		return null;
	}
}

export default App;
