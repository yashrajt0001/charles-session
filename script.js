const WebSocket = require("ws");
const fs = require("fs")
// WebSocket server URL and configuration
const ws = new WebSocket("ws://35.154.196.40:14501/ws"); // india
// const ws = new WebSocket("ws://47.236.197.79:14501/ws"); //china
// const ws = new WebSocket("ws://47.245.102.202:14501/ws"); //vietnam
// const ws = new WebSocket("ws://8.213.132.127:14501/ws"); //korean
// const ws = new WebSocket("ws://47.251.56.58:14442/ws"); //us

const extractedData = JSON.parse(fs.readFileSync("extracted_blocks.json"));
const secret = "cdd449767fbfead9ed2531485fb20a0f";
const args = process.argv.slice(2); // Get arguments starting from index 2
const rid = parseInt(args[0]) // First argument
const uid = 288235673;

let packetId = 4;

ws.on("open", () => {
  console.log("Connected to WebSocket server");

  // Send a message to the server
  const enterGameMessage = {
    packet_id: 2,
    command: "CMD_ENTER_GAME",
    param: {
      secret,
      rid,
      uid,
    },
  };

  ws.send(JSON.stringify(enterGameMessage), (error) => {
    if (error) {
      console.error("Error sending message:", error);
    } else {
      sendBlockMessages(uid, rid);
    }
  });
});

// Loop through the block IDs and send messages with dynamic delays
async function sendBlockMessages(uid, rid) {
  for (let i = 0; i < extractedData.length; i++) {
    const { command, id, block_state, type, block_type } = extractedData[i];
    const message = {
      packet_id: packetId,
      command: command,
      param: {
        rid,
        uid,
      },
    };

    // Add specific fields based on the command type
    if (command === "CMD_TOUCH_BLOCK") {
      message.param.block_id = id;
      message.param.block_state = block_state || 0;
    } else if (
      command === "CMD_USE_COMMON_BLOCK" ||
      command === "CMD_CHOOSE_COMMON_BLOCK"
    ) {
      message.param.id = id;
      message.param.type = type || 0;
    } else if (command === "CMD_USE_PROP") {
      message.param.prop_id = id;
    } else if (command === "CMD_CHOOSE_HOT_TIME_BLOCK") {
      message.param.block_type = block_type
    }

    const delay = i >= 132 && i <= 150 ? 100 : 0;

    // Send the message
    await sendMessage(ws, message, 0);
    packetId++; // Increment packet ID
  }

  console.log("All messages sent!");
}

// Helper function to send a message with a delay
function sendMessage(socket, message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      socket.send(JSON.stringify(message), (error) => {
        if (error) {
          console.error("Error sending message:", error);
        } else {
          console.log(`Message sent: ${JSON.stringify(message)}`);
          resolve();
        }
      });
    }, delay);
  });
}

// Function to determine random delays with variance
function getRandomDelayWithVariance() {
  const isShortDelay = Math.random() < 0.9; // 90% chance for short delay
  if (isShortDelay) {
    return getRandomDelay(10, 10);
  } else {
    return getRandomDelay(10, 10);
  }
}

// Generate a random delay between min and max (inclusive)
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// {"packet_id":254,"command":"CMD_CHOOSE_HOT_TIME_BLOCK","param":{"block_type":14,"rid":12285227,"uid":286603786}}