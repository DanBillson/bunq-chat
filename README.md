# Bunq Chat

A minimal chat application built with Next JS using the Bunq Chat API

![image](https://user-images.githubusercontent.com/8721267/137088665-34f117f5-b51e-45e6-8671-49975b09d194.png)

---

For usage locally:

Note: This requires a bunq test api token to work

```
git clone git@github.com:DanBillson/bunq-chat.git
cd bunq-chat
yarn install
yarn dev
```

---

### Tech choices

For this project I used NextJS, typescript, styled-components and React Query.

Using this stack allows me to take advantage of server side rendering and making API calls on the server rather than having to wait for the client to load and execute, I gain more confidence with type safety using typescript making my code less prone to bugs and React Query allows me to handle all of my server cache without having to store data coming from an API anywhere when it is not necessary.

---

### Notes about the project

For a typical chat app it is best to use web sockets for real time chat updates, one alternative to this is to use polling which will just request to recieve data in set intervals. (For the sake of not spamming the Bunq API I have not done this) So this app does not offer real time updates.
