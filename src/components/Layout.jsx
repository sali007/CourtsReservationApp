import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/ToDoActions';
import { connect } from 'react-redux'

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';

import LayHeader from './LayHeader';
import LayFooter from './LayFooter';
import UITable from './UITable';

import './css/App.css';

@connect(state => ({ todos: state.todoss }))
export default class Layout extends Component {

    render() {
        const { todos, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           {...bindActionCreators(TodoActions, dispatch)}/>
                <div className='flexcontainer'>
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
