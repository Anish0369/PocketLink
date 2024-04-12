import express from "express";
import db from "@repo/db/client";

const app = express();

app.get("/hdfcWebhook", async (req, res) => {
  // to add zod val
  // create webhook secret hee
  const paymentInfo = {
    token: req.body.token,
    amount: req.body.amount,
    // currency: req.body.currency,
    userID: req.body.userId_identifier,
  };

  await db.balance.update({
    where: {
      userId: paymentInfo.userID,
    },
    data: {
      amount: {
        increment: paymentInfo.amount,
      },
    },
  });

  await db.onRampTransaction.update({
    where: {
      token: paymentInfo.token,
    },
    data: {
      status: "Success",
    },
  });

  res.json({ message: "Captred" });
});
