'use strict';

let should = require('should');
let t = require('../transformers');
let urn = t.urn;
let cn = t.cn;

function genDoc(fields) {
  let doc = {
    id: '123456',
    business_name: 'Bull & Bear LLC.'
  };

  if (fields) {
    for (var f in fields) {
      doc[f] = fields[f];
    }
  }

  return doc;
}

describe('regex', function () {
  it('should select all spaces', function () {
    'c c  c  c'.replace(urn.regex.spaces, '').should.equal('cccc');
    'bull'.replace(urn.regex.special, '').should.equal('bull');
    '  '.replace(urn.regex.dspace, '').should.equal('');
  });
});


describe('trans', function () {

  let doc = null;

  beforeEach(()=> {
    doc = genDoc();
  });

  it('CleanNames should clean names!', function () {
    cn.trans('BULL &amp; BEAR INC').should.equal('Bull & Bear Inc');
    cn.trans('280 S 400 W').should.equal('280 S 400 W');
  });

  it('should clean strings', function () {
    urn.trans('Bull & Bear LLC.').should.equal('bull-and-bear');
    urn.trans('co.name.hack').should.equal('co-name-hack');
    urn.trans('name inc.').should.equal('name');
    urn.trans('name co.').should.equal('name');

  });

  it('should transform object', function () {
    urn.trans(doc);

    doc.should.have.key('urn');
    doc.urn.should.equal('bull-and-bear-123456');
  });

  it('should not transform object', function () {

    doc.urn = 'exists';

    urn.trans(doc);

    doc.urn.should.equal('exists');
  });
});
