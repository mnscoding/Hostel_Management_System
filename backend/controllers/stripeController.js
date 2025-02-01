// controllers/stripeController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use your secret key

// Function to create a payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // The amount for payment (in cents)

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // You can change the currency if needed
    });

    // Respond with the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

module.exports = {
  createPaymentIntent,
};
