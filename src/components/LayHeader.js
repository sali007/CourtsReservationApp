import React, { Component, Proptypes } from 'react';
import Modal, {closeStyle} from 'simple-react-modal';
import autobind from 'react-autobind';
import { observer } from 'mobx-react';
import { DateField, Calendar } from 'react-date-picker';
import Formsy from 'formsy-react';

import 'react-date-picker/index.css'
import './css/LayHeaderFlex.css';

export default class LayHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthorized: false,
            username: 'Гость',
            userId: 0,
            userPhone: '',
            currentDate: null,
            day: null,
            weekDay: null,
            monthNames: null,
            open: false,
            canSubmit: true,
        }
        this.props.getDefaultDate(new Date());
        autobind(this);

        //console.log('Props log', this.props)

    }

    componentWillUpdate(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                currentDate: nextProps.todos.last().date,
                day : new Date(nextProps.todos.last().date).getDate(),
                weekDay: this.getWeekDayNames(nextProps.todos.last().date),
                monthNames: this.getMonthNames(nextProps.todos.last().date)
            });

            console.log('LayHeader ComponentWillUpdate', nextProps)
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth) {
            console.log('LayHeader ComponentWillReceiveProps Received', nextProps.auth.res);
            this.setState({
                _id: nextProps.auth.res.data._id,
                username: nextProps.auth.res.data.email,
                isAuthorized: nextProps.auth.res.data._id != 0 ? true : false,
            })
        }
    }

    show() {
       this.setState({
           open: true
       })
    }

    close() {
        this.setState({
            open: false,
        });
    }

    handleNext = (e) => {
        this.props.nextDate(this.state.currentDate);
    }

    handlePrev = (e) => {
        this.props.previousDate(this.state.currentDate)
    }

    loginPage = (e) => {
        this.props.loginPage(true);
    }

    registerPage = (e) => {
        this.props.loginPage(true);
    }

    getWeekDayNames = function(date) {
        date = new Date(date) || new Date
        let dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чв', 'Пн', 'Сб'],
            days = date.getDay();
        return dayNames[days];
    }

    getMonthNames = function(date) {
        date = new Date(date) || new Date();
        let monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            month = date.getMonth();
        return monthNames[month];
    }

    onChange = (dateString, {dateMoment, timestamp}) => {
        console.log('OnChange', dateString)
        this.props.getDefaultDate(dateString);
        this.close();
    }


    logout() {
        this.props.logout()

    }

    render() {

        return (

            <div className="LayHeader">
                <div className="LayHeader__main LayHeader_container">
                    <div className="LHcontainer">
                        <div className="LHitem item__l">
                            <div>
                                <span className="hadr">Александра Суворова, 56</span><br />
                                <span className="hras">Ежедневно 06:00-24:00, Тел.+7(4012) 50-78-76</span>
                            </div>
                        </div>

                            {/* Tablo*/}
                            <div className="LHcontainer__sub item__d LayHeader__day">
                            {/*Left arrow*/}
                            <div className="LHitem item__la" onClick={this.handlePrev}></div>
                            {/*Tablo day/weekday*/}
                            <div className="LHitem item__de" onClick={this.show}>
                                <div className="LHcenter__day" >{this.state.day}</div>
                                <div className="LHcenter__weekday" >{this.state.weekDay}</div>

                            </div>
                            {/*Right arrow*/}
                            <div className="LHitem item__ra" onClick={this.handleNext}></div>
                            </div>
                        <div className="LHitem item__c" onClick={this.show}></div>

                    </div>
                </div>

                <div className="LayHeader__date LayHeader_container">
                    <div className="LayHeader__arrow">
                        <span className="LayHeader__currentdate" onClick={this.show}>{this.state.monthNames}</span>
                    </div>
                </div>
                {/*Registration Card*/}
                <div className="LayHeader_RC">
                    <div className=" item__reg_zone">
                        <div className="icon_guest"></div>
                        <div className="userId">
                            <p>{this.state.username}</p>
                            {/*<p>{this.state.userId}</p>*/}
                        </div>
                    </div>

                    <div className=" item__user_info">
                        <div className="greeting"><p>Привет, {this.state.username}!</p></div>

                        <div className="phone_num">{this.state.userPhone}</div>
                        <div className={this.state.isAuthorized ? "icon_phone" : "unAuthorized" } ></div>
                        <div className="enterLoginForm" onClick={this.state.isAuthorized ? this.logout : this.loginPage}>
                            {this.state.isAuthorized ? "Выйти" : "Войти"}</div>
                        <div className="rocket"></div>
                    </div>
                </div>
                <Modal
                    containerStyle={{ background: 'white', width: '325px',height: '300px', padding: 2, borderRadius:'6px'}}
                    closeOnOuterClick={true}
                    show={this.state.open}
                    onClose={this.close}
                >
                    <Calendar
                        dateFormat="YYYY-MM-DD"
                        date={this.state.currentDate}
                        onChange={this.onChange}
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

