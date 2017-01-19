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

export class iArr {

    constructor(arr){
        this.arr = arr;
        this.arrLen = arr.length;
    }
    removeFromStart(){
        return [
            ...this.arr.slice(1, this.arrLen)
        ]
    }
    removeFromEnd(){
        return [
            ...this.arr.slice(0, this.arrLen - 1)
        ]
    }
    addToStart(val){
        return [
            val,
            ...this.arr
        ]
    }
    addToEnd(val){
        return [
            ...this.arr,
            val
        ]
    }

    insertToIndex(index, values){
        values = Array.isArray(values) ? values : [values];
        return [
            ...this.arr.slice(0, index),
            ...values,
            ...this.arr.slice(index, this.arrLen)
        ]
    }

    removeFromIndex(index){
        return [
            ...this.arr.slice(0, index),
            ...this.arr.slice(index + 1)
        ]
    }
}

let helper = {
    colour,
    random,
    changeColourOfStripe
};

export default helper;
