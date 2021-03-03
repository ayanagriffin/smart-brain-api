const handleGetUser = (req, res, db) => {
  const { id } = req.params;

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      // an empty array is still true, so need to check if the length > 0 to see if the user actually exists
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch((err) => res.status(400).json("error"));
};

const handleDeleteUser = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .where("id", id)
    .del()
    .then(res.send("success"))
    .catch((err) => res.status(400).json("error deleting account"));
};

module.exports = {
  handleGetUser,
  handleDeleteUser,
};
