<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Session Tracker" />

  &#xa0;

  <!-- <a href="https://techcorp.netlify.app">Demo</a> -->
</div>

<h1 align="center">Session Tracker</h1>
<h3 align="center">[ internship project ]</h3>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/theoneandonlyshadow/Warden-Logger?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/theoneandonlyshadow/Warden-Logger?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/theoneandonlyshadow/Warden-Logger?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/theoneandonlyshadow/Warden-Logger?color=56BEB8">

  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/{{YOUR_GITHUB_USERNAME}}/techcorp?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/{{YOUR_GITHUB_USERNAME}}/techcorp?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/{{YOUR_GITHUB_USERNAME}}/techcorp?color=56BEB8" /> -->
</p>

<!-- Status -->

<!-- <h4 align="center"> 
	  Session Tracker 
</h4> 

<hr> -->

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/theoneandonlyshadow/" target="_blank">Author</a>
</p>

<br>

## :dart: About ##

1. Warden A enters his University ID number and password and gets a unique token (UUID) back which is used in authentication in all further APIs for this user - sent as bearer token in the headers.
2. Warden A sees a list of free sessions available with Warden B (HOST). Each Warden B slot is 1 hr long and a warden is only available on Thur and Fri 10 AM every week.
3. Warden A picks one of the above slots and books.
4. Warden B logins in with his university ID and password (similar to the Warden A above) and get his token generated.
5. Warden B sees a list of all pending sessions - warden name, and slot details. Currently only A is booked for the session.
6. Warden C logs in, gets a list of free slots and books a session.
7. Warden B logs in back and sees a list of his pending sessions. Both A and C are visible.
8. Warden B logs in back after completing the session booked by A and now he can see only C in the list.
9. Manually mark the session as 'completed' under `status` column in `sessions` table.
   Use command: `UPDATE sessions SET status = 'complete' WHERE session_id = 6;`
   table name: `sessions`
   column name: `status`


## :sparkles: Features ##

:heavy_check_mark: Error handling\
:heavy_check_mark: Clean and well structured database\
:heavy_check_mark: Integration with Docker and PostgreSQL

## :rocket: Required Technologies ##

The following tools are required
- [Node.js](https://nodejs.org/en/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/download/)
- [Postman](https://www.postman.com/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/theoneandonlyshadow/Session-Tracker/

# Access
$ cd session-tracker

# Install dependencies
$ npm i

# Run the project
$ nodemon index

# The server will initialize in the <http://localhost:8069/>
```
```wsl

# WSL

# Connect PostgreSQL
psql -U postgres -h localhost

```

```bash
# initate connection to docker
docker compose up

```

## :memo: License ##

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.


Made with 3AM efforts by <a href="https://github.com/theoneandonlyshadow" target="_blank">Madhav Nair</a>

&#xa0;

<a href="#top">Back to top</a>
