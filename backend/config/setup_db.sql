-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  display_name VARCHAR(512) NOT NULL,
  passkey VARCHAR(1024) NOT NULL,
  email VARCHAR(512) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create podcasts table
CREATE TABLE IF NOT EXISTS podcasts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(512) NOT NULL,
  thumbnail_url VARCHAR(1024),
  slug VARCHAR(512) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT (name, slug)
);

-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(512) UNIQUE NOT NULL,
  title VARCHAR(512) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(1024),
  episode_url VARCHAR(1024) NOT NULL,
  length INT,
  last_indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  podcast_id INT,
  FOREIGN KEY (podcast_id) REFERENCES podcasts(id)
);

-- Create episode_listens table
CREATE TABLE IF NOT EXISTS episode_listens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  episode_id INT,
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (episode_id) REFERENCES episodes(id)
);

-- Create playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(512) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create playlist_episodes table
CREATE TABLE IF NOT EXISTS playlist_episodes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  playlist_id INT,
  episode_id INT,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id),
  FOREIGN KEY (episode_id) REFERENCES episodes(id)
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  podcast_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (podcast_id) REFERENCES podcasts(id)
);
