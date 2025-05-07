const axios = require("axios");

// seconday
const AUTH_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2ODE5ZjA5MzY0ZDU0M2M4ZjEyMmQwMzAiLCJlbWFpbCI6ImJvaW5rZXJfNzQ2NTM5MV80NTE2MjhAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJib2lua2VyXzc0NjUzOTEiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImEiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDY1MzgyNjM3NTAsInN1YiI6IjY4MTlmMDkzNjRkNTQzYzhmMTIyZDAzMCIsImlhdCI6MTc0NjUzODI2MCwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc0NzE0MzA2MH0.ld91iLLEIgTVLlwVRsfQJ_IxvlxsqtBUz5jAwPJkaZQZUABVrIEDr8bESIAtqqqKF7m3xxSH3QvD-13LzgkCrA"
const COOKIE = "_gcl_au=1.1.574300580.1746536574; _ga=GA1.1.1824431532.1746536578; FPAU=1.1.574300580.1746536574; _fbp=fb.1.1746536577053.1837695390; _vb=a2d6641c-141a-4c75-a66b-f0be47cf883c; tmr_lvid=9981d08e6c297b5236f4188434fbbf66; tmr_lvidTS=1746536579858; _ScCbts=%5B%5D; domain_sid=c2S03So2GTjyHY3n3msJ2%3A1746536585014; _sctr=1%7C1746469800000; _dcid=dcid.1.1746538263697.383371446; _scid=GpQyC78zpXMPBb9hMvEYmlEp_olhIiDF_ekl2Q; _tt_enable_cookie=1; _ttp=01JTJWQWZQBYV3WR1BH8JBQKMY_.tt.1; cboink.production.sid=s%3A6TMxnf4ADxxnzvrM7C6fDZTLKYEInGvy.EV3UiSwBizA7gijTTzaz5kxp3QILZ9QUHR3HpZY28S4; inpu1=1; ucc1=13; _gtmeec=eyJleHRlcm5hbF9pZCI6Ijg1NWMxNDMyZTdlOTI4YmIyNWIxMGNhYzlhNjQ3MDYwN2MzM2RkZDc1YjViOGMyYjlhNzU4MGU5NzdiMWRjMzEifQ%3D%3D; _scid_r=I5QyC78zpXMPBb9hMvEYmlEp_olhIiDF_ekl0g; mp_8e903983fa8144170b628a5e084a2be3_mixpanel=%7B%22distinct_id%22%3A%20%22%24device%3A196a5b1256f1819-0dc377e394f18f-26011c51-e1000-196a5b1256f1819%22%2C%22%24device_id%22%3A%20%22196a5b1256f1819-0dc377e394f18f-26011c51-e1000-196a5b1256f1819%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22__timers%22%3A%20%7B%7D%2C%22__alias%22%3A%20%226819f09364d543c8f122d030%22%2C%22currentHost%22%3A%20%22boinkers.io%22%2C%22appVersion%22%3A%20%22prod-1.4-591-gfc705d1%2Bfc705d1%22%2C%22platform%22%3A%20%22unknown%22%2C%22isTelegram%22%3A%20false%2C%22abClass%22%3A%20%22a%22%2C%22%24name%22%3A%20%22boinker_7465391%22%2C%22%24avatar%22%3A%20%22https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FzfT_YLR1jvlbfRDcw6I1PvRPiWd_J9bCvd2TBofDfU9vzSFZaTmm0GlUyksm93-O.svg%22%2C%22chatId%22%3A%207843002423%2C%22provider%22%3A%20%22telegram%22%2C%22currencySoft%22%3A%20995000%2C%22currencyCrypto%22%3A%209350.55090663889%2C%22currentBoinkerId%22%3A%20%22Stash%22%2C%22currentBoinkerLevel%22%3A%205%2C%22currentBoinkerLastUpdate%22%3A%20%222025-05-06T14%3A49%3A08.975Z%22%2C%22lastUpdateCompletedBoinkers%22%3A%20%222025-05-06T14%3A49%3A08.975Z%22%2C%22countOfCompletedBoinkers%22%3A%204%2C%22lastLoginDate%22%3A%20%222025-05-06T14%3A49%3A09.356Z%22%2C%22registrationDate%22%3A%20%222025-05-06T11%3A20%3A51.631Z%22%2C%22daysSinceRegistration%22%3A%200%2C%22slotMachineEnergy%22%3A%20338656%2C%22slotMachineEnergyUsed%22%3A%20634%2C%22slotMachineBetsDone%22%3A%2081%2C%22slotMachineLastUpdated%22%3A%20%222025-05-06T14%3A47%3A55.926Z%22%2C%22wheelOfFortuneEnergy%22%3A%201%2C%22wheelOfFortuneLastUpdated%22%3A%20%222025-05-06T14%3A47%3A56.855Z%22%2C%22isInvited%22%3A%20false%2C%22isWalletConnected%22%3A%20false%2C%22locale%22%3A%20%22en%22%2C%22countOfPurchases%22%3A%200%2C%22lastPurchaseDate%22%3A%200%2C%22lastPurchaseValue%22%3A%200%2C%22maxPurchaseValue%22%3A%200%2C%22totalUSDValue%22%3A%200%2C%22%24user_id%22%3A%20%226819f09364d543c8f122d030%22%2C%22wheelOfFortuneEnergyUsed%22%3A%202144%2C%22wheelOfFortuneBetsDone%22%3A%20216%2C%22%24email%22%3A%20%22yeshrajtelikelwa%40gmail.com%22%7D; _ga_QGGLFFQ8M4=GS2.1.s1746542251$o2$g1$t1746542951$j0$l0$h0; AWSALB=VrlFbHTi6Op84gTXYyTbjXSnfjWkkoYXevcHAW5+z6lbqbkDcqP6ysuq4CLJO/YSGAN0F/GGTM7zINgoPes58tcJjoFRZPnqdh3HY/VsoqF+eIJmxNenVfxKCHjV; AWSALBCORS=VrlFbHTi6Op84gTXYyTbjXSnfjWkkoYXevcHAW5+z6lbqbkDcqP6ysuq4CLJO/YSGAN0F/GGTM7zINgoPes58tcJjoFRZPnqdh3HY/VsoqF+eIJmxNenVfxKCHjV; _rdt_uuid=1746536577208.8c966b7c-b774-497a-8a25-fcfbc66dda3f; ttcsid=1746542257776::pzKZzm4DcgxZcBwuBQHm.2.1746542953991; ttcsid_CVCAA6RC77U60E3J76R0=1746542257774::4Unxf_9ToxGSF2ccAeop.2.1746542954233; tmr_detect=0%7C1746542955554"

const BASE_URL = "https://boinkers.io/api/play/spinSlotMachine/";
const QUERY_PARAMS = "?p=unknown&v=-1438545913";
// 1767238641
// 1438545913

// Betting stages
const BETTING_STAGES = [
  { amount: 1, maxAttempts: 7 },
  { amount: 500, maxAttempts: 12 },
  { amount: 1000, maxAttempts: 12 },
  { amount: 5000, maxAttempts: 14 },
  { amount: 10000, maxAttempts: 14 },
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
