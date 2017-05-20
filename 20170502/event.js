addEventListener('load',function (){
    let evList={};

    let Eventor=function (){
      let list={};
      let length=0;
      this.list=list;
      this.getLength=function (){
        return length;
      }
      this.trigger=function (e){
        for(let i in list){
          if(typeof list[i]==='function'){
            list[i](e);
          }
        }
        return this;
      }
      this.add=function (name,fn){
        if(!list[name]){
          list[name]=fn;
          length++;
        }
        return this;
      }
      this.rm=function (name){
        if(list[name]){
          delete list[name];
          length--;
        }
        return this;
      }
    }

    let expandType=function (){
      for(let i in arguments){
        if(typeof arguments[i]==='string'){
          if(!evList[arguments[i]]){
            evList[arguments[i]]=new Eventor();
          }
        }
      }
    }
    let addEvent=function (eventType,eventName,fn){
      let e=evList[eventType]
      if(e){
        e.add(eventName,fn);
      }
    }
    let trigger=function (eventType,e,thisObj){
      let ev=evList[eventType];
      if(ev){
          ev.trigger.call(thisObj||null,e);
      }
    }
    let rmEvent=function (eventType,eventName){
      let e=evList[eventType];
      if(e){
        e.rm(eventName);
      }
    }

    mod.expandType=expandType;
    mod.addEvent=addEvent;
    mod.trigger=trigger;
    mod.rmEvent=rmEvent;

    mod.GEventList=evList;
});
