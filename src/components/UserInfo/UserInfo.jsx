import styled from 'styled-components/macro';

const UserInfoContainer = styled.div`
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	padding: 10px;
	backdrop-filter: blur(5px);
	margin: 30px 0;
`;

const UserInfoTitle = styled.h2`
	text-align: left;
	font-family: ${({ theme }) => theme.fonts.title};
	color: ${({ theme }) => theme.colors.grey};
`;

const UserInfoPar = styled.h4`
	text-align: left;
	font-family: ${({ theme }) => theme.fonts.text};
	font-size: ${({ theme }) => theme.fontSizes.medium};
	@media screen and (max-width: 820px) {
		word-break: break-all;
	}
`;

const UserInfo = ({ addressMetamask, balanceDai, balanceDeka }) => {
	return (
		<UserInfoContainer>
			<UserInfoTitle>Account Info</UserInfoTitle>
			<UserInfoPar>Address: {addressMetamask}</UserInfoPar>
			<UserInfoPar>Balance DAI: {balanceDai || 0}</UserInfoPar>
			<UserInfoPar>Balance DEKA: {balanceDeka || 0}</UserInfoPar>
		</UserInfoContainer>
	);
};

export default UserInfo;
