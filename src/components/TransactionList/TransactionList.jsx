import React from 'react';
import styled from 'styled-components/macro';

const TransactionsTitle = styled.h4`
	margin: 30px 0px 10px 0px;
	color: ${({ theme }) => theme.colors.grey};

	@media screen and (max-width: 820px) {
		word-break: break-all;
	}
`;

const HashLink = styled.a`
	text-decoration: none;
	color: ${({ theme }) => theme.colors.grey};
	margin-bottom: 20px;

	&:hover {
		color: ${({ theme }) => theme.colors.white};
		font-size: ${({ theme }) => theme.fontSizes.small};
	}
`;

const TransactionList = ({ txs }) => {
	if (txs.length === 0) return null;
	return (
		<div>
			<h2>Transaction List</h2>
			{txs.map((tx) => (
				<div key={tx}>
					<TransactionsTitle>
						<HashLink
							href={`https://polygonscan.com/tx/${tx.hash}`}
							target="_blank"
							rel="noreferrer"
						>
							{tx.hash}
						</HashLink>
					</TransactionsTitle>
				</div>
			))}
		</div>
	);
};

// https://mumbai.polygonscan.com/tx/0xd2ee8c1e0cf92e99ac45ee382b9abf464f4f2a5d44719c93dd5bee960fdfebcf

export default TransactionList;
