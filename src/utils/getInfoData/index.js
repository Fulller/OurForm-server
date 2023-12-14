import lodash from "lodash";
export default function getInfoData({ object, fileds }) {
  return lodash.pick(object, fileds);
}
