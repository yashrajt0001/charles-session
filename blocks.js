const fs = require('fs');
const path = require('path');

// Directory containing the files
const directoryPath = './messages'; // this is the folder after extracting

// Function to extract relevant data from a single message
function extractRelevantData(message) {
  const { command, param } = message;

  if (!command || !param) return null;

  if (command === "CMD_TOUCH_BLOCK") {
    return {
      command,
      id: param.block_id,
      block_state: param.block_state || 0
    };
  }

  if (command === "CMD_USE_COMMON_BLOCK" || command === "CMD_CHOOSE_COMMON_BLOCK") {
    return {
      command,
      id: param.id,
      type: param.type || 0
    };
  }

  if (command === "CMD_USE_PROP") {
    return {
      command,
      id: param.prop_id
    };
  }

  if (command === "CMD_CHOOSE_HOT_TIME_BLOCK") {
    return {
      command,
      block_type: param.block_type
    };
  }

  return null;
}

// Process all files in the directory
const extractedData = [];
fs.readdirSync(directoryPath).forEach((file) => {
  if (file.endsWith('_client.txt')) {
    const filePath = path.join(directoryPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse each line as JSON and extract relevant data
    content.split('\n').forEach((line) => {
      try {
        const message = JSON.parse(line);
        const data = extractRelevantData(message);
        if (data) extractedData.push(data);
      } catch (error) {
        console.error("Error parsing line in file ${file}:", error);
      }
    });
  }
});

// Write extracted data to a JSON file for later use
fs.writeFileSync('extracted_blocks.json', JSON.stringify(extractedData, null, 2));
console.log('Extracted data saved to extracted_blocks.json');