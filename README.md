# Nassi-Shneiderman Editor

## Inhalte
- [Beschreibung](#beschreibung)
- [Benutzung](#benutzung)
    - [Strukturen](#strukturen)
    - [Oberes Menü](#oberes-menü)
- [Roadmap](#roadmap)
    - [Implementierte Features](#implementierte-features)
    - [Kommende Features](#kommende-features)
    - [Bekannte Fehler](#bekannte-fehler)
- [Autor](#autor)
- [Projektstatus](#projektstatus)

## Beschreibung

Der [Nassi-Shneiderman](https://de.wikipedia.org/wiki/Nassi-Shneiderman-Diagramm) Editor bietet eine komfortable Möglichkeit Projekte zu dokumentieren und skizzieren. Ziel des Projekts ist genormte
Struktogramme in Gruppen und alleine erstellen zu können. Diese sollen bei Bedarf auf einer Datenbank und/oder lokal gespeichert werden können.
Es soll möglich sein, seine Diagramme teilen zu können und miteinander an diesen zu Arbeiten.

## Benutzung

### Strukturen

Die Strukturen befinden sich im linken Menü des Editors.

<img src="/uploads/1dba17a91a428d2b5fe3a6bbcc5f2075/Menü.PNG" alt="Bild des linken Strukturmenüs" width="140">

Mit einem klick auf die gewünschte Struktur, wird diese dem ausgewählten Diagramm hinzugefügt.
Optional kann man die Struktur auch auf das Diagrammfeld oder in eine Verzweigung/Schleife "ziehen".
Der Name einer Struktur ist editierbar.

#### Sonderfall - Funktion

Fügt man eine Funktion ein und benennt diese, entsteht ein neue Option im Dropdown Menü oben links.
Durch das Benennen einer Funktion wird im Hintergrund ein weiteres Diagramm erstellt (sozusagen ein **untergeordnetes** Diagramm), in
welchem die Funktion definiert werden kann.

<img src="/uploads/b2e43a504aea3e8da780aeb9c907fdac/Unterfunktion.png" alt="Dropdown-Menü mit Unterfunktion Test" width="200">

Wählt man nun dieses **untergeordnete** Diagramm aus erhält man einen neuen Diagrammbereich, dessen Name mit dem der Funktion übereinstimmt.
Der Name dieses Diagramms kann beliebig verändert werden und wird auch überall, in Verbindung mit der Funktion, umbenannt.

<img src="/uploads/4892bb6744fd266f43f6551bdaf7f42d/Unterdiagramm.PNG" alt="Übersicht des Unterdiagramms Test" width="800">

### Oberes Menü

(in bearbeitung)

## Roadmap

In diesem Bereich werden alle bereits implementierten, kommende, sowie fehlerhaften Features aufgelistet.
<details><summary>Features anzeigen</summary>

### Implementierte Features

- Aktion
- Funktion
- Verzweigung
- Kopfgesteuerte Schleife
- Fußgesteuerte Schleife  
- löschbare Strukturen
- löschbare Diagramme
- Unterfunktionen
    - Select hinzufügen
    - Umbenennung der Unterfunktion
    - entfernen
    - benutzte Namen filtern
- Druckansicht

### Kommende Features

- Mehrfachverzweigung  
- Drag & Drop
- Verschachtelung
    - Verzweigung
    - Mehrfachverzweigung
    - Kopfgesteuerte Schleife
    - Fußgesteuerte Schleife
- Download
- Upload
    - Auswahl zwischen Datei/DB
- Speichern in DB
- Automatisches Speichern in Intervallen
- platzierte Strukturen verschieben
- Animationen

### Bekannte Fehler

- Unterfunktion kann nicht vernünftig entfernt werden

</details>

## Autor

Inhaber des Projekts ist Georgios Tsiokas

## Projektstatus

Die Entwicklung des Projekts findet in freien Zeitblöcken statt. Das Projekt schreitet daher nicht so schnell vor.
