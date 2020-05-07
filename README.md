# Recruit Me - A Full-Service Labour Recruitment System
### *Helping companies find skilled labourers and skilled tradespeople find work*

British Columbia Institute of Technology Industry Project by Anna Berman, Denis Maltev, Gina Carpenter, Sara Banaeirad, and Tasnuva Haque.

Recruit Me is a web application that allows companies to post construction jobs and be assigned skilled tradespeople searching for work. When a company posts a new job, labourers with the highest quality ratings are automatically assigned to the job. Labourers can create a profile outlining their skills and availability. Each day a labourer completes a job, they are given a quality and safety rating based on their quality of work and safety and as such, they are incentivized to continue upholding the highest quality work and safety standards to continue receiving the best jobs. Receiving a rating as a labourer is how they get paid. Labourers can also rate companies for jobs they've completed. A recruiter is has full administrative access to add and update skills and their charge and payout rates, view and manage payroll, invoicing, ratings, and company and labourer info. Recruiters take a commission based on each skill utilized. Recruiters can see at a glance their profit, income, and expenses on their dashboard. 

## Recruiter Accounts:
### Dashboard

## Company Accounts:

## Labourer Accounts:

## ERD
![image](https://user-images.githubusercontent.com/55157299/80181628-0e62f900-85ba-11ea-8965-e679499dd5a2.png)

## Wireframe:
https://marvelapp.com/a17756b

## Must Haves
- Client application form
- Client admin section to:
- Add jobs
- Request labourers by skill/trade for a job
- Report labourers assigned to a job
- Complete and report workplace safety tasks (safety meetings, incident reports,
labourer 5-star scale safety ratings)
- Complete labourer attendance by submitting a daily quality rating (5-star scale)
- Labourer application form
- Labourer admin section to:
- Manage skills and availability
- View upcoming job placements
- Report historical job placements
- Complete employer rating (5-star scale, max 1 per job)
- Administrator section to:
- Add/Remove labour skills
- Manage rates charged to clients and amounts paid to labourers by skill
- Report labourer attendance for payroll
- Report job details for client invoicing
- Review and/or override labourer safety and quality ratings
- Review and/or override client employer ratings
- Automated processes:
- When a new job is created, assign the highest rated labourers available for up to
two weeks
- For jobs lasting longer than 2 weeks, labourers are assigned on a week by week
basis. Every Friday at 12:00am a schedule is generated for the week starting
Monday 10 days from then (full schedule is always available 10-17 days into the
future). Highest rated labourers go to the highest rated clients, in the case of a
tie the client with the larger job budget (overall labour request).
- Send schedule notifications via email to labourers and jobs
- Send notifications to admin any time an incident report is submit

# Nice to haves
- Job distance vs just address
- The ability to take jobs based on distance (at application)
- Calendar view vs just list view
- Search bar in upcoming jobs page
- Important nice to have - if a person is sick, or can't make it, can cancel
