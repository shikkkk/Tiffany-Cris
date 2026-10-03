@echo off
setlocal
if exist "C:\Program Files\Git\cmd" set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\mingw64\bin;%PATH%"
if exist "%LOCALAPPDATA%\Programs\Git\cmd" set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\mingw64\bin;%PATH%"

echo [1] Checking Git location...
where git
echo [2] Checking Git version...
git --version
echo [3] Checking branch status...
git status
echo [4] Pushing to origin master...
git push -v origin master
echo [5] Done.
pause
