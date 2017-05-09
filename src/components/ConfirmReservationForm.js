import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, FormControl, ControlLabel, Clearfix, Tab, Row, Nav, NavItem, Table, Column, Checkbox } from 'react-bootstrap';
import Formsy from 'formsy-react';

import { DateField, Calendar } from 'react-date-picker';

export default class Login extends Component {

    constructor(props) {
        super(props);
        console.log('ConfirmReservationForm constructor', props)
        this.state = {
            header: new Date(props.date).getDate() + ' ' +
            this.getMonthNames(props.date) + ' (' +
            this.getWeekDayNames(props.date) + ') c ' +
            props.slot + ' - ' +
            props.price + ' р.',
            date: props.date,
            slot: props.slot,
            price: props.price,

        };
    }

    componentWillUpdate(nextProps) {
        console.log('ConfirmReservationForm componentWillUpdate', nextProps)
        if (this.props != nextProps) {
            this.setState({
                date: nextProps.date,
                slot: nextProps.slot,
                price: nextProps.price,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('ConfirmReservationForm componentWillUpdate', nextProps)
        if (this.props != nextProps) {
            this.setState({
                date: nextProps.date,
                slot: nextProps.slot,
                value: nextProps.value,
            })
        }
    }

    getMonthNames = function(date) {
        date = new Date(date) || new Date();
        let monthNames = ['Января', 'Февраля', 'Мара', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
            month = date.getMonth();
        return monthNames[month];
    }

    getWeekDayNames = function(date) {
        date = new Date(date) || new Date
        let dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            days = date.getDay();
        return dayNames[days];
    }


    render () {

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th colSpan="4">{this.state.header}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan="3">Подтвердите</td>
                    <td rowSpan="5">
                        <Calendar
                        dateFormat="YYYY-MM-DD"
                        date={this.state.date}
                        onChange={this.onChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <FormGroup>
                            <ControlLabel>Телефон</ControlLabel>
                            <FormControl.Static>
                                +7 916 541 25 10
                            </FormControl.Static>
                        </FormGroup>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <FormGroup>
                            <ControlLabel>Имя и фамилия</ControlLabel>
                            <FormControl.Static>
                                Иванов Иван Иванович
                            </FormControl.Static>
                        </FormGroup>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <FormGroup>
                        <Checkbox  inline>
                            Тренер  1000 р/ч
                        </Checkbox>
                        <Checkbox inline>
                            Ракетка  300 р/ч
                        </Checkbox>
                        <Checkbox inline>
                            Мячи  100 р/ч
                        </Checkbox>
                        </FormGroup>
                    </td>
                    <td>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Скидка</ControlLabel>
                            <FormControl componentClass="select" placeholder="select">
                                <option value="select">25%</option>
                                <option value="other">50%</option>
                                <option value="other">99%</option>
                            </FormControl>
                        </FormGroup>
                    </td>
                </tr>
                <tr>
                    <td colSpan="3">Дублировать аренду на следующие месяцы
                        <Button type="submit">
                            1
                        </Button>
                        <Button type="submit">
                            2
                        </Button>
                        <Button type="submit">
                            3
                        </Button>
                        <Button type="submit">
                            4
                        </Button>
                        <Button type="submit">
                            5
                        </Button>
                        <Button type="submit">
                            6
                        </Button>
                        <Button type="submit">
                            7
                        </Button>
                        <Button type="submit">
                            8
                        </Button>
                        <Button type="submit">
                            9
                        </Button>
                        <Button type="submit">
                            10
                        </Button>
                        <Button type="submit">
                            11
                        </Button>
                        <Button type="submit">
                            12
                        </Button></td>
                </tr>

                <tr>
                    <td>
                        <Button type="submit">
                            Отмена
                        </Button>
                    </td>
                    <td colSpan="2">Общая сумма {this.state.price} р.</td>
                    <td>
                        <Button type="submit">
                            ОК
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        )
    }

}