import { NextApiRequest, NextApiResponse } from "next";
import { searchTracks as searchSpotifyTracks } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.q) {
    const q = req.query.q;
    const responseSpotify = await searchSpotifyTracks(q);
    if (responseSpotify) {
      const tracks = responseSpotify.tracks.items.map((track, index) => ({
        id: index,
        title: track.name,
        search: q,
        songDate: track.album.release_date,
        artist: track.artists.map((_artist) => _artist.name).join(", "),
        spotifyLink: track.external_urls.spotify,
        coverLink: track.album.images[1].url,
        spotifyId: track.id,
      }));
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const json = JSON.stringify(tracks);
      res.end(json);
    } else
      return res
        .status(500)
        .send({ error: "Failed to fetch data, response: [" + responseSpotify + "]" });
  } else
    return res.status(500).send({ error: "No query q params (?q= null )" });
};
