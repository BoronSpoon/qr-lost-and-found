# QR_lost_and_found
A QR code based lost and found service.
```sequence
Note right of Browser: id is "sd78fy"
Browser->Firebase: https://test.com/?id=sd78fy
Note right of Firebase: accept user input message 
Note right of Firebase: get email of client "sd78fy" 
Firebase->Google Apps Script: Invoke API
Note right of Google Apps Script: MailApp.sendEmail()
Google Apps Script->Owner of item: send email
Google Apps Script->Browser: success/fail
```
## Services we will use
### Google Firebase
https://firebase.google.com/
- used to
    - host the website
    - store and get credentials
- host the website
    - used by the owner
        - registeration
        - QR creater
    - used by the founder
        - lost and found site
- store and get credientials
    - set email, item name for id
    - get email, item name from id
### Google Apps Script
https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
- used to
    - send email
- send email
    - send address
        - {email address}
    - subject
        - lost and found [{name}]
    - body
        - your lost item {name} has been found
        - the message from the finder is as follows
        - {message}

### Todo
- [ ] github
    - [ ] create github account
    - [ ] add as collaborator
- [ ] create site
    - [ ] html for user registeration
    - [ ] html for item registeration and QR printing
    - [ ] html for item found
- [ ] firebase
    - [ ] create user database
    - [ ] merge site to firebase
- [ ] GAS
    - [ ] create spreadsheet
    - [ ] create API function for mailApp

## implementation details
> maybe you can do this part relatively easily
## form submit
The input data should be stored in an object.
[reference](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server#7-create-your-basic-html-form)
#### 1. registeration
- ~~authentication is done by Firebase's internal function~~
- form inputs
    - email address (for notification)
#### 2. item registeration
- form inputs
    - item name
- ~~generate QR code for URL of item~~
#### 3. item found
- form inputs
    - found location
    - current location of item
    - message to owner