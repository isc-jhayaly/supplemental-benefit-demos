import axios from "axios";

export default async function handler(req, res) {
  const { firstname, lastname } = req.query;

  if (!firstname || !lastname) {
    return res.status(400).json({ error: "firstname and lastname are required" });
  }

  try {
    const response = await axios.get(`${process.env.HEALTHSHARE_BASE}/getPatientData`, {
      params: { firstname, lastname },
      auth: {
        username: process.env.HEALTHSHARE_USERNAME,
        password: process.env.HEALTHSHARE_PASSWORD,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(502).json({ error: "Failed to fetch patient data from HealthShare" });
  }
}
