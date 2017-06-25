document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      tasks: [  {text: "dishes", completed: false},
                {text: "laundry", completed: false},
                {text: "groceries", completed: false}
              ],
              newTask: '',
              errors: [],
              taskFilter: '',
              sortAttribute: 'all, active, completed',
              sortAscending: true

    },
    mounted: function(){
      $.get('/api/v1/tasks.json', function(tasksResponse) {
        this.tasks = tasksResponse;
      }.bind(this));
    },
    computed: {
      modifiedTasks: function() {
        return this.tasks.sort(function(task1, task2) {
          if (this.sortAscending) {
            return task1[this.sortAttribute].localeCompare(task1[this.sortAttribute]);
          } else {
            return task2[this.sortAttribute].localeCompare(task2[this.sortAttribute]);
          }
        }.bind(this));
      }
    },
    
    methods: {
      setSortAttribute: function(inputAttribute) {
        if (inputAttribute !== this.sortAttribute) {
          this.sortAscending = true;
        } else {
          this.sortAscending = !this.sortAscending;
        }
        this.sortAttribute = inputAttribute;
      },
      isValidTask: function(inputTask) {
        return inputTask.task.indexOf(this.taskFilter) !== -1
       },
      toggleTask: function(task) {
        task.taskVisible = !task.completed;
      },
      addTask: function() {
        this.errors = [];
        var params = {
                      task: this.newTask
                      };
      $.post('api/v1/task.json', params, function (newTask){
        this.tasks.push(newTask);
        this.newTask = '';
      }.bind(this)).fail( function(response) {
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