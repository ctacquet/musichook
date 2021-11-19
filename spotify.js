const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const urlSearchParams = new URLSearchParams({
  grant_type: "refresh_token",
  refresh_token,
});

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlSearchParams,
  });

  return response.json();
};

export async function searchTracks(query) {
  if (query) {
    const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=${query}&type=track`;
    const { access_token } = await getAccessToken();

    return fetch(SEARCH_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }
}
