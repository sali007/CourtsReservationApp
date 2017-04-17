import React, { Component, Proptypes } from 'react';
import Modal, {closeStyle} from 'simple-react-modal';
import autobind from 'react-autobind';
import { observer } from 'mobx-react';
import { DateField, Calendar } from 'react-date-picker';

import 'react-date-picker/index.css'
import './css/LayHeaderFlex.css';

export default class LayHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: null,
            day: null,
            weekDay: null,
            monthNames: null,
            open: ''
        }
        this.props.getDefaultDate(new Date());
        autobind(this);

    }

    componentWillUpdate(nextProps) {
        if(this.props !== nextProps) {
            this.setState({
                currentDate: nextProps.todos.last().date,
                day : new Date(nextProps.todos.last().date).getDate(),
                weekDay: this.getWeekDayNames(nextProps.todos.last().date),
                monthNames: this.getMonthNames(nextProps.todos.last().date),
            })
            console.log('LayHeader ComponentWillUpdate', new Date(nextProps.todos.last().date).toString())
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

    getWeekDayNames = function(date) {
        date = new Date(date) || new Date
        let dayNames = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sut'],
            days = date.getDay();
        return dayNames[days];
    }

    getMonthNames = function(date) {
        date = new Date(date) || new Date();
        let monthNames = ['January', 'Febrary', 'March', '������', 'May', 'June', 'July', 'August', 'September', 'October', 'Novebmer', 'December'],
            month = date.getMonth();
        return monthNames[month];
    }

    onChange = (dateString, {dateMoment, timestamp}) => {
        console.log('OnChange', dateString)
        this.props.getDefaultDate(dateString);
        this.close();
    }

    render() {


        return (

            <div className="LayHeader">
                <div className="LayHeader__main LayHeader_container">
                    <div className="LHcontainer">
                        <div className="LHitem item__l">
                            <div>
                                <span className="hadr">���������� ��������, 56</span><br />
                                <span className="hras">���.+7(4012) 50-78-76</span>
                            </div>
                        </div>

                            {/* Tablo*/}
                            <div className="LHcontainer__sub item__d LayHeader__day">
                            {/*Left arrow*/}
                            <div className="LHitem item__la" onClick={this.handlePrev}></div>
                            {/*Tablo day/weekday*/}
                            <div className="LHitem item__de" onClick={this.show}>
                                <div className="LHcenter__day" >{this.state.day}</div><br/>
                                <div className="LHcenter__weekday" >{this.state.weekDay}</div>
                            </div>
                            {/*Right arrow*/}
                            <div className="LHitem item__ra" onClick={this.handleNext}></div>
                            </div>
                        <div className="LHitem item__c" onClick={this.show}></div>

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
                                        <p>������, �����!</p>
                                    </div>

                                    <div className="icon_phone"></div>
                                    <div className="phone_num">
                                        <p>79165412510</p>
                                    </div>

                                    <div className="reglink"><p>�����������</p></div>
                                    <div className="rocket"></div>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="LayHeader__date LayHeader_container">
                    <div className="LayHeader__arrow">
                        <span className="LayHeader__currentdate" >{this.state.monthNames}</span>
                    </div>
                </div>
                <Modal
                    containerStyle={{ background: 'white', width: '320px', padding: 0, borderRadius:'6px'}}
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

