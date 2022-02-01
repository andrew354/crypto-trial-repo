import React from 'react';
import Homepage from './components/Homepage/Homepage';
import styled from 'styled-components/macro';
import Theme from './Theme';

const AppContainer = styled.div`
	/* height: 100vh;
	width: 100vw; */
	font-family: ${({ theme }) => theme.fonts.text};
`;

const App = () => {
	return (
		<Theme>
			<AppContainer>
				<Homepage />
			</AppContainer>
		</Theme>
	);
};

export default App;
