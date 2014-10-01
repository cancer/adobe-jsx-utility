var util = (function(docObj, settings){
  var custom = settings.custom;
  var defaults = settings.defaults;
  var variable = settings.variable;
  var files = settings.files;

  // charcode
  var TAB = String.fromCharCode( 9 );
  var LF  = String.fromCharCode( 10 );
  var CR  = String.fromCharCode( 13 );
  var BR  = LF;

  // objectをYAML形式の文字列に変換
  var objectToYaml = function objectToYaml(obj, indents, container){
    var separator = ': ';
    var indent = files.indentCharacter;
    container = container || [];

    _.each(obj, function(val, key){
      if(_.isObject(val)){
        if(_.isArray(val)){
          // 配列の各要素にダブルクォートをつけてtoString
          val = "[" + _.map(val, function(val){ return '"' + val + '"'; }).join() + "]";
          container.push(indents + key + separator + val + BR);
          return;
        }
        container.push(indents + key + separator + BR);
        objectToYaml(val, indents + indent, container);
      }else{
        container.push(indents + key + separator + val + BR);
      }
    });

    return container.join("");
  }

  // Boundsのデータをx/y/width/heightのオフセット値に変換する
  var boundsToOffset = function boundsToOffset(bounds){
    var keys = defaults.export_trim_keys;
    var vals = _.map(bounds, function(val, idx){
      // x2/y2からwiwdth/heightを計算する(無理やり感…)
      if(idx > 1){
        return parseInt(val - bounds[idx - 2]);
      }
      return parseInt(val);
    });

    return _.object(keys, vals);
  }

  //
  //----- フォルダパス作成
  //
  var getPath = function makePath( obj ) {
    var fPath = obj.path;
    var fName = obj.name;
    fName2 = fName.substring(0, fName.length - 4);
    return fPath + "/" + fName2;
  }


  var log___xxx___ = {
    ln    : function(msg){
      $.writeln("--- " + msg + " ---");
    },
    start : function(msg){
      $.writeln("--- Start " + msg + " ---");
    },
    finish: function(msg){
      $.writeln("--- Finish " + msg + " ---");
    },
    complete: function(){
      $.writeln("--- Complete ---");
      alert( "終了しました" );
    }
  }

  var indentLog = function indentLog(msg){
    var res = [];
    for(var i=0; i<depth; i++){
      res.push('　');
    }
    res.push(msg);
    return res.join("");
  }

  // check object
  function _co( object ){
    var title = (_.isArray(object)) ? "Array" : typeof object;

    var kv = [];

    for(var key in object) {
      if(_.isArray(object[key])){
        kv.push(key + " : [" + object[key].join() + "]");
        continue;
      }
      kv.push(key + " : " + object[key]);
    }
    return title + CR + kv.join(","+CR);
  }

  return {
    TAB : TAB,
    LF  : LF,
    CR  : CR,
    BR  : BR,
    objectToYaml   : objectToYaml,
    boundsToOffset : boundsToOffset,
    getPath        : getPath,
    log___xxx___   : log___xxx___,
    indentLog      : indentLog
  }
})(app.activeDocument, settings);

