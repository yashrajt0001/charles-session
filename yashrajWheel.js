const axios = require('axios');
// yashraj
const AUTH_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImpFdDlIMXZMaUg3SFFyb21KYVBUeVQyejI2a0tlU3liRW1jeFFOTEVDZzZzUW02OExOSkZ0OHU1U1FTSGk2bm4ifQ.eyJfaWQiOiI2Nzg4Nzk4YzRmMjhhYjFhYzdiYTAwODkiLCJlbWFpbCI6Inlhc2hyYWowMDAwMV8yNjA5ODlAZ2VuLmFzdHJvbm9taWNhLmlvIiwidXNlck5hbWUiOiJ5YXNocmFqMDAwMDEiLCJ1c2VyVHlwZSI6MSwiYWJDbGFzcyI6ImEiLCJzY2hlbWFWZXJzaW9uIjoyMTM4ODQ3NzQ4LCJsYXN0VXBkYXRlZFRpbWUiOjE3NDYzNjczNjE3NzAsInN1YiI6IjY3ODg3OThjNGYyOGFiMWFjN2JhMDA4OSIsImlhdCI6MTc0NjM2NzM1OCwiaXNzIjoidXJuOmFzdHJvbm9taWNhIiwiYXVkIjoidXJuOmJvaW5rZXJzLWp3dC1hdWRpZW5jZSIsImV4cCI6MTc0Njk3MjE1OH0.bJO8vsX4EVT80MwhbgvLB41axb4LGKwHiGn0fYRyE7Ij8GP6YlWhLR_ZC4DrVY_MS2ZlN1eTOB1AA5fjMzPNhQ";
const LIVE_OP_ID = "681b1d7a59c2d4273c3cf7ef";

const BASE_URL = "https://boinkers.io/api/play/spinWheelOfFortune/";
const QUERY_PARAMS = "?p=unknown&v=-202426036";
const BET_AMOUNT = 5000;

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