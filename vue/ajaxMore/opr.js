addEventListener('load',(e)=>{

Vue.component('child', {
  template: '#template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

Vue.component('blog-post', {
  render: function (createElement) {
    var header = this.$slots.header
    var body   = this.$slots.default
    var footer = this.$slots.footer
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})


Vue.component('child2', {
  render: function (ce){
    return ce(
      'h'+this.level,
      this.$slots.default
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
    }
  }
})


new Vue({
  el: '#test1',
});
new Vue({
  el: '#test2',
});
new Vue({
  el: '#test3',
});

let jj={
  v: 0,
};
let cc=new Vue({
  el: '#test4',
  data: {
    t: jj.v,
  }
})

jj.v=2;

console.log(cc.t);

});
