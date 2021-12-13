export async function searchTracks(artist, title) {
  if (artist && title) {
    const SEARCH_ENDPOINT = `https://cors-anywhere-ctacquet.herokuapp.com/https://api.deezer.com/search?q=track:\"${title}\"%20artist:\"${artist}\"`;

    return fetch(SEARCH_ENDPOINT, {mode: 'cors'}).then((response) => {
      return response.json();
    }).catch(function(error) {
      console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      return null;
    });;
  }
}
