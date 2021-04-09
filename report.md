# Project Overview

Team: Rohit Pathak, Samedh Gupta, Hannah Weiss, Angela Hu
URL of deployed app: https://gitchat.samedh.site
URL of Github Repo: https://github.com/SamedhG/gitchat

We were able to successfully deploy our app. 
Each team member's contributions are outlined below.

Rohit


Samedh


Hannah
- Worked with the Github API to do user authentication and other requests
- Worked on the frontend workflow and UI design
- Home page and the user page

Angela


## App Description

Our app is called GitChat, and it integrates with the Github API to
provide users a platform to talk with other Github users about
different repos. The goal of this app is to create better channels
of communication for people working on the same code, something that
is especially important duing Covid-19. GitChat uses the WebRTC 
and PeerJS libraries that allow users to make voice calls with other 
people on the app. 

Since we wrote our proposal, we have had to scale down some of our
ideas in order to make the project more feasible to complete in the
time that we had. The main thing that changed was how
non-collaborators interat with calls on the platform. In the
proposal we described a queue system where somone who is not a
collaborator for a repo can join a call for that repo, and then join a
talking queue if they want to say something during the call. However,
we found that this was very difficult to implement. The call system is
now implemented so that collaborators can join and speak during a
call, and non collaborators can join a call but only to listen. A
user's collaborator status for a given repo is received from the
Github API. Our proposal also included an idea of flagging users who
were known to be trolls or create a negative experience on the app, 
which we did not end up implementing.

Users can interact with the application in a web browser. They can 
sign in using a pre-existing GitHub account and get redirected to a 
page showing a list of their repositories. Within each repository of 
which the user is a collaborator, they have the option to click a 
button to start a voice call within that repository. Other collaborators 
as well as non-collaborating users can join the call, but 
non-collaborators do not have the option to start calls or to speak 
during a call. The audio call gives the ability for collaborators to 
discuss the project in one place at the same time without having to 
respond individually to issues. It also gives non-collaborators to 
listen to the collaborators and their design process, approach to 
bug-fixes, future directions, etc.

This project contianed more features than the other apps that we have
worked on during this class. With implementing the voice calls, Github
authorization, and friend feature, we combined what we learned in
class with new concepts we learned during the development of this app
over the past few weeks. Our app contains both a server built with
Elixir and Phoenix and a client built with React. Our server exposes
a JSON API that the client uses to get information about users, calls,
and history. The React app is a SPA that uses React-Router to simulate
different web pages. Gitchat implements secure login through Github,
and uses the Github authorization process to make authenticated
requests to the Github API for user and repository information.  

In order to store information about users and their history on
Gitchat, we created a Postgres database that stores users, their
friends, their starred repositories, and their call history. The
history allows users to quickly access the repos they have joined a
call on recently to jump on a call again with other collaborators. The
friends feature is integrated throughout Gitchat so that users can
have an insightful view of what their friends and colleages are
working on. 

The neat feature that we chose to implement was the voice call
feature. When a user logs onto Gitchat, they can click on any of their
or their friends' repositories and join a voice call with other people
working on that repo or interested in hearing about it. We used
phoenix channels to implement this realtime functionality of joining a
voice call. 

The most complex feature that we implemented was the live call
feature. **FILL IN HERE**

**SIGNIFICANT CHALLENGE** 




