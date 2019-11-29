
const {ChartStage, ChartUtils, Theme} = require('../distribution/index.js');
let moment = require('moment-timezone');

let chart = new ChartStage(new Theme().GetClassic());


console.log(JSON.stringify(chart));