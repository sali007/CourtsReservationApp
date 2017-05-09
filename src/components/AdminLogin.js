import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import { observer } from 'mobx-react';

import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../actions/AuthActions';

import './css/LoginOrRegister.css';
import './css/App.css';

class AdminLogin extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errorMessage: '',
            logTitle: 'Авторизация',
            canSubmit : true,
            loginFormLink: false,
        };
        autobind(this);
    }

    componentWillUpdate(nextProps) {
        console.log('LoginOrRegister ComponentWillUpdate', nextProps)
    }

    componentWillReceiveProps(nextProps) {
        console.log('LoginOrRegister ComponentWillReceiveProps', nextProps)
        this.setState({
            errorMessage: nextProps.user.message
        })
    }

    cancelLoginPage = (e) => {
        this.props.loginPage(false);
    }

    disableAuthButton() {
        this.setState({
            canSubmit: false
        });
    }

    submitAuth(model) {
        console.log('auth data', model)
        if (this.state.regForm) {

        } else
        {
            this.props.manualLogin(model, true);
        }
    }

    render() {
        return (
            <div className="App">
                <div className="registerOrLogin">
                    <div className="form_header">
                        <a className='active'>{this.state.logTitle}</a>
                    </div>
                    <Formsy.Form onValidSubmit={this.submitAuth} onValid={this.enableButton} onInvalid={this.disableButton}>
                        <MyOwnInputAuth autoFocus={true} defStyle="smart__field--tel" placeholder="Введите логин" name="email" required/><br/>
                        <MyOwnInputAuth autoFocus={false} defStyle="smart__field--guest" placeholder="Введите пароль" name="password" required />
                        <button className="form__button--submit" type="submit" disabled={!this.state.canSubmit}>Ok</button>
                        <button className="form__button--submit" type="submit" onClick={this.cancelLoginPage}>Отмена</button>
                    </Formsy.Form>
                    <div className="error">{this.state.errorMessage}</div>
                </div>
            </div>
        )

    }
}

function mapStateToProps({user}) {
    return {
        user
    };
}

export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(AdminLogin);


const MyOwnInputAuth = React.createClass({
    mixins: [Formsy.Mixin],
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {
        const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
        const errorMessage = this.getErrorMessage();
        const defStyle = className + ' ' + this.props.defStyle;
        return (
            <div className={defStyle}>
                <input autoFocus={this.props.autoFocus} type="text" placeholder={this.props.placeholder} onChange={this.changeValue} value={this.getValue() }/>
                <div>{errorMessage}</div>
            </div>
        );
    }
});