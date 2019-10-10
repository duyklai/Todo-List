import list from './todo.js';
import projectList from './project.js';

const init = () => {
    const content_div = document.querySelector('#contentContainer');
    // Adding project sidebar
    var project_div = document.createElement('div');
    project_div.id = "projectContainer";
    content_div.appendChild(project_div);
    // New project button
    addProjectButton();
    // Creating an inner wrapper to separate "add project" button from project entries
    const project_entry_div = document.createElement('div');
    project_entry_div.id = "projectEntryContainer";
    project_div.appendChild(project_entry_div);

    // Adding main todo list div
    var list_wrapper = document.createElement('div');
    list_wrapper.id = "listContainer";
    content_div.appendChild(list_wrapper);
    // New todo button at the end of the list
    addTodoButton();
}

const addProjectButton = () => {
    // Finding the main 2 column wrapper div for projects
    const project_div = document.querySelector('#projectContainer');
    // Creating wrapper div for adding "new project" button
    const project_btn_div = document.createElement('div');
    project_btn_div.id = 'addProjectBtn';
    var btn = document.createElement('button');
    btn.id = 'newProject';
    btn.innerHTML = 'Add Project +'
    btn.addEventListener('click', projectForm);
    // Append button to secondary wrapper
    project_btn_div.appendChild(btn);
    // Append secondary wrapper to main
    project_div.appendChild(project_btn_div);
}

const addTodoButton = () => {
    // Finding the main 2 column wrapper div for todos
    const list_div = document.querySelector('#listContainer');
    // Creating wrapper div for adding "new todo" button
    var todo_btn_div = document.createElement('div');
    todo_btn_div.id = "addTodoBtn";
    var btn = document.createElement('button');
    btn.id = 'newTodo';
    btn.innerHTML = '&#43;';
    btn.addEventListener('click', todoForm);
    // Append button to secondary wrapper
    todo_btn_div.appendChild(btn);
    // Append secondary wrapper to main
    list_div.appendChild(todo_btn_div);
}

const projectForm = () => {
    // Selecting the wrapper div for all project entries
    const project_entry_div = document.querySelector('#projectEntryContainer');
    // If form doesn't already exists (don't add duplicate forms)
    if (project_entry_div.lastChild.id != 'inputForm')
    {
        // Creating form
        const input_form = document.createElement('form');
        input_form.setAttribute('id', 'inputForm');
        input_form.setAttribute('onsubmit', 'addProject();');
        // Textbox for input
        var project_input = document.createElement('input');
        project_input.setAttribute('id', 'addProjectName');
        project_input.setAttribute('type', 'text');
        project_input.setAttribute('autocomplete', 'off');
        project_input.autofocus = true;
        input_form.appendChild(project_input);
        // Submit button
        var project_sub = document.createElement('input');
        project_sub.setAttribute('id', 'addProjectSubmit');
        project_sub.setAttribute('type', 'submit');
        project_sub.setAttribute('value', 'Add');
        input_form.appendChild(project_sub);

        project_entry_div.appendChild(input_form);
        // Prevent reloading the page when adding new stuff
        var form = document.querySelector('#inputForm');
        form.addEventListener('submit', handleForm)
        function handleForm(event) { 
            event.preventDefault(); 
        };
    }
    // Auto focuses on the new input field
    project_input.focus();
}

const todoForm = () => {
    const list_div = document.querySelector('#listContainer');
    // Remove the add new todo button
    list_div.removeChild(list_div.lastChild);
    // Creating form to wrap input fields
    const input_form = document.createElement('form');
    input_form.setAttribute('id', 'inputForm');
    input_form.setAttribute('onsubmit', 'addTodo();');
    // Todo name/title
    var todo_input = document.createElement('input');
    todo_input.setAttribute('id', 'addTodoName');
    todo_input.setAttribute('type', 'text');
    todo_input.setAttribute('autocomplete', 'off');
    todo_input.setAttribute('autofocus', 'true');
    todo_input.setAttribute('size', 30);
    todo_input.setAttribute('placeholder', 'Task');
    input_form.appendChild(todo_input);
    // Todo note
    var todo_note = document.createElement('input');
    todo_note.setAttribute('id', 'addTodoNote');
    todo_note.setAttribute('type', 'text');
    todo_note.setAttribute('autocomplete', 'off');
    todo_note.setAttribute('size', 20);
    todo_note.setAttribute('placeholder', 'Extra Info...');
    input_form.appendChild(todo_note);
    // Todo date
    var todo_date = document.createElement('input');
    todo_date.setAttribute('id', 'addTodoDate');
    todo_date.setAttribute('type', 'date');
    input_form.appendChild(todo_date);
    // Todo priority
    var todo_priority = document.createElement('SELECT');
    todo_priority.setAttribute('id', 'addTodoPrio');
    var prio_option = document.createElement('option');
    prio_option.setAttribute('value', 'p3');
    prio_option.innerHTML = "Low Priority";
    todo_priority.appendChild(prio_option);
    prio_option = document.createElement('option');
    prio_option.setAttribute('value', 'p2');
    prio_option.innerHTML = "Medium Priority";
    todo_priority.appendChild(prio_option);
    prio_option = document.createElement('option');
    prio_option.setAttribute('value', 'p1');
    prio_option.innerHTML = "High Priority";
    todo_priority.appendChild(prio_option);
    input_form.appendChild(todo_priority);
    // Todo submit
    var list_sub = document.createElement('input');
    list_sub.setAttribute('id', 'addTodoSubmit');
    list_sub.setAttribute('type', 'submit');
    list_sub.setAttribute('value', 'Add');
    input_form.appendChild(list_sub);

    list_div.appendChild(input_form);
    // Prevent reloading the page when adding new stuff
    var form = document.querySelector('#inputForm');
    form.addEventListener('submit', handleForm)
    function handleForm(event) { 
        event.preventDefault(); 
    };
    todo_input.focus();
}

// Global function due to submit not recognizing the function for unknown reasons
window.addProject = function()
{
    // Get the value from addprojectname field
    const project_name = document.querySelector('#addProjectName');
    // Trim/manipulate info for storage
    const name = project_name.value.trim();
    projectList.createProject(name);
    renderProjects();
}

// Global function due to submit not recognizing the function for unknown reasons
window.addTodo = function()
{
    // Select all of the input fields
    const todo_name = document.querySelector('#addTodoName');
    const todo_date = document.querySelector('#addTodoDate');
    const todo_note = document.querySelector('#addTodoNote');
    const todo_priority = document.querySelector('#addTodoPrio');
    // Trim/manipulate info for storage
    const name = todo_name.value.trim();
    const note = todo_note.value.trim();
    const date = todo_date.value;
    const priority = todo_priority.value;
    const todo = list.create(name, note, date, priority);
    // Add to project list (array)
    projectList.projects[projectList.currentProject].push(todo);
    renderTodos();
}

const renderProjects = () => {
    // Getting the main projectContainer (2nd column of main column)
    const project_entry_container = document.querySelector('#projectEntryContainer');
    // Getting all projects
    const project_list = projectList.projects;

    // Refreshing projectEntryContainer div for new list of projects
    while (project_entry_container.lastChild)
        project_entry_container.removeChild(project_entry_container.lastChild);

    for(let project in project_list) 
    {
        // Creating new wrapper div for each project entry
        let project_entry_div = document.createElement('div');
        project_entry_div.id = 'projectEntry';
        // Creating new wrapper div for *project entry name*
        let project_entry_name = document.createElement('div');
        project_entry_name.id = "projectName";
        // Creating the "text node" that holds the name
        let project_name = document.createElement('h3');
        project_name.id = "pName";
        project_name.innerHTML = project;
        project_entry_name.appendChild(project_name);
        // Adding highlighted background for current selected project
        if(project == projectList.currentProject)
            project_entry_name.classList.add('selected');
        // Adding listener for changing current project
        project_entry_name.addEventListener('click', changeSelected);
        
        // Adding delete button
        // Creating wrapper div for the delete button
        let project_delete_div = document.createElement('div');
        project_delete_div.id = "deleteProjectDiv";
        // Creating delete button
        let project_delete = document.createElement('button');
        project_delete.id = 'deleteProjectBtn';
        project_delete.innerHTML = '&#10008';
        project_delete.addEventListener('click', deleteProject);
        project_delete_div.appendChild(project_delete);
        // Adding the name and button to project_entry_div
        project_entry_div.appendChild(project_entry_name);
        project_entry_div.appendChild(project_delete_div);
        // Adding project_entry_div to the main 2 column div: projectContainer
        project_entry_container.appendChild(project_entry_div);
    }
}

// Changing the currently selected project, represented by left border
const changeSelected = (e) => {
    // If user click on the already selected project name, don't reload
    if(projectList.currentProject == e.target.innerHTML)
        return;
    projectList.currentProject = e.target.innerHTML;
    renderProjects();
    renderTodos();
}

const deleteProject = (e) => {
    // Making sure not to delete the default inbox project
    const project_entries = document.querySelectorAll('#projectEntry');
    if (project_entries.length <= 1)
        return;
    // Getting the innerHTML of element of the "x" on which the user clicked
    let deleting = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;
    delete projectList.projects[deleting];
    projectList.currentProject = Object.keys(projectList.projects)[0];
    renderProjects();
    renderTodos();
}

const renderTodos = () => {
    const list_div = document.querySelector('#listContainer');
    // Getting the array of current project
    const project = projectList.projects[projectList.currentProject];
    if(!project)
        return;

    // Refreshing listContainer div for new list of todos
    while (list_div.lastChild)
        list_div.removeChild(list_div.lastChild);

    // Creating list to contain each todo
    var todo_list = document.createElement('ul');
    todo_list.id = "todoList";
    // todo_table is be the wrapper for all properities of each todo
    project.forEach(todo => {
        var todo_table = document.createElement('table');
        todo_table.id = 'todoTable';
        var todo_item = document.createElement('li');
        todo_item.id = "todoItem";
        // Setting each todo item with their corresponding index in array for delete/edit later
        todo_item.setAttribute('index', project.indexOf(todo));
        // Each todo_row will be each todo entry
        var todo_row = document.createElement('tr');
        todo_row.id = "todo";
        // todo_data is each element in todo (checkbox, priority button, basic info)
        var todo_data = document.createElement('td');
        // Creating custom checkbox for todo task
        // Label needed for custom checkbox to work
        var todo_checkbox_label = document.createElement('label');
        todo_checkbox_label.id = "checkBoxContainer";
        var todo_checkbox = document.createElement('input');
        todo_checkbox.id = "todoCheck";
        todo_checkbox.setAttribute("type", "checkbox");
        var checkbox_span = document.createElement('span');
        checkbox_span.id = "checkmark";
        checkbox_span.setAttribute("checked", "no");
        checkbox_span.addEventListener('click', todoChecked);
        todo_checkbox_label.appendChild(todo_checkbox);
        todo_checkbox_label.appendChild(checkbox_span);
        // Creating priority div icon
        var todo_priority = document.createElement('div');
        todo_priority.id = "todoPriority";
        var todo_priority_button = document.createElement('button');
        todo_priority_button.id = "priorityButton";
        todo_priority_button.innerHTML = '&#33;';
        // Call function for cycling through colors of priority
        todo_priority_button.addEventListener('click', changePriority);
        todo_priority.appendChild(todo_priority_button);
        // todo_basic_info is the basic, shorten info for todo
        var todo_basic_info = document.createElement('div');
        todo_basic_info.id = "todoBasic"
        // todo_expand is the expandable div to reveal more info on each item
        var todo_expand = document.createElement('div');
        todo_expand.id = "todoAdv"
        todo_expand.style.display = "none";
        // todo_note will be the more in-depth description of item
        var todo_note = document.createElement('p');
        // Adding anonymous function to expand and collapse todo_expand div
        todo_basic_info.addEventListener('click', function(e) {
            if (todo_expand.style.display == "none")
                todo_expand.style = "display:visible";
            else
                todo_expand.style = "display:none";
        });
        // Getting information from project and adding them to "text node"
        for(let index in todo)
        {
            // Div to hold the basic info (name, due date)
            var text_div = document.createElement('div');
            if(index == 'name')
            {
                text_div.id = "todoName";
                text_div.innerHTML = todo[index];
                todo_basic_info.appendChild(text_div);
            }
            else if (index == 'due')
            {
                text_div.id = "todoDate";
                text_div.innerHTML = todo[index];
                todo_basic_info.appendChild(text_div);
            }
            else if(index == 'note')// Adding description to appropriate div
            {
                // Putting description and buttons into their own divs
                // Same structure as the basic info, creating table to align text
                var table_adv = document.createElement('table');
                table_adv.id = 'advTable';
                var adv_row = document.createElement('tr');
                adv_row.id = 'todoAdvTR';
                var adv_data = document.createElement('td');
                adv_data.id = 'note'
                todo_note.innerHTML = todo[index];
                adv_data.appendChild(todo_note);
                adv_row.appendChild(adv_data);
                // Creating edit/delete buttons and appending
                adv_data = document.createElement('td');
                adv_data.id = 'config'
                adv_data.setAttribute('index', project.indexOf(todo));
                var config_div = document.createElement('div');
                config_div.id = 'configDiv';
                var todo_edit = document.createElement('button');
                todo_edit.id = "todoEdit";
                todo_edit.innerHTML = '&#x2699;';
                todo_edit.addEventListener('click', todoEdit);
                var todo_delete = document.createElement('button');
                todo_delete.id = "todoDelete";
                todo_delete.innerHTML = '&#10008';
                todo_delete.addEventListener('click', todoDelete);
                config_div.appendChild(todo_edit);
                config_div.appendChild(todo_delete);
                adv_data.appendChild(config_div);
                adv_row.appendChild(adv_data);
                table_adv.appendChild(adv_row);
                todo_expand.appendChild(table_adv);
            }
            else if(index == 'priority') // Get the value from todo form and set initial color of priority
            {
                if(todo[index] == 'p1')
                    todo_priority_button.style.color = 'red';
                else if(todo[index] == 'p2')
                    todo_priority_button.style.color = 'yellow';
                else if(todo[index] == 'p3')
                    todo_priority_button.style.color = 'gray';
            }
        }
        // Attach todo and description to todo_div wrapper
        // Adding label checkBoxContainer to tr
        todo_data.appendChild(todo_checkbox_label);
        todo_row.appendChild(todo_data);
        // Adding todoPriority to tr
        todo_data = document.createElement('td');
        todo_data.appendChild(todo_priority);
        todo_row.appendChild(todo_data);
        // Adding todoBasic to tr
        todo_data = document.createElement('td');
        todo_data.id = "todoBasicTD";
        todo_data.appendChild(todo_basic_info);
        todo_row.appendChild(todo_data);
        todo_table.appendChild(todo_row);
        // Adding table as inner of li
        todo_item.appendChild(todo_table);
        // Adding li to ul
        todo_list.appendChild(todo_item);
        // Adding note in separate, expandable li
        todo_item = document.createElement('li');
        todo_item.id = "todoItemAdv";
        todo_item.appendChild(todo_expand);
        todo_list.appendChild(todo_item);
    })
    // Attach todo_list wrapper to main listContainer
    list_div.appendChild(todo_list);
    // Append the add button for new tasks
    addTodoButton();
}

const changePriority = (e) => {
    // Cycling the color of priority "exclamation"
    if(e.target.style.color == "red")
        e.target.style.color = "yellow";
    else if (e.target.style.color == "yellow")
        e.target.style.color = "gray";
    else if (e.target.style.color == "gray")
        e.target.style.color = "red";
}

// Bring up the todo form again and fill in information from the current task
// Currently remakes the task rather than "editing" the task
const todoEdit = (e) => {
    var index = e.target.parentNode.parentNode.getAttribute('index');
    const todoList = document.querySelectorAll('li[index]');
    todoList.forEach(todo => {
        var todo_index = todo.getAttribute('index');
        if(todo_index == index)
        {
            var currentTodo = projectList.projects[projectList.currentProject][index];
            const list_div = document.querySelector('#listContainer');
            // Remove the add new todo button
            list_div.removeChild(list_div.lastChild);
            // Creating form to wrap input fields
            const input_form = document.createElement('form');
            input_form.setAttribute('id', 'inputForm');
            input_form.setAttribute('onsubmit', 'addTodo();');
            // Todo name/title
            var todo_input = document.createElement('input');
            todo_input.setAttribute('id', 'addTodoName');
            todo_input.setAttribute('type', 'text');
            todo_input.setAttribute('autocomplete', 'off');
            todo_input.setAttribute('autofocus', 'true');
            todo_input.setAttribute('size', 30);
            todo_input.setAttribute('value', `${currentTodo.name}`);
            input_form.appendChild(todo_input);
            // Todo note
            var todo_note = document.createElement('input');
            todo_note.setAttribute('id', 'addTodoNote');
            todo_note.setAttribute('type', 'text');
            todo_note.setAttribute('autocomplete', 'off');
            todo_note.setAttribute('size', 20);
            todo_note.setAttribute('value', `${currentTodo.note}`);
            input_form.appendChild(todo_note);
            // Todo date
            var todo_date = document.createElement('input');
            todo_date.setAttribute('id', 'addTodoDate');
            todo_date.setAttribute('type', 'date');
            todo_date.setAttribute('value', `${currentTodo.due}`)
            input_form.appendChild(todo_date);
            // Todo priority
            var todo_priority = document.createElement('SELECT');
            todo_priority.setAttribute('id', 'addTodoPrio');
            var prio_option = document.createElement('option');
            prio_option.setAttribute('value', 'p3');
            prio_option.innerHTML = "Low Priority";
            todo_priority.appendChild(prio_option);
            prio_option = document.createElement('option');
            prio_option.setAttribute('value', 'p2');
            prio_option.innerHTML = "Medium Priority";
            todo_priority.appendChild(prio_option);
            prio_option = document.createElement('option');
            prio_option.setAttribute('value', 'p1');
            prio_option.innerHTML = "High Priority";
            todo_priority.appendChild(prio_option);
            input_form.appendChild(todo_priority);
            // Todo submit
            var list_sub = document.createElement('input');
            list_sub.setAttribute('id', 'addTodoSubmit');
            list_sub.setAttribute('type', 'submit');
            list_sub.setAttribute('value', 'Add');
            input_form.appendChild(list_sub);
        
            list_div.appendChild(input_form);
            // Prevent reloading the page when adding new stuff
            var form = document.querySelector('#inputForm');
            form.addEventListener('submit', handleForm)
            function handleForm(event) { 
                event.preventDefault(); 
            };
            todo_input.focus();
            projectList.projects[projectList.currentProject].splice(index, 1);
        }
    });
}

const todoDelete = (e) => {
    // Gets the index of the todo by going up the chain
    var index = e.target.parentNode.parentNode.getAttribute('index');
    // Get all the todos
    const todoList = document.querySelectorAll('li[index]');
    todoList.forEach(todo => {
        var todo_index = todo.getAttribute('index');
        // If the index of the delete button on the current todo matches with the current iteration of todo loop
        if(todo_index == index)
        {
            projectList.projects[projectList.currentProject].splice(index, 1);
        }
    });
    renderTodos();
}

const todoChecked = (e) => {
    // Cycling the attribute of being checked or not
    if(e.target.getAttribute("checked") == "no")
        e.target.setAttribute("checked", "yes");
    else
        e.target.setAttribute("checked", "no");

    // Supposed to be allowing user to cancel their decision to undo check and not check off the task, but currently clearTimeout is not stopping the timeout
    var checkedTodo;
    if(e.target.getAttribute("checked") == "yes")
    {
        checkedTodo = setTimeout(function(){
            var index = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
            const todoList = document.querySelectorAll('li[index]');
            todoList.forEach(todo => {
                var todo_index = todo.getAttribute('index');
                if(todo_index == index)
                {
                    projectList.projects[projectList.currentProject].splice(index, 1);
                }
            });
            renderTodos();
        }, 2000);
    }
    else
    {
        // Currently is not running, but does enter scope
        clearTimeout(checkedTodo);
    }
}

// Starting the website
init();
renderProjects();