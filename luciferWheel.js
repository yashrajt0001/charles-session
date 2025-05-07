const axios = require('axios');

// secondary
const AUTH_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2ODE5ZjA5MzY0ZDU0M2M4ZjEyMmQwMzAiLCJlbWFpbCI6ImJvaW5rZXJfNzQ2NTM5MV80NTE2MjhAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJib2lua2VyXzc0NjUzOTEiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImEiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDY1MzgyNjM3NTAsInN1YiI6IjY4MTlmMDkzNjRkNTQzYzhmMTIyZDAzMCIsImlhdCI6MTc0NjUzODI2MCwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc0NzE0MzA2MH0.ld91iLLEIgTVLlwVRsfQJ_IxvlxsqtBUz5jAwPJkaZQZUABVrIEDr8bESIAtqqqKF7m3xxSH3QvD-13LzgkCrA";
const LIVE_OP_ID = "681b1d7a59c2d4273c3cf7ef";

const BASE_URL = "https://boinkers.io/api/play/spinWheelOfFortune/";
const QUERY_PARAMS = "?p=unknown&v=-202426036";
const BET_AMOUNT = 100;

const API_URL = `${BASE_URL}${BET_AMOUNT}${QUERY_PARAMS}`;
let requestCount = 0;
const MAX_REQUESTS = 1000;

async function sendRequest() {
    if (requestCount >= MAX_REQUESTS) {
        console.log("Completed 100 requests. Stopping.");
        return;
    }
    
    try {
        const response = await axios.post(API_URL,
            { liveOpId: LIVE_OP_ID },
            {
                headers: { Authorization: `${AUTH_TOKEN}` }
            }
        );

        requestCount++;
        console.log(`Request ${requestCount}/${MAX_REQUESTS} completed with ${response.status}`);
        
        setTimeout(sendRequest, 400);

    } catch (error) {
        console.error(`Error on request ${requestCount + 1}: ${error.message}`);
        requestCount++;
        // Continue with next request even after error
        return
    }
}

// Start sending requests
console.log("Starting to send 100 requests, one every 400ms");
sendRequest();