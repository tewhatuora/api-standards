const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const sourceDir = "./build";

const standardsContent = {};

const duplicates = new Set();
const invalid = new Set();

const draftDuplicates = new Set();
const draftInvalid = new Set();

// Create two output files paths
const draftDir = path.join(sourceDir, "draft");
const outputFilePath = path.join(sourceDir, "assets", "api-standards.json");
const draftOutputFilePath = path.join(draftDir, "assets", "api-standards.json");

// Regular expression to match the desired format (e.g., HNZAS_MUST_NOT_X_NOTATION_HEADERS)
const idFormatRegex = /^HNZAS_(MUST|MUST_NOT|SHOULD|SHOULD_NOT|MAY)_[\w_]+$/;

const standardTypes = "MUST|MUST_NOT|SHOULD|SHOULD_NOT|MAY".replace(/_/g, ' ').split('|')

// extracts the API Standards from the HTML files, generated by the src/components/ApiStandard.jsx components
function extractDataFromHTML(filePath, standardsIds, htmlContent, excludeDraft) {
  const $ = cheerio.load(htmlContent);
  const elementsWithDataStandardType = [];

  $("[data-standard-type]").each((index, element) => {
    const $element = $(element);

    const standardType = $element.attr("data-standard-type");
    const content = $element.attr("data-extended-text");
    const id = $element.attr("id");

    // Check for duplicate IDs
    if (standardsIds.has(id)) {
      if (standardsContent[id] !== content) {
        console.log(standardsContent[id], content);
        // An unintentional dupe has been written with different content for the same rule
        if (excludeDraft) duplicates.add(id);
        else draftDuplicates.add(id);
      }
      else {
        // This is just the second time this rule's been used; skip it from the checklist
        return;
      }
    }

    // Check the format against the regex
    if (!idFormatRegex.test(id)) {
      if (excludeDraft) invalid.add(id);
      else draftInvalid.add(id);
      return;
    }

    // Check that `type` is valid and matches ID
    if (!standardTypes.includes(standardType) || !id.startsWith(`HNZAS_${standardType.replace(' ', '_')}`)) {
      console.log(standardTypes.includes(standardType), id.startsWith(`HNZAS_${standardType.replace(' ', '_')}`), standardType, id);
      if (excludeDraft) invalid.add(id);
      else draftInvalid.add(id);
      return;
    }

    standardsIds.add(id);
    standardsContent[id] = content;
    elementsWithDataStandardType.push({ standardType, content, id, filePath });
  });

  return elementsWithDataStandardType;
}

function processHTMLFile(filePath, standardsIds, excludeDraft) {
  console.log(`Processing file: ${filePath}`);
  const htmlContent = fs.readFileSync(filePath, "utf-8");
  return extractDataFromHTML(filePath, standardsIds, htmlContent, excludeDraft);
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
      return processHTMLFile(filePath, standardsIds, excludeDraft);
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

    if (duplicates.size > 0) { 
      console.log(`Duplicate Standards ID found: ${[...duplicates].join("\n")}`);
    }
    if (invalid.size > 0) {
      console.log(`Invalid Standards ID found: ${[...invalid].join("\n")}`);
    }
    if (duplicates.size > 0 || invalid.size > 0) {
      throw new Error("Duplicate or invalid Standards ID found. Please fix the issues before proceeding.");
    }

    writeOutput(mainData, outputFilePath);

    // Process the draft directory
    const draftData = processDirectory(draftDir);

    if (draftDuplicates.size > 0) { 
      console.log(`Duplicate Standards ID found: ${[...duplicates].join("\n")}`);
    }
    if (draftInvalid.size > 0) {
      console.log(`Invalid Standards ID found: ${[...invalid].join("\n")}`);
    }
    if (draftDuplicates.size > 0 || draftInvalid.size > 0) {
      throw new Error("Duplicate or invalid Standards ID found. Please fix the issues before proceeding.");
    }

    writeOutput(draftData, draftOutputFilePath);
  } catch (error) {
    console.error(`Error during processing: ${error.message}`);
  }
}

main();
