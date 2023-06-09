var editMode = true;
var appendAfter = true;
var mainError = document.getElementById('mainError');

document.getElementById('main').addEventListener('click', function(event) {
    closeMenus(event);
});

document.getElementById('menuButton').addEventListener('click', function() {
    toggleMenu(document.getElementById('menuButton').parentElement);
});

document.getElementById('gearButton').addEventListener('click', function() {
    toggleMenu(document.getElementById('gearButton').parentElement);
});

document.getElementById('editButton').addEventListener('click', function() {
    toggleEdit();
});

document.getElementById('directionButton').addEventListener('click', function() {
    toggleDirection();
});

document.getElementById('trashButton').addEventListener('click', function() {
    removeAll();
});

document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});

document.getElementById('uploadButton').addEventListener('change', function(event) {
    upload(event);
});

document.getElementById('downloadButton').addEventListener('click', function() {
    download();
});

document.getElementById('saveButton').addEventListener('click', function() {
    console.log('Speichern');
});

mainError.addEventListener('click', function(){
    mainError.parentElement.classList.add('hide');
});

// --- Funktion wird aufgerufen, wenn von der Schreib- zur Leseansicht und umgekehrt gewechselt wird
function toggleEdit(){
    var inputs = document.getElementsByClassName('editableText');
    var removeButtons = document.getElementsByClassName('structButtons');
    var editIcon = document.getElementById('editIcon');
    var dragPanel = document.getElementById('dragPanel');
    var spectateBar = document.getElementById('spectateBar');
    var bottomContainer = document.getElementById('bottomContainer');
    var spectateSeparator = document.getElementById('spectateSeparator');

    if(editMode){
        editIcon.src = 'svg/options/lock-solid.svg';
        dragPanel.classList.add('hide');
        spectateBar.classList.remove('hide');
        bottomContainer.classList.add('spectateMode');
        diagramSelectTopBar.classList.remove('hide');
        spectateSeparator.classList.remove('hide');

        for(var i = 0; i < inputs.length; i++){
            inputs[i].classList.add('noneditableText');
            inputs[i].contentEditable = 'false';
        }

        for(var i = 0; i < removeButtons.length; i++){
            removeButtons[i].classList.add('hide');
        }

        editMode = false;
    }else{
        editIcon.src = 'svg/options/unlock-solid.svg';
        dragPanel.classList.remove('hide');
        spectateBar.classList.add('hide');
        bottomContainer.classList.remove('spectateMode');
        diagramSelectTopBar.classList.add('hide');
        spectateSeparator.classList.add('hide');

        for(var i = 0; i < inputs.length; i++){
            inputs[i].classList.remove('noneditableText');
            inputs[i].contentEditable = 'true';
        }

        for(var i = 0; i < removeButtons.length; i++){
            removeButtons[i].classList.remove('hide');
        }

        editMode = true;
    }
}

// --- Funktion wird aufgerufen, wenn die Appendrichtung geändert wird
function toggleDirection(){
    if(appendAfter){
        directionIcon.src = 'svg/options/not-angle-double-down-solid.svg';
        appendAfter = false;
    }else{
        directionIcon.src = 'svg/options/angle-double-down-solid.svg';
        appendAfter = true;
    }
}

// --- Funktion löscht alle Strukturen des Hauptdiagrammes und alle zusätzlichen Diagramme
function removeAll(){
    var diagrams = document.getElementsByClassName('diagramContainer');
    showDiagram('mainDiagram');

    while(diagrams[0].childElementCount > 2){
        diagrams[0].removeChild(diagrams[0].children[2]);
    }

    while(diagrams.length > 1){
        diagrams[1].remove();
    }

    while(diagramSelect.options.length > 1){
        diagramSelect.options[1].remove();
        diagramSelectTopBar.options[1].remove();
    }
}

// --- Speichert das Diagramm in eine HTML Datei
function download(){
    var data = '';
    var diagrams = document.getElementsByClassName('diagramContainer');
    var heading = diagrams[0].children[1].firstElementChild.innerText;    

    if(heading == 'Main (klicken zum Bearbeiten)'){
        heading = 'unbenannt';
    }

    var type = 'text/html';
    var filename = heading + '.nash';

    for(var i = 0; i < diagrams.length; i++){
        data += diagrams[i].outerHTML;
    }

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement('a'),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

//Die Funktion ermöglicht das Laden des gespeicherten Diagramms
function upload(ev){
    var file = ev.target.files[0];
    var fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = function(evt){
        var newNode = document.createElement('node');
        var diagrams = document.getElementsByClassName('diagramContainer');
        var diagramPanel = document.getElementById('diagramPanel');

        while(diagramPanel.childElementCount > 0){
            diagramPanel.children[0].remove();
        }

        //Fügt die geladenen Diagramme ein
        diagramPanel.appendChild(newNode);
        newNode.outerHTML = evt.target.result;

        //Löscht alle Dropdown-Elemente, bis auf das erste
        while(diagramSelect.options.length > 1){
            diagramSelect.options[1].remove();
            diagramSelectTopBar.options[1].remove();
        }

        //Setzt den Text vom ersten Dropdown-Punkt zurück
        var heading = diagrams[0].children[1].firstElementChild.innerText;

        if(heading == 'Main (klicken zum Bearbeiten)'){
            heading = 'Main';
        }else{
            heading += ' (Main)';
        }

        diagramSelect.options[0].innerText = heading;
        diagramSelectTopBar.options[0].innerText = heading;

        //diagramBefore Attribut wird mit dem Standarddiagramm belegt, Dropdown-Punkte werden dem Dropdown-Menü hinzugefügt
        for(var i = 1; i < diagrams.length; i++){
            var newOptionOne = new Option(diagrams[i].id, diagrams[i].id);
            var newOptionTwo = new Option(diagrams[i].id, diagrams[i].id);
            diagramSelect.add(newOptionOne);
            diagramSelectTopBar.add(newOptionTwo);
        }

        //Wählt in dem Dropdown-Menü das aktive Diagramm aus
        for(var i = 1; i < diagramSelect.length; i++){
            if(diagramSelect.options[i].value == document.getElementsByClassName('activeDiagram')[0].id){
                diagramSelect.options[i].selected = true;
                diagramSelectTopBar.options[i].selected = true;
            }
        }
        addStructEvents();
    }
}

// --- Fügt den Strukturen alle nötigen Events hinzu
function addStructEvents(){
    var diagrams = document.getElementsByClassName('diagramContainer');
    var actions = document.getElementsByClassName('nassiAction');
    var functions = document.getElementsByClassName('nassiFunction');
    var branches = document.getElementsByClassName('nassiBranch');
    var multipleBranches = document.getElementsByClassName('nassiMultiplebranch');
    var headcontrolled = document.getElementsByClassName('nassiHeadcontrolled');
    var footcontrolled = document.getElementsByClassName('nassiFootcontrolled');


    for(var i = 0; i < diagrams.length; i++){
        diagrams[i].addEventListener('dragover', function(event){
            allowDrop(event);
        });
        
        diagrams[i].addEventListener('dragenter', function(event){
            dragEnter(event);
        });
        
        diagrams[i].addEventListener('drop', function(event){
            drop(event);
        });
        
        diagrams[i].addEventListener('dragleave', function(event){
            dragLeave(event);
        });
    }

    for(var i = 0; i < actions.length; i++){
        addActionEvents(actions[i]);
    }

    for(var i = 0; i < functions.length; i++){
        addFunctionEvents(functions[i]);
    }

    for(var i = 0; i < branches.length; i++){
        addBranchEvents(branches[i]);
    }

    for(var i = 0; i < multipleBranches.length; i++){
        addMultiplebranchEvents(multipleBranches[i]);
    }

    for(var i = 0; i < headcontrolled.length; i++){
        addHeadcontrolledEvents(headcontrolled[i]);
    }

    for(var i = 0; i < footcontrolled.length; i++){
        addFootcontrolledEvents(footcontrolled[i]);
    }
}

function closeMenus(ev = null){
    if(!ev || !ev.target.classList.contains('openMenu')){
        var menus = document.getElementsByClassName('menuContainer');

        for(var i = 0; i < menus.length; i++){
            menus[i].classList.add('hide');
        }
    }
}

// --- Öffnet/Schließt das Optionsfenster
function toggleMenu(menuWrapper){
    var menuContainer = menuWrapper.getElementsByClassName('menuContainer')[0];

    if(menuContainer.classList.contains('hide')){
        closeMenus();
        menuContainer.classList.remove('hide');
    }else{
        menuContainer.classList.add('hide');
    }
}