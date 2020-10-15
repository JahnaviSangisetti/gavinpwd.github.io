//create local storage
const myStorage = window.localStorage;

//create a new function, createTaskHtml
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => `

<div class="card col-sm-4 px-sm-1 bg-light border-warning mb-3" data-task-id="${id}">
    
    <div class="card-body">
        <h5 class="badge ${status === 'To Do' ? 'bg-secondary text-danger' :  status === 'In Progress' ? 'bg-warning' : status === 'For Review' ? 'bg-info text-white' : 'badge-success'}">${status}</h5>
        
        <h4 class="text-dark">${name}</h4>
        
        <p class="card-description">${description}</p>
        <p class="card-assign"><small class="text-muted">Assigned To: ${assignedTo}</small></p>
        <p class="card-due"><small class="text-info">Due: ${dueDate}</small></p>
    </div>    
       
    <div class="d-flex my-3 justify-content-end">
    <button class="fa fa-trash mx-4 btn btn-outline-danger delete-button" type="submit"></button>
    
    <button class="fa fa fa-edit mx-4 btn btn-outline-info review-button ${status === 'For Review'}"></button>
    
    <button class="fa fa fa-hourglass-half mx-4 btn btn-outline-warning progress-button ${status === 'In Progess'}"></button>
    
    <button class="fa fa-check-square-o mx-4 btn btn-outline-success done-button ${status === 'Done'}"></button>
    </div>
</div>  

`;


// Create a TaskManager class
class TaskManager {
    // Set up the tasks and currentId property in the contructor
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    getTaskById(taskId){
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if its the right task by comparing the task's id to the id passed as a parameter
            if (task.id === taskId) {
                
                // Store the task in the foundTask variable
                foundTask = task;
            }
        }
        
        return foundTask;

    }


    // Create the addTask method
    addTask(name, description, assignedTo, dueDate, status = "To Do") {
        const task = {
            // Increment the currentId property
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };

        // Push the task to the tasks property
        this.tasks.push(task);

    }
    
    
    deleteTask(taskId){
        const newTasks =[];
        for(let i=0;i< this.tasks.length;i++ ){
            const task = this.tasks[i];
            if(task.id !== taskId){
                newTasks.push(task);  
            }
        }
        
        this.tasks = newTasks;
    }
    // Create the render method
    render() {
        // Create an array to store the tasks' HTML
        const tasksHtmlList = [];

        // Loop over our tasks and create the html, storing it in the array
        for (let i = 0; i < this.tasks.length; i++) {
            
            // Get the current task in the loop
            const task = this.tasks[i];

            // Format the date
            const date = new Date(task.dueDate);
            const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

            // Create the task html
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);

            // Push it to the tasksHtmlList array
            tasksHtmlList.push(taskHtml);

        }

        // Create the tasksHtml by joining each item in the tasksHtmlList
        // with a new line in between each item.
        const tasksHtml = tasksHtmlList.join('\n');

        // Set the inner html of the tasksList on the page
        const tasksList = document.querySelector('#tasksList');
        tasksList.innerHTML = tasksHtml;
    }
    
    
    save() {
        // const tasksJSON = JSON.stringify(this.tasks);
        myStorage.setItem('tasks', JSON.stringify(this.tasks));
        
        // const currentId = String(this.currentId);
        myStorage.setItem('currentId', String(this.currentId));
    }
    
    load() {
        if(myStorage.getItem('tasks')){
            const tasksJson =  myStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        }
        if(myStorage.getItem('currenId')){
            const currentId = myStorage.getItem(currentId);
            this.currentId = Number(currentId);
        }
       
    }
   
}

