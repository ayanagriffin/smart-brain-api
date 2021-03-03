const handleRank = (req, res, db) => {
    const { id } = req.params;
    db.select("*")
      .from("users")
      .where({ id })
      .then((user) => {
        // an empty array is still true, so need to check if the length > 0 to see if the user actually exists
        if (user.length) {
          return (entries = parseInt(user[0].entries));
        }
      })
      .then((entries) => {
        db("users")
          .orderBy("entries", "desc")
          .then((users) => {
            const scoresArray = getScoresArray(users);
            // TODO: what to do if index = -1
            res.json(scoresArray.indexOf(entries) + 1);
          });
      })
      .catch((err) => res.status(400).json("error"));
  }

  const getScoresArray = (users) => {
    //creates an array of all of the unique scores
    let scoresArray = [];
  
    for (let i = 0; i < users.length; i++) {
      let curNum = parseInt(users[i].entries, 10);
      if (!scoresArray.includes(curNum)) {
        scoresArray.push(curNum);
      }
    }
    return scoresArray;
  };

  module.exports = {handleRank}