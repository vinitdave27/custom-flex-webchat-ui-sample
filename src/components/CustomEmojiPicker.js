import * as React from 'react';
import * as FlexWebChat from '@twilio/flex-webchat-ui';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import CustomButton from './CustomButton';

class CustomEmojiPicker extends React.Component {
	state = {
		hidePicker: true,
	};
	toggleHidePicker = () => {
		this.setState({ hidePicker: !this.state.hidePicker });
	};
	addEmoji = (e) => {
		const emoji = e.native;
		console.log('Adding emoji:', emoji);
		const { channel, channelSid, useLocalState, useSeparateInputStore } = this.props;
		console.log(channel, channelSid, useLocalState, useSeparateInputStore);
		const inputText = channel && channel.inputText;
		console.log(inputText);
		const payload = {
			body: `${inputText}${emoji}`,
			channel,
			channelSid,
			useLocalState,
			useSeparateInputStore,
		};
		FlexWebChat.Actions.invokeAction('SetInputText', payload);
	};
	render() {
		return this.state.hidePicker ? (
			<CustomButton toggleHidePicker={this.toggleHidePicker} />
		) : (
			<Picker data={data} onEmojiSelect={this.addEmoji} perLine={7} onClickOutside={this.toggleHidePicker} />
		);
	}
}

export default CustomEmojiPicker;
