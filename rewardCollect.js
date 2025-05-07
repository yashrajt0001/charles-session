const axios = require("axios");
const fs = require("fs");
const path = require("path");

const authToken = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2ODBhNmFjMzBjM2Y2ZGEwZjJjZGU5MjEiLCJlbWFpbCI6ImJvaW5rZXJfNzI4NzM0OF8xNTU1MDJAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJib2lua2VyXzcyODczNDgiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImIiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDYxNzE0OTU4OTAsInN1YiI6IjY4MGE2YWMzMGMzZjZkYTBmMmNkZTkyMSIsImlhdCI6MTc0NjE3MTQ5MiwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc1NDgxMTQ5Mn0.L-kvjYbcEYVBAts2e_Id31Ouvx0jdDmZF6dRkML1rC3Cr9zBocrhh4f_Et2roLJT5S34YUfB_ste-F3kW5Fx6g"
const FILE_PATH = path.join(__dirname, "invites.js");

function loadInvitees() {
  delete require.cache[require.resolve(FILE_PATH)];
  try {
    return require(FILE_PATH);
  } catch {
    return [];
  }
}

function saveInvitees(data) {
  const content = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(FILE_PATH, content);
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function claimReward(inviteeId) {
  const url = `https://boinkers.io/api/friends/claimFriendMoonBoinkerReward/${inviteeId}?p=unknown&v=-202426036`;
  try {
    const res = await axios.post(url, null, {
      headers: {
        Authorization: authToken,
      },
    });
    console.log(`✅ Claimed for invitee ${inviteeId}:`, res.data);
  } catch (err) {
    console.error(`❌ Failed for invitee ${inviteeId}:`, err.response?.data || err.message);
  }
}

async function processInvitees() {
  while (true) {
    let data = loadInvitees();

    if (data.length === 0) {
      console.log("🎉 All invitees processed. Waiting before rechecking...");
      await delay(5000);
      continue;
    }

    for (let i = 0; i < data.length; i++) {
      const invitee = data[i];

      await claimReward(invitee.inviteeId);
      invitee.level += 1;

      if (invitee.level >= 4) {
        console.log(`✅ Finished processing invitee ${invitee.inviteeId}. Removing from file.`);
        data.splice(i, 1);
        i--; // adjust index after removal
      }

      saveInvitees(data);
      await delay(60000);
    }
  }
}

processInvitees();
