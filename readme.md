Usage
=====

Install
-------

    npm install https://github.com/indolering/ria-transformers.git --save
    
Transforming
------------
Transformers can parse a string, object, or array.  Array handling depends on the transformer, non-array specific 
transforms (like `urn`) will apply the transform to every item in the array.

    
    var t = require('ria-transformers'); //t.urn.trans()
    var urn = t.urn //urn.trans()
        
    /**
     * trans(string)
     * @param string {String} String to be transformed
     * @returns {string} Transformed string.
     */
    var string = urn("Wealthy Father & Sons Co.") //`string` == 'wealthy-father-and-sons'
    
    
    /**    
     * trans(object, [fieldName], [overwrite = false])
     * @param input {string|object|Array} Object to be transformed
     * @param [fieldName] {String}  Semi-optional (depends on transformer), will always be used if supplied
     * @param [overwrite] {Boolean} Overwrite existing field? 
     */
    var doc = {
        id: '123456',
        business_name: "Wealthy Father & Sons Co."
    }
    
    urn.trans(doc) //`doc.urn` == 'wealthy-father-and-sons-f123456'
    
   
Hacking
-------
init
====

    git clone https://github.com/indolering/ria-transformers.git
    cd ria-transformers
    npm install

To create a transformer:
 * Create new file in `libs/transformer-name.js`.
 * Extend the Transformers class in `libs/Transfomer.js`.
 * Replace the `_string` and `_obj` methods.
 * Add your `transformer.trans` function to the exports object in `transformers.js`.

You can access the regular expressions and methods of each transformer object by requiring it directly.

Test
----

    npm install mocha -g
