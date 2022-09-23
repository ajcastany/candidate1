# CandidateApp

CandidateApp is a staff daily attendance form app for business.  This is the front end, made with React, Typescript and Bootstrap.  The backend made with Flask and SQLAlchemy interacts with a Postgres database, can be found [here](https://github.com/ajcastany/candidate1-backend).

## Admin Panel

For the facilities staff/administrator, it allows the administrator to add and remove staff on specific days and to edit each row.

## Staff Attendance

Staff self-sign in form, designed to be running on an tablet device at the entrance of the organization.  Allows staff to push a button to clock in and out, and manually their tag number, if any was issued.

## Usage

System administrator adds the entry for the day for each staff member using the **Admin Panel**.  Only the system administrator can assign a meeting room for each staff member.

Staff members can clock in, out and type in their tag number.  If they clock out when they have a tag number assigned to them, the app will remind them to return the tag.

System administrators can use the **Admin Panel** to edit all rows, add a custom time in or time out or erase information added to each row.  The administrator can also delete entries.
