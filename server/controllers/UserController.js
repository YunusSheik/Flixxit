const User = require("../models/User");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    console.log("req", req.body);
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => (id = data.id));
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie added successfully." });
  } catch (err) {
    return res.json({ msg: "Error occured while adding movie." });
  }
};
