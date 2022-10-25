const {Tracks} = require("../models/models");
const ApiError = require("../error/apiError");

class TracksController {
    async createTrack(req, res) {
        const {name, length, listens, releaseId, audio} = req.body;
        const track = await Tracks.create({name, length, listens, releaseId, audio});
        return res.json(track);

    }

    async getAllTracks(req, res) {

    }

    async getOneTrack(req, res) {

    }

    async deleteTrack(req, res) {

    }
}

module.exports = new TracksController();