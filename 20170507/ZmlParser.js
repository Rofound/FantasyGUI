addEventListener('load',function (e){
  let {zmlSrc}=mod;
  // 语法树
  let tree={};
  let co={};
  let key='';
  let ks=[];

  let boundryQuots={
    '{': true,
    '}': true,
    '\'': true,
    '"': true,
  }
  let keywordQuots={
    ',': true,
    '.': true,
    '#': true,
  }
  let spaceQuots={
    ' ': true,
    '\n': true,
    '\t': true,
  }

  let isKQ=function (k){
    return keywordQuots[k];
  }
  let isS=function (k){
    return spaceQuots[k];
  }

  // 是否开始收集键
  let isSKC=true;

  // 上一个字符
  let ltC='';
  // 未封口的边界键集,越靠后说明嵌套越深
  let keysBs=[];
  // 上一次是否划界操作
  let ltIsBdy=false;
  for(let i=0;i<zmlSrc.length;i++){
    let c=zmlSrc[i];
    if(c==='{'){
      // 在这里打断键的收集过程并使键开口
      console.log(key+'开始划界');
      isSKC=false;
      keysBs.push(key);
    }else if(c==='}'){
      // 在这里打断键的收集过程并将最近的键封口
      let kkey=keysBs.pop();
      console.log(kkey+'已经结束');
      isSKC=false;
    }else if(isS(c)&&!isS(ltC)){
      console.log(c);
    }else if(isS(c)&&isS(ltC)){
      // 出现了连续的空白字符
      ltIsBdy=false;
    }else{
      if(!isSKC){
        // 断点分隔
        // console.log(key);
        key='';
      }
      let s='';
      if(isS(c)){
        if(ltIsBdy){
          s='';
        }else{
          s=' ';
        }
      }else{
        s=c;
      }

      key+=s;
      isSKC=true;
    }
    ltC=c;

    // 上一次划界记录
    if(c==='{'||c==='}'){
      ltIsBdy=true;
      // console.log(c);
    }else{
      ltIsBdy=false;
    }
  }
  // console.log(keysBs);
  // console.log(zmlSrc.length);
  // console.log(String.fromCharCode(10)+'a');
});
