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
    activateReadOnly();

    var targetStruct = ev.target;

    if(ev.target.classList.contains('structCondition')){
        while(!targetStruct.classList.contains('nassiStruct')){
            targetStruct = targetStruct.parentElement;
        }
    }else if(ev.target.classList.contains('subfunctionCondition')){
        while(!targetStruct.classList.contains('nassiSubfunction')){
            targetStruct = targetStruct.parentElement;
        }
    }

    if(targetStruct.classList.value.includes('nassi')){
        targetStruct.classList.add('draggedOver');
    }else if(targetStruct.classList.contains('diagramContainer')){
        deactivateReadOnly();
    }
}

//Setzt den Hintergrund zurück
function resetBackground(){
    var bg = document.getElementsByClassName("draggedOver");
    for(var i = 0; i < bg.length; i++){
        bg[i].classList.remove("draggedOver");
    }
}

//Deaktiviert den readonly Modus der Inputfelder
function deactivateReadOnly(){
    var inputs = document.getElementsByClassName('editableText');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].classList.remove('noneditableText');
        inputs[i].contentEditable = 'true';
    }
}

//Aktiviert den readonly Modus der Inputfelder
function activateReadOnly(){
    var inputs = document.getElementsByClassName('editableText');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].classList.add('noneditableText');
        inputs[i].contentEditable = 'false';
    }
}