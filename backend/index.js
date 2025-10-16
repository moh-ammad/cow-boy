import express from "express";
import dotenv from "dotenv";
import axios from "axios"; // 1. Added axios for token exchange
import ConnectToDb from "./connection/db.js";
import rvmRoutes from "./routes/payload.js";
import mauticRoutes from "./routes/mautic.js";

dotenv.config(
  {
    path: './.env'
  }
);

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
ConnectToDb();

// --- MAUTIC CONFIGURATION ---
// 🚨 Ensure these are defined in your .env file:
const CLIENT_ID = process.env.MAUTIC_CLIENT_ID;
const CLIENT_SECRET = process.env.MAUTIC_CLIENT_SECRET;
const MAUTIC_BASE_URL = process.env.MAUTIC_BASE_URL;
const REDIRECT_URI = process.env.MAUTIC_REDIRECT_URI;
const TOKEN_URL = `${MAUTIC_BASE_URL}/oauth/v2/token`;
// ----------------------------

app.get("/", (req, res) => {
    res.send("Hello World! Server is running and ready for Mautic integration.");
});

// 1. Endpoint to START the OAuth flow
app.get('/auth', (req, res) => {
    if (!CLIENT_ID || !MAUTIC_BASE_URL || !REDIRECT_URI) {
        return res.status(500).send("Error: Mautic credentials are not configured in .env.");
    }

    const authorizationUrl = `${MAUTIC_BASE_URL}/oauth/v2/authorize?` + 
        `response_type=code` + 
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}`
    
    console.log("Redirecting user to:", authorizationUrl);
    res.redirect(authorizationUrl);
});


// 2. Callback Endpoint - Exchanges the code for the access token
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state; 
    
    if (!code) {
        // If 'code' is missing, it usually means Mautic returned an error
        return res.status(400).send(`
            <h1 style="font-family: sans-serif; color: red;">❌ Authorization Failed</h1>
            <p style="font-family: sans-serif;">Error: Authorization code not received. Check if Mautic returned an error: ${req.query.error_description || 'Unknown error.'}</p>
        `);
    }

    console.log("Received OAuth2 code:", code);
    
    try {
        const response = await axios.post(
            TOKEN_URL,
            new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: code
            }),
            {
                // Mandatory header for the token exchange
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const tokenData = response.data;
        
        console.log("Successfully received token data:", tokenData);

        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;

        // 3. TODO: Securely store the Access Token and Refresh Token (e.g., in your database connected via ConnectToDb())
        
        res.send(`
            <h1 style="font-family: sans-serif;">✅ Authorization Success!</h1>
            <p style="font-family: sans-serif;">Your Access Token: <strong style="color: green;">${accessToken}</strong></p>
            <p style="font-family: sans-serif;">Your Refresh Token: <strong style="color: blue;">${refreshToken}</strong></p>
            <p style="font-family: sans-serif;">You can now use the Access Token to make API calls to Mautic.</p>
        `);
        
    } catch (error) {
        console.error("Error exchanging code for token:", error.response ? error.response.data : error.message);
        res.status(500).send(`
            <h1 style="font-family: sans-serif; color: red;">❌ Token Exchange Error</h1>
            <p style="font-family: sans-serif;">Check server logs for details on why the code could not be exchanged.</p>
        `);
    }
});


app.use("/api/rvm", rvmRoutes);
app.use('/api/mautic', mauticRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('----------------------------------------------------');
    console.log(`Start the Mautic OAuth flow by visiting: http://localhost:${port}/auth`);
});
