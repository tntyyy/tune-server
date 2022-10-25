const {Releases} = require("../models/models");
const ApiError = require("../error/apiError");
const uuid = require("uuid");
const path = require("path");

class ReleasesController {
    async createRelease(req, res, next) {
        try {
            const {name, author} = req.body;
            const {cover} = req.files;
            let fileName = uuid.v4() + ".jpg";
            await cover.mv(path.resolve(__dirname, "..", "static", "images", fileName));

            const release = await Releases.create({name, author, cover: fileName});
            return res.json(release);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAllReleases(req, res) {
        const allReleases = await Releases.findAll();
        return res.json(allReleases);
    }

    async getOneRelease(req, res, next) {
        try {
            const {id} = req.params;
            if (id) {
                const release = await Releases.findOne({
                    where: {id: id}
                });
                return res.json(release);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteRelease(req, res, next) {
        try {
            const {id} = req.params;
            let deleted;
            if (id) {
                deleted = await Releases.destroy({where: {id}});
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

module.exports = new ReleasesController();