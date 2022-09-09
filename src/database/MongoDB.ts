import chalk from "chalk";
import mongoose from "mongoose";

require("dotenv").config();
const { MONGODB_URI } = process.env;

class MongoDB {
  private connection;

  init(): boolean  {
    mongoose.connect(MONGODB_URI)
    .catch((err) => {
      console.log(chalk.bold.bgRed("DATABASE [ERROR]"));
      console.log(err);
      return false;
    });
    console.log(chalk.bold.bgGreen("DATABASE [CONNECTED]"));
    return true;
  }
}

export default MongoDB;