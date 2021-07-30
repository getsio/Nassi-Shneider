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
          <button id="menuButton" type="button" class="menuButtons">
            <img class="menuIcon" src="svg/menu.svg" alt="Icon des Menüs" draggable="false">
          </button>
          <p class="programName">Nassi-Shneiderman Editor</p>
          <div id="spectateSeparator" class="hide"></div>
          <select id="diagramSelectTopBar" class="hide">
            <option value="mainDiagram" selected>Main</option>
          </select>
        </div>
        <div class="topmiddlePanel">
          
        </div>
        <div class="toprightPanel">
          <button id="gearButton" type="button" class="optionButtons">
            <img id="gearIcon" class="optionIcons" src="svg/cog-solid.svg" alt="Icon der Optionen" draggable="false">
          </button>
          <div class="blockFlex"></div>
          <button id="editButton" type="button" class="optionButtons">
            <img id="editIcon" class="optionIcons" src="svg/unlock-solid.svg" alt="Icon zum sperren/entsperren der Editierung" draggable="false">
          </button>
          <button id="directionButton" type="button" class="optionButtons">
            <img id="directionIcon" class="optionIcons" src="svg/angle-double-down-solid.svg" alt="Icon zum Bestimmen der Anhängrichtung" draggable="false">
          </button>
          <div class="blockFlexWide"></div>
          <button id="trashButton" type="button" class="optionButtons">
            <img id="trashIcon" class="optionIcons" src="svg/trash-solid.svg" alt="Icon zum Löschen des Diagrammes" draggable="false">
          </button>
          <button id="printButton" type="button" class="optionButtons">
            <img id="printIcon" class="optionIcons" src="svg/print-solid.svg" alt="Icon zum Drucken des Diagrammes" draggable="false">
          </button>
          <button id="uploadButton" type="button" class="optionButtons">
            <img id="uploadIcon" class="optionIcons" src="svg/upload-solid.svg" alt="Icon zum Hochladen des Diagrammes" draggable="false">
          </button>
          <button id="downloadButton" type="button" class="optionButtons">
            <img id="downloadIcon" class="optionIcons" src="svg/download-solid.svg" alt="Icon zum Herunterladen des Diagrammes" draggable="false">
          </button>
          <button id="saveButton" type="button" class="optionButtons">
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
            <select id="diagramSelect">
              <option value="mainDiagram" selected>Main</option>
            </select>
          </div>
          <div id="iconContainer">
            <div id="appendAction" class="draggables" draggable="true">
              <img class="icons" src="svg/aktion.svg" alt="Bild einer Aktion" draggable="false">
            </div>
            <div id="appendFunction" class="draggables" draggable="true">
              <img class="icons" src="svg/funktion.svg" alt="Bild einer Funktion" draggable="false">
            </div>
            <div id="appendBranch" class="draggables" draggable="true">
              <img class="icons" src="svg/verzweigung.svg" alt="Bild einer Verzweigung" draggable="false">
            </div>
            <div id="appendMultiplebranch" class="draggables" draggable="true">
              <img class="icons" src="svg/mehrfachverzweigung.svg" alt="Bild einer Mehrfachverzweigung" draggable="false">
            </div>
            <div id="appendHeadcontrolled" class="draggables" draggable="true">
              <img class="icons" src="svg/kopfgesteuert.svg" alt="Bild einer kopfgesteuerten Schleife" draggable="false">
            </div>
            <div id="appendFootcontrolled" class="draggables" draggable="true">
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
            placeholder="Aktion eingeben..."></p>
            <div class="structButtons">
              <button class="removeButton">
                <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
          </div>
        </template>
        <template id="templateFunction">
          <div class="nassiFunction">
            <div class="blackLineVerticalLeft"></div>
            <p class="editableText" role="textbox" contenteditable spellcheck="false"
            placeholder="Funktionsnamen eingeben..."></p>
            <div class="blackLineVerticalRight"></div>
            <div class="structButtons">
              <button class="removeButton">
                <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
          </div>
        </template>
        <template id="templateBranch">
          <div class="nassiBranch">
            <div class="textArea">
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..."></p>
              <div class="structButtons">
                <button class="removeButton">
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
              placeholder="Bedingung eingeben..."></p>
              <div class="structButtons">
                <button class="removeButton">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
                <button class="removeBranchButton">
                  <img class="removeBranchIcon" src="svg/minus-solid.svg" alt="Bild eines Minus Symbols" draggable="false">
                </button>
                <button class="addBranchButton">
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
                    placeholder="Case 1 ..."></p>
                    <div class="definedTask">
                      <p class="definedText">-</p>
                    </div>
                  </div>
                  <div class="definedCase">
                    <p class="editableText definedEdit" role="textbox" contenteditable spellcheck="false"
                    placeholder="Case 2 ..."></p>
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
            placeholder=""></p>
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
              placeholder="Bedingung eingeben..."></p>
              <div class="structButtons">
                <button class="removeButton">
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
                <button class="removeButton">
                  <img class="removeIcon" src="svg/times-solid.svg" alt="Bild eines x Symbols" draggable="false">
                </button>
              </div>
            </div>
            <div class="textArea">
              <div class="blockLoop"></div>
              <p class="editableText" role="textbox" contenteditable spellcheck="false"
              placeholder="Bedingung eingeben..."></p>
            </div>
          </div>
        </template>
        <template id="templateDiagram">
          <div class="diagramContainer">
            <div class="nameError hide">
              <p>Dieser Name ist bereits belegt. Bitte benutze einen anderen!</p>
              <button class="removeError">
                <img class="removeIcon" src="svg/times-solid_white.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
            <div class="diagramHeader">
              <h2 class="editableText headerText" role="textbox" contenteditable spellcheck="false" 
              placeholder="Überschrift eingeben..."></h2>
            </div>
          </div>
        </template>
        <!--- -------------------- Diagramarea -------------------- -->
        <div id="diagramPanel">
          <div class="diagramContainer activeDiagram" id="mainDiagram">
            <div class="nameError activeError hide">
              <p>Dieser Name ist bereits belegt. Bitte benutze einen anderen!</p>
              <button id="mainError" class="removeError">
                <img class="removeIcon" src="svg/times-solid_white.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
            <div class="diagramHeader">
              <h2 id="mainHeader" class="editableText headerText" role="textbox" contenteditable spellcheck="false" 
              placeholder="Überschrift eingeben...">Main (klicken zum Bearbeiten)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/options.js"></script>
    <script src="js/struct.js"></script>
    <script src="js/diagram.js"></script>
    <!--
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
      NameError fixen (nur bei aktivem Diagramm anzeigen) ----- -<COMPLETED>-
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
    -->
  </body>
</html>