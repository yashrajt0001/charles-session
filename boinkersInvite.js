// Shared imports
const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const easyYopmail = require("easy-yopmail");

const inviterId = "680a6ac30c3f6da0f2cde921";

function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

function saveInviteeId(inviteeId) {
  const filePath = path.join(__dirname, "invites.js");
  let data = [];
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const match = fileContent.match(/module\.exports\s*=\s*(\[[\s\S]*\]);?/);
      if (match) data = eval(match[1]);
    } catch (e) {
      console.error("Error parsing invites.js:", e);
    }
  }
  data.push({ id: Date.now(), inviteeId, level: 0 });
  fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(data, null, 2)};\n`);
}

async function launchBrowser() {
  return puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
}

// ---------- YOPMAIL FLOW ---------- //
async function useYopmail() {
  const emailPrefix = generateRandomString(10);
  const email = `${emailPrefix}@yopmail.com`;
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`https://boinkers.io/?inviterId=${inviterId}&flow=login`, { waitUntil: "networkidle2" });
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', email);

    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase().includes("send code"));
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 15000));
    const inbox = await easyYopmail.getInbox(email);
    if (!inbox || inbox.inbox.length === 0) throw new Error("No Yopmail inbox messages.");
    const msg = await easyYopmail.readMessage(email, inbox.inbox[0].id, { format: "TXT" });
    const otp = msg.content.match(/\b\d{6}\b/)[0];

    await page.type('input[placeholder="Code from Email"]', otp);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase() === "sign in");
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 5000));
    const token = await page.evaluate(() => localStorage.getItem("token"));
    if (!token) throw new Error("Token not found");

    await completeBoinkerFlow(token);

    const { data } = await axios.get("https://boinkers.io/api/users/me?p=unknown", { headers: { Authorization: token } });
    saveInviteeId(data._id);
    console.log("✅ Yopmail flow done!");
  } catch (err) {
    console.error("❌ Yopmail error:", err);
  } finally {
    await browser.close();
  }
}

// ---------- 1SECMAIL FLOW ---------- //
async function use1SecMail() {
  const login = generateRandomString(10);
  const domain = "1secmail.com";
  const email = `${login}@${domain}`;
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`https://boinkers.io/?inviterId=${inviterId}&flow=login`, { waitUntil: "networkidle2" });
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', email);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase().includes("send code"));
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 15000));
    const inboxUrl = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
    const inboxRes = await axios.get(inboxUrl);
    const messages = inboxRes.data;
    if (!messages.length) throw new Error("No emails in 1SecMail inbox");

    const msgId = messages[0].id;
    const msgRes = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${msgId}`);
    const otp = msgRes.data.textBody.match(/\b\d{6}\b/)[0];

    await page.type('input[placeholder="Code from Email"]', otp);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase() === "sign in");
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 5000));
    const token = await page.evaluate(() => localStorage.getItem("token"));
    if (!token) throw new Error("Token not found");

    await completeBoinkerFlow(token);

    const { data } = await axios.get("https://boinkers.io/api/users/me?p=unknown", { headers: { Authorization: token } });
    saveInviteeId(data._id);
    console.log("✅ 1SecMail flow done!");
  } catch (err) {
    console.error("❌ 1SecMail error:", err);
  } finally {
    await browser.close();
  }
}

// ---------- MAILTM FLOW ---------- //
async function useMailtm() {
  const emailPrefix = generateRandomString(10);
  const email = `${emailPrefix}@mailtm.io`;
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(`https://boinkers.io/?inviterId=${inviterId}&flow=login`, { waitUntil: "networkidle2" });
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', email);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase().includes("send code"));
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 15000));
    const inboxUrl = `https://api.mailtm.io/messages?email=${email}`;
    const inboxRes = await axios.get(inboxUrl);
    const messages = inboxRes.data;
    if (!messages.length) throw new Error("No emails in Mailtm inbox");

    const msgId = messages[0].id;
    const msgRes = await axios.get(`https://api.mailtm.io/messages/${msgId}`);
    const otp = msgRes.data.text.match(/\b\d{6}\b/)[0];

    await page.type('input[placeholder="Code from Email"]', otp);
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find(b => b.innerText.trim().toLowerCase() === "sign in");
      if (btn) btn.click();
    });

    await new Promise(res => setTimeout(res, 5000));
    const token = await page.evaluate(() => localStorage.getItem("token"));
    if (!token) throw new Error("Token not found");

    await completeBoinkerFlow(token);

    const { data } = await axios.get("https://boinkers.io/api/users/me?p=unknown", { headers: { Authorization: token } });
    saveInviteeId(data._id);
    console.log("✅ Mailtm flow done!");
  } catch (err) {
    console.error("❌ Mailtm error:", err);
  } finally {
    await browser.close();
  }
}

// ---------- SHARED FLOW ---------- //
async function completeBoinkerFlow(token) {
  await axios.post("https://boinkers.io/api/users/completeFTUE?p=unknown&v=-1438545913", null, { headers: { Authorization: token } });
  await axios.post("https://boinkers.io/api/boinkers/upgradeBoinker?p=unknown&v=-1438545913", { isUpgradeCurrentBoinkerToMax: true }, { headers: { Authorization: token } });

  const { data } = await axios.get("https://boinkers.io/api/users/me?p=unknown", { headers: { Authorization: token } });
  for (const msg of data.inboxMessages || []) {
    if (msg.ctaText === "Claim" && msg.state === "new") {
      try {
        await axios.post(`https://boinkers.io/api/inboxMessages/claimInboxMessagePrize?p=unknown&v=-202426036`, { inboxMessageId: msg._id }, { headers: { Authorization: token } });
      } catch (err) {
        console.error("❌ Claim failed:", err);
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    await axios.post("https://boinkers.io/api/boinkers/upgradeBoinker?p=unknown&v=-1438545913", { isUpgradeCurrentBoinkerToMax: true }, { headers: { Authorization: token } });
  }
}

// ------------ MAIN ENTRY ------------ //
(async () => {
  const LOOP_COUNT = 10; // Update as needed
  for (let i = 0; i < LOOP_COUNT; i++) {
    await useYopmail(); // Change to useYopmail(), use1SecMail(), or useMailtm()
  }
  console.log("🎉 All done!");
})();
