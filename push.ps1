$gitPaths = @(
  "C:\Program Files\Git\cmd",
  "C:\Program Files\Git\mingw64\bin",
  "$env:LOCALAPPDATA\Programs\Git\cmd",
  "$env:LOCALAPPDATA\Programs\Git\mingw64\bin"
)
foreach ($p in $gitPaths) {
  if ((Test-Path $p) -and ($env:PATH -notlike "*$p*")) {
    $env:PATH = "$p;$env:PATH"
  }
}

Write-Host "Pushing to GitHub (origin master)..." -ForegroundColor Cyan
git push origin master
Write-Host "Finished push." -ForegroundColor Green
