addEventListener('load',()=>{
  let modPool=[];
  window.getLib=function (modName){
    if(modPool[modName]){
      return modPool[modName];
    }
  }
  window.setLib=function (modName,mod){
    if(!modPool[modName]){
      modPool[modName]=mod;
    }
  }
  window.constaint={};

  // 继承原型
  Function.prototype.cc=function (){
    let _={};
    for(let i=1;i<arguments.length;i++){
      Object.setPrototypeOf(arguments[i].prototype, this.prototype);
      let _o=arguments[i].prototype.ec();
      for(let clsN in _o){
        _[clsN]=_o[clsN];
      }
    }
    _[arguments[0]]=arguments[0];

    // 返回继承历史
    this.prototype.ec=function (){
      return _;
    }

    let clsN=arguments[0];
    // 返回类标识
    this.prototype.clsN=function (){
      return clsN;
    }
  }

  console.log('init has loaded');
});
