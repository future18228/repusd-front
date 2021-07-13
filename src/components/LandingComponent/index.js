import React, { useState, useContext } from 'react';
import { Card, Button, Modal, Avatar, Spin } from 'antd';

import { AppContext } from 'utils/contexts';
import { injected } from 'utils/connectors';
import { MetaMaskImage } from 'img';
import './style.css';

const LandingComponent = (props) => {
	const { account, activate } = useContext(AppContext);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false)

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const connectWallet = () => {
		setIsLoading(true)
		activate(injected);
	}

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
				<Spin spinning={isLoading} tip="Loading...">
					<Card onClick={connectWallet} hoverable>
						<Avatar shape="square" src={MetaMaskImage} /> <span className="metamask-title" >MetaMask</span>
					</Card>
				</Spin>
			</Modal>
		</div>
	);
};

export default LandingComponent;
