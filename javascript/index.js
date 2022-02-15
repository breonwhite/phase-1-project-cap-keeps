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
const addCaptionLink = () => document.getElementById('add-caption-link');
const searchLyricsLink = () => document.getElementById('search-lyrics-link');
const myCaptionsLink = () => document.getElementById('my-captions-link');



/**  Event Listeners **/
const homeLinkHandler = () => {
    homeLink().addEventListener('click', loadHome);
}

const addCaptionLinkHandler = () => {
    addCaptionLink().addEventListener('click', loadAddCaption);
}

const searchLyricsLinkHandler = () => {
    searchLyricsLink().addEventListener('click', loadSearchLyrics);
}

const myCaptionsLinkHandler = () => {
    myCaptionsLink().addEventListener('click', loadMyCaptions);
}





/**  Event Handlers **/
const loadHome = event => {
    if(event) {
        event.preventDefault();
    }
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

const loadAddCaption = event => {
    event.preventDefault();
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Add Caption';
    
    mainDiv().appendChild(h1);
}

const loadSearchLyrics = event => {
    event.preventDefault();
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Search by Lyrics';

    mainDiv().appendChild(h1);
}

const loadMyCaptions = event => {
     event.preventDefault();
     resetMainDiv();

     const h1 = document.createElement('h1');
     const captionList = document.createElement('ul');

     //Caption Classnames
     h1.innerText = 'Saved Captions';
     captionList.className = 'collection';
    
    //Icons
    let favoriteIconText = 'favorite_border';

    // Create Caption Card
    let captionCard = document.createElement('li')
    captionCard.className = 'collection-item avatar saved-lyric-item';
    
        //Caption Variables
        let captionImage = "img url here";
        let captionLyrics = "caption lyrics here";
        let captionSong = "caption song here";
        let captionArtist = "caption artist here";

    captionCard.innerHTML = `
        <img src="${captionImage}" alt="" class="circle">
        <span class="title" id="caption-list-lyric"><i>${captionLyrics}</i></span>
              <p>
                <label for="caption-item-song">Song:</label>
                <span id="caption-item-song">${captionSong}</span><br>
                <label for="caption-item-artist">Arist:</label>
                <span id="caption-item-artist">${captionArtist}</span>
              </p>
              <a href="#" id="delete-lyric" class="secondary-content">
                  <i class="material-icons">delete</i>
                  <i class="material-icons">${favoriteIconText}</i>
                  <i class="material-icons">content_copy</i>
                </a>
    `;
    
    captionList.appendChild(captionCard);

     mainDiv().appendChild(h1);
    mainDiv().appendChild(captionList);


// {/* <h1>My Captions</h1>
//          <ul class="collection">
//             <li class="collection-item avatar">
//               <img src="images/yuna.jpg" alt="" class="circle">
//               <span class="title" id="caption-list-lyric"><i>"This a rollie not a stop watch, shit don't ever stop</i></span>
//               <p>
//                 <label for="caption-item-song">Song:</label>
//                 <span id="caption-item-song">Non-Stop</span><br>
//                 <label for="caption-item-artist">Arist:</label>
//                 <span id="caption-item-artist">Drake</span>
//               </p>
//               <a href="#" id="delete-lyric" class="secondary-content">
//                   <i class="material-icons">delete</i>
//                   <i class="material-icons">favorite_border</i>
//                   <i class="material-icons">content_copy</i>
//                 </a>
//             </li> */}




};



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
    addCaptionLinkHandler();
    searchLyricsLinkHandler();
    myCaptionsLinkHandler();
})