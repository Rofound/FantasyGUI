addEventListener('load',function (){
let {zmlSrc}=mod;
let prvC='';
let prv2C='';
let key='';
let quot='';
let atomType='';
let aAtom=null;
let bAtom=null;
let cAtom=null;
let tree={};

let SPACE={
  ' ': true,
  '\t': true,
  '\n': true,
}
let QUOT={
  '\'': true,
  '"': true,
}
// 部分原子类型列表以及具值
let atomSymb={
  ':': true,
  '{': true,
  '}': true,
  '=': true,
  '.': 'className',
  '#': 'id',
  '~': 'textContent',
  '@': 'href',
  '-': 'src',
  '*': 'charset',
}
let funcSymb={
  '=': true,
  '.': 'className',
  '#': 'id',
  '~': 'textContent',
  '@': 'href',
  '-': 'src',
  '*': 'charset',
}
// 只允许右边有值，左边接空白
let rightBoundSymb={
  '.': true,
  '#': true,
  '~': true,
  '@': true,
  '-': true,
  '*': true,
}
// 只允许左边有值
let leftBoundSymb={
}

let isS=function (c){
  return SPACE[c]||false;
}
let isQ=function (c){
  return QUOT[c]||false;
}

let curObj=null;

let scope=[];

// 构建抽象语法
let abstract=function (prvAtom,atom,ltAtom){
  if((prvAtom.type==='string'&&atom.value===':'&&ltAtom.type==='string')){
    // 具名标签组
    let d=document.createElement(ltAtom.value);
    curObj=d;
    tree[prvAtom.value]=d;
    if(scope.length>0){
      scope[scope.length-1].appendChild(d);
    }
    // if(ltAtom.value==='span'){
      // console.log(scope,curObj);
      // console.log(prvAtom,atom,ltAtom);
    // }
  }else if(prvAtom.type==='space'&&atom.type==='string'&&ltAtom.type==='space'){
    // 匿名标签组
    let d=document.createElement(atom.value);
    curObj=d;
    scope[scope.length-1].appendChild(d);
      // console.log(scope,curObj);
    // console.log(atom);
  }else if(prvAtom.type==='space'&&atom.type==='symbol'&&ltAtom.type!=='space'){
    // 简写组
      let key=atomSymb[atom.value];
      if(key){
        let value;
        if(ltAtom.type==='boolean'){
          if(ltAtom.value==='false'){
            value=false;
          }else if(ltAtom.value==='true'){
            value=true;
          }
        }else if(ltAtom.type==='number'){
          value=ltAtom.value*1;
        }else{
          value=ltAtom.value;
        }
        curObj[key]=value;
      }
  }else if(atom.value==='{'){
    // console.log(atom);
    // 开始边界符
    scope.push(curObj);
  }else if(atom.value==='}'){
    // 结束边界符
    scope.pop();
  }else if(prvAtom.type==='string'&&atom.value==='='&&ltAtom.type!=='space'&&ltAtom.type!=='symbol'){
    // 全写属性组
      let key=prvAtom.value;
      let value;
      if(ltAtom.type==='boolean'){
        if(ltAtom.value==='false'){
          value=false;
        }else if(ltAtom.value==='true'){
          value=true;
        }
      }else if(ltAtom.type==='number'){
        value=ltAtom.value*1;
      }else{
        value=ltAtom.value;
      }
      curObj[key]=value;
    // console.log(prvAtom,atom,ltAtom);
  }else if(ltAtom.type==='end'){
    // 最后一个字符
    // console.log(ltAtom);
  }
  console.log(atom.value);
}
let isNum=false;

let curType='';
// 将字符串分解成原子
let separator=function (type,c){
  // 开始分解，结束上一个原子的收集过程，并立即收集新的原子
  if(atomType!==type){
    aAtom=key;
    if(isNum){
      aAtom.type='number';
    }else if((aAtom.value==='false'||aAtom.value==='true')&&atomType==='key'){
      aAtom.type='boolean';
    }else if(aAtom.value===' '){
      aAtom.type='space';
    }else if(atomSymb[aAtom.value]){
      aAtom.type='symbol';
    }else if(type==='end'){
      aAtom.type='end';
    }else{
      aAtom.type='string';
    }
    // 新的原子
    key={
      type: 'unknow',
      value: '',
    };
    isNum=true;
    atomType=type;
    if(aAtom&&bAtom&&cAtom){
      abstract(cAtom,bAtom,aAtom);
    }
    cAtom=bAtom;
    bAtom=aAtom;
  }
  let chCode=c.charCodeAt(0);
  if(chCode<48||chCode>57){
    isNum=false;
  }
  if(c!=='\0'){
    key.value+=c;
  }
  curType=type;
}

// 收集原子
let collection=function (c){
  if(prvC==='^'&&!atomSymb[prv2C]){
    separator(curType,c);
  }else if(c==='^'){
    return
  }else if(isQ(c)){
    // 显式字符串标记处理
    if(quot===''){
      quot=c;
    }else if(quot===c){
      quot='';
    }else{
      separator('string',c);
    }
  }else if(isQ(quot)){
    // 字符串收集
    separator('string',c);
  }else if(isS(c)){
    // 连续空白字符
    // if(isS(prvC)){
    //   return;
    // }
    separator(' ',' ');
  }else if(aAtom&&funcSymb[aAtom.value]){
    separator(curType,c);
  }else if(atomSymb[c]){
    separator(c,c);
  }else{
    separator('key',c);
  }
  // 结束
  if(c==='\0'){
    separator('end','');
  }
}

let i=0;
while(zmlSrc[i]){
  let c=zmlSrc[i++];
  collection(c);
  prv2C=prvC;
  prvC=c;
}
collection('\0');

let body=document.querySelector('body');
// body.appendChild(tree.cc);

// console.log(tree);
});
