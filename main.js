'use strict';

const apiKey = "OA0UJvIMzPpURsHVpceC3w9MmEyWTLFSCNfdz2vE"; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatStateQuery(stateValues) {
    const stateQuery = Object.keys(stateValues)
        .map(key => `${encodeURIComponent(stateValues[key].value)}`);
    return stateQuery.join(",");
}
  
  function displayResults(responseJson, maxResults) {
    // if there are previous results, remove them
    console.log(responseJson);

  };

function getResults(stateValues, maxResults=10) {

    const stateList = formatStateQuery(stateValues);
    const stateRequest = "stateCode="+stateList;
    
    const url = searchURL + '?' + stateRequest;
    
    console.log(url);
    
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
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
          $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function parkGenerator() {
    $('#js-parkForm').submit(event => {
        event.preventDefault();
        const stateValues = $('#js-parkForm').serializeArray();
        const maxResults = $('#js-max-results').val();
        getResults(stateValues, maxResults);
    });
}

$(parkGenerator);