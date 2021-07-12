import React, { useState } from 'react';
import { Avatar, Table, Button, Input, Select, Modal } from 'antd';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

import './style.css';

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;

const dataSource = [];

for (let i = 1; i <= 100; i++) {
    dataSource.push({
        key: i,
        user: `Edward King ${i}`,
        fees: '$1456784646.67M',
    });
}

export default () => {
    const [pageSize, setPageSize] = useState(10);
    const [visible, setIsModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const handleCancel = () => {
		setIsModalVisible(false);
	};

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button style={{backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center'}}><AiOutlineDoubleLeft />&nbsp;Previous</Button>;
        }
        if (type === 'next') {
            return <Button style={{backgroundColor: '#d5b75f', color: 'white', display: 'flex', alignItems: 'center'}}>Next&nbsp;<AiOutlineDoubleRight /></Button>;
        }

        return originalElement;
    }

    const selectRow = (data) => {
        setIsModalVisible(true);
        setSelectedData(data);
    }

    return (
        <div className="user-list">
            <div className="user-list-container">
                <div className="user-list-table-setting">
                    <div className="user-list-table-title">USER LIST</div>
                    <div className="table-setting-right">
                        <Search placeholder="Search" />
                        <Select defaultValue="10" onChange={(value) => setPageSize(value)}>
                            <Option value="10">10 per page</Option>
                            <Option value="20">20 per page</Option>
                            <Option value="50">50 per page</Option>
                            <Option value="100">100 per page</Option>
                        </Select>
                    </div>
                </div>
                <Table
                    dataSource={dataSource}
                    pagination={{
                        showSizeChanger: false,
                        total: dataSource.length,
                        pageSize: pageSize,
                        position: ['bottomLeft'],
                        itemRender: itemRender,
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => selectRow(record)
                        }
                    }}
                >
                    <Column
                        key="user"
                        title="USER"
                        render={({user}) => (<><Avatar key={user}  />&nbsp;{user}</>)}
                    />
                    <Column
                        key="fees"
                        title="FEES"
                        dataIndex="fees"
                    />
                    
                    <Column
                        key="btn"
                        render={() => (
                            <Button size="small">VIEW</Button>
                        )}
                    />
                </Table>
            </div>
            <Modal visible={visible} footer={null} closable={false} onCancel={handleCancel} className="connect-wallet">
                {selectedData.user}
            </Modal>
        </div>
    );
}