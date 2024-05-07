## #AdaAllies Team
- Stephany Mesa
- Taylor Shockley
- Alyson Golden
- Lauren Smith 
- Glen Padilla 
- Lauren Smith
- Glenn Padilla

## Target Market 
GitGirl is a job board intended to support and promote women and femme presenting individuals searching for jobs in the Tech sector.  
## Design
- [Model Data](https://gitlab.com/adas-allies/gitgirl/-/blob/44-read-me-journal/docs/data-model.md?ref_type=heads)
- [Wireframe](https://gitlab.com/adas-allies/gitgirl/-/blob/44-read-me-journal/docs/wireframe.md?ref_type=heads)
- FastApi documentation can be found once project initlized by using URL: http://localhost:8000/docs#/

## Target Market
GitGirl is a job board intended to support and promote women and femme presenting individuals searching for jobs in the Tech sector.

**Home Page**
- Visitors can browse the Home page to learn more about the GitGirl mission 
- Sign Up to become a GitGirl 
- Sign into Git Girl account 
- Visitors can browse the Home page to learn more about the GitGirl mission
- Sign Up to become a GitGirl
- Sign into Git Girl account

**Sign Up Page**
- Vistors can Sign Up to become a GitGirl by creating a profile  
- Vistors can Sign Up to become a GitGirl by creating a profile

**Sign In Page**
- Returning users can sign into their existing accounts

**Jobs Page**
- Authenticated users can view jobs that have been posted by other users 
- Authenticated users can view full job details 
- Authenticated users can apply to job postings 
- Authenticated users can view jobs that have been posted by other users
- Authenticated users can view full job details
- Authenticated users can apply to job postings

**Profile Page**
- Authenticated users can view & update their associated email and/or linkedin url 
- Authenticated users can view & update their associated email and/or linkedin url
- Authenticated users can view all the jobs they have applied to.
- Authenticated users can view the job detail page for the jobs they have applied to. 
- Authenticated users can delete an application 
- Authenticated users can view the job detail page for the jobs they have applied to.
- Authenticated users can delete an application
- Authenticated users can view all the jobs they have posted.
- Authenticated users can view the job detail for the posted job.
- Authenticated users can delete the job posting.

## Project Initialization

To fully enjoy the GitGirl application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create database_volume
4. Run docker volume create pg-admin
5. Run docker compose build
6. Run docker compose up