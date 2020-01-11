
const __functions = [
    'sortBy',
    'groupBy',
    'flatMap',
    'isEqual'
];

define(
    __functions.map(f => 'lodash/' + f), 
function () {
    let lib = {};
    for (let i = 0; i < arguments.length; i++) {
        lib[__functions[i]] = arguments[i];
    }
    return lib;
});