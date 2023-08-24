// const router = require("express").Router();
// const UserListedMovies = require("../models/UserListedMovies");
// const verifyToken = require("../verifyToken");
// const User = require("../models/User");

// router.put("/:id", verifyToken, async (req, res) => {
//   if (req.user.id === req.params.id || req.user.isAdmin) {
//     try {
//       const { email, data } = req.body;
//       const user = await User.findOne({ email });
//       if (user) {
//         const { likedMovies } = user;
//         const movieAlreadyLiked = likedMovies.find(({ id }) => (id = data.id));
//         if (!movieAlreadyLiked) {
//           await User.findByIdAndUpdate(
//             user._id,
//             {
//               likedMovies: [...user.likedMovies, data],
//             },
//             { new: true }
//           );
//         } else
//           return res.json({ msg: "Movie already added to the liked list." });
//       }
//       // else await User.create({ email, likedMovies: [data] });
//       return res.json({ msg: "Movie added successfully." });
//     } catch (err) {
//       return res.json({ msg: "Error occured while adding movie." });
//     }
//   }
// });

// module.exports = router;

// //carousel of upcoming movies lists here

// // const router = require("express").Router();
// // const User = require("../models/User");
// // const verifyToken = require("../verifyToken");
// // // const { addToLikedMovies } = require("../controllers/UserController");

// // // POST
// // router.post("/add", verifyToken, async (req, res) => {
// //   try {
// //     const { email, data } = req.body;
// //     const user = await User.findOne({ email });
// //     if (user) {
// //       const { likedMovies } = user;
// //       const movieAlreadyLiked = likedMovies.find(({ id }) => (id = data.id));
// //       if (!movieAlreadyLiked) {
// //         await User.findByIdAndUpdate(
// //           user._id,
// //           {
// //             likedMovies: [...user.likedMovies, data],
// //           },
// //           { new: true }
// //         );
// //       } else return res.json({ msg: "Movie already added to the liked list." });
// //     }
// //     // else await User.create({ email, likedMovies: [data] });
// //     return res.json({ msg: "Movie added successfully." });
// //   } catch (err) {
// //     return res.json({ msg: "Error occured while adding movie." });
// //   }
// // });

// // module.exports = router;
