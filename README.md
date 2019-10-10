# Todo List

This is my implementation of a todo list. Inspiration comes from Todoist. The left column is a list of all of the projects for the user. User can create new projects and delete projects. Cannot create multiple projects of the same name. User can switch between projects by clicking on the project name. 

Each project will have their own todo/task list. Todos/Tasks can be added via the "+" button. Each todo/task will have a name, a space for extra info, a due date, and a priority indicator. Once created, the task will be shown on the right column with a toggle-able checkbox, priority indicator ("!"), the name and due date of the task. User can expand the task by clicking on the name to view the more information section as well as editing or deleting the current todo.

User can change priority of the task by clicking on the priority indicator ("!"), and switching the color of it (red, yellow, gray in order of importance). User can "checkoff" each tasks when completed and it will delete the task after 2 seconds. This cannot be undo (clearTimeout not working in if/else, WIP).

To run this on your local machine:
- Clone this repository to your local machine
- `cd .../JS-todo` in a terminal
- Run `npm install` to install the necessary dependencies (webpack & webpack cli)
- Run `npm run build` to build the main.js file in `dist` folder
- Can also run `node_modules\.bin\webpack` in order to build the main.js file

This implementation is not built with fluidity in mind nor with mobile functionality. Current build also does not support any kind of storage of information and therefore will reset on refresh. 
