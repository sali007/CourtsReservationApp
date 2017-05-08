import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/ToDoActions';
import * as AuthAction from '../actions/AuthActions';
import * as LoginPageActions from '../actions/LoginPageActions';
import { connect } from 'react-redux';

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';

import LayHeader from './LayHeader';
import LayFooter from './LayFooter';
import UITable from './UITable';
import LoginOrRegister from './LoginOrRegister';

import './css/App.css';
import './css/index.css';
import './css/RD.css';

@connect(state => ({
    todos: state.todoss,
    auth: state.auth,
    loginPage: state.loginPage
}))
export default class Layout extends Component {
    constructor(props) {
        super(props);
        console.log('Layout. Constructor', props);
    }

    componentWillUpdate(nextProps) {
        console.log('Layout. ComponentWillUpdate', nextProps);
    }


    render() {
        const { todos, auth, loginPage, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           loginPage={loginPage}
                           {...bindActionCreators(TodoActions, dispatch)}
                           {...bindActionCreators(AuthAction, dispatch)}
                           {...bindActionCreators(LoginPageActions, dispatch)}/>
                {
                    loginPage.state ?
                    <LoginOrRegister loginPage={loginPage}
                                     {...bindActionCreators(AuthAction, dispatch)}
                                     {...bindActionCreators(LoginPageActions, dispatch)}/> : ''
                }
                <div className='flexcontainer'>
                    <UITable todos={todos}
                                 court={0}
                                 {...bindActionCreators(TodoActions, dispatch)}
                    />
                    <UITable todos={todos}
                                 court={1}
                                 {...bindActionCreators(TodoActions, dispatch)}
                    />

                </div>

                <LayFooter />
            </div>
        );

    }
};
