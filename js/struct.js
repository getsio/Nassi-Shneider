document.getElementById('appendAction').addEventListener('click', function() {
    appendStructAction();
});

document.getElementById('appendFunction').addEventListener('click', function() {
    appendStructFunction();
});

document.getElementById('appendBranch').addEventListener('click', function() {
    appendStructBranch();
});

document.getElementById('appendMultiplebranch').addEventListener('click', function() {
    appendStructMultiplebranch();
});

document.getElementById('appendHeadcontrolled').addEventListener('click', function() {
    appendStructHeadcontrolled();
});

document.getElementById('appendFootcontrolled').addEventListener('click', function() {
    appendStructFootcontrolled();
});

// --- Fügt dem aktiven Diagramm eine Aktion hinzu
function appendStructAction(targetStruct = null){
    var structure = templates.content.getElementById('templateAction');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    var textArea = newStructure.firstElementChild;
    var removeButton = newStructure.lastElementChild.firstElementChild;
    
    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });
    
    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    appendStruct(diagram, newStructure, targetStruct);
}

// --- Fügt dem aktiven Diagramm eine Funktion hinzu
function appendStructFunction(targetStruct = null){
    var structure = templates.content.getElementById('templateFunction');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;
    newStructure.children[1].nameBefore = '';

    var textArea = newStructure.children[1];
    var removeButton = newStructure.lastElementChild.firstElementChild;

    textArea.addEventListener('click', function(){
        editFunctionName(textArea);
    });
    
    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    textArea.addEventListener('blur', function(){
        finishEditFunctionName(textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    appendStruct(diagram, newStructure, targetStruct);
}

// --- Fügt dem aktiven Diagramm eine Verzweigung hinzu
function appendStructBranch(targetStruct = null){
    var structure = templates.content.getElementById('templateBranch');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    var textArea = newStructure.firstElementChild.firstElementChild;
    var removeButton = newStructure.firstElementChild.lastElementChild.firstElementChild;
    var branchArea = newStructure.children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    branchArea.children[0].children[1].defaultInnerHtml = branchArea.children[0].children[1].innerHTML;
    branchArea.children[1].children[1].defaultInnerHtml = branchArea.children[1].children[1].innerHTML;

    appendStruct(diagram, newStructure, targetStruct);
}

// --- Fügt dem aktiven Diagramm eine Mehrfachverzweigung hinzu
function appendStructMultiplebranch(targetStruct = null){
    var structure = templates.content.getElementById('templateMultiplebranch');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    var textArea = newStructure.firstElementChild.firstElementChild;
    var removeButton = newStructure.firstElementChild.lastElementChild.firstElementChild;
    var removeBranchButton = newStructure.firstElementChild.lastElementChild.children[1];
    var addBranchButton = newStructure.firstElementChild.lastElementChild.lastElementChild;

    var caseArea = newStructure.lastElementChild.firstElementChild.lastElementChild;
    var caseOneText = caseArea.firstElementChild.firstElementChild;
    var caseTwoText = caseArea.lastElementChild.firstElementChild;

    var defaultCaseArea = newStructure.lastElementChild.lastElementChild;
    var defaultCaseContainer = defaultCaseArea.children[1].children[0].children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    removeBranchButton.addEventListener('click', function(){
        removeBranch(removeBranchButton);
    });

    addBranchButton.addEventListener('click', function(){
        addBranch(addBranchButton);
    });

    caseOneText.addEventListener('keydown', function(event){
        keyInput(event, caseOneText);
    });

    caseTwoText.addEventListener('keydown', function(event){
        keyInput(event, caseTwoText);
    });

    for(var i = 0; i < caseArea.childElementCount; i++){
        caseArea.children[i].children[1].defaultInnerHtml = caseArea.children[i].children[1].innerHTML;
    }

    defaultCaseContainer.defaultInnerHtml = defaultCaseContainer.innerHTML;
    appendStruct(diagram, newStructure, targetStruct);
}

// --- Fügt dem aktiven Diagramm eine kopfgesteuerte Schleife hinzu
function appendStructHeadcontrolled(targetStruct = null){
    var structure = templates.content.getElementById('templateHeadcontrolled');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    var textArea = newStructure.firstElementChild.children[1];
    var removeButton = newStructure.firstElementChild.children[2].firstElementChild;

    var innerloop = newStructure.children[1].children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    innerloop.defaultInnerHtml = innerloop.innerHTML;
    appendStruct(diagram, newStructure, targetStruct);
}

// --- Fügt dem aktiven Diagramm eine fußgesteuerte Schleife hinzu
function appendStructFootcontrolled(targetStruct = null){
    var structure = templates.content.getElementById('templateFootcontrolled');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    var textArea = newStructure.lastElementChild.lastElementChild;
    var removeButton = newStructure.firstElementChild.lastElementChild.firstElementChild;

    var innerloop = newStructure.children[0].children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    innerloop.defaultInnerHtml = innerloop.innerHTML;
    appendStruct(diagram, newStructure, targetStruct);
}

function appendStruct(diagram, newStructure, targetStruct = null){
    if(targetStruct == null || targetStruct.classList.contains('diagramContainer')){
        diagram.appendChild(newStructure);
    }else if(targetStruct.classList.contains('nassiSubfunction')){
        targetStruct.innerHTML = '';
        targetStruct.appendChild(newStructure);
    }else if(targetStruct.classList.contains('nassiStruct')){
        if(appendAfter){
            targetStruct.after(newStructure);
        }else{
            targetStruct.before(newStructure);
        }
    }
}