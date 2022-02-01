import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
	colors: {
		black: '#222831',
		darkBlack: '#171717',
		onyxGrey: '#393E46',
		yellow: '#F8CC82',
		lightGrey: '#EEEEEE',
		grey: '#aaa',
		purpleRed: '#da0037',
		white: '#FFFFFF',
	},
	fonts: {
		title: 'Raleway',
		// title: 'Hind Vadodara',
		// titleTwo: 'Prompt',
		text: 'Zilla Slab',
	},
	/* font-family: Raleway;
		font-family: 'Hind Vadodara', sans-serif; */
	fontSizes: {
		small: '1em',
		medium: '1.3em',
		large: '2em',
	},
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
