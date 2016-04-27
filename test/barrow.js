var expect = require('chai').expect;
var Barrow = require('..');

describe('Barrow', function () {

  it('constant', function () {
    var origin = {
    };
    var expected = {
      from: 'barrow'
    };
    var mapping = {
      from: Barrow.Types.val('barrow')
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('func', function () {
    var origin = {
      bool: 1
    };
    var expected = {
      bool: true
    };
    var mapping = {
      bool: Barrow.Types.func(function (source) {
        return !!source.bool;
      })
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('string', function () {
    var origin = {
      a: '3'
    };
    var expected = {
      _page: '3'
    };
    var mapping = {
      _page: 'a'
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('object', function () {
    var origin ={
      d: {
        e: 'ok'
      }
    };
    var expected = {
      _extra: {
        status: 'ok'
      }
    };
    var mapping = {
      _extra: {
        status: 'd.e'
      }
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('tunnel', function () {
    var origin ={
      d: {
        e: '300'
      }
    };
    var expected = {
      _extra: {
        status: 300
      }
    };
    var mapping = {
      _extra: {
        status: 'd.e|number'
      }
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('tunnel-string', function () {
    var origin = {
      a: '3',
      b: 3,
      c: 0,
      d: false,
      e: true,
      f: [],
      h: null,
      i: void 0
    };
    var expected = {
      string: '3',
      number: '3',
      zero: '0',
      false: 'false',
      true: 'true',
      array: '',
      null: '',
      undefined: ''
    };
    var mapping = {
      string: 'a|string',
      number: 'b|string',
      zero: 'c|string',
      false: 'd|string',
      true: 'e|string',
      array: 'f|string',
      null: 'h|string',
      undefined: 'i|string'
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('array', function () {
    var origin = {
      b: [
        {
          c: 'Peter'
        },
        {
          c: 'Paul'
        }
      ]
    };
    var expected = {
      data: {
        user: [
          {
            name: 'Peter'
          },
          {
            name: 'Paul'
          }
        ]
      }
    };
    var mapping = {
      data: {
        user: Barrow.Types.repeat('b', {
          name: 'c'
        })
      }
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('double array', function () {
    var origin = {
      b: [
        {
          c: 'Peter',
          d: [
            {
              e: 'Monday'
            },
            {
              e: 'Wednesday'
            }
          ]
        },
        {
          c: 'Paul',
          d: [
            {
              e: 'Sunday'
            }
          ]
        }
      ]
    };
    var expected = {
      data: {
        user: [
          {
            name: 'Peter',
            day: [
              {
                name: 'Monday'
              },
              {
                name: 'Wednesday'
              }
            ]
          },
          {
            name: 'Paul',
            day: [
              {
                name: 'Sunday'
              }
            ]
          }
        ]
      }
    };
    var mapping = {
      data: {
        user: Barrow.Types.repeat('b', {
          name: 'c',
          day: Barrow.Types.repeat('d', {
            name: 'e'
          })
        })
      }
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('flatten double array', function () {
    var origin = {
      b: [
        {
          c: 'Peter',
          d: [
            {
              e: 'Monday'
            },
            {
              e: 'Wednesday'
            }
          ]
        },
        {
          c: 'Paul',
          d: [
            {
              e: 'Sunday'
            }
          ]
        }
      ]
    };
    var expected = {
      data: {
        user: [
          {
            name: 'Peter',
            day: ['Monday', 'Wednesday']
          },
          {
            name: 'Paul',
            day: ['Sunday']
          }
        ]
      }
    };
    var mapping = {
      data: {
        user: Barrow.Types.repeat('b', {
          name: 'c',
          day: Barrow.Types.repeat('d', 'e')
        })
      }
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

  it('complex struct', function () {
    var origin ={
      a: '3',
      b: [
        {
          c: 'Peter'
        },
        {
          c: 'Paul'
        }
      ],
      d: {
        e: '300'
      },
      f: -1,
      g: {
        h: null
      }
    };
    var expected = {
      user: [
        {
          name: 'Peter'
        },
        {
          name: 'Paul'
        }
      ],
      _page: '3',
      _extra: {
        status: 300
      },
      _ok: false,
      _from: 'barrow',
      _message: {}
    };
    var mapping = {
      user: Barrow.Types.repeat('b', {
        name: 'c'
      }),
      _page: 'a',
      _extra: {
        status: 'd.e|number'
      },
      _ok: Barrow.Types.func(function (source) {
        return source.f > -1;
      }),
      _from: Barrow.Types.val('barrow'),
      _message: 'g.h.notexist'
    };
    expect(Barrow(mapping).transfer(origin)).to.be.deep.equal(expected);
  });

});
