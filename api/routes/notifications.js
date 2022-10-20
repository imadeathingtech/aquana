const express = require("express");
const router = express.Router();
const webpush = require("web-push");
const connection = require("../db");

const vapidKeys = {
  publicKey:
    "BBFBMBc5GPKjW55rqabZLsfW4YYXBUCCdkt-1BbdH_2NKo7lBvTSIsUdpu_NIhoSly69jZDR1DI1xMOEL6xy2Ww",
  privateKey: "YeSrmx3CXRxIpqHIGfBvKu4yGKfOqZv1CuDA6JX0oRM",
};

webpush.setVapidDetails(
  "mailto:imadeathing.tech@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

router.post("/notifications/subscribe", (request, response) => {
  const sub = request.body;
  const sql = `INSERT INTO subscribers (endpoint,expirationTime,p256dh,auth) VALUES('${sub.endpoint}', '${sub.expirationTime}', '${sub.keys.p256dh}','${sub.keys.auth}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      response
        .status(500)
        .send({ message: "Could not subscribe to notifications" });
    }
    response.json(result);
  });
});

router.post("/notifications/send", (request, response) => {
  const plant = request.body;

  const notificationPayload = {
    notification: {
      title: `Plant ${plant.name} needs water`,
      body: "Please give it water/love",
      icon: "/public/assets/logo.svg",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: "Plant watered",
          title: "I did it",
        },
      ],
    },
  };

  const sql = `SELECT * FROM subscribers`;
  connection.query(sql, (error, result) => {
    if (error) {
      response.status(500).send({ message: "No subscribers found" });
    }
    if (result.length) {
      Promise.all(
        result.map((sub) => {
          const subscriber = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          };
          console.log("subscriber", subscriber);
          webpush.sendNotification(
            subscriber,
            JSON.stringify(notificationPayload)
          );
        })
      )
        .then(() =>
          response
            .status(200)
            .json({ message: "Newsletter sent successfully." })
        )
        .catch((err) => {
          console.error("Error sending notification, reason: ", err);
          response.sendStatus(500);
        });
    } else {
      response.json([]);
    }
  });
});

module.exports = router;
