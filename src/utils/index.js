import _ from "lodash";
function pickUserProfile(profile) {
  const pick = ["id", "email", "avatar", "name", "provider"];
  return _.pick(profile, pick);
}
export { pickUserProfile };
