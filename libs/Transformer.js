'use strict';

class Transformer {

  constructor() {
    this.regex = {
      amp: /&(?![a-zA-Z0-9]+;)/ig, //regex that tries to avoid HTML encoded special chars https://www.debuggex.com/r/RZ_U47xC54Mr2AIm
      co: /(\b)(co\.*$)/i, //(wordbreak)(`co` followed by 0+ periods at end of the string) https://www.debuggex.com/r/9qo3gSnjd7ouz-Qm
      inc: /(\b)(inc\.*$)/i, //(wordbreak)(`inc` followed by 0+ periods at end of the string) https://www.debuggex.com/r/9qo3gSnjd7ouz-Qm
      llc: /(\b)(llc\.*$)/i, //(wordbreak)(`inc` followed by 0+ periods at end of the string) https://www.debuggex.com/r/9qo3gSnjd7ouz-Qm
      special: /[^a-zA-Z0-9\s-]/ig, //anything that messes up the URL formatting
      ddash: /-{2,}/g, //double dash detection
      dspace: /\s{2,}/g,
      spaces: /\s+/g,
      startDash: /^-/,
      endDash: /-$/,
    };
  }

  /**
   * @param string {String} String to be transformed
   * @returns {string} Transformed string.
   */
  _string(string) {
    return string.trim();
  }

  _obj(doc, field, overwrite) {
    let value = null;
    if(typeof doc[field] === 'string'){
      value = this._string(doc[field]);
    }
    if(value !== null){
      this._appy(doc, field, overwrite, value);
    }
    return doc;
  }

  _apply(o, field, overwrite, value) {
    if (!field) { //or fieldName = fieldName || "name"
      throw 'fieldName was not defined!';
    } else if (!o[field] || overwrite) {
      o[field] = value;
    }
    return o;
  }

  /**
   * Primary Transformer interface
   * @param input {string|object|Array} Object to be transformed
   * @param [fieldName] {String}  Semi-optional (depends on transformer), will always be used if supplied
   * @param [overwrite] {Boolean} Overwrite existing field?
   */
  trans(input, fieldName, overwrite) {
    if (typeof input === 'string') {
      return this._string(input);
    } else if (typeof input === 'number') {
      return this._string(input.toString());
    // } else if (Array.isArray(input)) {
    //   return input.map(i => {
    //     return this.clean(i, fieldName, overwrite);
    //   });
    } else if (typeof input === 'object') {
      return this._obj(input, fieldName, overwrite);
    } else if (!input) { //or throw
      return null;
    } else {
      return input;
    }
  }
}

module.exports = Transformer;