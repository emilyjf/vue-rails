document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [  {text: "dishes", completed: false},
                {text: "laundry", completed: false},
                {text: "groceries", completed: false}
              ],
              newTask: '',
              errors: []
    },
    mounted: function(){
      $.get('tasks.json', function(tasksResponse) {
        this.tasks = tasksResponse;
      }.bind(this));
    },
    methods: {
      toggleTask: function(task) {
        task.completed = !task.completed;
      },
      addTask: function() {
        this.errors = [];
        var params = {
                      task: this.newTask
                      };
      $.post('api/v1/task.json', params, function (newTask){
        this.tasks.push(newTask);
        this.newTask = '';
      }.bind(this)).fail(function(response) {
        this.errors = response.responseJSON.errors;
      }.bind(this));
    },
      deleteTask: function(task) {
        var index = this.task.indexOf(task);
        this.task.splice(index, 1);
      }
    }
  });
});