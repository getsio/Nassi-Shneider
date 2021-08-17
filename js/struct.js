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
function appendStructAction(){
    var structure = document.getElementById('templateAction');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);

    console.log(newStructure);

    var textArea = diagram.lastElementChild.firstElementChild;
    var removeButton = diagram.lastElementChild.lastElementChild.firstElementChild;

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });
}

// --- Fügt dem aktiven Diagramm eine Funktion hinzu
function appendStructFunction(){
    var structure = document.getElementById('templateFunction');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);
    diagram.lastElementChild.children[1].nameBefore = '';

    var textArea = diagram.lastElementChild.children[1];
    var removeButton = diagram.lastElementChild.lastElementChild.firstElementChild;

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

// --- Fügt dem aktiven Diagramm eine Verzweigung hinzu
function appendStructBranch(){
    var structure = document.getElementById('templateBranch');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);

    var textArea = diagram.lastElementChild.firstElementChild.firstElementChild;
    var removeButton = diagram.lastElementChild.firstElementChild.lastElementChild.firstElementChild;
    var branchArea = diagram.lastElementChild.children[1]

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    branchArea.children[0].children[1].defaultInnerHtml = branchArea.children[0].children[1].innerHTML;
    branchArea.children[1].children[1].defaultInnerHtml = branchArea.children[1].children[1].innerHTML;
}

// --- Fügt dem aktiven Diagramm eine Mehrfachverzweigung hinzu
function appendStructMultiplebranch(){
    var structure = document.getElementById('templateMultiplebranch');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);

    var textArea = diagram.lastElementChild.firstElementChild.firstElementChild;
    var removeButton = diagram.lastElementChild.firstElementChild.lastElementChild.firstElementChild;
    var removeBranchButton = diagram.lastElementChild.firstElementChild.lastElementChild.children[1];
    var addBranchButton = diagram.lastElementChild.firstElementChild.lastElementChild.lastElementChild;

    var caseArea = diagram.lastElementChild.lastElementChild.firstElementChild.lastElementChild;
    var caseOneText = caseArea.firstElementChild.firstElementChild;
    var caseTwoText = caseArea.lastElementChild.firstElementChild;

    var defaultCaseArea = diagram.lastElementChild.lastElementChild.lastElementChild;
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
}

// --- Fügt dem aktiven Diagramm eine kopfgesteuerte Schleife hinzu
function appendStructHeadcontrolled(){
    var structure = document.getElementById('templateHeadcontrolled');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);

    var textArea = diagram.lastElementChild.firstElementChild.children[1];
    var removeButton = diagram.lastElementChild.firstElementChild.children[2].firstElementChild;

    var innerloop = diagram.lastElementChild.children[1].children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    innerloop.defaultInnerHtml = innerloop.innerHTML;
}

// --- Fügt dem aktiven Diagramm eine fußgesteuerte Schleife hinzu
function appendStructFootcontrolled(){
    var structure = document.getElementById('templateFootcontrolled');
    var diagram = document.getElementsByClassName('activeDiagram')[0];
    var newStructure = structure.content.cloneNode(structure);
    diagram.appendChild(newStructure);

    var textArea = diagram.lastElementChild.lastElementChild.lastElementChild;
    var removeButton = diagram.lastElementChild.firstElementChild.lastElementChild.firstElementChild;

    var innerloop = diagram.lastElementChild.children[0].children[1];

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });

    removeButton.addEventListener('click', function(){
        removeStructure(removeButton);
    });

    innerloop.defaultInnerHtml = innerloop.innerHTML;
}