This project is owned by jTronix Development 2018.

Owner : Ryan Johnson
Partner : Oliver Asker

Preface

  Installation
    Create a local repository with the repository we are working with.
      Using Github Desktop
        - Create a branch following the naming convention specified bellow.
        - Check out branch
        - Work on branch
        - Create Pull request
        - Repeat for each ticket.
          ** Make sure the branch is up todate **
      Once the repository is local
        - Navigate to the repository run the following command
          - npm install
          This will install all the dependencies that are needed for the project.
      If Errors Occour after code has been meregeed run this command and it will resolve the issue.

  Conventions
    Throughout the process of creating this project the following conventions will be followed.
      Change Management
        - Each Branch will be named after the type of change ( CMRSS or CMRCS ) followed by the issue number
      Socket IO Client and Server
        - for all Socket io events the name should be Camel Case
        - Each will consist of a request and response structure
          - i.e..
            - Client ) sendUserNameReq
            - Server ) sendUserNameRes
        - This will be to keep the convention easy to follow.
      JavaScript Files
        - Client and server side will have camel case variable sendUserNameRes
        - Try to keep the functions consistant
          - i.e. ()=>{} or function(){}
      CSS and HTML
        - All CSS files will be structure the same.
          - In oreder to have zero conflicts Preface all css selectors should be specif to that component
            - i.e.
              - componentName-x-x
              - componentNameXX

BackEnd
  - Express
  - Node Js
  - Babel
  - Webpack

Front End
  - React JS
  - Socket.io
  - SCCS/CSS

Hosted Services
  - TVOS
  - Google Chrome Cast
  - Roku

Time Lines, Milestones, and Releases

Objective














Conclusion
