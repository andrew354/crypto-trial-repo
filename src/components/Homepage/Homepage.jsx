import WalletWrapper from '../WalletWrapper/WalletWrapper';
import styled from 'styled-components/macro';

const HomepageContainer = styled.div`
	height: 100vh;
	/* min-height: 1080px; */
	overflow: hidden;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	text-align: center;
	color: ${({ theme }) => theme.colors.grey};
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(40, 40, 108, 1) 0%,
		rgba(97, 113, 140, 1) 100%,
		rgba(4, 112, 189, 1) 100%,
		rgba(5, 93, 177, 1) 100%,
		rgba(0, 212, 255, 1) 100%
	);
	@media screen and (max-width: 420px) {
		/* min-height: 800px; */
	}
`;

const WalletTitle = styled.h1`
	font-family: ${({ theme }) => theme.fonts.title};
	margin-bottom: 26px;

	@media screen and (max-width: 420px) {
		margin-top: 26px;
	}
`;

const Homepage = () => {
	return (
		<HomepageContainer>
			<WalletTitle>DeFi Crypto Investment Fund</WalletTitle>
			<WalletWrapper />
		</HomepageContainer>
	);
};

export default Homepage;
