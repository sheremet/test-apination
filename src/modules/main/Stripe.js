import React, {Component} from 'react';

class Stripe extends Component{


    getStripesWidth(){
        return  Math.round(100/this.props.stripesCount * 10000) / 10000+'%';
    }

    render(){
        return(
            <div className="stripe"
                 id={this.props.stripe.id}
                 style={{backgroundColor:this.props.stripe.colour, width: this.getStripesWidth()}}
            ></div>)
    }
}


export default Stripe;
