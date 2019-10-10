const projectList = (function() 
{
    let projects = {"Inbox": []};
    let currentProject = "Inbox";

    const createProject = function(title) 
    {
        if(projects[title]) 
        {
            alert('Project name already exist');
            return;
        }
        // Prevent sorting of project list by adding space
        projects[' ' + title] = [];
    };
  
    return {projects, currentProject, createProject};
})();
  
  export default projectList;