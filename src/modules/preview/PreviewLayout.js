import React from 'react';
import Previews from './Previews';
import './preview.css';

const PreviewLayout = () => {
    return (
        <div className="prev-ctnr">
            <Previews name="tl"/>
            <Previews name="tr"/>
            <Previews name="bl"/>
            <Previews name="br"/>
        </div>
    )
};

export default PreviewLayout;