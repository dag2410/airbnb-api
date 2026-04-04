const wishlistService = require("@/services/wishlist.service");
const { success, error } = require("@/utils/response");

exports.index = async (req, res) => {
  try {
    const wishlists = await wishlistService.getUserWishlist(req.user.id);
    success(res, 200, wishlists);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const wishlist = await wishlistService.toggleLike(
      req.user.id,
      req.body.room_id
    );
    success(res, 201, wishlist);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.clear = async (req, res) => {
  try {
    const result = await wishlistService.clearWishlist(req.user.id);
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};
