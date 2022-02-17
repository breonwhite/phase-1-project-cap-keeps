/*  Three Question Rule:
  Overview: Click the home link and make the home page appear

    1. When? DOMCOntent Loaded When we click on my captions link, we should see all captions from the database 
    2. Cause? DomContentLoaded
    3. Effect? Fetch all of the saved captions
 */




/**  Global Variables **/
 const baseURL = 'http://localhost:3000';
 const geniusURL = 'https://genius-song-lyrics1.p.rapidapi.com/search/multi?q=';
 
 let captions = [];
 let lyricResults = [];


/**Helper Functions */
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

function createLyricObj(obj) {
    const lyricSnippet = Object.byString(obj, 'highlights[0].value');
    const lyricSong = Object.byString(obj, 'result.title_with_featured');
    const lyricArtist = Object.byString(obj, 'result.primary_artist.name');
    const artistIMG = Object.byString(obj, 'result.primary_artist.image_url');
        
    let lyricOutput = {
        "image": `${artistIMG}`,
        "lyrics": `${lyricSnippet}`,
        "song": `${lyricSong}`,
        "artist": `${lyricArtist}`,
        "custom": false,
        "favorited": false,
            };
    console.log('Lyric Output:', lyricOutput);
    return lyricOutput;
}

/**  Node Getters **/
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const addCaptionLink = () => document.getElementById('add-caption-link');
const searchLyricsLink = () => document.getElementById('search-lyrics-link');
const myCaptionsLink = () => document.getElementById('my-captions-link');
const lyricSearchButton = () => document.getElementById('lyric-search-button');
const lyricSearchInput = () => document.getElementById('lyric-search-input');



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

const searchButtonHandler = () => {
    lyricSearchButton().addEventListener('click', searchForLyrics);
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
    const form = document.createElement('form');
    const div1 = document.createElement('div');
    
    h1.innerText = 'Search by Lyrics';
    div1.className = 'input-field';

    div1.innerHTML = `
        <input id="lyric-search-input" type="text">
        <label for="lyric-search-input">Enter Song Lyrics</label>
            <button class="btn waves-effect waves-light btn-large light-blue darken-2 right" type="submit" id='lyric-search-button'>Find Lyrics
            <i class="material-icons right">search</i>
            </button>
    `;
    
    form.appendChild(div1);

    // <form>
    //     <div class="input-field">
    //         <input id="lyric-search-input" type="text">
    //         <label for="lyric-search">Enter Song Lyrics</label>
    //         <button class="btn waves-effect waves-light btn-large light-blue darken-2 right" type="submit" id='lyric-search-button'>Find Lyrics
    //             <i class="material-icons right">search</i>
    //         </button>
    //     </div>  
    // </form>

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
    searchButtonHandler();
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
    captions.forEach(caption => {
        const captionCard = document.createElement('li');
        captionCard.className = 'collection-item avatar saved-lyric-item';

         //Caption Variables
         let captionImage = caption.image;
         let captionLyrics = caption.lyrics;
         let captionSong = caption.song;
         let captionArtist = caption.artist;

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
                    <i class="material-icons">${favoriteIconText}</i>
                    <i class="material-icons">content_copy</i>
                    <i class="material-icons">delete</i>
                 </a>
                 `;
        
        captionList.appendChild(captionCard);
    })
    
     mainDiv().appendChild(h1);
    mainDiv().appendChild(captionList);
}

const searchForLyrics = event => {
    event.preventDefault();
//Converts lyric search input (string) into Fetch URL 
    const lyricUrl = generateSearchURL(lyricSearchInput().value);
    
//Fetch: Searches Genius API for results
    fetch(geniusURL + lyricUrl + '&per_page=5&page=1', {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
		"x-rapidapi-key": "85900b7c00mshcf991f3bb28992ep180ad5jsn97819322cdfa"
	}
})
.then(resp => resp.json())
.then(data => {
    let lyricResults = data;
    let hitResults = Object.byString(data, 'response.sections[2].hits');

    const mapThrough = hitResults.map(data => {
        const lyricSnippet = Object.byString(data, 'highlights[0].value');
        const lyricSong = Object.byString(data, 'result.title_with_featured');
        const lyricArtist = Object.byString(data, 'result.primary_artist.name');
        const artistIMG = Object.byString(data, 'result.primary_artist.image_url');
        
        let lyricOutput = {
            "image": `${artistIMG}`,
            "lyrics": `${lyricSnippet}`,
            "song": `${lyricSong}`,
            "artist": `${lyricArtist}`,
            "custom": false,
            "favorited": false,
        };
        console.log('Lyrics Found:', lyricOutput);
    })

    //const mapThrough = hitResults.map(createLyricObj(hitResults));
})
.catch(err => {
	console.error(err);
});

    


    //Get the text input from the lyric search field
    //let lyricSearchInput = document.getElementById('lyric-search-input').value;
    //console.log(lyricSearchInput);

    //console.log(lyricUrl);
    // fetch()
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log('data', data)
    //         captions = data;
    //     })
}

/**  REQUESTS **/
const loadCaptions = () => {
    fetch(baseURL + '/captions')
        .then(resp => resp.json())
        .then(data => {
            console.log('data', data)
        })
}



/**  MISC **/
const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

const generateSearchURL = (string) => {
    let encoded = encodeURIComponent(string);
    return encoded;
};


/**  Start Up **/

document.addEventListener('DOMContentLoaded', function() {
    //What do we want it to do when th epage loads?
    //1. Load the homepage
    loadCaptions();
    // loadHome();
    homeLinkHandler();
    addCaptionLinkHandler();
    searchLyricsLinkHandler();
    myCaptionsLinkHandler();
})