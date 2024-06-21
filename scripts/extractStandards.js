const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const sourceDir = "./build";
const draftDir = path.join(sourceDir, "draft");
const outputFilePath = path.join(sourceDir, "assets", "api-standards.json");
const draftOutputFilePath = path.join(draftDir, "assets", "api-standards.json");

// Regular expression to match the desired format (e.g., HNZAS_MUST_NOT_X_NOTATION_HEADERS)
const idFormatRegex = /^HNZAS_(MUST|MUST_NOT|SHOULD|SHOULD_NOT|MAY)_[\w_]+$/;

function extractDataFromHTML(filePath, htmlContent, standardsIds) {
  const $ = cheerio.load(htmlContent);
  const elementsWithDataStandardType = [];

  $("[data-standard-type]").each((index, element) => {
    const $element = $(element);
    if ($element.attr("data-duplicate") === "true") {
      return;
    }

    const standardType = $element.attr("data-standard-type");
    const content = $element.attr("data-extended-text");
    const id = $element.attr("id");

    // Check for duplicate IDs
    if (standardsIds.has(id)) {
      throw new Error(`Duplicate Standards ID found: ${id}`);
    }
    if (!idFormatRegex.test(id)) {
      throw new Error(`Invalid ID Standards format found: ${id}. Check the docs for format`);
    }

    standardsIds.add(id);
    elementsWithDataStandardType.push({ standardType, content, id, filePath });
  });

  return elementsWithDataStandardType;
}

function processHTMLFile(filePath, standardsIds) {
  console.log(`Processing file: ${filePath}`);
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  return extractDataFromHTML(filePath, htmlContent, standardsIds);
}

function processDirectory(directoryPath, excludeDraft = false) {
  console.log(`Processing directory: ${directoryPath}`);
  const standardsIds = new Set();  // Reset the set for each new directory
  const fileNames = fs.readdirSync(directoryPath);
  const data = fileNames.flatMap(fileName => {
    const filePath = path.join(directoryPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      if (excludeDraft && filePath === draftDir) {
        return [];
      }
      return processDirectory(filePath, excludeDraft);
    } else if (fileName.endsWith(".html")) {
      return processHTMLFile(filePath, standardsIds);
    }
    return [];
  });

  return data;
}

function writeOutput(data, outputFilePath) {
  console.log(`Writing output to ${outputFilePath}`);
  if (!data.length) {
    console.log("No data to write.");
    return;
  }

  const directory = path.dirname(outputFilePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const groupedData = {};
  data.forEach(({ standardType, content, id, filePath }) => {
    if (!groupedData[standardType]) {
      groupedData[standardType] = [];
    }
    const link = filePath.replace("build", "").replace("/index.html", "") + `#${id}`;
    groupedData[standardType].push({ standardType, content, id, link });
  });

  const jsonData = JSON.stringify(groupedData, null, 2);
  fs.writeFileSync(outputFilePath, jsonData);
}

function main() {
  try {
    // Process the main build directory, excluding the draft folder
    const mainData = processDirectory(sourceDir, true);
    writeOutput(mainData, outputFilePath);

    // Process the draft directory
    const draftData = processDirectory(draftDir);
    writeOutput(draftData, draftOutputFilePath);
  } catch (error) {
    console.error(`Error during processing: ${error.message}`);
  }
}

main();
