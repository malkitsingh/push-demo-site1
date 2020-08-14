const PUSH_SOCK_APP_ID = "5f3676d3978aae094d93f924";
const PUSH_SOCK_APP_KEY =
  "BP7hPEzgV4ilFJ0oi1J4KxsqM6KNZ0x3dIYLIPPVKYz7wT3oFCnby9-s3GN4UZKWFIo12dop1_SAwu0fXP2znQM";

const PUSH_SOCK_APP_URL = "https://pushsocketbe.herokuapp.com";

const convertedVapidKey = urlBase64ToUint8Array(PUSH_SOCK_APP_KEY);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription) {
  return fetch(`${PUSH_SOCK_APP_URL}/api/app/${PUSH_SOCK_APP_ID}/subscribe`, {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function subscribeUser() {
  console.log("came in here");

  //   if ("serviceWorker" in navigator) {
  //     console.log('came in here 2');
  //     navigator.serviceWorker.ready
  //       .then(function (registration) {
  //         console.log('came in here 3');
  //         if (!registration.pushManager) {
  //           console.log("Push manager unavailable.");
  //           return;
  //         }

  //         registration.pushManager
  //           .getSubscription()
  //           .then(function (existedSubscription) {
  //             if (existedSubscription === null) {
  //               console.log("No subscription detected, make a request.");
  //               registration.pushManager
  //                 .subscribe({
  //                   applicationServerKey: convertedVapidKey,
  //                   userVisibleOnly: true,
  //                 })
  //                 .then(function (newSubscription) {
  //                   console.log("New subscription added.");
  //                   sendSubscription(newSubscription);
  //                 })
  //                 .catch(function (e) {
  //                   if (Notification.permission !== "granted") {
  //                     console.log("Permission was not granted.");
  //                   } else {
  //                     console.error(
  //                       "An error ocurred during the subscription process.",
  //                       e
  //                     );
  //                   }
  //                 });
  //             } else {
  //               console.log("Existed subscription detected.");
  //               sendSubscription(existedSubscription);
  //             }
  //           });
  //       })
  //       .catch(function (e) {
  //         console.error(
  //           "An error ocurred during Service Worker registration.",
  //           e
  //         );
  //       });
  //   }
  //   else{
  //       console.log('came in else');

  //   }
}

if ("serviceWorker" in navigator) {
  console.log("Registering service worker");

  run().catch((error) => console.error(error));
}

async function run() {
  console.log("Registering service worker");
  const registration = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });
  console.log("Registered service worker");

  console.log("Registering push");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Registered push");

  console.log("Sending push");
  sendSubscription(subscription)
//   await fetch("/subscribe", {
//     method: "POST",
//     body: JSON.stringify(subscription),
//     headers: {
//       "content-type": "application/json",
//     },
//   });
  console.log("Sent subscription");
}
