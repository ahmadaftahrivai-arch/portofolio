/**
 * Optional "currently listening to" card on the Home hero, mirroring the
 * reference site's Spotify widget. Disabled by default — turn it on only
 * with a real Spotify playlist, so the card never shows invented tracks.
 *
 * To enable: open Spotify -> your playlist -> Share -> Embed playlist,
 * copy the src URL from the generated <iframe>, and paste it below.
 */
export const music = {
  enabled: true,
  embedUrl: 'https://open.spotify.com/embed/playlist/2kZBw4l09qweuDTvhvNTwS' as string | null,
}
