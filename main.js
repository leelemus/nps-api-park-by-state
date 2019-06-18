'use strict';

const apiKey = 'OA0UJvIMzPpURsHVpceC3w9MmEyWTLFSCNfdz2vE'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatStateQuery(stateValues) {
    const stateQuery = Object.keys(stateValues)
        .map(key => `${encodeURIComponent(stateValues[key].value)}`);
    return stateQuery.join(",");
}
  
  function displayResults(eachPark) {
    // if there are previous results, remove them
    $('#parkResults').append(`
        <li>
            <h3>${eachPark.fullName}</h3>
            <p><strong>Description: </strong>${eachPark.description}</p>
            <p><strong>URL: </strong><a href="${eachPark.url}" target="_blank">${eachPark.url}</a></p>
        </li>
    `);
  };

function getResults(stateValues, maxResults) {

    const stateRequest = 'stateCode=' + formatStateQuery(stateValues);
    const totalResults = 'limit=' + (maxResults - 1);
    const apiUrl = 'api_key=' + apiKey;
    const url = searchURL + '?' + stateRequest + '&' + totalResults + '&' + apiUrl;
    console.log(url);

    /* This version give me a 403 - need to look into adding headers
    
    const url = searchURL + '?' + stateRequest + '&' + totalResults;
    
    const options = {
        headers: new Headers({
          "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => responseJson.data.forEach(displayResults))
        .catch(err => {
          $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
    */

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => responseJson.data.forEach(displayResults))
        .catch(err => {
          $('#js-errorMessage').text(`Something went wrong: ${err.message}`);
        });
    
    $('#results').removeClass('hidden');
}

function parkGenerator() {
    $('#js-parkForm').submit(event => {
        event.preventDefault();
        const stateValues = $('#js-parkForm').serializeArray();
        const maxResults = $('#js-maxResults').val();
        $('#parkResults').empty();
        getResults(stateValues, maxResults);
    });
}

$(parkGenerator);