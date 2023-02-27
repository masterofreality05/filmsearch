"use strict";
const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-list");
const $searchForm = $("#search-form");
//get shows by terms, will search API with a query 
//its returned value is used in searchforViewandDisplay
//there it is saved in the variable of shows
//the variable is passed into populate shows as an argument 
//populateShows appends the passed argument into a div in the HTML with showlist ID

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
async function getShowsByTerm(term) { //aka searchShows
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  let query = term
let searchedFilm = await axios.get('https://api.tvmaze.com/search/shows', {params: {q:query}})

return(searchedFilm.data)
}
/** Given list of shows, create markup for each and to DOM */
function populateShows(shows) {
  $showsList.empty();
  let i = 1;

  for (let show of shows) {

    i++

    try {
      const $show = $(
      
        `
        <div data-show-id="${show.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img class="card-img-top" src="${show.show.image.medium}">
              
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${show.show.summary}</small></div>
             <button class="btn btn-outline-light btn-info Show-getEpisodes" id="${show.show.id}">
               Episodes
             </button>
           </div>
           
       </div>
       </div>
      `);
    $showsList.append($show); 

    } catch(error) {

      console.log("image not found")
      const $show = $(
      
        `
        <div data-show-id="${show.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img class="card-img-top" src="https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300">
              
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${show.show.summary}</small></div>
             <button class="btn btn-outline-light btn-info Show-getEpisodes" id="${show.show.id}">
               Episodes
             </button>
           </div>
         
       </div>
       </div>
      `);
      $showsList.append($show);
    }
  }

$('button').on("click",function(e){
  e.preventDefault();
  getEpisodes(e.target.id)
})
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $('#search-query').val()
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}
$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
// async function getEpisodesOfShow(id) { }
/** Write a clear docstring for this function... */
// function populateEpisodes(episodes) { }
async function getEpisodes(id){
//should search a show by ID and return an episode list 

  let episodeList = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`)
  console.log(episodeList.data)
  let episodeListed = ""

  for(let episodes of episodeList.data){
    episodeListed += `<li>${episodes.name}</li>`
  }
  $('#episode-list').html(episodeListed)
}
