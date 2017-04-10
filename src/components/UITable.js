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

    statuses = {
        holden: 'Арендовано',
        free: 'Свободно',
        hiden: 'Занято',
    }

    icons = {
        holden: 'UIpic__leased',
        free: 'UIpic__free',
        hiden: 'UIpic__playball'
    }

    render() {
        return (
            <tr>
                <th></th>
                <td></td>
                <td className="UIclear"><div/></td>
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
        };
        autobind(this);
    }

    render() {
        const _this = this;
        let currentDate = this.props.store.currentDateDay;
        return (
            <div className="UITable">
                <table className="ui compact unstackable table">
                    <thead>
                    <tr>
                        <th><div className="UIpic__time"></div></th>
                        <td><div className="UIpic__cord"><div className="UIpic__num" >{this.props.data.court}</div></div></td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(this.props.data.data, function (object, i) {
                        return <UIRow showed={_this.showed} data={object} key={object._id_} />;
                    }) }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UITable;
