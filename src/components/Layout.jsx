import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as TodoActions from '../actions/ToDoActions';
import { connect } from 'react-redux'

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';

import LayHeader from './LayHeader';
import LayFooter from './LayFooter';
import UITable from './UITable';
import TodosForm from './TodosForm';
import TodosView from './TodosView';

import { Store, Courts } from './Storage';

import './css/App.css';

const store = new Store();

@connect(state => ({ todos: state.todoss }))
export default class Layout extends Component {

    render() {
        const { todos, dispatch } = this.props;

        return (
            <div className="App">
                <LayHeader todos={todos}
                           {...bindActionCreators(TodoActions, dispatch)}/>
                <div className='flexcontainer'>
                    {/* <TodosView todos={todos}
                                 {...bindActionCreators(TodoActions, dispatch)} />
                    <TodosForm
                        {...bindActionCreators(TodoActions, dispatch)} />*/}
                    <UITable store={store} data={Courts(0, 327508723875) } />
                     <UITable store={store} data={Courts(0, 327508723875) } />
                </div>
                <LayFooter />
            </div>
        );

    }
};
