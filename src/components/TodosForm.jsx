import React from 'react';

export default class TodosForm extends React.Component {
    handleSubmit = () => {
        let node = this.refs['todo-input'].value;

        this.props.createTodo(node);

        node = '';
    }

    render() {
        return (
            <div id="todo-form">
                <input type="text" placeholder="type todo" ref="todo-input" />
                <input type="submit" value="OK!" onClick={this.handleSubmit} />
            </div>
        );
    }
}