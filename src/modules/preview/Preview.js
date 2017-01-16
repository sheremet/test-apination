import React, {Component} from 'react';

class PreviewStripe extends Component{

    getPreviewStripesWidth(){
        return  Math.round(100/this.props.stripesCount * 100000) / 100000+'%';
    }

    render(){
        return(
            <div className="stripe"
                 id={this.props.stripe.id}
                 style={{backgroundColor:this.props.stripe.colour, width: this.getPreviewStripesWidth()}}
            ></div>)
    }
}


export default PreviewStripe;

