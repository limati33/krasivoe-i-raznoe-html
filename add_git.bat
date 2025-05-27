@echo off
set /p msg=Commit text: 

git add .
git commit -m "%msg%"
git push

pause