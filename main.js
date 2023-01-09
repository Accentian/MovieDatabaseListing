/**
 * The following JavaScript below is based from this source: 
 * https://stackoverflow.com/questions/73289933/unable-to-fetch-data-from-tmdb-javascript
 * 
 * Thank you Chris for helping me with the IF-ELSE statement 
 * 
 * API access and URL template:
 * https://api.themoviedb.org/3/search/movie?api_key=<api_key>&language=en-US&query=<input>
 * https://api.themoviedb.org/3/search/movie?api_key=0816131913d9d6e087afb9dc6986377e&language=en-US&query=tf2
 */

const base_url = 'https://api.themoviedb.org/3/search/movie?';
const api_key = 'api_key=0816131913d9d6e087afb9dc6986377e';
let search_url = base_url + api_key + '&language=en-US&query=';


// search_url is passed into getMovies and fetches the resource
function getMovies(my_api) {
    return fetch(my_api, {
        method: 'GET',
        cache:'no-cache', 
      })

      // Access the JSON containing TMDB API and check if fetch was successful
      .then(res => res.json())
      .catch(err => {
        console.log(err.message);
      });
  }
  
  // List all movies found in the search
  function listMovies(url) {
    // results is from index.html
    let ul = document.getElementById('results');
    ul.innerHTML = '';

    // If no results are found, notify the user
    if (url.results == 0) {
      let empty_li = document.createElement('li');
      
      empty_li.appendChild(document.createTextNode('Sorry! We could not find anything! Please try again.'));
      ul.appendChild(empty_li);
    }

    else {
      // Uses for each loop to create listings of movies
      url.results.forEach(result => {
        let li = document.createElement('li');
        let sub_li = document.createElement('ul');

        // let image_li = document.createElement('img');
        // let image_url = image_base_url + result.poster_path;

        // The title and overview is from the TMDB API
        li.appendChild(document.createTextNode(result.title));
        sub_li.appendChild(document.createTextNode(result.overview));

        // image_li.appendChild(image_url);

        ul.appendChild(li);
        ul.appendChild(sub_li);
        // ul.appendChild(image_li);
      });
    }
  }

  // This handles the search button in index.html when it is clicked
  let search_button = document.getElementById('search_btn');
  search_button.addEventListener('click', () => {

    // input is the value entered in the search bar (id=search_input) in index.html
    let input = search_input.value;

    // Ensure the field isn't blank
    if (input && input.trim() != '') {
      let query = search_url + input;
      getMovies(query).then(listMovies);
    }
  });