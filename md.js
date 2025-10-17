// mdToHtml.js
const fs = require("fs");
const path = require("path");
const marked = require("marked");

const inputFile = process.argv[2];

if (!inputFile) {
  console.log("Usage: node mdToHtml.js <input.md> [output.html]");
  console.log("Example: node mdToHtml.js README.md README.html");
  process.exit(1);
}

const outputFile = process.argv[3] || inputFile.replace(/\.md$/, ".html");

if (!fs.existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`);
  process.exit(1);
}

const markdown = fs.readFileSync(inputFile, "utf8");
const htmlContent = marked.parse(markdown);

const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(outputFile, ".html")}</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.6; color: #333; }
    h1, h2, h3 { color: #007acc; }
    pre { background: #f4f4f4; padding: 1rem; border-radius: 6px; overflow-x: auto; }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
    a { color: #007acc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>
`;

fs.writeFileSync(outputFile, fullHtml);
console.log(`✅ Converted ${inputFile} → ${outputFile}`);
