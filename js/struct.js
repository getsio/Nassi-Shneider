document.getElementById('appendAction').addEventListener('click', function() {
    appendStruct('templateAction');
});

document.getElementById('appendFunction').addEventListener('click', function() {
    appendStruct('templateFunction');
});

document.getElementById('appendBranch').addEventListener('click', function() {
    appendStruct('templateBranch');
});

document.getElementById('appendMultiplebranch').addEventListener('click', function() {
    appendStruct('templateMultiplebranch');
});

document.getElementById('appendHeadcontrolled').addEventListener('click', function() {
    appendStruct('templateHeadcontrolled');
});

document.getElementById('appendFootcontrolled').addEventListener('click', function() {
    appendStruct('templateFootcontrolled');
});

// --- Fügt dem Diagramm, abhängig von dem Target, die neue Struktur hinzu
function appendStruct(templateName, targetStruct = null){
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var structure = templates.content.getElementById(templateName);
    var newStructure = structure.content.cloneNode(true).firstElementChild;

    switch(templateName){
        case 'templateAction':
            addActionEvents(newStructure);
            break;
        case 'templateFunction':
            newStructure.children[1].nameBefore = '';
            addFunctionEvents(newStructure);
            break;
        case 'templateBranch':
            var branchArea = newStructure.children[1];

            branchArea.children[0].children[1].defaultInnerHtml = branchArea.children[0].children[1].innerHTML;
            branchArea.children[1].children[1].defaultInnerHtml = branchArea.children[1].children[1].innerHTML;
            addBranchEvents(newStructure);

            break;
        case 'templateMultiplebranch':
            var caseArea = newStructure.lastElementChild.firstElementChild.lastElementChild;
            var defaultCaseArea = newStructure.lastElementChild.lastElementChild;
            var defaultCaseContainer = defaultCaseArea.children[1].children[0].children[1];
        
            for(var i = 0; i < caseArea.childElementCount; i++){
                caseArea.children[i].children[1].defaultInnerHtml = caseArea.children[i].children[1].innerHTML;
            }
            defaultCaseContainer.defaultInnerHtml = defaultCaseContainer.innerHTML;
        
            addMultiplebranchEvents(newStructure);
            break;
        case 'templateHeadcontrolled':
            var innerloop = newStructure.children[1].children[1];
            innerloop.defaultInnerHtml = innerloop.innerHTML;
        
            addHeadcontrolledEvents(newStructure);
            break;
        case 'templateFootcontrolled':
            var innerloop = newStructure.children[0].children[1];
            innerloop.defaultInnerHtml = innerloop.innerHTML;
        
            addFootcontrolledEvents(newStructure);
            break;
        default:
            break;
    }

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

// --- Fügt der Aktion die Events zu
function addActionEvents(struct){
    var textArea = struct.firstElementChild;
    var removeButton = struct.lastElementChild.firstElementChild;
    
    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });
    
    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });
}

// --- Fügt der Funktion die Events zu
function addFunctionEvents(struct){
    var textArea = struct.children[1];
    var removeButton = struct.lastElementChild.firstElementChild;

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
}

// --- Fügt der Verzweigung die Events zu
function addBranchEvents(struct){
    var textArea = struct.firstElementChild.firstElementChild;
    var removeButton = struct.firstElementChild.lastElementChild.firstElementChild;

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });
}

// --- Fügt der Mehrfachverzweigung die Events zu
function addMultiplebranchEvents(struct){
    var textArea = struct.firstElementChild.firstElementChild;
    var removeButton = struct.firstElementChild.lastElementChild.firstElementChild;
    var removeBranchButton = struct.firstElementChild.lastElementChild.children[1];
    var addBranchButton = struct.firstElementChild.lastElementChild.lastElementChild;
    var caseArea = struct.lastElementChild.firstElementChild.lastElementChild;
    var caseOneText = caseArea.firstElementChild.firstElementChild;
    var caseTwoText = caseArea.lastElementChild.firstElementChild;

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
}

// --- Fügt der kopfgesteuerten Schleife die Events zu
function addHeadcontrolledEvents(struct){
    var textArea = struct.firstElementChild.children[1];
    var removeButton = struct.firstElementChild.children[2].firstElementChild;

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });
}

// --- Fügt der fußgesteuerten Schleife die Events zu
function addFootcontrolledEvents(struct){
    var textArea = struct.lastElementChild.children[1];
    var removeButton = struct.firstElementChild.children[2].firstElementChild;


    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });
}