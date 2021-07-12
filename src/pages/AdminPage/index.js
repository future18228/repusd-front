import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardComponent from 'components/DashboardComponent';
import BorrowComponent  from 'components/BorrowComponent'
import ReputationComponent from 'components/ReputationComponent';
export default () => {
    return (
        <Switch>
            <Route path="/admin" component={ReputationComponent} />
            <Route path="/admin/users"  component={DashboardComponent} />
            <Route path="/admin/fees"  component={BorrowComponent} />
        </Switch>
    );
}