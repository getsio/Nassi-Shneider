var editMode = true;
var appendAfter = true;
var mainError = document.getElementById('mainError');

document.getElementById('menuButton').addEventListener('click', function() {
    console.log('Menü');
});

document.getElementById('gearButton').addEventListener('click', function() {
    console.log('Optionen');
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

document.getElementById('uploadButton').addEventListener('click', function() {
    upload();
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
        editIcon.src = "svg/lock-solid.svg";
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
        editIcon.src = "svg/unlock-solid.svg";
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
        directionIcon.src = "svg/not-angle-double-down-solid.svg";
        appendAfter = false;
    }else{
        directionIcon.src = "svg/angle-double-down-solid.svg";
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

//Speichert das Diagramm in eine HTML Datei
function download(){
    var data = "";
    var diagrams = document.getElementsByClassName("diagramContainer");
    var heading = diagrams[0].children[1].firstElementChild.innerText;    

    if(heading == "Main (klicken zum Bearbeiten)"){
        heading = "unbenannt";
    }

    var type = "text/html";
    var filename = heading + ".nash";

    for(var i = 0; i < diagrams.length; i++){
        data += diagrams[i].outerHTML;
    }

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
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
function uploadDiagram(ev, element){
    var file = ev.target.files[0];        
    var fileReader = new FileReader();

    fileReader.readAsText(file);
    fileReader.onload = function(evt){
        var newNode = document.createElement("node");
        var allDiagrams = document.getElementsByClassName("saveDiagram");
        var diaSelect = document.getElementById("diagramSelect");

        //Löscht alle "Diagramme"
        while(document.body.childElementCount > 4){
            document.body.children[document.body.childElementCount-2].remove();
        }
        //Fügt die geladenen Diagramme ein
        document.body.insertBefore(newNode, document.body.children[document.body.childElementCount-1])
        newNode.outerHTML = evt.target.result;

        //Löscht alle Dropdown-Elemente, bis auf das erste
        while(diaSelect.options.length > 1){
            diaSelect.options[1].remove();
        }

        //Setzt den Text vom ersten Dropdown-Punkt zurück
        var heading = allDiagrams[0].children[0].children[0].children[0].innerText;

        if(heading == "Überschrift (anklicken zum Editieren)"){
            heading = "Hauptprogramm";
        }else{
            heading += " (Main)";
        }
        diaSelect.options[0].innerText = heading;

        //diagramBefore Attribut wird mit dem Standarddiagramm belegt, Dropdown-Punkte werden dem Dropdown-Menü hinzugefügt
        for(var i = 1; i < allDiagrams.length; i++){
            allDiagrams[i].diagramBefore = allDiagrams[0];
            var newOption = new Option(allDiagrams[i].id, allDiagrams[i].id);
            diaSelect.add(newOption, undefined);
        }

        //Wählt in dem Dropdown-Menü das aktive Diagramm aus
        for(var i = 1; i < diaSelect.length; i++){
            if(diaSelect.options[i].value == document.getElementsByClassName("activeDiagram")[0].id){
                diaSelect.options[i].selected = true;
            }
        }

        removeAllEvents();
        addAllEvents();
        resizeDiagram(0);
    }
}