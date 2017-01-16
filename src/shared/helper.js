const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const colour = () => {

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

let helper = {
    colour,
    random
};

export default helper;
