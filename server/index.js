import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
const HEALTHSHARE_BASE = process.env.HEALTHSHARE_BASE;
const HEALTHSHARE_AUTH = {
  username: process.env.HEALTHSHARE_USERNAME,
  password: process.env.HEALTHSHARE_PASSWORD,
};

app.use(cors());
app.use(express.json());

// GET /api/patient?firstname=Ray&lastname=Chan
app.get("/api/patient", async (req, res) => {
  const { firstname, lastname } = req.query;

  if (!firstname || !lastname) {
    return res.status(400).json({ error: "firstname and lastname are required" });
  }

  try {
    const response = await axios.get(`${HEALTHSHARE_BASE}/getPatientData`, {
      params: { firstname, lastname },
      auth: HEALTHSHARE_AUTH,
    });
    res.json(response.data);
  } catch (err) {
    console.error("HealthShare request failed:", err.message);
    res.status(502).json({ error: "Failed to fetch patient data from HealthShare" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
