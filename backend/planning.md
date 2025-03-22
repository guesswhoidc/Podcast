# Plans 

## Database tables

 - Users
    User table that handles auth and ownership to user data, other tables will point to this table
    * id
    * display_name
    * passkey
    * email
    * created_at
 - Podcasts
    Podcasts indexed that can be searched by the users
    * id
    * name
    * thumbnail_url
    * slug
    * created_at
    * last_indexed_at
 - Episodes
    Podcast Episodes indexed
    * id
    * slug
    * title
    * description
    * thumbnail_url
    * episode_url
    * length
    * last_indexed_at
 - EpisodeListens
    A table to track how much has the user listened to the episode so far
    * id
    * user_id
    * time_stamp

 - Playlists
    User created shareable playlist
 - PlaylistEpisodes
    Episodes that are saved in a user created playlist.
 - Subscriptions
    Podcasts that the user is following to receive new updates.
