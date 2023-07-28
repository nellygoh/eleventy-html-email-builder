'use strict';

var customHelpers  = require('handlebars');
const handlebarsHelpers = require('handlebars-helpers')()
const EMAIL_MAX_WIDTH = 640;

customHelpers.registerHelper('repeatUntil', function (startIndex, lastIndex, item) {
    let content = ''
    while (++startIndex < lastIndex) {
        content += item.fn(startIndex)
    }
    return content
});


customHelpers.registerHelper('concat', function() {
    let params = [...arguments].slice(0, -1);
    return [...params].join('');
});


customHelpers.registerHelper('surroundWithCurlyBraces', function(txt) {
    let res = '{{ ' + txt + ' }}';
    return new customHelpers.SafeString(res);
});

customHelpers.registerHelper('compare', function(a, operator, b) {
    switch (operator) {
        case "==": case "eq": return a == b;
        case "===": return a === b;
        case "!=": case "neq": return a != b;
        case "!==": return a !== b;
        case "lt": case "<": return a < b;
        case "lte": case "<=": return a <= b;
        case "gt": case ">": return a > b;
        case "gte": case ">=": return a >= b;
        default: return false;
    }
});

customHelpers.registerHelper('indexOf', function(arr, index) {
    return arr[index];
});

customHelpers.registerHelper('isSmallImage', function(val) {
    let imageWidth = parseInt(val);
    return imageWidth < EMAIL_MAX_WIDTH;
});

module.exports = { ...handlebarsHelpers, customHelpers };
