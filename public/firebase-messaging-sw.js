self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// 알림 보기
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;

  const notificationOptions = {
    body: resultData.body,
  };

  console.log(resultData.title, {
    body: resultData.body,
  });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 눌렀을 때 이동
self.addEventListener("notificationclick", function (event) {
  const url = "http://localhost:5500/calendar";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});