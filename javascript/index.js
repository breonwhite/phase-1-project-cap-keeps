/*  Three Question Rule:
  Overview: Click the home link and make the home page appear

    1. When do we want the link to be clicked and make the homepage appear?
        Right away (domcontentloaded)
    2. What is the cause of the event ? 
        (Click event)
    3. WHat's the effect? What's going to happen when the event triggers 
        Makes the home page appear 
 */




/**  Global Variables **/





/**  Node Getters **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');




/**  Event Listeners **/
const homeLinkHandler = () => {
    homeLink().addEventListener('click', loadHome);
}




/**  Event Handlers **/
const loadHome = () => {
    resetMainDiv();
    const h1 = document.createElement('h1')
    const p = document.createElement('p')

    h1.className = 'center-align';
    p.className = 'center-align';

    h1.innerText = 'welcome to CAP KEEPS.';
    p.innerText = 'Easily create, find, and save photo captions in minutes. No cap.';

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}




/**  MISC **/
const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}


/**  Start Up **/

document.addEventListener('DOMContentLoaded', function() {
    //What do we want it to do when th epage loads?
    //1. Load the homepage
    loadHome();
    homeLinkHandler();
})