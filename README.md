# Library_management
video demo: 

Steps to run : 

1. git clone https://github.com/Snehanraikar/Library_management.git
2. Establish the database of mysql in command prompt : $mysql -u root -p
3. Give the password. $******
4. Then create database using $create database lib;
5. $use lib;
6. create the tables required for example : https://dbdiagram.io/d/6148c958825b5b01460afb74
7. Populate the sample datasets.And in app.js, write your credentials.
8. Close the command prompt.
9. open two terminals, in one terminal navigate to dashboard using, $cd dashboard
10. $npm install
11. $npm start
12. In second terminal run,$node app.js.


Features included:
1. getting all books that have never been borrowed.
2. listing the outstanding books at any given point in time.
3. extract the top 10 most borrowed books.
4. Adding books,members,issuance records.

Tech stack:
1.ReactJs
2.MySql
3.ExpressJS

UI for a simple dashboard showing which members have books pending for returnon a given day.

    
