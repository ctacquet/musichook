import { NextApiRequest, NextApiResponse } from "next";
import { searchTracks } from "../../lib/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.q) {
    const q = req.query.q;
    const response = await searchTracks(q);
    if (response) {
      const tracks = response.tracks.items.map((track, index) => ({
        id: index,
        title: track.name,
        search: q,
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
        .send({ error: "Failed to fetch data, response: [" + response + "]" });
  } else
    return res.status(500).send({ error: "No query q params (?q= null )" });
};
