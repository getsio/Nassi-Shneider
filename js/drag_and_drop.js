document.getElementById('appendAction').addEventListener('dragstart', function(event) {
    drag(event, 'templateAction');
});

document.getElementById('appendFunction').addEventListener('dragstart', function(event) {
    drag(event, 'templateFunction');
});

document.getElementById('appendBranch').addEventListener('dragstart', function(event) {
    drag(event, 'templateBranch');
});

document.getElementById('appendMultiplebranch').addEventListener('dragstart', function(event) {
    drag(event, 'templateMultiplebranch');
});

document.getElementById('appendHeadcontrolled').addEventListener('dragstart', function(event) {
    drag(event, 'templateHeadcontrolled');
});

document.getElementById('appendFootcontrolled').addEventListener('dragstart', function(event) {
    drag(event, 'templateFootcontrolled');
});

document.getElementById('appendAction').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('appendFunction').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('appendBranch').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('appendMultiplebranch').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('appendHeadcontrolled').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('appendFootcontrolled').addEventListener('dragend', function() {
    resetBackground();
});

document.getElementById('mainDiagram').addEventListener('dragover', function(event) {
    allowDrop(event);
});

document.getElementById('main').addEventListener('dragenter', function(event) {
    dragEnter(event);
});

document.getElementById('mainDiagram').addEventListener('drop', function(event) {
    drop(event);
});

document.getElementById('mainDiagram').addEventListener('dragleave', function(event) {
    dragLeave(event);
});

var isDropZone = false;

// --- Die Funktion wird beim "draggen" aufgerufen und speichert die id des Objektes
function drag(ev, templateName){
    ev.dataTransfer.setData('templateName', templateName);
}

// --- Die Funktion sorgt dafür, dass in dem Bereich "gedroppt" werden darf
function allowDrop(ev){
    ev.preventDefault();
}

// --- Die Funktion wird aufgerufen, sobald man mit einem "gedraggten" Objekt ein für "drops" valides Feld betritt
function dragEnter(ev){
    resetBackground();
    activateReadOnly();
    var targetStruct = getTarget(ev.target);
    var multiplebranches = targetStruct.getElementsByClassName('nassiMultiplebranch');

    if(targetStruct.classList.value.includes('nassi') || targetStruct.classList.contains('diagramContainer')){
        isDropZone = true;
        targetStruct.classList.add('draggedOver');

        var structButtons = targetStruct.getElementsByClassName('structButtons');

        for(var i = 0; i < structButtons.length; i++){
            if(structButtons[i] != null){
                structButtons[i].classList.add('draggedOver');
            }
        }

        for(var i = 0; i < multiplebranches.length; i++){
            var subfunctionArea = multiplebranches[i].getElementsByClassName('nassiSubfunction');

            for(var j = 0; j < subfunctionArea.length; j++){
                subfunctionArea[j].classList.add('draggedOver');
            }
        }

        if(targetStruct.getElementsByClassName('nassiLoop')){
            var loopArea = targetStruct.getElementsByClassName('loopText');

            for(var i = 0; i < loopArea.length; i++){
                loopArea[i].classList.add('draggedOver');
            }
        }

        if(targetStruct.classList.contains('diagramContainer')){
            deactivateReadOnly();
        }
    }else{
        isDropZone = false;
    }
}

// --- Die Funktion wird aufgerufen, wenn das "gedraggte" Objekt in ein valides Feld "gedroppt" wird
function drop(ev){
    resetBackground();
    deactivateReadOnly();
    var targetStruct = getTarget(ev.target);

    ev.preventDefault();
    var templateName = ev.dataTransfer.getData('templateName');
    appendStruct(templateName, targetStruct);
}

// --- Die Funktion wird aufgerufen, wenn das gedraggte Objekt einen Bereich verlässt
function dragLeave(ev){
    var targetStruct = ev.target.classList;
    var leaveCondition = (targetStruct.contains('diagramDefaults') 
    || targetStruct.contains('nassiStruct') || targetStruct.contains('structCondition')
    || targetStruct.contains('subfunctionCondition') || targetStruct.contains('diagramContainer'))
    && isDropZone;

    if(!leaveCondition){
        resetBackground();
    }
}

// --- Liefert das anvisierte Ziel
function getTarget(targeted){
    var newTarget = targeted;

    if(targeted.classList.contains('structCondition')){
        while(!newTarget.classList.contains('nassiStruct')){
            newTarget = newTarget.parentElement;
        }
    }else if(targeted.classList.contains('subfunctionCondition')){
        while(!newTarget.classList.contains('nassiSubfunction')){
            newTarget = newTarget.parentElement;
        }
    }else if(targeted.classList.contains('diagramDefaults')){
        while(!newTarget.classList.contains('diagramContainer')){
            newTarget = newTarget.parentElement;
        }
    }

    return newTarget;
}

// --- Setzt den Hintergrund zurück
function resetBackground(){
    var draggedOverElements = document.getElementsByClassName('draggedOver');
    while(draggedOverElements.length > 0){
        draggedOverElements[0].classList.remove('draggedOver');
    }
}

// --- Deaktiviert den readonly Modus der Inputfelder
function deactivateReadOnly(){
    var inputs = document.getElementsByClassName('editableText');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].classList.remove('noneditableText');
        inputs[i].contentEditable = 'true';
    }
}

// --- Aktiviert den readonly Modus der Inputfelder
function activateReadOnly(){
    var inputs = document.getElementsByClassName('editableText');
    for(var i = 0; i < inputs.length; i++){
        inputs[i].classList.add('noneditableText');
        inputs[i].contentEditable = 'false';
    }
}