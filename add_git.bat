@echo off
set /p msg=Введите сообщение для коммита: 

git add .
git commit -m "%msg%"
git push

pause