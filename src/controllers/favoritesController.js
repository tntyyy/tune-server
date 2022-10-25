const {FavoritesTracks} = require("../models/models");
const ApiError = require("../error/apiError");

class FavoritesController {
    async createFavorite(req, res) {
        const {userId, trackId} = req.body;
        const favTrack = await FavoritesTracks.create({userId, trackId});
        return res.json(favTrack);
    }

    async getAllFavorites(req, res) {
        let {limit, page} = req.query;
        limit = limit || 5;
        page = page || 1;
        let offset = page * limit - limit;
        let tracks = await FavoritesTracks.findAll({limit, offset});

        return res.json(tracks);
    }

    async getOneFavorite(req, res, next) {
        try {
            const {id} = req.params;
            if (id) {
                const track = await FavoritesTracks.findOne({
                    where: {id: id}
                });
                return res.json(track);
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteFavorite(req, res, next) {
        try {
            const {id} = req.params;
            let deleted;
            if (id) {
                deleted = await FavoritesTracks.destroy({where: {id}});
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

module.exports = new FavoritesController();