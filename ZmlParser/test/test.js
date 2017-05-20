addEventListener('load',function (){
  let {zml,DOMProxer}=mod;

  let selectSrc=`
    div .item
  `;

  let Select=function (){
    DOMProxer.ext(this,'div','Select');
    let dom=this.dom;
    console.log(this);
  }

  let s=new Select();

});
