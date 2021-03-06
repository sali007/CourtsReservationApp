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
import UITableAdmin from './UITableAdmin';
import LoginOrRegister from './LoginOrRegister';

import './css/App.css';
import './css/index.css';
import './css/RD.css';

@connect(state => ({
    todos: state.todoss,
    user: state.user,
    loginPage: state.loginPage
}))
export default class Layout extends Component {
    constructor(props) {
        super(props);
        console.log('LayoutAdmin. Constructor', props);
    }

    componentWillUpdate(nextProps) {
        console.log('LayoutAdmin. ComponentWillUpdate', nextProps);
    }


    render() {
        const { todos, user, loginPage, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           user={user}
                           admin={true}
                           {...bindActionCreators(TodoActions, dispatch)}
                           {...bindActionCreators(AuthAction, dispatch)}/>
                <div className='flexcontainer'>
                    <UITableAdmin todos={todos}
                                 court={0}
                                 {...bindActionCreators(TodoActions, dispatch)}
                    />
                    <UITableAdmin todos={todos}
                                 court={1}
                                 {...bindActionCreators(TodoActions, dispatch)}
                    />

                </div>

                <LayFooter loginPage={loginPage}
                           user={user}
                           admin={false}
                           {...bindActionCreators(AuthAction, dispatch)}
                           {...bindActionCreators(LoginPageActions, dispatch)}/>
            </div>
        );

    }
};
