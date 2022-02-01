import styled from 'styled-components/macro';

const ErrorContainer = styled.div`
	margin: 0 auto;
	padding: 10px;
	color: ${({ theme }) => theme.colors.purpleRed};
	background-color: #ffbaba;
	border-radius: 10px;
	font-family: FontAwesome;
	font-style: normal;
	@media screen and (max-width: 420px) {
		width: 80%;
	}
`;

const ErrorHeader = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	h4 {
		font-family: ${({ theme }) => theme.fonts.title};
	}
	&:before {
		content: '\f057';
		margin-right: 3px;
	}
`;

const MetamaskLink = styled.a`
	text-decoration: 'none';
	color: 'white';
`;

const MetamaskImg = styled.img`
	padding: 10px;
	border-radius: 10px;
	background-color: #eeee;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
		rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const ErrorMessage = ({ message }) => {
	return (
		<ErrorContainer>
			<ErrorHeader>
				<h4> {message ? message : 'Please install MetaMask Extension for Chrome'}</h4>
			</ErrorHeader>
			{!message && (
				<MetamaskLink
					target="_blank"
					href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
					rel="noreferrer"
				>
					<MetamaskImg src="https://docs.metamask.io/metamask-fox.svg" alt="metamaskIcon" />
				</MetamaskLink>
			)}
		</ErrorContainer>
	);
};

export default ErrorMessage;
