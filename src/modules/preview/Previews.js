import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/actions';
import Preview from './Preview';
import {generate} from 'shortid';
class PreviewStripes extends Component {

    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.props.actions.initPreviewStripe(this.name);
    }

    render() {
        let stripesPreview = this.props.stripesPreview[this.name];
        if (stripesPreview) {
            let stripes = stripesPreview.map((stripe, i) => {
                return (<Preview key={stripe.id}
                                 stripe={stripe}
                                 parentId={this.name}
                                 stripesCount={stripesPreview.length}
                                 methods={{changeColour: this.props.actions.changeColour}}
                                 index={i}
                />)
            });

            return (
                <div className="preview-container">
                    {stripes}
                </div>
            );
        }
        return null;

    }
}

PreviewStripes.propTypes = {
    stripesPreview: PropTypes.object,
    actions: PropTypes.object.isRequired,
    changeColour: PropTypes.func,
    name: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        name: ownProps.name || generate(),
        stripesPreview: state.preview,
        stripes: state.main
    };

};


const mapStateToDispatch = (dispatch) => {
    return {actions: bindActionCreators(actions, dispatch)}
};

export default connect(mapStateToProps, mapStateToDispatch)(PreviewStripes);

