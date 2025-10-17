class NotificationService {
  constructor(notification) {
    this.notification = notification;
  }
  sendNotification(message) {
    this.notification.send(message);
  }
}
class EmailNotification {
  send(message) {
    console.log("Email Notification sent: " + message);
  }
}
class SMSNotification {
  send(message) {
    console.log("SMS Notification sent: " + message);
  }
}
class PushNotification {
  send(message) {
    console.log("Push Notification sent: " + message);
  }
}
let emailService = new NotificationService(new EmailNotification());
emailService.sendNotification("Hello via Email!");

let smsService = new NotificationService(new SMSNotification());
smsService.sendNotification("Hello via SMS!");

let pushService = new NotificationService(new PushNotification());
pushService.sendNotification("Hello via Push Notification!");
