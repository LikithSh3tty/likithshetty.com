export type Playlist = {
  url: string
  name: string
  description: string
}

/**
 * Hand-listed rather than fetched, so there's no Spotify app, no client
 * secret and no build-time network call. Add an entry per playlist.
 *
 * `url` works with Spotify, YouTube Music, Apple Music or anything else
 * with a public share link.
 */
export const playlists: Playlist[] = []
