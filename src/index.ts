import check from "./scripts/check-config.ts";
import Amane from "./structures/_Amane.ts";

(async () => {
  const checkConfig: boolean = await check();

  if (checkConfig) {
    const client = new Amane();
    client.init();
  }else{
    console.log("Please fix your errors before loading the bot.")
  }
})