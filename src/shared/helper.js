export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const colour = () => {

    const generate = (r, g, b) => {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

    const red = () => {
        return generate(255, 99, 71);
    };

    const white = () => {
        return generate(255, 255, 255);
    };

    const silver = () => {
        return generate(192, 192, 192);
    };

    const withoutRed = () =>{
        return generate(0, random(0, 255), random(0, 255));
    };


    return {
        generate,
        red,
        white,
        silver,
        withoutRed
    }
};

export const changeColourOfStripe = (e, ctx, keyName, scope)=>{
    let scopeCtx = scope ? ctx.props[keyName][scope] : ctx.props[keyName];
    scopeCtx.forEach(function (v, k) {
        if(v.id === e.nativeEvent.target.id
            && !scopeCtx[k].colourChanged
            && !scopeCtx[k].isRed
        ){
            e.nativeEvent.target.style.backgroundColor = colour().withoutRed();
            scopeCtx[k].colourChanged = true;
        }
    });
};

let helper = {
    colour,
    random,
    changeColourOfStripe
};

export default helper;
