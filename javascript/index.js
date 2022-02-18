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


/**  Node Getters **/
const mainDiv = () => document.getElementById('main');
const resultsDiv = () => document.getElementById('lyric-search-results');
const homeLink = () => document.getElementById('home-link');
const addCaptionLink = () => document.getElementById('add-caption-link');
const searchLyricsLink = () => document.getElementById('search-lyrics-link');
const myCaptionsLink = () => document.getElementById('my-captions-link');
const lyricSearchButton = () => document.getElementById('lyric-search-button');
const lyricSearchInput = () => document.getElementById('lyric-search-input');
const searchResultsList = () => document.getElementById('search-results-list');
const progressBar = () => document.getElementById('progress-bar');



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

const loadSearchResults = () => {
    const h4 = document.createElement('h4');
    const ul = document.createElement('ul');
    const progressDivParent = document.createElement('div');
    const progressDIV = document.createElement('div');
    
    h4.innerText = 'Search Results';
    ul.id = "search-results-list";

    
    progressDivParent.className = 'progress';
    progressDIV.className = 'indeterminate';
    ul.className = 'collection';
    progressDivParent.id = 'progress-bar'

    progressDivParent.appendChild(progressDIV);

    resultsDiv().appendChild(h4);
    resultsDiv().appendChild(progressDivParent);
    resultsDiv().appendChild(ul);
};

function createResultCard (img, lyric, song, artist) {
    // Variables for Inputs
    let resultImg = img;
    let resultLyric = lyric;
    let resultSong = song;
    let resultArtist = artist;
    
    //HTML for Result Card
    const li = document.createElement('li');
    li.className = 'collection-item avatar row';
    li.innerHTML = `
        <div class="container col s9">
        <img src="${resultImg}" alt="" class="circle">
        <span class="title" id="caption-list-lyric"><i>${resultLyric}</i></span>
        <p>
        <label for="caption-item-song">Song:</label>
        <span id="caption-item-song">${resultSong}</span><br>
        <label for="caption-item-artist">Arist:</label>
        <span id="caption-item-artist">${resultArtist}</span>
        </p>
        </div>
        <div class="container col s4">
        <a class="waves-effect waves-light btn secondary-content green darken-1 right" id="save-lyric">Keep Caption<i class="material-icons left">lock_open</i></a>
        </div>
        `

    searchResultsList().appendChild(li);
};

const searchForLyrics = event => {
    event.preventDefault();
    //Resets Search Lyrics Results div
    function verifyInput() {
        if (lyricSearchInput().value == "" || lyricSearchInput().value == null) {
            console.log("Search Error: Input field cannot be empty");
            M.toast({html: 'Oops! No Lyrics. No Cap.'});
        } else {
            resetResultsDiv();
            loadSearchResults();
        }
    };
    const lyricUrl = generateSearchURL(lyricSearchInput().value);
    verifyInput();
    //Fetch: Searches Genius API for results
    fetch(geniusURL + lyricUrl + '&per_page=5&page=1', {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius-song-lyrics1.p.rapidapi.com",
		"x-rapidapi-key": "85900b7c00mshcf991f3bb28992ep180ad5jsn97819322cdfa"
	}
    })
    .then(resp => resp.json())
// Fetches data, formats data into an object, and consoles the results
    .then(data => {
        //let lyricResults = data;
        let hitResults = Object.byString(data, 'response.sections[2].hits');

        const returnedSearch = hitResults.map(data => {
        const lyricSnippet = Object.byString(data, 'highlights[0].value');
        const lyricSong = Object.byString(data, 'result.title_with_featured');
        const lyricArtist = Object.byString(data, 'result.primary_artist.name');
        const artistIMG = Object.byString(data, 'result.primary_artist.image_url');
        
        let lyricOutput = {
            "image": `${artistIMG}`,
            "lyrics": `${lyricSnippet}`,
            "song": `${lyricSong}`,
            "artist": `${lyricArtist}`,
        }
        console.log('Lyrics Found:', lyricOutput)
        createResultCard (artistIMG, lyricSnippet, lyricSong, lyricArtist)
        });
        return returnedSearch
        
    })
    .then(() => hideProgressBar())
    .catch(err => {
	console.error(err);
    })
    //.then(hideProgressBar());
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
const resetResultsDiv = () => {
    resultsDiv().innerHTML = '';
}
const generateSearchURL = (string) => {
    let encoded = encodeURIComponent(string);
    return encoded;
};

const hideProgressBar = () => {
    progressBar().style.display = "none";
}



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

/* <h4>Search Results</h4>
        <ul class="collection">
            <li class="collection-item avatar">
              <img src="" alt="" class="circle">
              <span class="title" id="caption-list-lyric"><i>This a rollie not a stop watch</i></span>
              <p>
                <label for="caption-item-song">Song:</label>
                <span id="caption-item-song">Non-Stop</span><br>
                <label for="caption-item-artist">Arist:</label>
                <span id="caption-item-artist">Drake</span>
              </p>
              <a class="waves-effect waves-light btn secondary-content green darken-1 right" id="save-lyric">Keep Caption<i class="material-icons left">lock_open</i></a>
            </li>
        </ul>       */




