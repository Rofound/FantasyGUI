addEventListener('load',()=>{

let cDOM=function (t){
  return document.createElement(t);
}

let DOM_CREATE_TIMES=0;
const DOMProxer=function (dType,j){
  let _dom=typeof dType==='string'?cDOM(dType):dType;
  let _children={};
  let _parent=null;
  let _childLen=0;
  let _sid=DOM_CREATE_TIMES++;
  let isShow=false;
  let backup={};

  _dom.prox=this;

  this.backup=function (k,v){
    if(typeof k!=='undefined'&&typeof v!=='undefined'){
      backup[k]=v;
    }
    return this;
  }

  this.rec=function (k){
    return backup[k];
  }

  this.show=function (b){
    if(typeof b!=='undefined'){
      isShow=b;
      return this;
    }
    return isShow;
  }

  this.classList=function (c,opr){
    if(c){
      if(opr=='-'){
        _dom.classList.rmCld(c);
      }else{
        _dom.classList.add(c);
      }
      return this;
    }
    return _dom.classList;
  }

  let dom0evtlt={};

  // 封装DOM0级事件，使其更具灵活性
  // 可以用多个处理器来决定是否阻止默认事件，采用[严格模式]，即只要有一个是阻止的，即可阻止默认行为
  let _t=0;
  this.on=function (et,fn){
    let t='on'+et;
    if(typeof _dom[t]!=='undefined'){
      if(!dom0evtlt[et]){
        dom0evtlt[et]={};
        _dom[t]=function (e){
          let ret=1;
          for(let i in dom0evtlt[et]){
            ret&=dom0evtlt[et][i].call(this,e)?1:0;
          }
          return ret?true:false;
        }
      }
      dom0evtlt[et][_t]=fn;
    }
  }

  this.addEvent=function (eType,fn,isCapture){
    _dom.addEventListener(eType,fn,isCapture);
    return this;
  }
  this.rmEvent=function (eType,fn){
    _dom.rmChildEventListener(eType,fn);
    return this;
  }

  this.atrs=function (aj){
    for(let i in aj){
      _dom[i]=aj[i];
    }
    return this;
  }

  this.sid=function (){
    return _sid;
  }

  this.parent=function (pD){
    if(!pD){
      return _parent;
    }
    if(!pD.ec()['DOMProxer']){
      pD=new DOMProxer(pD);
    }
    _parent=pD;
    return this;
  }

  this.addChild=function (pD){
    if(!pD.ec()['DOMProxer']){
      pD=new DOMProxer(pD);
    }
    _children[pD.sid()]=pD;
    _childLen++;
    return this;
  }

  // 子节点，通过_sid获取索引，
  this.childs=function (cld){
    if(cld&&cld.ec()['DOMProxer']){
      return _children[cld.sid()];
    }
    return _children;
  }

  this.childsNum=function (oft){
    if(typeof oft==='number'){
      _childLen+=oft;
      return this;
    }
    return _childLen;
  }

  this.dom=function (){
    return _dom;
  }

  // 添加DOM至父对象
  this.addOn=function (pN,bfd){
    let dd=pN;
    let bfrd=(bfd&&bfd.ec()['DOMProxer'])?bfd:null;
    if(!pN.ec||!pN.ec()['DOMProxer']){
      dd=new DOMProxer(pN);
    }
    if(!_children[dd.sid()]){
      dd.dom().insertBefore(_dom,bfrd);
      dd.addChild(this);
      this.parent(dd);
      isShow=true;
    }
    return this;
  }

  // 添加子节点
  this.addTo=function (n,bfd){
    let dd=n;
    let bfrd=(bfd&&bfd.ec()['DOMProxer'])?bfd:null;
    if(!n.ec()['DOMProxer']){
      dd=new DOMProxer(n);
    }
    if(!_children[dd.sid()]){
      _dom.insertBefore(dd.dom(),bfrd.dom());
      this.addChild(dd);
      dd.parent(this);
      dd.show(true);
    }
    return this;
  }

  this.childrenArr=function (idx){
    let clds=_dom.childNodes;
    if(typeof idx==='number'&&clds&&clds.length>idx){
      return this.dom().childNodes[idx];
    }
    return _dom.childNodes;
  }

  // 移除字节点
  this.rmCld=function (dd){
    if(dd){
      dd.parent(null);
      delete _children[dd.sid()];
      _childLen--;
      _dom.removeChild(dd.dom());
      dd.show(false);
    }
    return this;
  }
  // 设置样式和获取样式
  this.style=function (sj,v){
    let dom=this.dom()
    if(typeof sj==='object'){
      for(let i in sj){
        dom.style[i]=sj[i];
      }
      return this;
    }
    if(v){
      dom.style[sj]=v;
      return this;
    }
    return dom.style[sj];
  }

  this.atrs(j);
}; DOMProxer.cc('DOMProxer');


constaint.BODY=document.querySelector('body');
setLib('DOMProxer',DOMProxer);


console.log('DOMProxer has loaded');
})
