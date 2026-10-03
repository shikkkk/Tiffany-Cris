@echo off
setlocal
if exist "C:\Program Files\Git\cmd" set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\mingw64\bin;%PATH%"
if exist "%LOCALAPPDATA%\Programs\Git\cmd" set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\mingw64\bin;%PATH%"

echo ========================================================
echo 1. Opening GitHub Sign-In in your browser...
echo ========================================================
where git-credential-manager >nul 2>nul
if %errorlevel% equ 0 (
    git-credential-manager github login
) else if exist "C:\Program Files\Git\mingw64\bin\git-credential-manager.exe" (
    "C:\Program Files\Git\mingw64\bin\git-credential-manager.exe" github login
) else if exist "%LOCALAPPDATA%\Programs\Git\mingw64\bin\git-credential-manager.exe" (
    "%LOCALAPPDATA%\Programs\Git\mingw64\bin\git-credential-manager.exe" github login
) else (
    echo Git Credential Manager not found. Trying default git push...
)

echo.
echo ========================================================
echo 2. Pushing to GitHub (origin master)...
echo ========================================================
git push origin master
echo.
echo ========================================================
echo Finished! Check your terminal output above.
echo ========================================================
pause
