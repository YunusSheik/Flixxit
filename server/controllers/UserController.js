const User = require("../models/User");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
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

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "Success", movies: user.likedMovies });
    } else {
      return res.json({ msg: "User with given email doesn't exist." });
    }
  } catch (err) {
    return res.json({ msg: "Error occured while fetching movie." });
  }
};

module.exports.removeLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //       const { likedMovies } = user;
      //       const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      //       if (movieIndex === null || movieIndex === undefined) {
      //         res.status(400).send({ msg: "Movie not found." });
      //       } else {

      //       }
      //       likedMovies.splice(movieIndex, 1);
      //       await User.findByIdAndUpdate(
      //         user._id,
      //         {
      //           likedMovies,
      //         },
      //         { new: true }
      //       );
      //       return res.json({
      //         msg: "Movie removed successfully",
      //         movies: likedMovies,
      //       });
      //     }
      //   } catch (err) {
      //     return res.json({ msg: "Error occured while removing movie from list." });
      //   }
      // };

      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex == null || movieIndex == undefined) {
        res.status(400).send({ msg: "Movie not found." });
      } else {
        movies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: movies,
          },
          { new: true }
        );
        return res.json({ msg: "Movie successfully removed.", movies });
      }
    } else {
      return res.json({ msg: "User with given email not found." });
    }
  } catch (error) {
    res.json({ msg: "Error removing movie to the liked list" });
  }
};
