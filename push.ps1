$env:PATH = "C:\Users\Pudgie\AppData\Local\Programs\Git\cmd;C:\Users\Pudgie\AppData\Local\Programs\Git\mingw64\bin;" + $env:PATH
Write-Host "Pushing to GitHub (origin master)..." -ForegroundColor Cyan
git push origin master
Write-Host "Finished push." -ForegroundColor Green
