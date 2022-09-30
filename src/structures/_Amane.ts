import { dirname, sep } from "https://deno.land/std@0.158.0/path/mod.ts";

class Amane {
  constructor() {
  }

  get directory() {
    const dir = `${dirname(import.meta.url)}${sep}`;
    return dir.replace(/\\/g, "/").replace("/tmp/", "/home/runner/Amane-Bot/");
  }
}

export default Amane;