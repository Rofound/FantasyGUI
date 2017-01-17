addEventListener("load",function (e){
// 这个文件的内容是提供一个until全局对象，使用until对象提供的方法
// -----------------------------------
// 提供实时鼠标位置
until={mx: 0,my: 0}

addEventListener('mousemove',function (e){
  until.mx=e.clientX;
  until.my=e.clientY;
})

until.body_d=document.querySelector('body');
until.ctx=null;
var cvsCreateTimes=0;
// 初始化一个画布
until.init=function (){
  var cvs=document.createElement('canvas');
  this.ctx=cvs.getContext('2d');
  cvs.className="cvs";
  cvs.id="cvs"+cvsCreateTimes++;
  this.body_d.appendChild(cvs);
  var init=function (){
    cvs.width=innerWidth;
    cvs.height=innerHeight;
  }
  init();
  onresize=init;

  var mouseD=document.createElement('div');
  mouseD.className="mouseD";
  this.body_d.appendChild(mouseD);

  addEventListener('mousemove',function (e){
    mouseD.innerHTML=e.clientX+", "+e.clientY;
  })
}
var drawables=[];
// 添加显示到画布上的元素
until.addDrawable=function (d){
  this.drawables.push(d);
}
// 执行所有在drawables里的显示对象的draw方法
until.draw=function (){
  for(var i in this.drawables){
    this.drawables[i].draw();
  }
}


// -----------------------------------
});
