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

## Routes

GET /podcasts
 paginated list of all podcasts
POST /podcasts
 indexes a new podcast into the platform
GET /podcast/:id
 gets the information from a podcast 
GET /episode/:id
 Gets information from a specific episode including the current
 progress of the episode for the authenticated user.
POST /episode/:id *requires auth*
 Saves the progress of a episode for the current authenticated user.
GET /subscriptions *requires auth*
 Gets the list of all of the podcasts that the 
 current user is currently subscribed to.
POST /subscriptions *requires auth*
 Subscribes to a podcast
DELETE /subscriptions/:id *requires auth*
 Unsubscribes from a podcast
POST /auth 
 Logs into a account
POST /signup
 Creates a new account
POST /refresh *requires auth*
 Refreshes the session
DELETE /logout *requires auth*
 Leaves a session
