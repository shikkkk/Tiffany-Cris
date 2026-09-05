@echo off
set "PATH=C:\Users\Pudgie\AppData\Local\Programs\Git\cmd;C:\Users\Pudgie\AppData\Local\Programs\Git\mingw64\bin;%PATH%"
echo ========================================================
echo 1. Opening GitHub Sign-In in your browser...
echo ========================================================
"C:\Users\Pudgie\AppData\Local\Programs\Git\mingw64\bin\git-credential-manager.exe" github login
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
