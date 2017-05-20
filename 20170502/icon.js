addEventListener('load',function (){
  let {addEvent}=mod;
  let iconList={};

  let iconCT=0;
  mod.getIconRes=function (iconId,data){
    if(iconList[iconId]){
      let icon= new iconList[iconId](data);
      addEvent('intervalupdate','icon'+iconCT++,icon.draw);
      return icon;
    }
  }

  let registerIcon=function (iconId,initFn,drawFn){
    if(!iconList[iconId]){
      let cls=function (cdata){
        let me=this;
        let dom=$cd('canvas','icon');
        let c=dom.getContext('2d');
        let {w,h}=cdata;

        this.animationStart=function (){
          //
        }
        this.animationEnd=function (){
          //
        }
        this.size=function (w,h){
          w&&(this.width=w);
          h&&(this.height=h);
          dom.width=this.width;
          dom.height=this.height;
          if(!w&&!h){
            return {w:this.width,h:this.height};
          }
        }
        this.size(w||0,h||0);
        this.getDOM=function (){
          return dom;
        }
        initFn.call(this);
        for(let i in cdata){
          if(typeof this[i]!==undefined){
            this[i]=cdata[i];
          }
        }
        this.draw=function (){
          drawFn.call(me,c);
        };
      }
      iconList[iconId]=cls;
    }
  }

  registerIcon('logout',function (){
    this.csize=0;

  },function (c){
    c.clearRect(0,0,this.width,this.height);
    c.save();
    c.beginPath();
    c.translate(this.width/2,this.height/2);
    c.arc(0,0,this.csize,0,Math.PI*2);
    c.fill();
    c.restore();
  });

});
