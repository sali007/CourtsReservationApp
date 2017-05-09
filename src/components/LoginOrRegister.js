import React, { Component } from 'react';
import autobind from 'react-autobind';
import Formsy from 'formsy-react';
import { observer } from 'mobx-react';

import './css/LoginOrRegister.css';

export default class LoginOrRegister extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            regTitle: 'Регистрация',
            logTitle: 'Авторизация',
            isAuthorizes: false,
            canSubmit : true,
            isRegisterForm: false,
            isLoginForm: false,
            registerFormLink: true,
            loginFormLink: false,
        };
        autobind(this);
    }

    componentWillUpdate(nextProps) {
        console.log('LoginOrRegister ComponentWillUpdate', nextProps)
    }

    cancelLoginPage = (e) => {
        this.props.loginPage(false);
    }

    enableAuthButton() {
        this.setState({
            canSubmit: true
        });
    }

    loginForm() {

        console.log('LoginOrRegister loginForm')
        this.setState({
            loginFormLink: true,
            registerFormLink: false
        })
    }

    registerForm() {

        console.log('LoginOrRegister registerForm')
        this.setState({
            loginFormLink: false,
            registerFormLink: true
        })
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
            this.props.login(model);
            this.props.loginPage(false);
        }
    }

    render() {
        return (
            <div>
              <div className="registerOrLogin">
                  <div className="form_header">
                  <a className={this.state.registerFormLink ? 'active':'inactive'} onClick={this.registerForm}>{this.state.regTitle}</a >
                  <a className={this.state.loginFormLink ? 'active':'inactive'} onClick={this.loginForm}>{this.state.logTitle}</a>
                  </div>
                  <Formsy.Form onValidSubmit={this.submitAuth} onValid={this.enableButton} onInvalid={this.disableButton}>
                      <MyOwnInputAuth autoFocus={true} defStyle="smart__field--tel" placeholder="Введите логин" name="email" required/><br/>
                      <MyOwnInputAuth autoFocus={false} defStyle="smart__field--guest" placeholder="Введите пароль" name="password" required />
                      <button className="form__button--submit" type="submit" disabled={!this.state.canSubmit}>Ok</button>
                      <button className="form__button--submit" type="submit" onClick={this.cancelLoginPage}>Отмена</button>
                 </Formsy.Form>
              </div>
            </div>
        )

    }
}

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