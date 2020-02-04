var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 1;
ctx.font = '11pt Helvetica';
ctx.strokeText("text",100,10);

ctx.save();
ctx.fillText('text', 100 + 1, 30 + 1);
ctx.fillText('text', 100 + 1, 30 - 1);
ctx.fillText('text', 100 - 1, 30 + 1);
ctx.fillText('text', 100 - 1, 30 - 1);
ctx.fillStyle = 'white';
ctx.fillText('text', 100, 30);
ctx.restore();

ctx.save();
ctx.fillText('测试一下最大宽度!', 100, 50,50);
ctx.restore();
