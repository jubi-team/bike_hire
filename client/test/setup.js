require('jsdom-global')()
window.Date = Date;
global.performance = window.performance;
global.expect = require('expect')
