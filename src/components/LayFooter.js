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
            open: false,
            canSubmit: true,
            slot: '',
        };
        autobind(this);
    }
    close() {
        console.log('close', this.state);
        this.setState({
            open: false,
        });
    }
    show() {
        console.log('show', this.state);
        this.setState({
            open: true,
        });
    }
    showed(slot) {
        console.log('show slot', slot);
        this.setState({
            open: true,
            slot: slot.timeslot,
        });
    }
    enableButton() {
        this.setState({
            canSubmit: true
        });
    }
    disableButton() {
        this.setState({
            canSubmit: false
        });
    }
    submit(model) {
        console.log('login', model.username, model.password);
        fetch(this.props.store.domain + '/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: model.username,
                password: model.password
            })
        }).then(
            function (d) {
                d.json().then(function (data) {
                    console.log('fetch post', data);
                });
            }
        );
        this.close();
    }
    redirect() {
        window.location.href = this.props.store.vision_href;
    }
    login() {
        console.log('login');
    }
    render() {

        return (
            <div className="LayFooter">
                <div className="LayFooter__main">&copy; Теннисный клуб Корона <spam></spam></div>
            </div>
        );
    }
}

export default LayFooter;
