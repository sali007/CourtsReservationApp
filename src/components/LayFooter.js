/* LayFooter */

import React, { Component } from 'react';
import Modal, {closeStyle} from 'simple-react-modal';
import Formsy from 'formsy-react';
import autobind from 'react-autobind';
import moment from 'moment';
import 'moment/locale/ru';
import './css/LayFooter.css';

class LayFooter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isAdmin: false,
            authenticated: false,
            open: false,
            canSubmit: true,
            slot: '',
        };
        autobind(this);
    }

    componentWillUpdate(nextProps) {
        console.log('LayFooter ComponentWillUpdate', nextProps)
        if(nextProps != this.props) {
            this.setState({
                authenticated: nextProps.user.authenticated
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('LayFooter ComponentWillReceiveProps', nextProps)
        if (nextProps != this.props) {
            this.setState({
                isAdmin: nextProps.admin,
                authenticated: nextProps.user.authenticated
            })
        }
    }

    logout() {
        console.log('LayHeader logout', this.props)
        this.props.logOut(this.state.isAdmin);

    }

    loginPage = (e) => {
        this.props.loginPage(true);
    }

    render() {

        return (
            <div className="LayFooter">
                <div className="LayFooter__main">Аренда теннисных кортов <a onClick={this.state.authenticated == true ? this.logout : this.loginPage}>{this.state.authenticated == true ? "Выйти" : "Войти"}</a></div>
            </div>
        );
    }
}

export default LayFooter;
