var diagramSelectTopBar = document.getElementById('diagramSelectTopBar');
var diagramSelect = document.getElementById('diagramSelect');
var diagramPanel = document.getElementById('diagramPanel');
var mainHeader = document.getElementById('mainHeader');

mainHeader.addEventListener('click', function() {
    editMainHeader(mainHeader);
});

mainHeader.addEventListener('blur', function() {
    finishEditMainHeader(mainHeader);
});

mainHeader.addEventListener('keydown', function(event) {
    keyInput(event, mainHeader);
});

diagramSelectTopBar.addEventListener('click', function() {
    showDiagram(diagramSelectTopBar.value);
});

diagramSelectTopBar.addEventListener('change', function() {
    changeSelect(diagramSelectTopBar.value, diagramSelect);
});

diagramSelect.addEventListener('click', function() {
    showDiagram(diagramSelect.value);
});

diagramSelect.addEventListener('change', function() {
    changeSelect(diagramSelect.value, diagramSelectTopBar);
});

// --- Funktion wird aufgerufen, wenn ein anderes Diagramm selektiert wird und zeigt dieses an
function showDiagram(diagramName){
    var activeDiagram = document.getElementsByClassName('activeDiagram')[0];
    var newActiveDiagram = document.getElementById(diagramName);
    var errors = document.getElementsByClassName('nameError');

    if(activeDiagram != null){
        activeDiagram.classList.remove('activeDiagram');
        activeDiagram.children[0].classList.remove('activeError');
    }

    newActiveDiagram.classList.add('activeDiagram');
    newActiveDiagram.children[0].classList.add('activeError');

    for(var i = 0; i < errors.length; i++){
        errors[i].classList.add('hide');
    }
}

// --- Wechselt beim mitgegebenen Select die ausgewählte Option
function changeSelect(diagramName, select){
    for(var i = 0; i < select.length; i++){
        if(select.options[i].value == diagramName){
            select.options[i].selected = true;
        }
    }
}

// --- Funktion wird aufgerufen, wenn der Hauptheader angeklickt wird
function editMainHeader(el){
    if(el.contentEditable == 'true' && el.innerText == 'Main (klicken zum Bearbeiten)'){  
        el.innerText = '';
    }
}

// --- Funktion wird aufgerufen, wenn ein Funktionstext (Header oder Funktionsname) angeklickt wird
function editFunctionName(el){
    if(el.contentEditable == 'true'){
        el.nameBefore = el.innerText;
    }
}

// --- Funktion wird aufgerufen beim Drücken der Entertaste, während ein Textfeld im Fokus stand
function keyInput(ev, el){
    if(ev.keyCode === 13){
        el.blur();
    }
}

// --- Funktion wird aufgerufen beim bestätigen eines neuen Hauptheaders
function finishEditMainHeader(el){
    if(el.innerText === ''){
        el.innerText = 'Main (klicken zum Bearbeiten)';
    }else{
        diagramSelect.options[0].text = el.innerText + ' (Main)';
        diagramSelectTopBar.options[0].text = el.innerText + ' (Main)';
    }
}

// --- Funktion wird aufgerufen beim bestätigen eines neuen Unterdiagrammheaders
function finishEditHeader(el, functionStruct){
    var nameError = document.getElementsByClassName('activeError')[0];
    var checkId = document.getElementById(el.innerText);
    var blacklistedIds = Array.prototype.map.call(document.querySelectorAll('[id]'), function(el, i){
        return el.id;
    });

    if(el.innerText == ''){
        el.innerText = el.nameBefore;
    }else if(el.nameBefore != el.innerText && (blacklistedIds.includes(el.innerText) || checkId)){
        el.innerText = el.nameBefore;
        nameError.classList.remove('hide');
    }else{
        nameError.classList.add('hide');
        functionStruct.innerText = el.innerText;
        changeOldDiagram(el);
    }
}

// --- Funktion wird aufgerufen beim bestätigen eines neuen Funktionsnamens
function finishEditFunctionName(el){
    var nameError = document.getElementsByClassName('activeError')[0];
    var checkId = document.getElementById(el.innerText);
    var blacklistedIds = Array.prototype.map.call(document.querySelectorAll('[id]'), function(el, i){
        return el.id;
    });

    if(el.innerText == ''){
        el.innerText = el.nameBefore;
    }else{
        nameError.classList.add('hide');

        if(el.nameBefore != el.innerText && (blacklistedIds.includes(el.innerText) || checkId)){
            el.innerText = el.nameBefore;
            nameError.classList.remove('hide');
        }else if(el.nameBefore == ''){
            var newOptionOne = document.createElement('option');
            var newOptionTwo = document.createElement('option');

            newOptionOne.value = el.innerText;
            newOptionOne.innerText = el.innerText;

            newOptionTwo.value = el.innerText;
            newOptionTwo.innerText = el.innerText;

            diagramSelect.appendChild(newOptionOne);
            diagramSelectTopBar.appendChild(newOptionTwo);
            createNewDiagram(el);
        }else{
            changeOldDiagram(el);
        }
    }
}

// --- Funktion ändert die dazugehörigen Werte einer bestehenden Unterfunktion
function changeOldDiagram(el){
    var oldDiagram = document.getElementById(el.nameBefore);
    oldDiagram.id = el.innerText;

    for(var i = 0; i < diagramSelect.options.length; i++){
        if(diagramSelect.options[i].value == el.nameBefore){
            diagramSelect.options[i].value = el.innerText;
            diagramSelect.options[i].innerText = el.innerText;
        }
    }

    for(var i = 0; i < diagramSelectTopBar.options.length; i++){
        if(diagramSelectTopBar.options[i].value == el.nameBefore){
            diagramSelectTopBar.options[i].value = el.innerText;
            diagramSelectTopBar.options[i].innerText = el.innerText;
        }
    }
}

// --- Funktion erstellt ein neues Diagramm
function createNewDiagram(el){
    var diagram = templates.content.getElementById('templateDiagram');
    var newDiagram = diagram.content.cloneNode(true).firstElementChild;
    newDiagram.id = el.innerText;
    newDiagram.children[1].children[0].innerText = el.innerText;

    var closeErrorButton = newDiagram.firstElementChild.lastElementChild;
    var functionHeader = newDiagram.lastElementChild.firstElementChild;

    closeErrorButton.addEventListener('click', function(){
        closeErrorButton.parentElement.classList.add('hide');
    });

    functionHeader.addEventListener('click', function(){
        editFunctionName(functionHeader);
    });

    functionHeader.addEventListener('blur', function(){
        finishEditHeader(functionHeader, el);
    });

    functionHeader.addEventListener('keydown', function(event){
        keyInput(event, functionHeader);
    });

    newDiagram.addEventListener('dragover', function(event){
        allowDrop(event);
    });
    
    newDiagram.addEventListener('dragenter', function(event){
        dragEnter(event);
    });

    newDiagram.addEventListener('drop', function(event){
        drop(event);
    });

    newDiagram.addEventListener('dragleave', function(event){
        dragLeave(event);
    });

    functionHeader.nameBefore = '';
    diagramPanel.appendChild(newDiagram);
}

// --- Diese Funktion fügt der zugehörigen Mehrfachverzweigung einen Zweig hinzu
function addBranch(el){
    var branchArea = el.parentElement.parentElement.nextElementSibling.children[0];
    var cntBranches = parseInt(branchArea.style.flexGrow);
    var appendArea = branchArea.children[1];
    var activeDiagram = document.getElementsByClassName('activeDiagram')[0];

    branchArea.style.flexGrow = cntBranches + 1;
    cntBranches++;

    var structure = templates.content.getElementById('templateAdditionalBranch');
    var newBranch = structure.content.cloneNode(true);

    appendArea.appendChild(newBranch);
    var textArea = appendArea.lastElementChild.firstElementChild;

    textArea.setAttribute('placeholder', 'Case ' + cntBranches + ' ...'); 
    diagramPanel.scroll(activeDiagram.offsetWidth, 0);

    textArea.addEventListener('keydown', function(event){
        keyInput(event, textArea);
    });
}

// --- Diese Funktion löscht aus der dazugehörigen Mehrfachverzweigung den letzten Zweig
function removeBranch(el){
    var branchArea = el.parentElement.parentElement.nextElementSibling.children[0];
    var cntBranches = parseInt(branchArea.style.flexGrow);
    var appendArea = branchArea.children[1];

    if(cntBranches > 2){
        branchArea.style.flexGrow = cntBranches - 1;
        appendArea.removeChild(appendArea.lastElementChild);
    }
}

// --- Funktion löscht eine selektierte Struktur
function removeStructure(el){
    var parent = el.parentElement;

    while(!parent.classList.value.includes('nassi')){
        parent = parent.parentElement;
    }

    if(parent.parentElement.classList.contains('nassiSubfunction')){
        var nassiSubfunction = parent.parentElement;
    }

    if(parent.classList.contains('nassiFunction') && parent.children[1].innerText != ''){
        var functionName = parent.children[1].innerText;
        document.getElementById(functionName).remove();

        for(var i = 0; i < diagramSelect.options.length; i++){
            if(diagramSelect.options[i].value == functionName){
                diagramSelect.options[i].remove();
                break;
            }
        }

        for(var i = 0; i < diagramSelectTopBar.options.length; i++){
            if(diagramSelectTopBar.options[i].value == functionName){
                diagramSelectTopBar.options[i].remove();
                break;
            }
        }
    }

    parent.remove();

    if(nassiSubfunction != null && nassiSubfunction.innerHTML == ''){
        nassiSubfunction.innerHTML = nassiSubfunction.defaultInnerHtml;
    }
}