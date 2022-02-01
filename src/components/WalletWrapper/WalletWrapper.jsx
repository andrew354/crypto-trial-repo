import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { ethers } from 'ethers';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import UserInfo from '../UserInfo/UserInfo';
import SendDeposit from '../SendDeposit/SendDeposit';
import daiAbi from '../../abiContracts/daiAbi.json';
import dekaAbi from '../../abiContracts/dekaAbi.json';
import walletAbi from '../../abiContracts/walletAbi.json';

const WalletContainer = styled.div`
	width: 80vw;
	max-height: 80vh;
	padding: 15px;
	border-radius: 10px;
	color: ${({ theme }) => theme.colors.lightGrey};
	background-color: rgba(54, 56, 64, 0.4);

	@media screen and (max-width: 420px) {
		max-height: 80vh;
	}
`;

const ButtonConnect = styled.button`
	width: 240px;
	height: 40px;
	margin: 30px auto;
	color: ${({ theme }) => theme.colors.onyxGrey};
	padding: 10px;
	border: none;
	border-radius: 10px;
	font-family: ${({ theme }) => theme.fonts.title};
	font-size: ${({ theme }) => theme.fontSizes.small};
	font-weight: 600;
	background-color: ${({ theme }) => theme.colors.yellow};
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => theme.colors.lightGrey};
		background-color: #dfae5b;
	}

	${({ disconnect }) =>
		disconnect &&
		css`
			position: absolute;
			top: 40px;
			right: 40px;
			background-color: rgba(54, 56, 64, 0.4);
			color: ${({ theme }) => theme.colors.grey};
			&:hover {
				color: ${({ theme }) => theme.colors.lightGrey};
				background-color: rgba(54, 56, 64, 0.4);
			}

			@media screen and (max-width: 1020px) {
				width: 165px;
				margin: 0;
				top: 5px;
				right: 20px;
			}
		`}
`;

const WalletHeaderWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 30px 0;

	@media screen and (max-width: 420px) {
		display: flex;
		justify-content: space-around;
	}
`;

const WalletHeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const WalletHeaderTitle = styled.h2`
	font-family: ${({ theme }) => theme.fonts.title};
	color: ${({ theme }) => theme.colors.grey};
`;

const WalletHeaderInfo = styled.h2`
	font-family: ${({ theme }) => theme.fonts.title};
`;

const AllInfoContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;

const WalletWrapper = () => {
	const [errorMessage, setErrorMessage] = useState(false);
	const [buttonConnectText, setButtonConnectText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);

	const [metamaskConnected, setMetamaskConnected] = useState(false);
	const [addressMetamask, setAddressMetamask] = useState(null);

	const [balanceDai, setBalanceDai] = useState(null);
	const [balanceDeka, setBalanceDeka] = useState(null);
	const [totalDeposit, setTotalDeposit] = useState(null);
	const [totalSupply, setTotalSupply] = useState(null);
	const DAI_CONTRACT = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063';

	const DEKA_CONTRACT = '0x866F88998b535464Aee6AC16c04809691F0CD6aD';

	const WALLET_CONTRACT = '0xa851CAA93EdeA04e3Fbc4F3Cb334F17018dC46DB';

	const handleConnectWallet = async () => {
		try {
			if (typeof window.ethereum !== undefined) {
				await window.ethereum.enable();

				const provider = await new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();

				if (provider) {
					setProvider(provider);
					setSigner(signer);
					setMetamaskConnected(true);
				}

				const addressMetamask = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});

				if (addressMetamask) {
					setAddressMetamask(addressMetamask);
					accountChangeHandler(addressMetamask[0]);
					setButtonConnectText('Disconnect Wallet');
				}
			}
		} catch (err) {
			setErrorMessage(true);
		}
	};

	const accountChangeHandler = (newAccount) => {
		getUserBalance(newAccount.toString());
	};

	const getUserBalance = async (userAddress) => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = await provider.getSigner();
		const daiBalance = await provider.getBalance(userAddress);

		const daiBalanceHex = parseFloat(ethers.utils.formatUnits(daiBalance, 18));
		if (daiBalanceHex) {
			setBalanceDai(daiBalanceHex);
		}

		const readDekaContract = await new ethers.Contract(DEKA_CONTRACT, dekaAbi, signer);
		if (readDekaContract) {
			const dekaBalance = await readDekaContract.balanceOf(userAddress);
			const dekaBalanceHex = await parseFloat(ethers.utils.formatUnits(dekaBalance, 18));
			setBalanceDeka(dekaBalanceHex);
		}

		const readWalletContract = await new ethers.Contract(WALLET_CONTRACT, walletAbi, provider);
		const totalDeposit = await readWalletContract.daiDeposited();
		const totalDepositHex = parseFloat(ethers.utils.formatUnits(totalDeposit, 18));
		if (totalDepositHex) {
			setTotalDeposit(totalDepositHex);
		}
		getDekaTotalSupply();
	};

	const getDekaTotalSupply = async () => {
		const provider = await new ethers.providers.Web3Provider(window.ethereum);
		const readDekaContract = await new ethers.Contract(DEKA_CONTRACT, dekaAbi, provider);

		const totalSupply = await readDekaContract.totalSupply();
		const totalSupplyHex = parseFloat(ethers.utils.formatUnits(totalSupply, 18));

		if (totalSupplyHex) {
			setTotalSupply(totalSupplyHex);
		}
	};

	const reloadPage = () => {
		window.location.reload();
	};

	if (provider) {
		window.ethereum.on('accountsChanged', accountChangeHandler);
		window.ethereum.on('chainChanged', reloadPage);
	}

	return (
		<WalletContainer>
			{buttonConnectText === 'Disconnect Wallet' && (
				<ButtonConnect
					disconnect
					onClick={buttonConnectText === 'Disconnect Wallet' ? () => reloadPage : () => handleConnectWallet()}
				>
					{buttonConnectText}
				</ButtonConnect>
			)}
			{provider && addressMetamask && balanceDai && balanceDeka && (
				<AllInfoContainer>
					<UserInfo addressMetamask={addressMetamask} balanceDai={balanceDai} balanceDeka={balanceDeka} />
				</AllInfoContainer>
			)}
			<WalletHeaderWrapper>
				<WalletHeaderContainer>
					<WalletHeaderTitle>APY</WalletHeaderTitle>
					<WalletHeaderInfo>21.399%</WalletHeaderInfo>
				</WalletHeaderContainer>
				{/* <WalletHeaderContainer>
					<WalletHeaderTitle>Total Value Deposited</WalletHeaderTitle>
					<WalletHeaderInfo>{totalDeposit}</WalletHeaderInfo>
				</WalletHeaderContainer> */}
				<WalletHeaderContainer>
					<WalletHeaderTitle>Total Supply DekaTokens</WalletHeaderTitle>
					<WalletHeaderInfo>{totalSupply}</WalletHeaderInfo>
				</WalletHeaderContainer>
			</WalletHeaderWrapper>
			{metamaskConnected && provider && signer && <SendDeposit provider={provider} />}
			{buttonConnectText === 'Connect Wallet' && (
				<>
					<ButtonConnect onClick={buttonConnectText === 'Disconnect Wallet' ? reloadPage : () => handleConnectWallet()}>
						{buttonConnectText}
					</ButtonConnect>
					<h2>Connect your wallet to deposit funds</h2>
				</>
			)}

			{!provider && errorMessage && <ErrorMessage />}
		</WalletContainer>
	);
};

export default WalletWrapper;
