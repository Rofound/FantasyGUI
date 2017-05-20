addEventListener('load',function (){
  let $=function (stor){
    return document.querySelector(stor);
  }
  let $all=function (stor){
    return document.querySelectorAll(stor);
  }
  let create=function (dt){
    return document.createElement(dt);
  }
  let add=function (pN,n){
    pN.appendChild(n);
  }
  let rm=function (pN,n){
    pN.removeChild(n);
  }
  let changeStyle=function (info){
    let stys=document.styleSheets;
    for(let d=0;d<stys.length;d++){
      for(let i=0;i<stys[d].cssRules.length;i++){
        let rule=stys[d].cssRules[i];
        let vs=info[rule.selectorText];
        if(vs){
          for(let k in vs){
            rule.style[k]=vs[k];
          }
        }
      }
    }
  }

  mod.create=create;
  mod.$=$;
  mod.$all=$all;
  mod.add=add;
  mod.rm=rm;
  mod.changeStyle=changeStyle;
});
