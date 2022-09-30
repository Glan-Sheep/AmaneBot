function check(): boolean {
  if (+(Deno.version.deno.slice(1).split(".")[0]) < 1) {
    console.log("Deno 1.0.0 or higher is required to run Amane.");
    return false
  }
  return true
}

export default check;