document.getElementById('appendAction').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('appendFunction').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('appendBranch').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('appendMultiplebranch').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('appendHeadcontrolled').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('appendFootcontrolled').addEventListener('dragstart', function(event) {
    drag(event);
});

document.getElementById('mainDiagram').addEventListener('dragover', function(event){
    allowDrop(event);
});

document.getElementById('mainDiagram').addEventListener('dragenter', function(event){
    dragEnter(event);
});

//Die Funktion wird beim "draggen" aufgerufen und speichert die id des Objektes
function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}

//Die Funktion sorgt dafür, dass in dem Bereich "gedroppt" werden darf
function allowDrop(ev){
    ev.preventDefault();
}

//Die Funktion wird aufgerufen, sobald man mit einem "gedraggten" Objekt ein für "drops" valides Feld betritt
function dragEnter(ev){
    resetBackground();
    var targetStruct = ev.target;

    if(ev.target.classList.contains('editableText') || ev.target.classList.contains('blackLineVerticalLeft') ||
    ev.target.classList.contains('blackLineVerticalRight')){
        while(!targetStruct.classList.contains('nassiStruct')){
            targetStruct = targetStruct.parentElement;
        }
    }

    if(targetStruct.classList.contains('nassiStruct')){
        targetStruct.classList.add('draggedOver');
    }
}

//Setzt den Hintergrund zurück
function resetBackground(){
    var bg = document.getElementsByClassName("draggedOver");
    for(var i = 0; i < bg.length; i++){
        bg[i].classList.remove("draggedOver");
    }
}