import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Layout } from 'antd';

import history from 'utils/history';
import { AppContext } from 'utils/contexts';
import { useEagerConnect, useInactiveListener } from 'utils/hooks';

import LandingPage from 'pages/LandingPage';
import DashboardPage from 'pages/DashboardPage';
import SearchSmartPage from 'pages/SearchSmartPage';
import ReputationPage from 'pages/ReputationPage';
import BorrowPage from 'pages/BorrowPage';
import EarningPage from 'pages/EarningPage';
import HeaderComponent from 'components/HeaderComponent';
import FooterComponent from 'components/FooterComponent';
import AdminUserListPage from 'pages/AdminUserListPage';
import AdminFeesListPage from 'pages/AdminFeesListPage';
import AdminDashboardPage from 'pages/AdminDashboardPage';


const { Header, Content, Footer } = Layout;

const Routes = () => {
    const [activatingConnector, setActivatingConnector] = useState();
    const web3Context = useWeb3React();
    const { connector, library, chainId, account, deactivate, activate, error } = web3Context;
    const { location: { pathname } } = history;

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager || !!activatingConnector)

    return (
        <AppContext.Provider
            value={{
                library,
                activate,
                account,
                chainId,
                deactivate,
                error,
            }}
        >
            <Layout className="container">
                <Header className="header">
                    <HeaderComponent selectedItem={pathname} />
                </Header>
                <Content>
                {
                    account 
                    ? (
                        <Switch>
                            <Route exact path="/" component={DashboardPage} />
                            <Route exact path="/search_smart" component={SearchSmartPage} />
                            <Route exact path="/reputation" component={ReputationPage} />
                            <Route exact path="/borrow" component={BorrowPage} />
                            <Route exact path="/earnings" component={EarningPage} />
                            <Route exact path="/admin/users" component={AdminUserListPage} />
                            <Route exact path="/admin/fees" component={AdminFeesListPage} />
                            <Route exact path="/admin" component={AdminDashboardPage} />
                        </Switch>
                    )
                    :
                    (
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            {/* <Route component={<h1>Not Found</h1>} /> */}
                        </Switch>
                    )
                }
                </Content>
                <Footer className="footer">
                    <FooterComponent />
                </Footer>
            </Layout>
        </AppContext.Provider>
    );
};

export default Routes;