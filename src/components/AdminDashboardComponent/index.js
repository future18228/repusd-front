import React from 'react';
import { Card, Input } from 'antd';

import './style.css';

const { Search } = Input;

export default (props) => {
    const { changePage } = props;

    const onSearch = value => {
        changePage(true);
    };

    return (
        <div className="admin-dashboard">
            <Card className="admin-dashboard-card">
                <p className="admin-dashboard-card-title">ADMIN DASHBOARD</p>
                <p className="admin-dashboard-explain-large">
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                </p>
                <p className="admin-dashboard-explain-medium">
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                </p>
                <p className="admin-dashboard-explain-small">
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                 </p>
                <p className="admin-dashboard-explain-tiny">
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                    This is test.This is test.This is test.This is test.This is test.This is test.This is test.
                </p>
            </Card>
        </div>
    );
}