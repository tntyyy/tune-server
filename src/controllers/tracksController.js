const {Tracks} = require("../models/models");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");


class TracksController {
    async createTrack(req, res) {
        const {name, length, listens, releaseId} = req.body;
        const {audio} = await req.files;
        const extension = audio.name.split('.').pop();
        let fileName = uuid.v4() + `.${extension}`;
        await audio.mv(path.resolve(__dirname, "..", "static", "audio", fileName));
        const track = await Tracks.create({name, length, listens, releaseId, audio: fileName});
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