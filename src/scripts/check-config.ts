import internal from "stream";

require("dotenv").config();

const { ownerList } = process.env;

export const run = async () => {

  if (+(process.version.slice(1).split('.')[0]) < 16) {
    console.log("Node 18 or higher is required to run Amane.");
    return true;
  }

  if (ownerList) {
    const ownerListArray : Array<String> = ownerList.split(",");
    for (const owner of ownerListArray) {
      if (isNaN(filterInt(owner))) {
        console.log("Owner ID is not a number.");
        return true;
      }
    }
  } else {
    console.log("Owner ID is not set.");
    return true;
  }
};

function filterInt(value) {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
};