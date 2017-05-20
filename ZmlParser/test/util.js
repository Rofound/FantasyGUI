addEventListener('load',function (){
  mod={};
  // 存放css规则,每个选择器对应一条规则
  let stys={};
  let kframes={};
  let sts=document.styleSheets;
  // 获取匹配的第一个节点
  let g=function (obj,stor){
    return obj.querySelector(stor);
  }
  // 获取所有节点
  let gall=function (obj,stor){
    return obj.querySelectorAll(stor);
  }
  // 定义get和set方法
  let $define=function (thisObj,_getProps,_setProps){
    let prop={};
    let getProps=_getProps||{};
    let setProps=_setProps||{};
    for(let key in getProps){
      let prop={};
      if(getProps[key]){
        prop.get=getProps[key];
      }
      if(setProps[key]){
        prop.set=setProps[key];
        delete setProps[key];
      }
      Reflect.defineProperty(thisObj,key,prop);
    }
    for(let key in setProps){
      Reflect.defineProperty(thisObj,key,{
        set: setProps[key],
      });
    }
  }
  Object.defineProperty(window,'$define',{
    get: function (){
      return $define;
    },
  });

  let getExtChan=function (obj,clsN){
    return obj.extChan[clsN];
  }
  const Cls=function (flag){
    if(!this.extChan){
      let extChan={};
      let evFlag={};

      let $addEvF=function (f){
        if(typeof evFlag[f]==='undefined'){
          evFlag[f]=f;
        }
      }
      let $rmEvF=function (f){
        if(typeof evFlag[f]!=='undefined'){
          delete evFlag[f];
        }
      }
      let $cEvF=function (f){
        return evFlag[f];
      }

      $define(this.constructor.prototype,{
        extChan: function (){
          if({'getExtChan':1,'Cls':1}[arguments.callee.caller.name]){
            return extChan;
          }
        },
        extOf: function (){
          return function (clsN){
            return getExtChan(this,clsN);
          }
        },
        $sa: function (){
          return function (data){
            let o={};
            for(let i in data){
              o[i]=function (){
                return o[i];
              }
            }
            return o;
          }
        },
        $gs: function(){
          return function (gprops,sprops){
            return $define(this,gprops,sprops);
          }
        },
        evFlag: function (){
          if((arguments.callee.caller===$addEvF)||(arguments.callee.caller===$rmEvF)||(arguments.callee.caller===$cEvF)){
            return evFlag;
          }
        },
        // 事件标记
        $addEvF: function (){
          return $addEvF;
        },
        // 删除标记
        $rmEvF: function (){
          return $rmEvF;
        },
        // 检索标记
        $cEvF: function (){
          return $cEvF;
        },
      });
    }
    let name=this.constructor.name;
    this.extChan[name]=name;
    this.extChan[flag]=flag;
  }
  Function.prototype.ext=function (thisObj,...arg){
    Cls.call(thisObj,this.name);
    this.apply(thisObj,arg);
  }
  $define(HTMLElement.prototype,{
    extOf: function (){
      return function (clsN){
        return getExtChan(this,clsN);
      }
    },
    extChan: function (){
      if({'getExtChan':1,'Cls':1}[arguments.callee.caller.name]){
        return {'HTMLElement':'HTMLElement'};
      }
    },
  });
  let add=function (_pN,_n){
    let pN=_pN.extOf('DOMProxer')?_pN.dom:_pN;
    let n=_n.extOf('DOMProxer')?_n.dom:_n;
    pN.appendChild(n);
  }
  // 移除节点
  let rm=function (_pN,_n){
    let pN=_pN.extOf('DOMProxer')?_pN.dom:_pN;
    let n=_n.extOf('DOMProxer')?_n.dom:_n;
    pN.removeChild(n);
  }
  $define(HTMLElement.prototype,{
    $: function (){
      return function (stor){
        return g(this,stor);
      }
    },
    $all: function (){
      return function (stor){
        return gall(this,stor);
      }
    },
    $rm: function (){
      return function (cN){
        return rm(this,cN);
      }
    },
    $add: function (){
      return function (cN){
        return add(this,cN);
      }
    },
  });
  $define(window,{
    $: function (){
      return function (stor){
        return g(document,stor);
      }
    },
    $all: function (){
      return function (stor){
        return gall(document,stor);
      }
    },
    $cd: function (){
      return function (dt,clsName){
        let d=document.createElement(dt);
        clsName&&(d.className=clsName);
        return d;
      }
    },
    $rm: function (){
      return function (pN,n){
        return rm(pN,n);
      }
    },
    $add: function (){
      return function (pN,n){
        return add(pN,n);
      }
    },
    $addEvt: function (){
      return function (et,fn,b){
        return addEventListener(et,fn,b);
      }
    },
    // 颜色
    $rgba: function (){
      return function (r,g,b,a){
        return 'rgba('+[r,g,b,a].join(',')+')';
      }
    },
    $kf: function (){
      return function (kname){
        return kframes[kname];
      }
    }
  });

  const Root=function (){}
  // DOMProxer
  const DOMProxer=function (){
    Root.ext(this);
    let dom=$cd.apply(this,arguments);
    let me=this;
    $define(dom,{
      prox: function (){
        return me;
      },
    });
    $define(this,{
      dom: function (){
        return dom;
      },
      $add: function (){
        return function (){
          return dom.$add.apply(dom,arguments);
        }
      },
      $rm: function (){
        return function (){
          return dom.$rm.apply(dom,arguments);
        }
      },
      $: function (){
        return function (){
          return dom.$.apply(dom,arguments);
        }
      },
      $addEvt: function (){
        return function (){
          return dom.addEventListener.apply(dom,arguments);
        }
      },
      $rmEvt: function (){
        return function (){
          return dom.removeEventListener.apply(dom,arguments);
        }
      },
    });
  }

  // CSSOM
  let head=$('head');
  let c=$cd('style','custom');
  head.$add(c);
  let csty=document.styleSheets[document.styleSheets.length-1];
  // insert css style rules
  let $icsr=function (spros){
    let isForce=false;
    for(let s in spros){
      let rule=stys[s];
      if(!rule){
        let id=csty.insertRule(s+'{}',0);
        stys[s]=csty.cssRules[id];
        rule=stys[s];
      }
      let pros=spros[s];
      for(let i in pros){
        if(typeof rule.style[i]!=='undefined'){
          rule.style[i]=pros[i];
        }
      }
    }
  }
  $define(window,{
    $stor: function (){
      return function (stor){
        if(typeof stor==='string'){
          if(!stys[stor]){
            let o={};
            o[stor]='{}';
            $icsr(o);
          }
          return stys[stor];
        }else if(typeof stor==='object'){
          $icsr(stor);
        }
      }
    }
  })

  mod.DOMProxer=DOMProxer;
});
