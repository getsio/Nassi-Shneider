var templates = document.createElement('template');

window.onload = async function (){
    templates = document.createElement('template');
    templates.innerHTML = await (await fetch('templates/templates.html')).text();
};