import { DataTypes, Model } from 'sequelize';

class Users extends Model {}
class Podcasts extends Model {}
class Episodes extends Model {}
class EpisodeListens extends Model {}
class Playlists extends Model {}
class PlaylistEpisodes extends Model {}
class Subscriptions extends Model {}

export default (sequelize) => {
  Users.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    display_name: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    passkey: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false,
  });

  Podcasts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.STRING(1024),
    },
    slug: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    last_indexed_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Podcasts',
    tableName: 'podcasts',
    timestamps: false,
    indexes: [{
      type: 'FULLTEXT',
      name: 'podcasts_fulltext_index',
      fields: ['name', 'slug'],
    }],
  });

  Episodes.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    thumbnail_url: {
      type: DataTypes.STRING(1024),
    },
    episode_url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    last_indexed_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    podcast_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Podcasts,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Episodes',
    tableName: 'episodes',
    timestamps: false,
  });

  EpisodeListens.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
    },
    episode_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Episodes,
        key: 'id',
      },
    },
    time_stamp: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'EpisodeListens',
    tableName: 'episode_listens',
    timestamps: false,
  });

  Playlists.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Playlists',
    tableName: 'playlists',
    timestamps: false,
  });

  PlaylistEpisodes.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Playlists,
        key: 'id',
      },
    },
    episode_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Episodes,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'PlaylistEpisodes',
    tableName: 'playlist_episodes',
    timestamps: false,
  });

  Subscriptions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
    },
    podcast_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Podcasts,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Subscriptions',
    tableName: 'subscriptions',
    timestamps: false,
  });

  // Associations
  Podcasts.hasMany(Episodes, { foreignKey: 'podcast_id' });
  Episodes.belongsTo(Podcasts, { foreignKey: 'podcast_id' });

  Users.hasMany(EpisodeListens, { foreignKey: 'user_id' });
  Episodes.hasMany(EpisodeListens, { foreignKey: 'episode_id' });
  EpisodeListens.belongsTo(Users, { foreignKey: 'user_id' });
  EpisodeListens.belongsTo(Episodes, { foreignKey: 'episode_id' });

  Users.hasMany(Playlists, {foreignKey: 'user_id'});
  Playlists.belongsTo(Users, {foreignKey: 'user_id'});

  Playlists.hasMany(PlaylistEpisodes,{foreignKey: 'playlist_id'});
  Episodes.hasMany(PlaylistEpisodes, {foreignKey: 'episode_id'});
  PlaylistEpisodes.belongsTo(Playlists, {foreignKey: 'playlist_id'});
  PlaylistEpisodes.belongsTo(Episodes, {foreignKey: 'episode_id'});

  Users.hasMany(Subscriptions, {foreignKey: 'user_id'});
  Podcasts.hasMany(Subscriptions, {foreignKey: 'podcast_id'});
  Subscriptions.belongsTo(Users, {foreignKey: 'user_id'});
  Subscriptions.belongsTo(Podcasts, {foreignKey: 'podcast_id'});

  const allModels = [
    Users,
    Podcasts,
    Episodes,
    EpisodeListens,
    Playlists,
    PlaylistEpisodes,
    Subscriptions
  ];

  async function syncAll() {
    return await Promise.all(allModels.map(model => model.sync()))
  };

  return {
    Users,
    Podcasts,
    Episodes,
    EpisodeListens,
    Playlists,
    PlaylistEpisodes,
    Subscriptions,
    allModels,
    syncAll,
  };
};

