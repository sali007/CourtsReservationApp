import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';


import Notfound from './components/Notfound';
import Layout from './components/Layout';

export default (
        <Route path="/" history={browserHistory} component={Layout}>
            <IndexRoute component={Layout} />
            <Route path="/reservation" component={Layout}/>
            <Route path="/register" component={Layout}/>
            <Route path="/login" component={Layout}/>
        </Route>
)