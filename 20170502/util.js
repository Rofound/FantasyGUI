addEventListener('load',function (){
  mod={};
  let g=function (obj,stor){
    return obj.querySelector(stor);
  }
  let gall=function (obj,stor){
    return obj.querySelectorAll(stor);
  }
  let add=function (pN,n){
    pN.appendChild(n);
  }
  let rm=function (pN,n){
    pN.removeChild(n);
  }
  HTMLElement.prototype.$=function (stor){
    return g(this,stor);
  }
  HTMLElement.prototype.$all=function (stor){
    return gall(this,stor);
  }
  HTMLElement.prototype.$rm=function (cN){
    return rm(this,cN);
  }
  HTMLElement.prototype.$add=function (cN){
    return add(this,cN);
  }
  HTMLElement.prototype.$pos=function (x,y){
    (typeof x==='number')&&(this.style.left=x+'px');
    (typeof y==='number')&&(this.style.top=y+'px');
    if(!x&&!y){
      return {
        x: parseFloat(this.style.left),
        y: parseFloat(this.style.top),
      }
    }
  }
  $=function (stor){
    return g(document,stor);
  }
  $all=function (stor){
    return gall(document,stor);
  }
  $cd=function (dt,clsName){
    let d=document.createElement(dt);
    clsName&&(d.className=clsName);
    return d;
  }
  $add=function (pN,n){
    return add(pN,n);
  }
  $rm=function (pN,n){
    return rm(pN,n);
  }
  let changeStyle=function (info,isForce){
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

  mod.changeStyle=changeStyle;
});
