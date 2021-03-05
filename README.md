# QR_lost_and_found
A QR code based lost and found service.
```sequence
Browser->Firebase: https://test.com/?id=sd78fy
Note right of Browser: id is "sd78fy"
Firebase->Google Apps Script: Invoke API
Note right of Google Apps Script: MailApp.sendEmail()
Google Apps Script->Owner of item: send email
```
- Services we will use
    - Google Firebase
        - https://stackoverflow.com/questions/58934596/how-to-send-email-in-firebase-for-free
    - Google Apps Script