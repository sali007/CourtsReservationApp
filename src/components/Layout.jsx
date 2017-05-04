import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/ToDoActions';
import * as AuthAction from '../actions/AuthActions';
import * as LoginFormActions from '../actions/LoginFormActions';
import { connect } from 'react-redux'

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';

import LayHeader from './LayHeader';
import LayFooter from './LayFooter';
import UITable from './UITable';

import './css/App.css';
import './css/index.css';
import './css/RD.css';

@connect(state => ({
    todos: state.todoss,
    auth: state.auth,
    loginForm: state.loginForm
}))
export default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {

    }

    render() {
        const { todos, auth, loginForm, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           auth={auth}
                           loginForm={loginForm}
                           {...bindActionCreators(TodoActions, dispatch)}
                           {...bindActionCreators(AuthAction, dispatch)}/>
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
