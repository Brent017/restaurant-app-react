import React, { Component } from 'react';
import Tts from 'react-native-tts';

class Speak extends Component {
	constructor(props) {
		super(props);
		Tts.setDefaultLanguage('en-IE');
		Tts.addEventListener('tts-start', event => console.log('start', event));
		Tts.addEventListener('tts-finish', event => console.log('finish', event));
		Tts.addEventListener('tts-cancel', event => console.log('cancel', event));
	}

	private _onPressSpeech = () => {
		Tts.stop();
		Tts.speak('Hello, world!');
	}
}

export default Speak;
