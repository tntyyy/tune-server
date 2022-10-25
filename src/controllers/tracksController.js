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

    async getOneTrack(req, res, next) {
        try {
            const {id} = req.params;
            if (id) {
                const track = await Tracks.findOne({
                    where: {id: id}
                });
                return res.json(track);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteTrack(req, res, next) {
        try {
            const {id} = req.params;
            let deleted;
            if (id) {
                deleted = await Tracks.destroy({where: {id}});
            }
            if (deleted) {
                return res.json(true);
            }
            return res.json(false);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TracksController();