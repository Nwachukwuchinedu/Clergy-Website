import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    res.json({ message: "Your message has been sent successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
