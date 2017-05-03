import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { observer } from 'mobx-react';
import { IndexRoute, Router, Route, Link, browserHistory, hashHistory } from 'react-router';


import Notfound from './components/Notfound';
import Layout from './components/Layout';
import UITable from './components/UITable'

export default (
        <Route path="/" history={browserHistory} component={Layout}>
            <IndexRoute component={Layout} />
            <Route path="reservation" history={browserHistory} component={Layout}/>
            <Route path="register" history={browserHistory} component={UITable}/>
            <Route path="login" component={Layout}/>
            <Route path="admin" component={UITable}/>
            <Route path="logout" component={Layout}/>
        </Route>
)