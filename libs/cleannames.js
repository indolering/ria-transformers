'use strict';

let Transformer = require('./Transformer');
let nc = require('namecase');
let he = require('he');

class CleanNames extends Transformer{
  _string(name) {
    name = name.trim();
    name = he.decode(name);

    name = nc(name, { individualFields : false });

    //restore abbreviations
    name = name.replace(this.regex.co, 'Co');
    name = name.replace(this.regex.inc, 'Inc');
    name = name.replace(this.regex.llc, 'LLC');

    //replace anything that might mess up URL with a space
    name = name.trim();

    //get rid of double spaces introduced by substitution
    name = name.replace(this.regex.dspace, ' ');

    return name;
  }

}

module.exports = new CleanNames();