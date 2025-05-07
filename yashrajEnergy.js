const axios = require("axios");

//yashraj
const AUTH_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2Nzg4Nzk4YzRmMjhhYjFhYzdiYTAwODkiLCJlbWFpbCI6Inlhc2hyYWowMDAwMV8yNjA5ODlAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJ5YXNocmFqMDAwMDEiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImEiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDYzNjczNjE3NzAsInN1YiI6IjY3ODg3OThjNGYyOGFiMWFjN2JhMDA4OSIsImlhdCI6MTc0NjM2NzM1OCwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc0Njk3MjE1OH0.bJO8vsX4EVT80MwhbgvLB41axb4LGKwHiGn0fYRyE7Ij8GP6YlWhLR_ZC4DrVY_MS2ZlN1eTOB1AA5fjMzPNhQ";
const COOKIE = "_gcl_au=1.1.168804244.1743104439; _fbp=fb.1.1743104441141.1594407671; _scid=lAmqfzrVs30NCoAuC94oWZMeZvwQIgee; _ga=GA1.1.1599590579.1743104443; tmr_lvid=1c24d5621d01b3b99bb2309e10e17a51; tmr_lvidTS=1744740219042; _ym_uid=1744796428869048959; _ym_d=1744796428; _vb=9b3fd39b-ab3f-42b9-b9f6-e9f2cd6d1011; _ScCbts=%5B%5D; FPAU=1.1.168804244.1743104439; _sctr=1%7C1745692200000; _dcid=dcid.1.1745855302098.936304040; _gtmeec=eyJmbiI6ImIzNzgzMjMyNTcxZmI4YWFlMzMyNThmZDk5NDc3OTVhMTM2ZWVlYzRkM2M5MTAzZDY0M2Q1NGVhMWMyZTdlZjciLCJleHRlcm5hbF9pZCI6IjhlMTg4ODUzYjg4M2E4OWYxNzA4NDhkMTdjNzk3ODQ1Nzk2YzJkODdjNDBjNDNlMjc1YjU0ZGNmODlmY2JlMzIifQ%3D%3D; cboink.production.sid=s%3AgqqZYzKNM0Omxwa-nd1UuHFdyZQNyYjV.ZaOdxznLT7nmbXXNf8u07igy%2FTKO3VicGQw1U6UztMk; ipu=1; ipu7299=1; ipu7300=1; ipu7303=1; ipu7313=1; ucc1=21; _rdt_uuid=1743104441035.ba7f14c2-ed87-411f-aef8-43855bef0cf9; mp_8e903983fa8144170b628a5e084a2be3_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A195d91eed418dc-0868b313365cd7-26011d51-e1000-195d91eed418dc%22%2C%22%24device_id%22%3A%20%22195d91eed418dc-0868b313365cd7-26011d51-e1000-195d91eed418dc%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22__timers%22%3A%20%7B%7D%2C%22__alias%22%3A%20%226788798c4f28ab1ac7ba0089%22%2C%22%24user_id%22%3A%20%226788798c4f28ab1ac7ba0089%22%2C%22currentHost%22%3A%20%22boinkers.io%22%2C%22abClass%22%3A%20%22a%22%2C%22%24name%22%3A%20%22yashraj00001%22%2C%22%24avatar%22%3A%20%22https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FImij7YAGBvccFbDofgtgw9Tke5wwEQbDWu9lbkRZiSc.svg%22%2C%22chatId%22%3A%20645205732%2C%22provider%22%3A%20%22telegram%22%2C%22currencySoft%22%3A%205115911961000%2C%22currencyCrypto%22%3A%2049758581170176840000%2C%22currentBoinkerId%22%3A%20%22Nowble282192%22%2C%22currentBoinkerLevel%22%3A%204%2C%22currentBoinkerLastUpdate%22%3A%20%222025-04-30T15%3A35%3A00.190Z%22%2C%22lastUpdateCompletedBoinkers%22%3A%20%222025-04-30T15%3A35%3A00.190Z%22%2C%22countOfCompletedBoinkers%22%3A%209594539%2C%22lastLoginDate%22%3A%20%222025-04-30T15%3A35%3A00.598Z%22%2C%22registrationDate%22%3A%20%222025-01-16T03%3A14%3A20.991Z%22%2C%22daysSinceRegistration%22%3A%20104%2C%22slotMachineEnergy%22%3A%2049764869%2C%22slotMachineEnergyUsed%22%3A%208474201058%2C%22slotMachineBetsDone%22%3A%2013832%2C%22slotMachineLastUpdated%22%3A%20%222025-04-30T15%3A28%3A34.233Z%22%2C%22wheelOfFortuneEnergy%22%3A%20714413%2C%22wheelOfFortuneEnergyUsed%22%3A%206706661%2C%22wheelOfFortuneBetsDone%22%3A%2020296%2C%22wheelOfFortuneLastUpdated%22%3A%20%222025-04-30T11%3A32%3A03.397Z%22%2C%22campaign%22%3A%20%22ZooJan2%22%2C%22isInvited%22%3A%20false%2C%22isWalletConnected%22%3A%20true%2C%22locale%22%3A%20%22en%22%2C%22platform%22%3A%20%22unknown%22%2C%22isTelegram%22%3A%20false%2C%22countOfPurchases%22%3A%2047%2C%22lastPurchaseDate%22%3A%20%222025-04-17T15%3A05%3A28.331Z%22%2C%22lastPurchaseValue%22%3A%200.22999999999999998%2C%22maxPurchaseValue%22%3A%2029.99%2C%22totalUSDValue%22%3A%2063.68999999999999%2C%22countOfFriends%22%3A%20283%2C%22appVersion%22%3A%20%22untagged%2Ba148cc8%22%7D; AWSALB=BxG/nbopb2aeY/G8m9iwSiVZQu1q5nPnWYjtEcE37xyWEf4rJPHAB4erlFD86/qdrtl49mVGTwIE1hyUp2nu0XSLpBIRL8Gwv7n3esVGNIhkG14+Ecrkoj8QHNuB; AWSALBCORS=BxG/nbopb2aeY/G8m9iwSiVZQu1q5nPnWYjtEcE37xyWEf4rJPHAB4erlFD86/qdrtl49mVGTwIE1hyUp2nu0XSLpBIRL8Gwv7n3esVGNIhkG14+Ecrkoj8QHNuB; _scid_r=somqfzrVs30NCoAuC94oWZMeZvwQIgeexsY1FQ; domain_sid=dYdQZKAz7uBsaLXoEOj7R%3A1746027317638; tmr_detect=0%7C1746027319955; _ga_QGGLFFQ8M4=GS1.1.1746027314.34.1.1746027323.0.0.0";

const BASE_URL = "https://boinkers.io/api/play/spinSlotMachine/";
const QUERY_PARAMS = "?p=unknown&v=-1438545913";
// 1767238641
// 1438545913

// Betting stages
const BETTING_STAGES = [
  { amount: 1, maxAttempts: 7 },
  { amount: 10000, maxAttempts: 11 },
  { amount: 50000, maxAttempts: 13 },
  { amount: 100000, maxAttempts: 14 },
  { amount: 500000, maxAttempts: 14 },
  { amount: 1000000, maxAttempts: 10 },
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
    setTimeout(placeBet, 500);
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
