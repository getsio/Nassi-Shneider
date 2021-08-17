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

document.getElementById('mainDiagram').addEventListener('dragover', function(event){
    allowDrop(event);
});

document.getElementById('mainDiagram').addEventListener('dragenter', function(event){
    dragEnter(event);
});

document.getElementById('mainDiagram').addEventListener('drop', function(event){
    drop(event);
});

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

    if(targetStruct.classList.contains('nassiMultiplebranch')){
        var subfunctionArea = targetStruct.getElementsByClassName('nassiSubfunction');

        for(var i = 0; i < subfunctionArea.length; i++){
            subfunctionArea[i].classList.add('draggedOver');
        }
    }

    if(targetStruct.classList.value.includes('nassi')){
        targetStruct.classList.add('draggedOver');
        var structButtons = targetStruct.getElementsByClassName('structButtons')[0];
        if(structButtons != null){
            structButtons.classList.add('draggedOver');
        }
    }else if(targetStruct.classList.contains('diagramContainer')){
        deactivateReadOnly();
    }
}

// --- Die Funktion wird aufgerufen, wenn das "gedraggte" Objekt in ein valides Feld "gedroppt" wird
function drop(ev){
    resetBackground();
    deactivateReadOnly();
    var targetStruct = getTarget(ev.target);

    ev.preventDefault();
    var templateName = ev.dataTransfer.getData('templateName');
    var templateRef = document.getElementById(templateName);

    var executingFunction;

    console.log(appendAfter);
    console.log(targetStruct);
    console.log(templateRef);

    if(targetStruct.classList.contains('diagramContainer')){
        executingFunction = getAppendFunction(templateName);
    }

    executingFunction();
}

// --- Liefert je nach ausgewähltem Template die zu benutzende Funktion
function getAppendFunction(templateName){
    switch(templateName){
        case 'templateAction':
            return function(){
                appendStructAction();
            }
        case 'templateFunction':
            return function(){
                appendStructFunction();
            }
        case 'templateBranch':
            return function(){
                appendStructBranch();
            }
        case 'templateMultiplebranch':
            return function(){
                appendStructMultiplebranch();
            }
        case 'templateHeadcontrolled':
            return function(){
                appendStructHeadcontrolled();
            }
        case 'templateFootcontrolled':
            return function(){
                appendStructFootcontrolled();
            }
        default:
            console.log('nicht richtig');
            break;
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