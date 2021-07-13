import React, { useState, useContext } from 'react';
import { Menu, Button, message } from 'antd';

import { AppContext } from 'utils/contexts';
import WalletModalComponent from 'components/WalletModalComponent';
import NavbarList from 'const/navbar';
import { AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai';

import { RepusdSmallMark } from 'img';
import './style.css';

export default (props) => {
	const { account } = useContext(AppContext);
	const { selectedItem } = props;
	const [menuFoldState, setMenuFoldState] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const toggleCollapsed = () => {
		setMenuFoldState(!menuFoldState);
	}

	const selectedItemArray = () => {
		let newArray = []
		NavbarList.forEach((item, index) => {
			if (item.url === selectedItem) {
				newArray.push(index.toString());
			}
		})

		return newArray;
	}

	const navigatePage = (item) => {
		if (account) {
			item.url === "/connect_wallet" 
				? setIsModalVisible(true)
				: window.location.href = item.url;
		} else {
			message.warning('Please connect your wallet!')
		}
	}

  	return (
    	<>
			<div className="logo">
				<img src={RepusdSmallMark} />
			</div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={selectedItemArray()} className="menu">
				{
					NavbarList.map((item, index) => (
						<Menu.Item key={index}><a onClick={() => navigatePage(item)}>{item.title}</a></Menu.Item>
					)
						// if (item.url === '/connect_wallet') {
						// 	return <Menu.Item key={index}><a onClick={showWalletModal}>{item.title}</a></Menu.Item>;
						// } else {
						// 	return <Menu.Item key={index}><a href={item.url}>{item.title}</a></Menu.Item>;
						// }
					// }
					)
				}
			</Menu>
			<Button className="header-collapse-btn" onClick={toggleCollapsed} style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
				{!menuFoldState ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}	
			</Button>
			<WalletModalComponent visible={isModalVisible} setIsModalVisible={setIsModalVisible} />
		</>
  	)
}