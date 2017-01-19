import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {initPreviewStripe} from './actions/actions';
import Preview from './Preview';
import {generate} from 'shortid';
import {changeColourOfStripe} from '../../shared/helper';

class PreviewStripes extends Component {

    constructor(props) {
        super(props);
        this.name = this.props.name || generate();
        this.props.initPreviewStripe(this.name);
    }

    clicked(e){
        let self = this;
        changeColourOfStripe(e, self, 'stripesPreview', this.name);
    }

    render() {
        let stripes = this.props.stripesPreview[this.name].map((stripe) => {
            return (<Preview key={stripe.id}
                             stripe={stripe}
                             stripesCount={this.props.stripesPreview[this.name].length}
            />)
        });
        return (
            <div className="preview-container" onClick={this.clicked.bind(this)}>
                {stripes}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        stripesPreview: state.preview,
        stripes: state.main
    };
}

PreviewStripes.PropTypes = {
    stripesMain: PropTypes.array.isRequired,
    stripesPreview: PropTypes.object.isRequired,
    initPreviewStripe: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {initPreviewStripe})(PreviewStripes);

