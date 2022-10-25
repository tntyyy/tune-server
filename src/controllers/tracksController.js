const {Tracks} = require("../models/models");
const ApiError = require("../error/apiError");

class TracksController {
    async createTrack(req, res) {
        const {name, length, listens, releaseId, audio} = req.body;
        const track = await Tracks.create({name, length, listens, releaseId, audio});
        return res.json(track);

    }

    async getAllTracks(req, res) {
        let {releaseId, limit, page} = req.query;
        limit = limit || 5;
        page = page || 1;
        let tracks;
        let offset = page * limit - limit;

        if (!releaseId) {
            tracks = await Tracks.findAndCountAll({limit, offset});
        }
        if (releaseId) {
            tracks = await Tracks.findAll({where: {releaseId}});
        }

        return res.json(tracks);
    }

    async getOneTrack(req, res) {

    }

    async deleteTrack(req, res) {

    }
}

module.exports = new TracksController();