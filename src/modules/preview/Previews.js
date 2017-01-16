import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initPreviewStripe} from './actions/actions';
import Preview from './Preview';
import shortid from 'shortid';

class PreviewStripes extends Component {

    constructor(props){
        super(props);
        this.name = this.props.name || shortid.generate();
        this.props.initPreviewStripe(this.name);
    }

    render() {
        let stripes = this.props.stripesPreview[this.name].map((stripe) => {

              return(<Preview key={stripe.id}
                         stripe={stripe}
                         stripesCount={this.props.stripesPreview[this.name].length}
                />)
            }
        );
        return (
            <div className="preview-container">
                {stripes}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        stripesPreview: state.preview,
        stripes:state.main
    };
}

PreviewStripes.PropTypes = {
    stripesMain: PropTypes.array.isRequired,
    stripesPreview: PropTypes.array.isRequired,
    initPreviewStripe: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {initPreviewStripe})(PreviewStripes);

