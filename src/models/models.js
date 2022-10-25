const sequelize = require("../database");
const {DataTypes} = require("sequelize");

const Users = sequelize.define("users", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
});

const Releases = sequelize.define("releases", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING},
    cover: {type: DataTypes.STRING},
});

const Tracks = sequelize.define("tracks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    length: {type: DataTypes.INTEGER, allowNull: false},
    listens: {type: DataTypes.INTEGER, defaultValue: 0},
    audio: {type: DataTypes.STRING, allowNull: false}
});

const FavoritesTracks = sequelize.define("favorites_tracks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

Releases.hasMany(Tracks);
Tracks.belongsTo(Releases);

Users.belongsToMany(Tracks, {through: FavoritesTracks});
Tracks.belongsToMany(Users, {through: FavoritesTracks});

module.exports = {
    Users,
    Tracks,
    Releases,
    FavoritesTracks
}