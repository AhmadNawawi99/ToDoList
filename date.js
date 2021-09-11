
exports.getDate = function(){
    let day = new Date();
    
    let options = {
        weekday : 'long',
        day : 'numeric',
        year : 'numeric',
        month : 'long'
    };
    options = Object.freeze(options);
    return day.toLocaleDateString('en-US', options)
};

exports.getDay = function(){
    let day = new Date();
    
    let options = {
        weekday : 'long',
    };
    options = Object.freeze(options);
    return day.toLocaleDateString('en-US', options)
};

exports.getMonth = function(){
    let day = new Date();
    
    let options = {
        month : 'long'
    };
    options = Object.freeze(options);
    return day.toLocaleDateString('en-US', options)
};

exports.getYear = function(){
    let day = new Date();
    
    let options = {
        year : 'numeric',
    };
    options = Object.freeze(options);
    return day.toLocaleDateString('en-US', options)
};


