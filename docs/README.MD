<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">GitGirl</h1>

  <p align="center">
    GitGirl is a job board intended to support and promote women and femme presenting individuals searching for jobs in the Tech sector.
    <br />
</div>


##

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#team">Team</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#target-market">Target Market</a></li>
    <li><a href="#design">Design</a></li>
    <li><a href="#project-initialization">Project Initialization</a></li>
    <li><a href="#functionality">Functionality</a></li>
    <li><a href="#testing">Testing</a></li>
  </ol>
</details>


## Team
- Stephany Mesa
- Taylor Shockley
- Alyson Golden
- Lauren Smith
- Glenn Padilla

## Built With
* [![Bootstrap][Bootstrap-shield]][Bootstrap-url]
* [![React][React-shield]][React-url]
* [![FastAPI][FastAPI-shield]][FastAPI-url]
* [![Docker][Docker-shield]][Docker-url]

[Bootstrap-shield]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[React-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[FastAPI-shield]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[Docker-shield]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white

[Bootstrap-url]: https://getbootstrap.com
[React-url]: https://reactjs.org/
[FastAPI-url]: https://fastapi.tiangolo.com/
[Docker-url]: https://www.docker.com


## Target Market 
GitGirl is a job board intended to support and promote women and femme presenting individuals searching for jobs in the Tech sector.  

## Design
- [Model Data](https://gitlab.com/adas-allies/gitgirl/-/blob/65-read/docs/data-model.md)
- [Wireframe](https://gitlab.com/adas-allies/gitgirl/-/blob/65-read/docs/wireframe.md)
- FastAPI documentation can be found once project initialized by using URL: [http://localhost:8000/docs#/](http://localhost:8000/docs#/)


## Project Initialization

To fully enjoy the GitGirl application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create database_volume`
4. Run `docker volume create pg-admin`
5. Run `docker compose build`
6. Run `docker compose up`


## Functionality
**Home Page**
- Visitors can browse the Home page to learn more about the GitGirl mission 
- Sign Up to become a GitGirl 
- Sign into Git Girl account 

**Sign Up Page**
- Visitors can Sign Up to become a GitGirl by creating a profile  

**Sign In Page**
- Returning users can sign into their existing accounts

**Jobs Page**
- Authenticated users can view jobs that have been posted by other users 
- Authenticated users can view full job details 
- Authenticated users can apply to job postings 

**Profile Page**
- Authenticated users can view & update their associated email and/or LinkedIn URL 
- Authenticated users can view all the jobs they have applied to.
- Authenticated users can view the job detail page for the jobs they have applied to. 
- Authenticated users can delete an application 
- Authenticated users can view all the jobs they have posted.
- Authenticated users can view the job detail for the posted job.
- Authenticated users can delete the job posting.


## Testing

### How to Run Unit Tests

1. Ensure all dependencies are installed.
2. Navigate to the project directory.
3. Run the following command to execute the tests:

```sh
pytest
