import check from "./scripts/check-config.ts";
import loadSlashCommands from "./bot.ts"
//import Amane from "./structures/_Amane.ts";

(async () => {
  const checkConfig: boolean = await check();

  if (checkConfig) {
    loadSlashCommands();
  }else{
    console.log("Please fix your errors before loading the bot.")
  }
})();