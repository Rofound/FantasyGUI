addEventListener('load',()=>{
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
    }
  });
  addEventListener('mousemove',(e)=>{
    app.message=e.clientX+','+e.clientY;
  });

  var app2 = new Vue({
    el: '#app2',
    data: {
      message: 'You loaded this page on ' + new Date()
    }
  })

  var app3 = new Vue({
    el: '.test01',
    data: {
      direct: '-',
    },
    methods: {
      say: function (e){
        e.keyCode===37&&(this.direct='左');
        e.keyCode===39&&(this.direct='右');
        e.keyCode===38&&(this.direct='上');
        e.keyCode===40&&(this.direct='下');
      }
    },
  })

  var app4 = new Vue({
    el: '.test02',
    data: {
      direct: '--',
    },
    methods: {
      handler: function (e){
        e.keyCode===37&&(this.direct='左');
        e.keyCode===39&&(this.direct='右');
        e.keyCode===38&&(this.direct='上');
        e.keyCode===40&&(this.direct='下');
      }
    },
  })

});
