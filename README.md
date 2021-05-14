# QR_lost_and_found
A QR code based lost and found service
## Finder to Owner
```plantuml
participant Finder as finder
participant Browser as browser
participant "Firebase RTDB" as db
participant "Google Apps Script" as gas
participant Owner as owner

note over finder, browser: "https://test.com/?userid=uid1\n&itemid=iid2&finderid=fid1"
finder->browser:userId="uid1"\nitemId="iid2"\nfinderId="fid1"
alt 
browser->db:VALID? (userId, itemId)
else FALSE
finder<-browser:ALERT(error); EXIT
end
alt
browser->db:VALID? (finderId)
else TRUE
note over browser, db:finder has visited before
browser<->db:GET (messages)
else FALSE
note over browser, db:new finder
browser->db:NEW (finder)
browser<-db:finderId
end
note right of finder:foundLocation\ncurrentLocation\ntext
finder->browser:MESSAGE()
note right of browser:foundLocation\ncurrentLocation\ntext\nfinderId
browser->db:PUSH(message)
db->gas: Invoke API
note right of gas: MailApp.sendEmail()
gas->owner: send email
db<-gas: success/fail
browser<-db: success/fail
```
## Owner
```plantuml
participant Owner as owner
participant Browser as browser
participant "Firebase Auth" as auth
participant "Firebase RTDB" as db

owner->browser:access
alt
browser->auth:NEW? (user)
else TRUE
note over browser,auth: create user
browser->auth:PUSH (user)
note right of browser: "notifyAtLinkOpen:false,\nnotifyNotLostItem:true,\nwhereToNotify:email"
browser->db:initUserPreferences() 
else FALSE
browser->auth: LOGIN
end
browser<-db: GET (data)
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
- [ ] create site
    - [ ] html for user registeration
    - [ ] html for item registeration and QR printing
    - [ ] html for item found
- [ ] firebase
    - [x] setting user auth
    - [x] create user database
    - [ ] merge site to firebase
- [ ] GAS
    - [ ] create spreadsheet
    - [ ] create API function for mailApp

## implementation details
## form submit
The input data should be stored in an object.
[reference](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server#7-create-your-basic-html-form)
#### 1. user registeration
- authentication is done by Firebase's internal function
- form inputs
    - user name
    - email address (for notification)
#### 2. item registeration
- form inputs
    - item name
- generate QR code for URL of item
#### 3. item found
- form inputs
    - found location
    - current location of item
    - message to owner
## database
### use case
#### 1. user registeration
- create a entry in users
#### 2. item registeration
- create a entry in items
#### 3. item found
- get entry of user
    - email
    - perferences
- get entry of item
    - lost
- update entry of item
    - found location
    - current location
    - message
#### 4. reviewing messages
- get entry of user
    - message
#### 5. reviewing items
- get entry of user
    - items
#### 6. reviewing preferences
- get entries of user
    - name
    - email
    - preferences
### structure
#### rules
1. must be shallow
2. query is fast
3. create snippets
#### structure
- users:
    - userId1:
        - name: arch
        - email: arch_gmail.com
        - preferences: 
            - notifyAtLinkOpen: true
            - notifyNotLostItem: true
            - whereToNotify: email
- items: 
    - userId1:
        - itemId1:
            - name: watch
            - lost: true
            - foundLocation: bus station
            - currentLocation: police station
- messages:
    - userId1:
        - messageId1: 
            - itemId: itemId1
            - sender: finder
            - text: Hey I found this watch
        - messageId2: 
            - item: itemId1
            - sender: owner
            - text: Please give it to the police
```json
{
users:{
    userId1:{
        name: arch,
        email: arch_gmail.com,
        preferences: {
            notifyAtLinkOpen: true,
            notifyNotLostItem: true,
            whereToNotify: email,
        },
    },
},
items: {
    userId1:{
        itemId1:{
            name: watch,
            lost: true,
            foundLocation: bus station,
            currentLocation: police station,
        },
    },
},
messages:{
    userId1:{
        messageId1: {
            item: itemId1,
            sender: finder,
            text: Hey I found this watch
        },
        messageId2: {
            item: itemId1,
            sender: owner,
            text: Please give it to the police
        },
    },
},
}
```

### installation of firebase emulator
```bash
sudo apt install default-jre // install java
cd {project_base} // go to project base
curl -sL https://firebase.tools | bash // install firebase
firebase login
firebase init emulators
firebase emulators:start
```
>>>>>>> readme/main
