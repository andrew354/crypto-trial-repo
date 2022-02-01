import { useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components/macro';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TransactionList from '../TransactionList/TransactionList';
import daiAbi from '../../abiContracts/daiAbi.json';
import walletAbi from '../../abiContracts/walletAbi.json';

const TransferFormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: ${({ theme }) => theme.fonts.title};
`;

const FormTitle = styled.h2`
	font-family: ${({ theme }) => theme.fonts.title};
	color: ${({ theme }) => theme.colors.grey};
	margin-top: 26px;
`;

const InputForm = styled.input`
	width: 35%;
	padding: 10px;
	border-radius: 10px;
	border: none;
	margin: 20px 0;

	@media screen and (max-width: 800px) {
		width: 60%;
	}
`;

const ButtonSubmitForm = styled.button`
	width: 240px;
	height: 40px;
	margin: 20px 0;
	color: #333333;
	padding: 10px;
	border: none;
	border-radius: 10px;
	font-family: Raleway;
	font-size: 1em;
	font-weight: 600;
	background-color: #f8cc82;
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.colors.lightGrey};
		background-color: #dfae5b;
	}
`;

const SendDeposit = ({ provider }) => {
	const [error, setError] = useState();
	const [txs, setTxs] = useState([]);

	const [amountDeposited, setAmountDeposited] = useState();
	const DAI_CONTRACT = '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063';
	const WALLET_CONTRACT = '0xa851CAA93EdeA04e3Fbc4F3Cb334F17018dC46DB';

	const deposit = async (daiDepositApproval, daiAmount, signer) => {
		if (daiDepositApproval && signer) {
			try {
				const walletContract = await new ethers.Contract(WALLET_CONTRACT, walletAbi, signer);
				const deposit = await walletContract.deposit(daiAmount);
				setTxs([...txs, deposit]);
				return deposit;
			} catch (err) {
				setError(err.message);
			}
		}
	};

	const startTransaction = async ({ setError, setTxs, ether, addr }) => {
		try {
			const daiAmount = ethers.utils.parseUnits(ether, 18);
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const daiContract = await new ethers.Contract(DAI_CONTRACT, daiAbi, signer);
			const daiDepositApproval = await daiContract.approve(WALLET_CONTRACT, daiAmount);

			setTxs([daiDepositApproval]);

			if (daiDepositApproval && txs && daiAmount > 0) {
				await deposit(daiDepositApproval, daiAmount, signer);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = new FormData(e.target);

			setError();
			await startTransaction({
				setError,
				setTxs,
				ether: data.get('depositAmount'),
			});
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<FormTitle>Amount of DAI to deposit</FormTitle>
			<TransferFormContainer onSubmit={handleSubmit}>
				<InputForm
					onChange={(e) => setAmountDeposited(e.target.value)}
					value={amountDeposited || ''}
					name="depositAmount"
					type="text"
					placeholder="Amount in DAI"
					required
				/>
				<ButtonSubmitForm type="submit">Approve and Deposit funds</ButtonSubmitForm>
				{error && <ErrorMessage message={error} />}
				<TransactionList txs={txs} />
			</TransferFormContainer>
		</>
	);
};

export default SendDeposit;
