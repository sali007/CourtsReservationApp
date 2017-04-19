import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/ToDoActions';
import * as AuthAction from '../actions/AuthActions';
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
    auth: state.auth
}))
export default class Layout extends Component {

    render() {
        const { todos, auth, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           auth={auth}
                           {...bindActionCreators(TodoActions, dispatch)}
                           {...bindActionCreators(AuthAction, dispatch)}/>
                <div className='flexcontainer'>
                     <UITable todos={todos}
                              court={1}
                              {...bindActionCreators(TodoActions, dispatch)}
                         />
                    <UITable todos={todos}
                             court={2}
                             {...bindActionCreators(TodoActions, dispatch)}
                    />
                </div>
                <LayFooter />
            </div>
        );

    }
};
