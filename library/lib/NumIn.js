addEventListener('load',()=>{
let DProxer=getLib('DOMProxer');

let UCPT_CT=0;
// 元素基本组件
const UCpt=function (UCTp,dom){
  DProxer.call(this,dom||'div',{
    className: UCTp,
  });
  // 元素为应用程序基本单元，UCTp将作为辨别不同元素的重要凭证
  let uct=UCTp;

  this.getUCType=function (){
    return uct;
  }

}; UCpt.cc('UCpt',DProxer);

const P=function (ctn){ UCpt.call(this,'p','p');
  this.atrs({innerHTML: ctn});
}; P.cc('P',UCpt);

// 输入组件基类
const Input=function (iptTp,dT){
  UCpt.call(this,'input',dT||'input');
  let iptType=iptTp;
  let isFocus=false;
  this.getIptType=function (){
    return iptType;
  }
  let value='';
  this.value=function (v){
    if(typeof v!=='undefined'){
      value=v;
      return this;
    }
    return value;
  }
}; Input.cc('Input',UCpt);

// 输入框
let TextIn=function (hdp,sbT){
  Input.call(this,'input');
  this.atrs({type: sbT||'text'});
  let filter=()=>true;
  this.filter=function (fn){
    if(typeof fn!=='undefined'){
      if(typeof fn==='function'){
        filter=fn;
      }
      return this;
    }
    return filter;
  }
  let value=this.value;
  this.value=function (v){
    if(filter(v)){
      this.dom().value=value();
      return value(v);
    }
  }

  // 当你试图阻止默认事件时应该调用该方法
  this.preventDefaultFn=(e)=>false;

  let me=this;

  this.classList().add('textIn');
  this.atrs({type: 'text',placeholder: hdp});

  this.on('keydown',function (e){
    if(filter.call(this,e)){
      return true;
    }

    return me.preventDefaultFn(e);
  })

  this.addEvent('input',function (){
    value(this.value);
  })
}; TextIn.cc('TextIn',Input);

// 完美的数字输入框
const NumIn=function (phd){ TextIn.call(this,phd,'number');
  this.dom().maxLength=2;
  this.backup('maxL',this.dom().maxLength);
  this.filter(function (e){
    if(typeof e==='object'){
      let cdtr=/[0-9]/.test(e.key)||{Backspace:1}[e.key]||(e.keyCode>36&&e.keyCode<41);
      if(cdtr){
        return true;
      }
    }else if(typeof e==='number'&&(e+'').length<=this.dom().maxLength){
      return true;
    }
  });
  this.addEvent('keydown',function (e){
    let stepv=0;
    let {ctrlKey: ck,shiftKey: sk,keyCode: kc}=e;
    let {value: v}=this;
    let maxL=numIn1.rec('maxL');
    stepv=ck?10:sk?0.1:1;

    let rv=kc==40&&((v*1-stepv).toFixed(0))||kc==38&&((v*1+stepv).toFixed(0));
    // 否是溢出
    let ntOrf=(rv+0)&&(Math.abs(rv*1)+'').length<=maxL;

    if(maxL<0){
      ntOrf=true;
    }

    // 溢出处理
    if(!ntOrf&&typeof rv!=='boolean'){
      let maxV=Math.pow(10,maxL)-1;
      if(rv<0){
        this.value=-maxV;
      }else{
        this.value=maxV;
      }
    }

    // 给负号留出一个空间
    if(e.key=='-'){
      if(/-/.test(this.value)&&this.value[0]!=='-'){
        this.value=this.value.replace(/-/,'');
      }else{
        this.value=-this.value;
      }
    }
    if(this.value<0){
      !ntOrf&&(this.maxLength=numIn1.rec('maxL')+1);
    }else{
      !ntOrf&&(this.maxLength=numIn1.rec('maxL'));
    }
    ntOrf&&rv&&(this.value=rv);
  })
}; NumIn.cc('NumIn',TextIn);
})
