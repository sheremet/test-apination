import React, {Component} from 'react';

class PreviewStripe extends Component {

    constructor(props) {
        super(props);
        this.changeColour = this.changeColour.bind(this)
    }

    getPreviewStripesWidth() {
        return Math.round(100 / this.props.stripesCount * 10000) / 10000 + '%';
    }

    changeColour() {
        const {stripe, parentId, stripesCount, index, methods} = this.props;
        let config = {
            props: stripe,
            meta: {
                parentId,
                index,
                type: 'preview',
                reverseIndex: stripesCount - index - 1,
                scope: parentId
            }
        };
        methods.changeColour(config);
    }

    render() {
        const {stripe} = this.props;
        return (
            <div className="stripe"
                 onClick={this.changeColour}
                 id={stripe.id}
                 style={{backgroundColor: stripe.colour, width: this.getPreviewStripesWidth()}}
            ></div>)
    }
}


export default PreviewStripe;

