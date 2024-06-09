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
  console.log('모가문제니~~~')
});

// 알림 눌렀을 때 이동
self.addEventListener("notificationclick", function (event) {
  const url = "http://localhost:5502/performanceChart";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});

onMessage(messaging, (payload) => {
  console.log(payload)
  // if('serviceWorker' in navigator) {
  //   navigator.serviceWorker
  //   .register("firebase-messaging-sw.js")
  //   .then(function (registration) {
  //     console.log("Service Worker 등록 성공:", registration);
  //     registration.showNotification(payload.data.title, {
  //       body: payload.data.body,
  //       data: payload.data.link
  //     })
  //   })
  //   .catch(function (error) {
  //     console.log("Service Worker 등록 실패:", error);
  //   });
  // }
})

onBackgroundMessage(messaging, (payload) => {
  console.log(payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
})