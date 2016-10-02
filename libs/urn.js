'use strict';

let Transformer = require('./Transformer');

class URN extends Transformer{
  _string(name) {
    name = name.toLowerCase().trim();

    // '&' -> ' and '
    name = name.replace(this.regex.amp, ' and '); //replace all ampersands with ' and '

    //get rid of acronyms
    name = name.replace(this.regex.co, '$1');
    name = name.replace(this.regex.inc, '$1');
    name = name.replace(this.regex.llc, '$1');


    //replace anything that might mess up URL with a space
    name = name.replace(this.regex.special, ' ');
    name = name.trim();

    //replace all spaces with '-'
    name = name.replace(this.regex.spaces, '-');
    name = name.replace(this.regex.ddash, '-'); //collapse double spaces caused by removing punctuation

    return name;
  }

  _obj(doc, fieldName, overwrite) {
    fieldName = fieldName || 'urn';

    let value = '';

    if (doc.source_type === 'advisor' && doc.Info_firstlast) {
      value = doc.Info_firstlast;
    } else if (doc.business_name) {
      value = doc.business_name;
    } else if (doc.legal_name) {
      value = doc.legal_name;
    }

    value = this._string(value);

    let id = doc.id || doc._id || '';

    if(id){
      // let i = id.indexOf('_');  //'012_45' = 3
      //
      // if(i > -1){
      //   id = 'A' + id.slice(i + 1); //'45'
      // } else {
      //   id = 'F' + id;
      // }

      value = value + '-' + id;
    }
    return this._apply(doc, fieldName, overwrite, value);
  }
}

module.exports = new URN();