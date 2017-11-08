import c from './c.js';
require.ensure([], function(require){
    var list = require('./list');
    list.show();
}, 'list');
console.log('b');
