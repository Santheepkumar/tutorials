import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

if (existsSync(".git")) {
  execFileSync("npx", ["husky"], { stdio: "inherit" });
} else {
  console.log("Skipping Husky: this example is nested in Reelcode.");
}
