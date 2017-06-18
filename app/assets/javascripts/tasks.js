document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello!',
      tasks: [
                "Vacuum",
                "Dishes",
                "Laundry"
                ],
    newTask: ''
    },
    methods: {
      addTask: function() {
        this.tasks.push(this.newTask);
      }
    }
  });
});