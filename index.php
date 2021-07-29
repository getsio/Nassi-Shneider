<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Simpler Editor zum Erstellen/Speichern/Laden/Bearbeiten von 
    Nassi-Shneiderman Diagrammen. Autor: Georgios Tsiokas">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="stylesheet.css">
    <title>Nassi-Shneiderman - Editor</title>
  </head>
  <body>
    <?php
      session_start();
    ?>
    <div id="main">
      <!-- -------------------- Topbar -------------------- -->
      <div id="topbar">
        <div class="topleftPanel">
          <button type="button" class="menuButtons" onclick="console.log('Menü')">
            <img class="menuIcon" src="svg/menu.svg" alt="Icon des Menüs" draggable="false">
          </button>
          <p class="programName">Nassi-Shneiderman Editor</p>
          <div id="spectateSeparator" class="hide"></div>
          <select id="diagramSelectTopBar" class="hide" oninput="console.log(this.value);">
            <option value="mainDiagram" selected>Main</option>
          </select>
        </div>
        <div class="topmiddlePanel">
          
        </div>
        <div class="toprightPanel">
          <button type="button" class="optionButtons" onclick="console.log('Optionen');">
            <img id="gearIcon" class="optionIcons" src="svg/cog-solid.svg" alt="Icon der Optionen" draggable="false">
          </button>
          <div class="blockFlex"></div>
          <button type="button" class="optionButtons" onclick="toggleEdit();">
            <img id="editIcon" class="optionIcons" src="svg/unlock-solid.svg" alt="Icon zum sperren/entsperren der Editierung" draggable="false">
          </button>
          <button type="button" class="optionButtons" onclick="toggleDirection();">
            <img id="directionIcon" class="optionIcons" src="svg/angle-double-down-solid.svg" alt="Icon zum Bestimmen der Anhängrichtung" draggable="false">
          </button>
          <div class="blockFlexWide"></div>
          <button type="button" class="optionButtons" onclick="removeAll();">
            <img id="trashIcon" class="optionIcons" src="svg/trash-solid.svg" alt="Icon zum Löschen des Diagrammes" draggable="false">
          </button>
          <button type="button" class="optionButtons" onclick="window.print();">
            <img id="printIcon" class="optionIcons" src="svg/print-solid.svg" alt="Icon zum Drucken des Diagrammes" draggable="false">
          </button>
          <button type="button" class="optionButtons" onclick="">
            <img id="uploadIcon" class="optionIcons" src="svg/upload-solid.svg" alt="Icon zum Hochladen des Diagrammes" draggable="false">
          </button>
          <button type="button" class="optionButtons" onclick="">
            <img id="downloadIcon" class="optionIcons" src="svg/download-solid.svg" alt="Icon zum Herunterladen des Diagrammes" draggable="false">
          </button>
          <button type="button" class="optionButtons" onclick="">
            <img id="saveIcon" class="optionIcons" src="svg/save-solid.svg" alt="Icon zum Speichern des Diagrammes" draggable="false">
          </button>
        </div>
      </div>
      <div id="spectateBar" class="hide"></div>
      <!-- -------------------- Workarea -------------------- -->
      <div id="bottomContainer">
        <!--- -------------------- Tools -------------------- -->
        <div id="dragPanel">
          <div id="diaSelectContainer">
            <select id="diagramSelect" oninput="showDiagram(this.value)">
              <option value="mainDiagram" selected>Main</option>
            </select>
          </div>
          <div id="iconContainer">
            <div class="draggables" onclick="appendStructure('templateAction');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/aktion.svg" alt="Bild einer Aktion" draggable="false">
            </div>
            <div class="draggables" onclick="appendStructure('templateFunction');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/funktion.svg" alt="Bild einer Funktion" draggable="false">
            </div>
            <div class="draggables" onclick="appendStructure('templateBranch');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/verzweigung.svg" alt="Bild einer Verzweigung" draggable="false">
            </div>
            <div class="draggables" onclick="appendStructure('templateMultiplebranch');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/mehrfachverzweigung.svg" alt="Bild einer Mehrfachverzweigung" draggable="false">
            </div>
            <div class="draggables" onclick="appendStructure('templateHeadcontrolled');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/kopfgesteuert.svg" alt="Bild einer kopfgesteuerten Schleife" draggable="false">
            </div>
            <div class="draggables" onclick="appendStructure('templateFootcontrolled');" draggable="true" ondragstart="test(event);" ondragend="test2(event);">
              <img class="icons" src="svg/fußgesteuert.svg" alt="Bild einer fußgesteuerten Schleife" draggable="false">
            </div>
          </div>
          <div id="footer">
            <div class="blackLine"></div>
            <a href="#">Nassi - Viewer</a>
            <div class="blocker"></div>
          </div>
        </div>
        <!--- -------------------- Templatearea -------------------- -->
        <template id="templateAction">
          <div class="nassiAction">
            <p class="editableText" role="textbox" contenteditable spellcheck="false"
            placeholder="Aktion eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
            onblur="finishEdit(this);"></p>
            <div class="structButtons">
              <button class="removeButton" onclick="removeStructure(this);">
                <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
          </div>
        </template>
        <template id="templateFunction">
          <div class="nassiFunction">
            <div class="blackLineVerticalLeft"></div>
            <p class="editableText" role="textbox" contenteditable spellcheck="false"
            placeholder="Funktionsnamen eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
            onblur="finishEdit(this);"></p>
            <div class="blackLineVerticalRight"></div>
            <div class="structButtons">
              <button class="removeButton" onclick="removeStructure(this);">
                <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
          </div>
        </template>
        <template id="templateBranch">
          <div class="nassiBranch">
            <div class="textArea">
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
              onblur="finishEdit(this);"></p>
              <div class="structButtons">
                <button class="removeButton" onclick="removeStructure(this);">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
              </div>
            </div>
            <div class="branchArea">
              <div class="trueBranch">
                <div class="trueBranchImageArea">
                  <div class="emptySpace"></div>
                  <div class="emptySpace trueMark">
                    <div class="blockFlex"></div>
                    <p>true</p>
                  </div>
                </div>
                <div class="trueDefault">
                  <p class="trueText">-</p>
                </div>
              </div>
              <div class="falseBranch">
                <div class="falseBranchImageArea">
                  <div class="emptySpace"></div>
                  <div class="emptySpace falseMark">
                    <div class="blockFlex"></div>
                    <p>false</p>
                  </div>
                </div>
                <div class="falseDefault">
                  <p class="falseText">-</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template id="templateMultiplebranch">
          <div class="nassiMultiplebranch">
            <div class="textArea">
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
              onblur="finishEdit(this);"></p>
              <div class="structButtons">
                <button class="removeButton" onclick="removeStructure(this);">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
                <button class="removeBranchButton" onclick="removeBranch(this);">
                  <img class="removeBranchIcon" src="svg/minus-solid.svg" alt="Bild eines Minus Symbols" draggable="false">
                </button>
                <button class="addBranchButton" onclick="addBranch(this);">
                  <img class="addBranchIcon" src="svg/plus-solid.svg" alt="Bild eines Plus Symbols" draggable="false">
                </button>
              </div>
            </div>
            <div class="branchArea">
              <div class="definedBranches" style="flex-grow: 2;">
                <div class="definedImageArea">
                </div>
                <div class="definedCases">
                  <div class="definedCase">
                    <p class="editableText definedEdit" role="textbox" contenteditable spellcheck="false"
                    placeholder="Case 1 ..." onclick="editText(this);" onkeydown="keyInput(event, this);"
                    onblur="finishEdit(this);"></p>
                    <div class="definedTask">
                      <p class="definedText">-</p>
                    </div>
                  </div>
                  <div class="definedCase">
                    <p class="editableText definedEdit" role="textbox" contenteditable spellcheck="false"
                    placeholder="Case 2 ..." onclick="editText(this);" onkeydown="keyInput(event, this);"
                    onblur="finishEdit(this);"></p>
                    <div class="definedTask">
                      <p class="definedText">-</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="defaultBranch">
                <div class="defaultImageArea">
                </div>
                <div class="defaultCases">
                  <div class="defaultCase">
                    <p class="editableText defaultEdit">Default</p>
                    <div class="defaultTask">
                      <p class="defaultText">-</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template id="templateAdditionalBranch">
          <div class="definedCase">
            <p class="editableText definedEdit" role="textbox" contenteditable spellcheck="false"
            placeholder="" onclick="editText(this);" onkeydown="keyInput(event, this);"
            onblur="finishEdit(this);"></p>
            <div class="definedTask">
              <p class="definedText">-</p>
            </div>
          </div>
        </template>
        <template id="templateHeadcontrolled">
          <div class="nassiHeadcontrolled">
            <div class="textArea">
              <div class="blockLoop"></div>
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
              onblur="finishEdit(this);"></p>
              <div class="structButtons">
                <button class="removeButton" onclick="removeStructure(this);">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
              </div>
            </div>
            <div class="loopArea">
              <div class="blockLoop"></div>
              <div class="loopText">
                <p class="editableText">-</p>
              </div>
            </div>
          </div>
        </template>
        <template id="templateFootcontrolled">
          <div class="nassiFootcontrolled">
            <div class="loopArea">
              <div class="blockLoop"></div>
              <div class="loopText">
                <p class="editableText">-</p>
              </div>
              <div class="structButtons">
                <button class="removeButton" onclick="removeStructure(this);">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
              </div>
            </div>
            <div class="textArea">
              <div class="blockLoop"></div>
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);"
              onblur="finishEdit(this);"></p>
            </div>
          </div>
        </template>
        <template id="templateDiagram">
          <div class="diagramContainer">
            <div class="nameError hide">
              <p>Dieser Name ist bereits belegt. Bitte benutze einen anderen!</p>
              <button class="removeError" onclick="this.parentElement.classList.add('hide');">
                <img class="removeIcon" src="svg/times-solid_white.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
            <div class="diagramHeader">
              <h2 class="editableText headerText" role="textbox" contenteditable spellcheck="false" 
              placeholder="Überschrift eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);" 
              onblur="finishEdit(this);"></h2>
            </div>
          </div>
        </template>
        <!--- -------------------- Diagramarea -------------------- -->
        <div id="diagramPanel">
          <div class="diagramContainer activeDiagram" id="mainDiagram">
            <div class="nameError hide">
              <p>Dieser Name ist bereits belegt. Bitte benutze einen anderen!</p>
              <button class="removeError" onclick="this.parentElement.classList.add('hide');">
                <img class="removeIcon" src="svg/times-solid_white.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
            <div class="diagramHeader">
              <h2 class="editableText headerText" role="textbox" contenteditable spellcheck="false" 
              placeholder="Überschrift eingeben..." onclick="editText(this);" onkeydown="keyInput(event, this);" 
              onblur="finishEdit(this);">Main (klicken zum Bearbeiten)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      /* -------------------- Todo Bereich --------------------
      Aktion fertigstellen ------------------------------------ -<COMPLETED>-
      Funktion fertigstellen ---------------------------------- -<COMPLETED>-
      Verzweigung fertigstellen ------------------------------- -<COMPLETED>-
      Mehrfachverzweigung fertigstellen ----------------------- -<COMPLETED>-
      Kopfgesteuerte Schleife fertigstellen ------------------- -<COMPLETED>-
      Fußgesteuerte Schleife fertigstellen -------------------- -<COMPLETED>-
      Strukturen löschbar ------------------------------------- -<COMPLETED>-
      Diagramme löschen --------------------------------------- -<COMPLETED>-
      Unterfunktionen erstellen ------------------------------- -<COMPLETED>-
       - Unterfunktion dem Dropdown hinzufügen ---------------- -<COMPLETED>-
       - Unterfunktion im Maindiagram umbenennen -------------- -<COMPLETED>-
       - Unterfunktion im Header umbenennen ------------------- -<COMPLETED>-
       - Unterfunktion entfernen ------------------------------ -<COMPLETED>-
       - Bereits belegte IDs filtern -------------------------- -<COMPLETED>-
      NameError fixen (nur bei aktivem Diagramm anzeigen)
      Drag & Drop
       - ...
       - ...
       - ...
      Verschachtelung
       - in Verzweigung einfügen können
       - in Mehrfachverzweigung einfügen können
       - in Kopfgesteuerter Schleife einfügen können
       - in Fußgesteuerter Schleife einfügen können
      Druckansicht mit allen Unterfunktionen fertigstellen ----- -<COMPLETED>-
      Download des Diagramms
      Upload des Diagramms
       - Auswahlfeld zwischen Upload und Auswahl aus DB
       - Dateiupload fertigstellt
       - Datenkbankupload fertiggestellt
      Speichern des Diagrammes in der DB
      Speichern des Diagramms in der DB in intervallen
      Optionsmenü
       - ...
       - ...
       - ...
      Kachelmenü
       - ...
       - ...
       - ...
      Verschieben von bereits platzierten Strukturen
      Animationen
       - ...
       - ...
       - ...

      --- Zukünftiges ---
      Nassi-Viewer erstellen
      */

      // -------------------- Globale Variablen --------------------
      var editMode = true;
      var appendAfter = true;
      var ids = document.querySelectorAll('[id]');
      var blacklistedIds = Array.prototype.map.call(ids, function(el, i){
          return el.id;
      });

      // -------------------- Funktionen --------------------

      // --- Funktion wird aufgerufen, wenn von der Schreib- zur Leseansicht und umgekehrt gewechselt wird
      function toggleEdit(){
        var inputs = document.getElementsByClassName('editableText');
        var removeButtons = document.getElementsByClassName('structButtons');

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

      // --- Funktion wird aufgerufen, wenn ein Textfeld angeklickt wird
      function editText(el){
        if(el.contentEditable == 'true'){
          var defaultText = ['Main (klicken zum Bearbeiten)'];
  
          if(defaultText.includes(el.innerText)){
            el.innerText = '';
          }

          if(el.parentElement.classList.contains('nassiFunction') 
          || el.parentElement.parentElement.id != 'mainDiagram'){
            el.nameBefore = el.innerText;
          }
        }
      }

      // --- Funktion wird aufgerufen beim Drücken der Entertaste, während ein Textfeld im Fokus stand
      function keyInput(ev, el){
        if(ev.keyCode === 13){
          el.blur();
        }
      }

      // --- Funktion wird aufgerufen beim bestätigen eines neuen Textes
      function finishEdit(el){
        // Text des Textfeldes ist leer
        var checkId = document.getElementById(el.innerText);

        if(el.innerText == ''){
          // Element ist vom Typen headerText (Diagrammüberschrift)
          if(el.classList.contains('headerText')){
            if(el.parentElement.parentElement.id == 'mainDiagram'){
              el.innerText = 'Main (klicken zum Bearbeiten)';
            }else{
              el.innerText = el.nameBefore;
            }
          }// Parentelement ist eine Funktionsstruktur
          else if(el.parentElement.classList.contains('nassiFunction')){
            el.innerText = el.nameBefore;
          }
        }// Text des Textfeldes ist nicht leer
        else{
          // Parentelement ist eine Funktionsstruktur
          if(el.parentElement.classList.contains('nassiFunction')){
            nameError.classList.add('hide');

            if(el.nameBefore != el.innerText && (blacklistedIds.includes(el.innerText) || checkId)){
              el.innerText = el.nameBefore;
              nameError.classList.remove('hide');
            }else{
              // Funktion gab es noch nicht
              if(el.nameBefore == ''){
                var newOption = document.createElement('option');
                newOption.value = el.innerText;
                newOption.innerText = el.innerText;
                diagramSelect.appendChild(newOption);
                createNewDiagram(el.innerText);
              }// Funktion gab es schon
              else{
                changeOldDiagram(el);
              }
            }
          }// Parentelement ist ein Unterdiagramm, welches schon existierte
          else if(el.parentElement.parentElement.classList.contains('diagramContainer') &&
           el.parentElement.parentElement.id == el.nameBefore){
            if(el.nameBefore != el.innerText && (blacklistedIds.includes(el.innerText) || checkId)){
              el.innerText = el.nameBefore;
              nameError.classList.remove('hide');
            }else{
              nameError.classList.add('hide');
              changeOldDiagram(el);
            }
          }
        }
      }

      // --- Funktion ändert die dazugehörigen Werte einer bestehenden Unterfunktion
      function changeOldDiagram(el){
        var oldDiagram = document.getElementById(el.nameBefore);
        oldDiagram.id = el.innerText;
        oldDiagram.children[0].children[0].innerText = el.innerText;

        for(var i = 0; i < diagramSelect.options.length; i++){
          if(diagramSelect.options[i].value == el.nameBefore){
            diagramSelect.options[i].value = el.innerText;
            diagramSelect.options[i].innerText = el.innerText;
          }
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

      // --- Funktion fügt dem aktiven Diagramm eine Struktur hinzu (Param: Name des Templates)
      function appendStructure(templateName){
        var structure = document.getElementById(templateName);
        var diagram = document.getElementsByClassName('activeDiagram')[0];
        var newStructure = structure.content.cloneNode(structure);
        diagram.appendChild(newStructure);

        if(templateName == 'templateFunction'){
          var newFunction = diagram.children[diagram.childElementCount - 1];
          newFunction.children[1].nameBefore = '';
        }
      }

      // --- Funktion löscht eine selektierte Struktur
      function removeStructure(el){
        var parent = el.parentElement;

        while(!parent.classList.value.includes('nassi')){
          parent = parent.parentElement;
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
        }

        parent.remove();
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
        }
      }

      // --- Funktion erstellt ein neues Diagramm
      function createNewDiagram(name){
        var diagram = document.getElementById('templateDiagram');
        var newDiagram = diagram.content.cloneNode(diagram);
        newDiagram.children[0].id = name;
        newDiagram.children[0].children[0].children[0].innerText = name;
        diagramPanel.appendChild(newDiagram);
      }

      // --- Funktion wird aufgerufen, wenn ein anderes Diagramm selektiert wird und zeigt dieses an
      function showDiagram(diagramName){
        var activeDiagram = document.getElementsByClassName('activeDiagram')[0];

        if(activeDiagram != null){
          activeDiagram.classList.remove('activeDiagram');
        }
        document.getElementById(diagramName).classList.add('activeDiagram');
      }

      // --- Diese Funktion fügt der zugehörigen Mehrfachverzweigung einen Zweig hinzu
      function addBranch(el){
        var branchArea = el.parentElement.parentElement.nextElementSibling.children[0];
        var cntBranches = parseInt(branchArea.style.flexGrow);
        var appendArea = branchArea.children[1];
        var diagramPanel = document.getElementById('diagramPanel');
        var activeDiagram = document.getElementsByClassName('activeDiagram')[0];

        branchArea.style.flexGrow = cntBranches + 1;
        cntBranches++;

        var structure = document.getElementById('templateAdditionalBranch');
        var newBranch = structure.content.cloneNode(structure);

        appendArea.appendChild(newBranch);
        appendArea.lastElementChild.firstElementChild.setAttribute('placeholder', 'Case ' + cntBranches + ' ...'); 
        diagramPanel.scroll(activeDiagram.offsetWidth, 0);
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
    </script>
  </body>
</html>