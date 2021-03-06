// Generated by CoffeeScript 1.10.0
(function() {
  var DelimitStream, JSONSequenceGenerator, JSONSequenceParser, RS, assert, error1, stream,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  try {
    require('source-map-support').install();
  } catch (error1) {

  }

  assert = require('assert');

  stream = require('stream');

  DelimitStream = require('delimit-stream');

  RS = this.RS = '\x1e';

  JSONSequenceParser = (function(superClass) {
    extend(JSONSequenceParser, superClass);

    function JSONSequenceParser() {
      var that;
      JSONSequenceParser.__super__.constructor.call(this);
      this._readableState.objectMode = true;
      that = this;
      this._stream = new DelimitStream(RS).on('error', function(e) {
        // istanbul ignore next;
        return that.emit('error', e);
      }).on('data', function(d) {
        var error, error2, j;
        assert.ok(d.length > 0);
        if (d[d.length - 1] !== 0x0a) {
          return that.emit('truncated', d);
        } else {
          try {
            j = JSON.parse(d);
            return that.push(j);
          } catch (error2) {
            error = error2;
            return that.emit('invalid', d);
          }
        }
      });
    }

    JSONSequenceParser.prototype._transform = function(chunk, encoding, cb) {
      return this._stream._transform(chunk, encoding, cb);
    };

    JSONSequenceParser.prototype._flush = function(cb) {
      return this._stream._flush(cb);
    };

    return JSONSequenceParser;

  })(stream.Transform);

  exports.parser = JSONSequenceParser;

  JSONSequenceGenerator = (function(superClass) {
    extend(JSONSequenceGenerator, superClass);

    function JSONSequenceGenerator() {
      JSONSequenceGenerator.__super__.constructor.call(this);
      this._writableState.objectMode = true;
      this._readableState.objectMode = false;
    }

    JSONSequenceGenerator.prototype._transform = function(chunk, encoding, cb) {
      var error, error2, s;
      s = null;
      try {
        s = JSON.stringify(chunk, 'utf8');
      } catch (error2) {
        error = error2;
        return cb(error);
      }
      this.push("" + RS + s + "\n", 'utf8');
      return cb();
    };

    return JSONSequenceGenerator;

  })(stream.Transform);

  exports.generator = JSONSequenceGenerator;

}).call(this);

//# sourceMappingURL=index.js.map
