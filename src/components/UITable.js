//'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autobind from 'react-autobind';

import moment from 'moment';
import 'moment/locale/ru';
import ax from 'superagent';

import Formsy from 'formsy-react';
import Modal, {closeStyle} from 'simple-react-modal';
import './css/UITable.css';

class UIRow extends Component {
    constructor(props) {
        super(props)
    }


    statuses = {
        holden: 'Арендовано',
        free: 'Свободно',
        hiden: 'Арендовано на долгий срок',
    }

    icons = {
        holden: 'UIpic__leased',
        free: 'UIpic__free',
        hiden: 'UIpic__playball'
    }

    render() {
        return (
            <tr className={this.props.data.status} onClick={this.props.showed.bind(null, this.props.data)}>
                <th>{this.props.data.timeslot}</th>
                <td>{this.props.data.value}  {this.statuses[this.props.data.status]}</td>
                <td className="UIclear"><div className={this.icons[this.props.data.status]} /></td>
            </tr>
        );
    }
}

class UITable extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            openErr: false,
            canSubmit: true,
            slot: '',
            hour: '',
            value: '',
            court: '',
            _id: 0,
            date: Date.now(),
            schedule: null,
            currentUIRowStatus: null,
        };
        autobind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps) {

                console.log('UITABLE ComponentWillReceiveProps Received', nextProps.todos.last().res.data);
                this.setState({
                    _id: nextProps.todos.last().res.data._id,
                    date: nextProps.todos.last().date,
                    schedule: nextProps.todos.last().res.data.data,
                    court: nextProps.court
                })
            console.log('Court number',nextProps.court)
        }
    }

    close(submitted) {
        console.log('close', submitted)
        if(submitted == true) {
            this.setState({
                open: false,
            });
            console.log('close submitted', this.state);
        } else {
            console.log('close unsubmitted', this.state);
            this.setState({
                open: false,
            });
        }
    }

    closeErr() {
        console.log('close err');
        this.setState({
            openErr: false
        })
    }

    showed(slot) {
        if(slot.status == 'holden') {
            this.setState({
                openErr: open
            })
        } else {
            console.log('show slot', slot);
            this.setState({
                open: true,
                slot: slot.timeslot,
                hour: slot.hour,
                value: slot.value,
                court: this.state.court,
                currentUIRowStatus: slot
            });
        }
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
        this.setState({
            currentUIRowStatus: this.state.currentUIRowStatus.status = 'holden'
        })

        this.props.addReserve(
            this.state._id,
            this.state.date,
            this.state.court,
            model.userName,
            model.phone,
            this.state.hour,
            this.state.value,
            this.state.currentUIRowStatus.status
        )
        this.close(true);
    }
    render() {

        const _this = this;

        return (
            <div className="UITable">
                <table className="ui compact unstackable table">
                    <thead>
                    <tr>
                        <th><div className="UIpic__time"></div></th>
                        <td><div className="UIpic__cord"><div className="UIpic__num" >{this.state.court}</div></div></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>

                    {_.map(this.state.schedule, function (object, i) {
                        return <UIRow showed={_this.showed}
                                          data={object}
                                          key={object._id_}
                                          />;
                    })
                    }
                    </tbody>
                </table>
                <Modal
                    containerStyle={{ background: 'white', width: '350px', padding: 0, borderRadius:'6px' }}
                    closeOnOuterClick={true}
                    show={this.state.open}
                    onClose={this.close}
                >
                    <div className="form__header">Чтобы записаться оставьте свои контактные данные
                    </div>
                    <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                        <MyOwnInput autoFocus={true} defStyle="smart__field--tel" placeholder="Напишите телефон для связи с Вами" name="phone" required/><br/>
                        <MyOwnInput autoFocus={false} defStyle="smart__field--guest" placeholder="Введите имя и фамилию" name="userName" />
                        <button className="form__button--submit" type="submit" disabled={!this.state.canSubmit}>Ok</button>
                    </Formsy.Form>
                </Modal>
                <Modal
                    containerStyle={{ background: 'white', width: '350px', padding: 0, borderRadius:'6px' }}
                    closeOnOuterClick={true}
                    show={this.state.openErr}
                    onClose={this.closeErr}
                >
                    <div className="form__header">Извините, но это время уже занято, выберите другое удобное для Вас.</div>
                    <Formsy.Form onValid={this.enableButton}>
                        <button className="form__button--submit" type="submit">Ok</button>
                    </Formsy.Form>
                </Modal>
            </div>
        );
    }
}

const MyOwnInput = React.createClass({
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

export default UITable;
