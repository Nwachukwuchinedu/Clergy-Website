import Newsletter from "../models/Newsletter.js";
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscription = new Newsletter({ email });
    await subscription.save();

    res.json({ message: "Thank you for subscribing!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};