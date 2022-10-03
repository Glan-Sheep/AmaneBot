import check from "./scripts/check-config.ts";
import { dirname, sep } from "https://deno.land/std@0.158.0/path/mod.ts";
import Client from "./base/Amane.ts"

(async () => {
  const checkConfig: boolean = await check();

  if (checkConfig) {
    const Amane = new Client();
    Amane.init(directory());
  }else{
    console.log("Please fix your errors before loading the bot.")
  }
})();

function directory(): string {
  const dir = `${dirname(import.meta.url)}${sep}`;
  return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/").replace("file://","");
}