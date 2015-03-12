# barrow

## Usage
``` 
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
  f: -1
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
  _from: Barrow.Types.val('barrow')
};
console.log(Barrow(mapping).transfer(source));
// {
//    user: [
//      {
//        name: 'Peter'
//      },
//      {
//        name: 'Paul'
//      }
//    ],
//    _page: '3',
//    _extra: {
//      status: 300
//    },
//    _ok: false,
//    _from: 'barrow'
//  };
```

## License
the MIT License
