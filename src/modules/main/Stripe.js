import React, {Component} from 'react';

class Stripe extends Component {

    constructor(props) {
        super(props);
        this.changeColour = this.changeColour.bind(this)
    }

    changeColour() {
        const {stripe, index, methods, stripesCount} = this.props;
        methods.changeColour({
            props: stripe,
            meta: {
                index,
                reverseIndex: stripesCount - index - 1,
                scope: 'main'
            }
        });
    }

    getStripesWidth() {
        return Math.round(100 / this.props.stripesCount * 10000) / 10000 + '%';
    }

    render() {
        return (
            <div className="stripe"
                 onClick={this.changeColour}
                 id={this.props.stripe.id}
                 style={{backgroundColor: this.props.stripe.colour, width: this.getStripesWidth()}}
            ></div>)
    }
}


export default Stripe;
