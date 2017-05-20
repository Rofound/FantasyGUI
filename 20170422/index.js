addEventListener('load',function (){
  let {$,$all,create,add,rm,changeStyle}=mod;
  let body=$('body');
  let ctxCtn={
    open: function (e){
      console.log('open');
    },
    open2: function (e){
      console.log('open2');
    },
    open3: function (e){
      console.log('open3');
    },
    open4: function (e){
      console.log('open4');
    },
  };
  let popup=null;
  oncontextmenu=function (e){
    return false;
  }
  addEventListener('mousedown',function (e){
    let t=e.target;
    let p=t.prox;
    let pp=t.parentNode.prox;
    let isPopup=(t.cptType&&(t.cptType==='popup'))?true:false;
    if(e.button===2){
      if(!popup){
        popup=new Popup(e.clientX,e.clientY,ctxCtn);
      }else{
        if(!isPopup||(p&&p.isRemove())){
          popup.close();
          popup=new Popup(e.clientX,e.clientY,ctxCtn);;
        }
      }
    }else if(e.button===0){
      if(!t.cptType||t.cptType!=='popup'){
        popup.close();
      }
    }
  });

  let Popup=function (x,y,items){
    let isRemove=false;
    let menu=create('div');
    menu.prox=this;
    menu.className='popup_menu open';
    menu.style.left=x+'px';
    menu.style.top=y+'px';
    menu.cptType='popup';
    let i=0;
    for(let k in items){
      let item=create('div');
      item.className='item';
      item.textContent=k;
      item.cptType='popup';
      item.prox=this;
      add(menu,item);
      item.style.animationDelay=(i*(0.3/Object.keys(items).length))+'s';
      item.addEventListener('animationend',function (e){
        this.style.opacity=1;
      });
      let me=this;
      item.addEventListener('mousedown',function (e){
        if(e.button===0){
          if(!isRemove){
            items[k](e);
            me.close();
            this.classList.add('selected');
            changeStyle({
              '.popup_menu>.item': {
                animationName: 'popup_item_disappear',
              },
            });
          }
        }
      });
      i++;
    }
    add(body,menu);
    if(innerWidth-x<menu.offsetWidth){
      menu.style.left=innerWidth-menu.offsetWidth+'px';
    }
    if(innerHeight-y<menu.offsetHeight){
      menu.style.top=innerHeight-menu.offsetHeight+'px';
    }
    this.isRemove=function (){
      return isRemove;
    }
    this.close=function (){
      if(!isRemove){
        isRemove=true;
        menu.classList.remove('open');
        menu.classList.add('close');
        menu.addEventListener('animationend',function (e){
          if(e.animationName==='popup_menu_close'){
            rm(body,menu);
          }
        })
      }
    }
  }

  let changeFrames=function (info){
    let stys=document.styleSheets;
    for(let d=0;d<stys.length;d++){
      for(let i=0;i<stys[d].cssRules.length;i++){
        let kf=stys[d].cssRules[i];
        if(kf.name){
          if(info[kf.name]){
            for(let ki=0;ki<kf.cssRules.length;ki++){
              let mframe=info[kf.name];
              let k=kf.cssRules[ki];
              let mcss=mframe[k.keyText];
              if(mcss){
                for(let si in mcss){
                  k.style[si]=mcss[si];
                }
              }
            }
          }
        }
      }
    }
  }

  // changeFrames({
  //   'popup_item1': {
  //     '0%': {
  //       transform: 'scale(1.2)',
  //     },
  //   }
  // });

  onclick=function (){

  }
});
