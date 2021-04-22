# v-chat-web
A Web/VueJS chat client that uses the [v-chat-server](https://github.com/gryp17/v-chat-server) API. This application is a web port of the desktop application [v-chat-client](https://github.com/gryp17/v-chat-client).


It has the following features:
* The client has the ability to work with any self hosted vChat server (workspace)
* User signup/login
* Personalizable user profile (avatar, description, username...)
* Personalizable user settings (show new message notifications, show online status notifications...)
* Private and global channels/conversations
* The ability to mute conversations
* Emoticons
* File messages with image preview

## Project setup
```
npm install
```

## Configure the API/server URL in
> [/src/config.js](https://github.com/gryp17/v-chat-web/blob/main/src/config.js)

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

