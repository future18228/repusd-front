import React, { useState, useContext } from 'react';
import { Card, Button, Modal, Avatar, Spin } from 'antd';
import { UnsupportedChainIdError } from '@web3-react/core';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';

import { AppContext } from 'utils/contexts';
import { injected } from 'utils/connectors';
import { MetaMaskImage } from 'img';
import './style.css';

const LandingComponent = (props) => {
	const { connector, activate, deactivate, active, error } = useContext(AppContext);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getErrorMessage = (error) => {
		if (error instanceof NoEthereumProviderError) {
			return `No Binance browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`
		} else if (error instanceof UnsupportedChainIdError) {
		  	return "You're connected to an unsupported network. Please change network as Binance smart chain"
		} else if (
		  	error instanceof UserRejectedRequestErrorInjected ||
		  	error instanceof UserRejectedRequestErrorWalletConnect ||
		  	error instanceof UserRejectedRequestErrorFrame
		) {
		  	return 'Please authorize this website to access your Ethereum account.'
		} else {
		  	console.error(error)
		  	return 'An unknown error occurred. Check the console for more details.'
		}
	}

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const connectWallet = () => {
		setIsLoading(true)
		activate(injected);
	};

	const installMetaMask = () => {
		window.open('https://metamask.io/download', '_blank');
	};

	return (
		<div className="site-card-wrapper">
			<Card bordered={false} className="landing-card">
				<div className="connect-wallet-container">
					<p className="landing-title">PLEASE CONNECT YOUR WALLET</p>
					<p className="landing-description">To see your deposited / borrowed assets, you need to connect your wallet.</p>
					<Button type="primary" shape="round" className="landing-connect-btn" onClick={showModal}>
						CONNECT
					</Button>
				</div>
			</Card>
			<Modal title="Sellect Wallet" visible={isModalVisible} onCancel={handleCancel} footer={false}>
				<Spin spinning={isLoading && !(error instanceof NoEthereumProviderError)} tip="Loading..." >
					<Card onClick={connectWallet} hoverable >
						<Avatar shape="square" src={MetaMaskImage} /> <span className="metamask-title" >MetaMask</span>
					</Card>
				</Spin>
				{(error instanceof NoEthereumProviderError) && (
					<Button onClick={installMetaMask} style={{margin: '10px 0'}}>Install MetaMask</Button>
				)}
				{!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0', color: '#16ACE2' }}>{getErrorMessage(error)}</h4>}
			</Modal>
		</div>
	);
};

export default LandingComponent;
