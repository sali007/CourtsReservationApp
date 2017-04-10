import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import * as datePickerActions from '../actions/ToDoActions';
import { connect } from 'react-redux'

import autobind from 'react-autobind';
import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import moment from 'moment';
moment.locale('ru');

import Notfound from './Notfound';
import Layout from './Layout';
import LayHeader from './LayHeader';
import LayFooter from './LayFooter';
import UITable from './UITable';

import { Store, Courts } from './Storage';

import './css/App.css';

const Court = observer(class Court extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.params.hasOwnProperty('date')) {
            return (
                <div className='flexcontainer'>
                    <UITable data={Courts(0, this.props.params.date) } />
                </div>
            );
        } else {
            return (
                <div>
                    no
                </div>
            );
        }
    }
});