import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions';
import Stripe from './Stripe';
import PreviewLayout from '../preview/PreviewLayout';
import './main.css';

class Stripes extends Component {

    setIncreaseButtonToDisabled() {
        let width = 100;
        return (width / this.props.stripes.length) === 1;
    }

    setDecreaseButtonDisabled() {
        return this.props.stripes.length === 2
    }

    getLastIndex() {
        return this.props.stripes.length ? this.props.stripes.length - 2 : 0;
    }

    render() {
        const stripes = this.props.stripes.map((stripe, i) => {
            return (<Stripe key={stripe.id}
                            stripe={stripe}
                            stripesCount={this.props.stripes.length}
                            methods={{
                                changeColour: this.props.actions.changeColour
                            }}
                            index={i}
            />);
        });
        return (
            <div className="stripes-container">
                <div className="main">
                    <div className="container">
                        <div className="main-stripes-container">
                            {stripes}
                        </div>
                        <Controls
                            methods={{
                                removeStripe: this.props.actions.removeStripe,
                                addStripe: this.props.actions.addStripe
                            }}
                            stripes={this.props.stripes}
                            lastIndex={this.getLastIndex()}
                            increaseButtonDisabled={this.setIncreaseButtonToDisabled()}
                            decreaseButtonDisabled={this.setDecreaseButtonDisabled()}
                        />
                    </div>
                </div>
                <div className="preview">
                    <div className="total">Total lines {this.props.stripes.length}</div>
                    <PreviewLayout />
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
        const {stripes} = this.props;
        this.props.methods.addStripe('main', stripes.length);
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

Stripes.propTypes = {
    stripes: PropTypes.array,
    actions: PropTypes.object
};
function mapStateToProps(state) {
    return {
        stripes: state.main
    };
}

const mapStateToDispatch = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)}
};

export default connect(mapStateToProps, mapStateToDispatch)(Stripes);
