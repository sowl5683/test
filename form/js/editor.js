var editor = document.getElementsByClassName('ds_form')[0];
var inputBtn = document.getElementById('input-btn');
var en = String.fromCharCode(13);  // 'd'
editor.onselect = function(e){
  console.log(e);
}
editor.onpaste = function(e){
  console.log(e);
  e.preventDefault();
  var text;
  var clp = (e.originalEvent || e).clipboardData;
  if (clp === undefined || clp === null) {
    text = window.clipboardData.getData("text") || "";
    if (text !== "") {
      if (window.getSelection) {
        var newNode = document.createElement("span");
        newNode.innerHTML = text;
        // window.getSelection().getRangeAt(0).insertNode(newNode);
      } else {
        // document.selection.createRange().pasteHTML(text);
      }
    }
  } else {
    text = clp.getData('text/plain') || "";
    if (text !== "") {
      var form = toForm(text);
      document.execCommand('insertHTML', false, form);
    }
  }
}
inputBtn.onclick = function(e){
  splitNode();
}

function toForm(text){
  var paras = text.split(en);
  paras = text.split('\n');
  var $p = $('<div>');
  for (var i = 0; i < paras.length; i++) {
    $pa = $('<div>',{
      class: 'ds_paragh'
    });
    $item = $('<div>',{
      html : paras[i],
      class: 'parah_item'
    });
    $pa.append($item);
    $p.append($pa);
  }
  return $p.html();
}
function splitNode(){
  var selection = window.getSelection();
  if(inForm(selection)){
    var range = selection.getRangeAt(0);
    var start = range.startContainer;
    var end = range.endContainer;
    if(start === end){
      splitSameNode(range);
    }else {
      splitDiffNode(range);
    }
  }
}
function splitSameNode(range){
  var node = range.startContainer;
  var start = range.startOffset;
  var end = range.endOffset;
  // var sRange = new Range();
  var eRange = new Range();
  // sRange.setStartBefore(node);
  // sRange.setEnd(node,start);
  eRange.setStart(node,end);
  eRange.setEndAfter(node);
  // var sItem = buildItemByRange(sRange);
  var item = buildItemByRange(range);
  var eItem = buildItemByRange(eRange);
  node.parentNode.after(item);
  item.after(eItem);
}

function splitDiffNode(range){
  var node = range.startContainer;
  var start = range.startOffset;
  var end = range.endOffset;
  console.info('start:'+start+';end:'+end);
}

function buildItemByRange(range){
  var content = range.cloneContents();
  var divItem = document.createElement('div');
  divItem.className = 'parah_item';
  for (var i = 0; i < content.childNodes.length; i++) {
    divItem.append(content.childNodes[i]);
  }
  range.deleteContents();
  return divItem;
}

function inForm(selection){
  var aNode = selection.anchorNode;
  var fNode = selection.focusNode;
  if(nodeInForm(aNode) && nodeInForm(fNode)){
    return true;
  }
  return false;
}
function nodeInForm(node){
  return true;
}
var pattern = /\"(.*)\"/;
var testStr = '1234"abas"daf';
var result = testStr.match(pattern);
console.log(result[1]); // = abas
