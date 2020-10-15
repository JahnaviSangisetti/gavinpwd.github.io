// Initialize a new TaskManager with currentId set to 0
const taskManager = new TaskManager(0);
taskManager.load();
taskManager.render();

// Select the New Task Form
const newTaskForm = document.querySelector('#form-button');

// Add an 'onsubmit' event listener
newTaskForm.addEventListener('click', (event) => {
    
    // Prevent default action
    event.preventDefault();


    // Select the inputs
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const addStatusSelectList = document.querySelector('#addStatus');


    // Validation code here
    const formValidateFirstName = document.querySelector('#newTaskNameInput');
    const formValidateDescription = document.querySelector('#newTaskDescription');
    const formValidateAssignedto = document.querySelector('#newTaskAssignedTo');
    const formValidateDueDate = document.querySelector('#newTaskDueDate');
   
    //Name
    newTaskNameInput.addEventListener('mouseout', (event) => {
        event.preventDefault();
       if (formValidateFirstName.value.length > 7) {
           
            formValidateFirstName.classList.add('is-valid');
            formValidateFirstName.classList.remove('is-invalid');
        } else {
          
            formValidateFirstName.classList.add('is-invalid');
            formValidateFirstName.classList.remove('is-valid');
        }
    });
   

   //Description
    newTaskDescription.addEventListener('mouseout', (event) => {
        event.preventDefault();
   
        if (formValidateDescription.value.length > 15) {
           formValidateDescription.classList.add('is-valid');
           formValidateDescription.classList.remove('is-invalid');
        } else {
           formValidateDescription.classList.add('is-invalid');
           formValidateDescription.classList.remove('is-valid');
        }
    });
   

    //AssignedTo
    newTaskAssignedTo.addEventListener('mouseout', (event) => {
        event.preventDefault();
   
        if (formValidateAssignedto.value.length > 7) {
           formValidateAssignedto.classList.add('is-valid');
           formValidateAssignedto.classList.remove('is-invalid');
        } else {
           formValidateAssignedto.classList.add('is-invalid');
           formValidateAssignedto.classList.remove('is-valid');
        }
    });
   //Date
newTaskDueDate.addEventListener('mouseout', (event) => {
    event.preventDefault();
    const today = dueDate
    if (today <= Date.parse(formValidateDueDate.value)) {
        formValidateDueDate.classList.add('is-valid');
       formValidateDueDate.classList.remove('is-invalid');
    } else {
       formValidateDueDate.classList.add('is-invalid');
       formValidateDueDate.classList.remove('is-valid');
    }
});


    // Get the values of the inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;
    const status = addStatusSelectList.value;


    // Add the task to the task manager
    taskManager.addTask(name, description, assignedTo, dueDate, status);

    taskManager.save();
    // Render the tasks
    taskManager.render();


    // Clear the form
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
   
});

const tasksList = document.querySelector('#tasksList');
tasksList.addEventListener('click', (event) => { 
    if (event.target.classList.contains('done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'DONE';
        
        // Save the tasks to localStorage
        taskManager.save();
        // Render the tasks
        taskManager.render();
       
    }

    if (event.target.classList.contains('delete-button')){
        const parentTask = event.target.parentElement.parentElement;
            // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save()
        taskManager.render();
    
    }
      

    if (event.target.classList.contains('review-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'For Review'
        task.status = 'For Review';
        
        // Save the tasks to localStorage
        taskManager.save();
        // Render the tasks
        taskManager.render();
       
    }

    
    if (event.target.classList.contains('progress-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'In Progress'
        task.status = 'In Progress';
        
        // Save the tasks to localStorage
        taskManager.save();
        // Render the tasks
        taskManager.render();
       
    }

    

});

