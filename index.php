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
    <link rel="stylesheet" href="stylesheets/stylesheet.css">
    <title>Nassi-Shneiderman - Editor</title>
  </head>
  <body>
    <?php
      session_start();

      // Nur zu Testzwecken eingebaut;
      $_SESSION['samaccountname'] = 'TsiokaGe';
      $_SESSION['nachname'] = 'Tsiokas';
      $_SESSION['vorname'] = 'Georgios';
      $_SESSION['department'] = 'AZUBFI';
      $_SESSION['personalnr'] = '009116';
      $_SESSION['mail'] = 'Georgios.Tsiokas@bogestra.de';

      $initials = substr($_SESSION['vorname'], 0, 1) . substr($_SESSION['nachname'], 0, 1);
      $fullname = $_SESSION['nachname'] . ', ' . $_SESSION['vorname'];
    ?>
    <div id="main">
      <!-- -------------------- Topbar -------------------- -->
      <div id="topbar">
        <div class="topleftPanel">
          <div id="mainMenuWrapper" class="menuWrapper openMenu">
            <button id="menuButton" type="button" class="menuButtons openMenu">
              <img class="menuIcon openMenu" src="svg/menu.svg" alt="Icon des Menüs" draggable="false">
            </button>
            <div id="mainMenu" class="menuContainer openMenu hide">

            </div>
          </div>
          <p class="programName">Nassi-Shneiderman Editor</p>
          <div id="spectateSeparator" class="hide"></div>
          <select id="diagramSelectTopBar" class="hide">
            <option value="mainDiagram" selected>Main</option>
          </select>
        </div>
        <div class="topmiddlePanel">
          
        </div>
        <div class="toprightPanel">
          <div id="optionMenuWrapper" class="menuWrapper openMenu">
            <button id="gearButton" type="button" class="optionButtons openMenu">
              <img id="gearIcon" class="optionIcons openMenu" src="svg/cog-solid.svg" alt="Icon der Optionen" draggable="false">
            </button>
            <div id="optionMenu" class="menuContainer openMenu hide">
              <div id="userInformation" class="openMenu">
                <div id="userOverlay" class="openMenu">
                  <div id="userPicture" class="openMenu">
                    <p id="userInitials" class="openMenu">
                      <?=$initials?>
                    </p>
                  </div>
                </div>
                <div id="userDetails" class="openMenu">
                  <p id="userName" class="openMenu">
                    <?=$fullname?>
                  </p>
                  <p id="userDepartment" class="openMenu">
                    <?=$_SESSION['department'];?>
                  </p>
                  <p id="userEmail" class="openMenu">
                    <?=$_SESSION['mail'];?>
                  </p>
                </div>
              </div>
              <div class="menuDivider openMenu"></div>
              <a id="logoutButton" href="#" class="openMenu optionMenuButtons">
                  <img id="logoutIcon" class="optionMenuIcons openMenu" src="svg/sign-out-alt-solid.svg" alt="Icon des Logouts" draggable="false">
                  <p id="logoutText" class="openMenu">Abmelden</p>
              </a>
            </div>
          </div>
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
          <label for="uploadButton" id="uploadLabel" class="optionButtons">
            <img id="uploadIcon" class="optionIcons" src="svg/upload-solid.svg" alt="Icon zum Hochladen des Diagrammes" draggable="false">
          </label>
          <input type="file" id="uploadButton" accept=".nash">
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
        <!--- -------------------- Diagramarea -------------------- -->
        <div id="diagramPanel">
          <div class="diagramContainer activeDiagram" id="mainDiagram">
            <div class="nameError activeError hide diagramDefaults">
              <p class="diagramDefaults">Dieser Name ist bereits belegt. Bitte benutze einen anderen!</p>
              <button id="mainError" class="removeError diagramDefaults">
                <img class="removeIcon diagramDefaults" src="svg/times-solid_white.svg" alt="Bild eines x Symbols" draggable="false">
              </button>
            </div>
            <div class="diagramHeader diagramDefaults">
              <h2 id="mainHeader" class="editableText headerText diagramDefaults" role="textbox" contenteditable spellcheck="false" 
              placeholder="Überschrift eingeben...">Main (klicken zum Bearbeiten)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/templates.js"></script>
    <script src="js/options.js"></script>
    <script src="js/struct.js"></script>
    <script src="js/diagram.js"></script>
    <script src="js/drag_and_drop.js"></script>
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
      Drag & Drop --------------------------------------------- -<COMPLETED>-
       - on Drag Event fertiggestellt ------------------------- -<COMPLETED>-
       - on drag over Event fertiggestellt -------------------- -<COMPLETED>-
       - on drop Event fertiggestellt ------------------------- -<COMPLETED>-
      Verschachtelung ----------------------------------------- -<COMPLETED>-
       - in Verzweigung einfügen können ----------------------- -<COMPLETED>-
       - in Mehrfachverzweigung einfügen können --------------- -<COMPLETED>-
       - in Kopfgesteuerter Schleife einfügen können ---------- -<COMPLETED>-
       - in Fußgesteuerter Schleife einfügen können ----------- -<COMPLETED>-
      Druckansicht mit allen Unterfunktionen fertigstellen ---- -<COMPLETED>-
      Download des Diagramms ---------------------------------- -<COMPLETED>-
      Upload des Diagramms ------------------------------------ -<COMPLETED>-
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