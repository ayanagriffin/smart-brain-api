const handleLeaderboard = (req, res, db) => {
    db("users").orderBy("entries", "desc")
    .then(users => {
      return users.map(user => {
        return {
          name: user.name,
          id: user.id,
          entries: user.entries
        }
      })
     
    })
    .then(map => {
      res.json(map)
    })
    .catch((err) => res.status(400).json("error"));
  }

  module.exports = { handleLeaderboard }