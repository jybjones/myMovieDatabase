var authData = '';
var API_URL = "http://www.omdbapi.com/?t=";
var API_URL2 = "&y=&plot=short&r=json";
var FIREBASE_URL ="https://moviedatabase.firebaseio.com/";
var GETmovie_database = FIREBASE_URL + "/movies.json";
var movie_database = FIREBASE_URL + "users/" + authData.uid + "/movies.json";
var fb = new Firebase(FIREBASE_URL);
var $searchButton = $('.search-button');
var $addMovie = $(".addMovie");
var searchInfo = [];

/*$(".addMovie").hide();*/

///////search button & Calling Function///
  $searchButton.click(function () {
  $(".Search-details").empty();
 var title = $(this).prev().val();
  var url = API_URL + title + API_URL2;
  $.get(url, function (searchData) {
    searchInfo.push(searchData)
    movieSearchReturn(searchData)
  }, 'json');
});

 //////////returned info from API call above//
 function movieSearchReturn (searchData) {
   var docFragment = document.createDocumentFragment();
   var tbody = document.querySelector(".Search-details");
   var tr = document.createElement('TR');
   tr.setAttribute("class", "movie");
   tbody.appendChild(tr);

var td = document.createElement('TD');
td.setAttribute("class", "Poster");
tr.appendChild(td);
var img = document.createElement('img');
  img.setAttribute("class", "posterimg");
var Poster = searchData.Poster;
img.setAttribute("src", Poster);
td.appendChild(img);

var td_0 = document.createElement('TD');
td_0.setAttribute("class", "Title");
tr.appendChild(td_0);
var text_0 = document.createTextNode(searchData.Title);
td_0.appendChild(text_0);

var td_1 = document.createElement('TD');
td_1.setAttribute("class", "Year");
tr.appendChild(td_1);
var text_1 = document.createTextNode(searchData.Year);
td_1.appendChild(text_1);

var td_2 = document.createElement('TD');
td_2.setAttribute("class", "Rating");
tr.appendChild(td_2);
var text_2 = document.createTextNode(searchData.imdbRating);
td_2.appendChild(text_2);

  return docFragment; //search return from button function above//
}

/////////Begin Firebase////////
console.log(movie_database)
$.get(GETmovie_database, function (movieDetails) {
  console.log(movieDetails)
  Object.keys(movieDetails).forEach(function (id) {
    addMovieDetail(movieDetails[id], id);
  });
});

var $movieDetails = $('.Details');
  $movieDetails.on('click', '.btn', function () {
  var $movie = $(this).closest('.movie');
  var id = $movie.attr('data-id');
  var deleteUrl = movie_database.slice(0, -5) + '/' + id + '.json';

 $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    success: function() {
      $movie.remove();
    }
  })

});

////////Add Movie to DataBase/////
$addMovie.click(function () {
  var title = $(this).prev().val();
  $.post(movie_database, JSON.stringify(searchInfo),
           function (res) {
    addMovieDetail(searchInfo, res.Title);
  }, 'json');
});
// JSONP_CALLBACK
function addMovieDetail(data, id) {
  var movieObj = data[0];
  var detail = popMovieDetails(movieObj, id);
  var $target = $('.movie-list');
  // $target.empty();
  $target.append(detail);
}

//CREATES DOM ELEMENT
function popMovieDetails(data, id) {
  var docFragment = document.createDocumentFragment();
//beginning of function how things are pulled into pg//
var tbody = document.querySelector(".Details");
var tr = document.createElement('TR');
tr.setAttribute("class", "movie");
tr.setAttribute("data-id", id)
tbody.appendChild(tr);

var td = document.createElement('TD');
td.setAttribute("class", "Poster");
tr.appendChild(td);
var img = document.createElement('img');
  img.setAttribute("class", "posterimg");
var Poster = data.Poster;
img.setAttribute("src", Poster);
td.appendChild(img);

var td_0 = document.createElement('TD');
td_0.setAttribute("class", "Title");
tr.appendChild(td_0);
var text_0 = document.createTextNode(data.Title);
td_0.appendChild(text_0);

var td_1 = document.createElement('TD');
td_1.setAttribute("class", "Year");
tr.appendChild(td_1);
var text_1 = document.createTextNode(data.Year);
td_1.appendChild(text_1);

var td_2 = document.createElement('TD');
td_2.setAttribute("class", "Rating");
tr.appendChild(td_2);
var text_2 = document.createTextNode(data.imdbRating);
td_2.appendChild(text_2);

var td_3 = document.createElement('TD');
td_3.setAttribute("class", "Watched");
tr.appendChild(td_3);

var text_3 = document.createTextNode("Watched");
var btn = document.createElement('button');
btn.setAttribute('class', 'btn btn-danger');
btn.setAttribute('class', 'btn btn-delete');
var btn_text = document.createTextNode('Delete');
  btn.appendChild(btn_text);
td_3.appendChild(btn);
  return docFragment;
  console.log(data.Poster);
}

/* /*///run function here//*/
function getJSON(url, cb) {
  var script = document.createElement('script');
  script.src = url + '&callback=' + cb;

  document.body.appendChild(script);
}



