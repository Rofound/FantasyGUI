addEventListener('load',function (){
  let {trigger,expandType}=mod;
  expandType('intervalupdate');
  let update=function (){
    trigger('intervalupdate');
    requestAnimationFrame(update);
  }
  update();
});
