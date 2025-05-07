const axios = require("axios");

// seconday
const AUTH_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2ODBhNmFjMzBjM2Y2ZGEwZjJjZGU5MjEiLCJlbWFpbCI6ImJvaW5rZXJfNzI4NzM0OF8xNTU1MDJAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJib2lua2VyXzcyODczNDgiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImIiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDYxNzE0OTU4OTAsInN1YiI6IjY4MGE2YWMzMGMzZjZkYTBmMmNkZTkyMSIsImlhdCI6MTc0NjE3MTQ5MiwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc1NDgxMTQ5Mn0.L-kvjYbcEYVBAts2e_Id31Ouvx0jdDmZF6dRkML1rC3Cr9zBocrhh4f_Et2roLJT5S34YUfB_ste-F3kW5Fx6g"
const COOKIE = "_dcid=dcid.1.1746171454415.973234621; cboink.production.sid=s%3AGwl-jicZhyQDWqWoO_VIMhfxe9biZWem.KBUMYRJStTidekoq%2BblxbuUBIZqRG%2B7o679mNK1lSXU; _gcl_au=1.1.2000902981.1746171789; _ga=GA1.1.559924971.1746171790; inpu1=1; ucc1=14; _fbp=fb.1.1746171791744.61122925383686857; _vb=80f704d2-ec15-4bdd-8477-6e4c8cfb659f; FPAU=1.1.2000902981.1746171789; _gtmeec=eyJleHRlcm5hbF9pZCI6ImQxYzNjZWFmMzgxNzI4NTAyZTJmMjRlNzI0YWViOWMwMDYxMTEwZjEyZDg2ZWU1MzE3NjQxNDc0ODE5NDJiNTAifQ%3D%3D; _scid=6bf45344-ceaa-462e-ff17-b61a3849c593; _rdt_uuid=1746171791643.27d13296-2874-4671-a240-deb6252c56a7; AWSALB=J5sJxwZn1X+tHL3p/nl2gRN/CyDFJnpx+Z+uQQmtDTIjm7tg2DVtCFRUNGdtj5qEHb6wATLgjj4xry+FpAx1BUvvlnjiEKhLgdKZKuR0nP/k0OveA9VSMqTTx0rMTP4KfA0fZl/GqAhY/8irYsbwnnX4ngjeLNpP/ks/wGXyuLkoX+Zv/TP9pEoKXOO6Lg==; AWSALBCORS=J5sJxwZn1X+tHL3p/nl2gRN/CyDFJnpx+Z+uQQmtDTIjm7tg2DVtCFRUNGdtj5qEHb6wATLgjj4xry+FpAx1BUvvlnjiEKhLgdKZKuR0nP/k0OveA9VSMqTTx0rMTP4KfA0fZl/GqAhY/8irYsbwnnX4ngjeLNpP/ks/wGXyuLkoX+Zv/TP9pEoKXOO6Lg==; mp_8e903983fa8144170b628a5e084a2be3_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A1968ff2fbe7157fb-062398027fca5b-4c657b58-e1000-1968ff2fbe7157fb%22%2C%22%24device_id%22%3A%20%221968ff2fbe7157fb-062398027fca5b-4c657b58-e1000-1968ff2fbe7157fb%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22__timers%22%3A%20%7B%7D%2C%22__alias%22%3A%20%22680a6ac30c3f6da0f2cde921%22%2C%22currentHost%22%3A%20%22boinkers.io%22%2C%22appVersion%22%3A%20%22untagged%2Bd948c5a%22%2C%22platform%22%3A%20%22unknown%22%2C%22isTelegram%22%3A%20false%2C%22abClass%22%3A%20%22b%22%2C%22%24name%22%3A%20%22boinker_7287348%22%2C%22%24avatar%22%3A%20%22https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocKFwfq0aQ0Fo9ALUPDU9YXtfDUUKzoUMLd4GDjzYM20o7llUpqZ%3Ds96-c%22%2C%22provider%22%3A%20%22google%22%2C%22currencySoft%22%3A%2016244146000%2C%22currencyCrypto%22%3A%201547085.9614%2C%22currentBoinkerId%22%3A%20%22Dharma%22%2C%22currentBoinkerLevel%22%3A%200%2C%22currentBoinkerLastUpdate%22%3A%20%222025-05-02T07%3A29%3A16.851Z%22%2C%22lastUpdateCompletedBoinkers%22%3A%20%222025-05-02T07%3A45%3A08.090Z%22%2C%22countOfCompletedBoinkers%22%3A%207%2C%22lastLoginDate%22%3A%20%222025-05-02T07%3A45%3A08.497Z%22%2C%22registrationDate%22%3A%20%222025-04-24T16%3A45%3A55.505Z%22%2C%22daysSinceRegistration%22%3A%207%2C%22slotMachineEnergy%22%3A%201036787%2C%22slotMachineEnergyUsed%22%3A%20259511%2C%22slotMachineBetsDone%22%3A%20160%2C%22slotMachineLastUpdated%22%3A%20%222025-05-02T07%3A51%3A51.472Z%22%2C%22wheelOfFortuneEnergy%22%3A%207%2C%22wheelOfFortuneEnergyUsed%22%3A%20538%2C%22wheelOfFortuneBetsDone%22%3A%2034%2C%22wheelOfFortuneLastUpdated%22%3A%20%222025-05-02T07%3A47%3A35.831Z%22%2C%22isInvited%22%3A%20false%2C%22isWalletConnected%22%3A%20false%2C%22locale%22%3A%20%22en%22%2C%22countOfPurchases%22%3A%200%2C%22lastPurchaseDate%22%3A%200%2C%22lastPurchaseValue%22%3A%200%2C%22maxPurchaseValue%22%3A%200%2C%22totalUSDValue%22%3A%200%2C%22%24user_id%22%3A%20%22680a6ac30c3f6da0f2cde921%22%7D; _ga_QGGLFFQ8M4=GS1.1.1746171790.1.1.1746172313.0.0.0"

const BASE_URL = "https://boinkers.io/api/play/spinSlotMachine/";
const QUERY_PARAMS = "?p=unknown&v=-1438545913";
// 1767238641
// 1438545913

// Betting stages
const BETTING_STAGES = [
  { amount: 1, maxAttempts: 7 },
  { amount: 5000, maxAttempts: 12 },
  { amount: 10000, maxAttempts: 12 },
  { amount: 50000, maxAttempts: 14 },
  // { amount: 100000, maxAttempts: 15 },
  // { amount: 500000, maxAttempts: 15 },
  // { amount: 1000000, maxAttempts: 10 },
];

let currentStageIndex = 0;
let attemptsInCurrentStage = 0;
let totalAttempts = 0;

async function placeBet() {
  const currentStage = BETTING_STAGES[currentStageIndex];

  const API_URL = `${BASE_URL}${currentStage.amount}${QUERY_PARAMS}`;

  try {
    const response = await axios.post(
      API_URL,
      {},
      {
        headers: {
          Authorization: AUTH_TOKEN,
          Cookie: COOKIE,
        },
      }
    );

    console.log(
      `Stage ${currentStageIndex + 1}, ${attemptsInCurrentStage + 1}/${
        currentStage.maxAttempts
      })`
    );

    totalAttempts++;
    attemptsInCurrentStage++;

    // Check the correct prize conditions
    const isWinningPrize =
      response.data &&
      response.data.prize &&
      response.data.prize.prizeIcon === "gaeResource" &&
      response.data.prize.prizeValue === currentStage.amount * 8;

    if (isWinningPrize) {
      console.log(`WINNERRRRRRRRRRRR!!!!!!`);
      // Reset to first stage
      currentStageIndex = 0;
      attemptsInCurrentStage = 0;
    } else {
      // Check if we need to advance to next stage
      if (attemptsInCurrentStage >= currentStage.maxAttempts) {
        if (currentStageIndex === BETTING_STAGES.length - 1) {
          // Reset to first stage after completing 5M stage
          currentStageIndex = 0;
          attemptsInCurrentStage = 0;
        } else if (currentStageIndex < BETTING_STAGES.length - 1) {
          currentStageIndex++;
          attemptsInCurrentStage = 0;
        }
      }
    }

    // Schedule the next bet
    setTimeout(placeBet, 800);
  } catch (error) {
    console.error(`Error placing bet: ${error.message}`);

    // Still count this as an attempt
    totalAttempts++;
    attemptsInCurrentStage++;

    // Check if we need to advance to next stage due to max attempts
    if (attemptsInCurrentStage >= currentStage.maxAttempts) {
      if (currentStageIndex === BETTING_STAGES.length - 1) {
        // Reset to first stage after completing 5M stage
        currentStageIndex = 0;
        attemptsInCurrentStage = 0;
        console.log(
          `Completed 5M stage. Resetting to stage 1 with bet amount ${BETTING_STAGES[0].amount}`
        );
      } else if (currentStageIndex < BETTING_STAGES.length - 1) {
        currentStageIndex++;
        attemptsInCurrentStage = 0;
        console.log(
          `Moving to stage ${currentStageIndex + 1} with bet amount ${
            BETTING_STAGES[currentStageIndex].amount
          }`
        );
      }
    }

    // Try again after a delay
    setTimeout(placeBet, 2000);
  }
}

placeBet();
