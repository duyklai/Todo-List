const list = (function() 
{
    const create = function(name, note, due, priority) 
    {
        return {name, note, due, priority};
    };
    
    return {create};
})();

export default list;