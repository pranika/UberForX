var nodelua = require('nodelua');
var lua = new nodelua.LuaState('lua');
lua.doFile('filter.lua', function(error, ret_value){
    if(!error && ret_value){
      console.dir(ret_value);
    } else{
      console.error(error);
    }
  });