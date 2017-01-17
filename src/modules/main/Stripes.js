import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {addStripe, removeStripe} from './actions/actions';
import Stripe from './Stripe';
import PreviewLayout from '../preview/PreviewLayout';
import './main.css';

class Stripes extends Component {

    setIncreaseButtonToDisabled() {
        let width = 100;
        return (width / this.props.stripes.length) === 1;
    }

    setDecreaseButtonDisabled() {
        return this.props.stripes.length === 1
    }

    getLastIndex() {
        return this.props.stripes.length ? this.props.stripes[this.props.stripes.length - 1].id : 1;
    }

    render() {
        const stripes = this.props.stripes.map((stripe) => {
            return (<Stripe key={stripe.id}
                            stripe={stripe}
                            stripesCount={this.props.stripes.length}
            />);
        });
        return (
            <div className="stripes-container">
                <div className="main">
                    <div className="container">
                        <div className="main-stripes-container">{stripes}</div>
                        <Controls
                            methods={{
                                removeStripe: this.props.removeStripe,
                                addStripe: this.props.addStripe
                            }}
                            lastIndex={this.getLastIndex()}
                            increaseButtonDisabled={this.setIncreaseButtonToDisabled()}
                            decreaseButtonDisabled={this.setDecreaseButtonDisabled()}
                        />
                    </div>
                </div>
                <div className="preview">
                    <div className="total">Total lines {this.props.stripes.length}</div>
                    <PreviewLayout/>
                </div>
            </div>
        );
    }
}
class Controls extends Component {

    constructor(props) {
        super(props);
        this.addStripe = this.addStripe.bind(this);
        this.removeStripe = this.removeStripe.bind(this);
    }

    removeStripe() {
        this.props.methods.removeStripe(this.props.lastIndex);
    }

    addStripe() {
        this.props.methods.addStripe();
    }

    render() {
        return (
            <div className="container-controls">
                <div className="controls">
                    <button onClick={this.removeStripe} disabled={this.props.decreaseButtonDisabled}>-</button>
                    <button onClick={this.addStripe} disabled={this.props.increaseButtonDisabled}>+</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        type: state.type,
        stripes: state.main
    };
}

Stripes.PropTypes = {
    stripes: PropTypes.array.isRequired,
    removeStripe: PropTypes.func.isRequired,
    addStripe: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {removeStripe, addStripe})(Stripes);
