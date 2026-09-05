$env:PATH = "C:\Users\Pudgie\AppData\Local\Programs\Git\cmd;C:\Users\Pudgie\AppData\Local\Programs\Git\mingw64\bin;" + $env:PATH
Write-Host "Opening GitHub sign-in in your browser..." -ForegroundColor Cyan
& "C:\Users\Pudgie\AppData\Local\Programs\Git\mingw64\bin\git-credential-manager.exe" github login

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin master
Write-Host "Push complete!" -ForegroundColor Green
