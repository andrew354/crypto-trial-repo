import { useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components/macro';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TransactionList from '../TransactionList/TransactionList';

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
	width: 60%;
	padding: 10px;
	border-radius: 10px;
	border: none;
	margin: 20px 0;
`;

const ImgContainer = styled.div`
	width: 50px;
	background: #b9b7b7;
	margin-left: -15px;
	border-radius: 10px;
`;

const ImgMatic = styled.img`
	width: 40px;
	height: 37px;

	color: #8247e5;

	/* background: rgba(130, 71, 229, 0.1); */

	border-color: transparent;
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

const InputContainer = styled.div`
	display: flex;
	align-items: center;
`;

const startTransaction = async ({ provider, setError, setTxs, ether, addr }) => {
	try {
		const signer = provider.getSigner();

		await ethers.utils.getAddress(addr);
		const tx = await signer.sendTransaction({
			to: addr,
			value: ethers.utils.parseEther(ether),
		});
		setTxs([tx]);
	} catch (err) {
		setError(err.message);
	}
};

export default function SendTransaction({ provider }) {
	const [error, setError] = useState();
	const [txs, setTxs] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = new FormData(e.target);
			setError();
			await startTransaction({
				provider,
				setError,
				setTxs,
				ether: data.get('ether'),
				addr: data.get('addr'),
			});
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<FormTitle>Send POLYGON Transaction</FormTitle>
			<TransferFormContainer onSubmit={handleSubmit}>
				<InputForm type="text" name="addr" placeholder="Recipient Address" />
				<InputForm name="ether" type="text" placeholder="Amount in MATIC" />

				{/* <InputContainer>
				<ImgContainer>
					<ImgMatic
						src="https://polygonscan.com/images/svg/brands/polygon.svg?v=1.3"
						alt="matic"
					/>
				</ImgContainer>
			</InputContainer> */}
				<ButtonSubmitForm type="submit">Pay now</ButtonSubmitForm>
				{error && <ErrorMessage message={error} />}
				<TransactionList txs={txs} />
			</TransferFormContainer>
		</>
	);
}
