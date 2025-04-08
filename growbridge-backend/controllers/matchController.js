const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/db.json");

exports.getMatches = (req, res) => {
  const userId = req.params.userId;

  const db = JSON.parse(fs.readFileSync(dbPath));
  const currentUser = db.users.find((u) => u.id == userId);

  if (!currentUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const currentPref = db.preferences.find((p) => p.userId == userId);

  if (!currentPref) {
    return res.status(404).json({ message: "Preferences not found" });
  }

  const oppositeRole = currentUser.role === "investor" ? "startup" : "investor";

  const matches = db.users.filter((u) => {
    if (u.role !== oppositeRole) return false;

    const matchDomain = currentPref.preferredDomains?.some((pref) =>
      u.domain?.includes(pref)
    );

    const matchStage = currentPref.preferredStages?.some((stage) =>
      u.stage?.includes(stage)
    );

    return matchDomain || matchStage;
  });

  res.json({ matches });
};
