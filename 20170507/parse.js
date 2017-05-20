addEventListener('load',function (){
  let {zmlSrc}=mod;
  let key='',keyType='';
  // 当前原子组的性质
  let atomGroupProperty='';
  let prvChar='',curChar='',ltChar='';
  let prvAtom='',curAtom='',ltAtom='';
  let isNormal=false;
  let isNum=false;
  let quot='';
  let SPACE={
    ' ': true,
    '\t': true,
    '\n': true,
    '\0': true,
  }
  let QUOT={
    '\'': true,
    '"': true,
  }
  let isS=function (c){
    return SPACE[c]||false;
  }
  let isQ=function (c){
    return QUOT[c]||false;
  }
  let funcSymbol={
    '{': true,
    '}': true,
    ':': true,
    '\'': true,
    '=': true,
    '*=': true,
    '"': true,
  }
  let propertySymbol={
    ':': true,
    '=': true,
    '*=': true,
  }
  let simpleSymbol={
    '^': true,
    '~': true,
    '`': true,
    '!': true,
    '@': true,
    '#': true,
    '$': true,
    '%': true,
    '&': true,
    '*': true,
    '(': true,
    ')': true,
    '_': true,
    '+': true,
    '-': true,
    '=': true,
    '[': true,
    ']': true,
    '{': true,
    '}': true,
    ';': true,
    '\\': true,
    ':': true,
    '|': true,
    ',': true,
    '.': true,
    '/': true,
    '<': true,
    '>': true,
    '?': true,
  }

  let tree={};

  // 使用原子上下文构建DOM
  // 需要分别指定前一个原子，当前原子和下一个原子
  let build=function (pA,cA,lA){
    if(cA.type==='funcSymbol'&&cA.value===':'){
      //
    }else if(pA.type==='space'&&cA.type==='string'&&lA.type==='space'){
      console.log(cA);
    }
  }

  // 原子组合器，构建原子，将分散的字符组合成原子
  // 需要指定类型和字符
  let atomCombiner=function (type,char){
    if(type!==keyType){
      if(atomGroupProperty===''&&(propertySymbol[char]||simpleSymbol[char])){
        atomGroupProperty=char;
      }else if(type===' '){
        atomGroupProperty='';
      }
      // console.log(keyType[0]==='_');

      // 类型判断
      if(isNum){
        key.type='number';
      }else if(key.value==='false'||key.value==='true'){
        key.type='boolean';
      }else if(key.value===' '){
        key.type='space';
      }else if(keyType[0]==='_'){
        key.type='simpleSymbol';
      }else if(funcSymbol[key.value]){
        key.type='funcSymbol';
      }else{
        key.type='string';
      }

      ltAtom=key;
      build(prvAtom,curAtom,ltAtom);
      prvAtom=curAtom;
      curAtom=ltAtom;
      key={
        type: 'unknow',
        value: '',
      }
      isNum=true;
      isAtomGProStrStart=false;
      keyType=type;
    }
    let chCode=char.charCodeAt(0);
    if(chCode<48||chCode>57){
      isNum=false;
    }
    key.value+=char;
  }

  // 根据上下文收集构成原子的字符序列
  // 需要分别指定前一个字符，当前字符和下一个字符
  let collection=function (pC,cC,lC){
    if(cC==='\0'){
      // 结束标识
      atomCombiner('end','');
    }else if(isQ(cC)){
      if((atomGroupProperty===''||isAtomGProStrStart)&&quot===''){
        // 开口
        quot=cC;
      }else if(isNormal){
        atomCombiner('key',cC);
      }else if(quot===cC){
        // 封口
        quot='';
      }else{
        atomCombiner('key',cC);
      }
    }else if(isQ(quot)){
      if(cC==='^'&&!isNormal){
        isNormal=true;
      }else{
        atomCombiner('key',cC);
        isNormal=false;
      }
    }else if(isS(pC)&&simpleSymbol[cC]&&(!isS(lC))&&atomGroupProperty===''){
      atomCombiner('_'+cC,cC);
      if(isQ(lC)){
        isAtomGProStrStart=true;
      }
    }else if(funcSymbol[cC]&&atomGroupProperty===''){
      if(pC==='*'&&cC==='='){
        atomCombiner('*=','*=');
      }else{
        atomCombiner(cC,cC);
      }
      if(isQ(lC)){
        isAtomGProStrStart=true;
      }
    }else if(isS(cC)){
      // 连续空白字符视为一个空格字符
      if(!isS(pC)){
        atomCombiner(' ',' ');
      }
    }else if(!(cC==='*'&&lC==='=')){
      atomCombiner('key',cC);
    }
  }

  // 是否提前结束了
  let isBeforeOver=false;
  for(let i=0;i<zmlSrc.length;i++){
    let c=zmlSrc[i];
    ltChar=c;
    collection(prvChar,curChar,ltChar);
    prvChar=curChar;
    curChar=ltChar;
    // 结束符号
    if(c==='\0'){
      collection(prvChar,curChar,'\0');
      collection(curChar,'\0','');
      isBeforeOver=true;
      break;
    }
  }
  if(!isBeforeOver){
    collection(prvChar,curChar,'\0');
    collection(curChar,'\0','');
  }
});
