(function() {
  var app = new Vue({
    el: "#divVue",
    data: {
      message: "gulp整合演示"
    },
    methods: {
      show: function() {
        alert("abc");
      }
    }
  });
})();