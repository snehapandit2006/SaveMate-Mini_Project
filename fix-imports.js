import fs from "fs";
import path from "path";

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const f = path.join(dir, file);
    if (fs.statSync(f).isDirectory()) walk(f);
    else if (f.endsWith(".ts") || f.endsWith(".tsx")) fixFile(f);
  }
}

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");

  // Remove PowerShell corruption
  code = code.replace(/\(\$m\.Value[\s\S]*?"\)/g, "");
  code = code.replace(/param\(\$m\)/g, "");
  code = code.replace(/\(\$m\.Value[\s\S]*?\)/g, "");

  // Replace any broken import-starts
  code = code.replace(/from "\s+"/g, "from \"\"");

  // Fix versioned Radix imports
  code = code.replace(/(@radix-ui\/react-[A-Za-z-]+)@\d+\.\d+\.\d+/g, "$1");

  fs.writeFileSync(file, code, "utf8");
  console.log("Fixed:", file);
}

walk("./src");
