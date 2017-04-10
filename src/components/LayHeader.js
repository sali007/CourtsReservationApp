import React, { Component } from 'react';

import { observer } from 'mobx-react';
import autobind from 'react-autobind';
import moment from 'moment';
import 'moment/locale/ru';

import Modal, {closeStyle} from 'simple-react-modal';
import { DayPicker, constants } from 'react-dates';

import './css/LayHeaderFlex.css';

export default class LayHeader extends Component {
    constructor(props) {
        super(props)
        this.props.getDefaultDate(new Date());
        console.log(this.props.todos.last())
    }

    handleNext = (e) => {
        this.props.nextDate(this.props.todos.last());
    }

    handlePrev = (e) => {
        this.props.previousDate(this.props.todos.last());
    }

    handleCalendar= (e) => {

    }

    getWeekDayNames = function(date) {
        date = date || new Date();
        let dayNames = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sut'],
            days = date.getDay();
        return dayNames[days];
    }

    getMonthNames = function(date) {
        date = date || new Date();
        let monthNames = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novebmer', 'December'],
            month = date.getMonth();
        return monthNames[month];
    }

    render() {

        let date = new Date(this.props.todos.last()),
            day = date.getDate(),
            weekDay = this.getWeekDayNames(date),
            month = this.getMonthNames(date) + " " + date.getFullYear();

        return (

            <div className="LayHeader">

                <div className="LayHeader__main LayHeader_container">
                    <div className="LHcontainer">
                        <div className="LHitem item__l">
                            <div>
                                <span className="hadr">Alexandra Suvorova, 56</span><br />
                                <span className="hras">tel.+7(4012) 50-78-76</span>
                            </div>
                        </div>

                            {/* Tablo*/}
                            <div className="LHcontainer__sub item__d LayHeader__day">
                            {/*Left arrow*/}
                            <div className="LHitem item__la" onClick={this.handlePrev}></div>
                            {/*Tablo day/weekday*/}
                            <div className="LHitem item__de">
                                <div className="LHcenter__day">{day}</div><br/>
                                <div className="LHcenter__weekday">{weekDay}</div>
                            </div>
                            {/*Right arrow*/}
                            <div className="LHitem item__ra" onClick={this.handleNext}></div>
                            </div>
                        <div className="LHitem item__c" onClick={this.handleCalendar}></div>

                        {/*Registration Card*/}
                            <div className="LayHeader_RC">
                                <div className=" item__reg_zone">
                                    <div className="icon_guest"></div>
                                    <div className="userId">
                                        <p>Guest</p>
                                        <p>00004134</p>
                                    </div>
                                </div>

                                <div className=" item__user_info">
                                    <div className="greeting">
                                        <p>Hello Guest!</p>
                                    </div>

                                    <div className="icon_phone"></div>
                                    <div className="phone_num">
                                        <p>79165412510</p>
                                    </div>

                                    <div className="reglink"><p>Registration</p></div>
                                    <div className="rocket"></div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="LayHeader__date LayHeader_container">
                    <div className="LayHeader__arrow">
                        <span className="LayHeader__currentdate">{month}</span>
                    </div>
                </div>

            </div>


        );
    }
}

