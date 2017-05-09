import _ from 'lodash';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autobind from 'react-autobind';

import ConfirmRegistrationForm from './ConfirmReservationForm';
import Formsy from 'formsy-react';
import Modal, {closeStyle} from 'simple-react-modal';
import './css/UITable.css';

class UIRow extends Component {
    constructor(props) {
        super(props)
    }


    statuses = {
        holden: 'Бронь',
        free: 'Свободно',
        hiden: 'Арендовано на долгий срок',
        confirmed: 'Арендовано'

    }

    icons = {
        holden: 'UIpic__reserved',
        free: 'UIpic__free',
        hiden: 'UIpic__playball',
        confirmed: ''
    }

    render() {
        return (
            <tr className={this.props.data.status == 'holden' ? this.props.data.status + '_admin' : this.props.data.status}
                onClick={this.props.showed.bind(null, this.props.data)}>
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
            canSubmit: true,
            slot: '',
            hour: '',
            value: '',
            court: null,
            _id: 0,
            date: null,
            schedule: null,
            currentUIRowStatus: null,
        };
        autobind(this);
        console.log('UITable constructor')
    }

    componentWillUpdate(nextProps) {
        if(this.props !== nextProps) {
            console.log('UITableAdmin componentWillUpdate', nextProps)
            this.setState({
                date: nextProps.todos.last().date,
                court: nextProps.court
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {

            console.log('UITABLEAdmin ComponentWillReceiveProps Received', nextProps.todos.last());
            this.setState({
                date: nextProps.todos.last().date,
                _id: nextProps.todos.last().data[nextProps.court]._id,
                schedule: nextProps.todos.last().data[nextProps.court].data,
                court: nextProps.todos.last().data[nextProps.court].court
            })
            console.log('Court number',nextProps.court);
            console.log('Court object id', nextProps.todos.last().data[nextProps.court]._id)
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
        console.log('Court number', this.state.court)
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
            model.username,
            model.phone,
            this.state.hour,
            this.state.value,
            this.state.currentUIRowStatus.status
        )
        //this.props.getDefaultDate(this.state.date);
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
                    containerStyle={{ background: 'grey',  padding: 0, borderRadius:'6px' }}
                    closeOnOuterClick={true}
                    show={this.state.open}
                    onClose={this.close}
                >

                    <ConfirmRegistrationForm date={this.state.date}
                                             slot={this.state.slot}
                                             price={this.state.value}
                    />
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
