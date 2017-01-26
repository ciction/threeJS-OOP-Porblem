// Inhertit convencience method
//=====================================================================================================
function inheritsFrom(child, parent){
    child.prototype = new parent();
    child.prototype.constructor = child;
}