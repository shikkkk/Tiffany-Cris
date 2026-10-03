# Dynamically locate Git and Git Credential Manager
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

$gcm = Get-Command git-credential-manager -ErrorAction SilentlyContinue
if (-not $gcm) {
  $candidate = "C:\Program Files\Git\mingw64\bin\git-credential-manager.exe"
  if (Test-Path $candidate) { $gcm = $candidate }
}

Write-Host "Opening GitHub sign-in in your browser..." -ForegroundColor Cyan
if ($gcm) {
  & $gcm github login
} else {
  git credential-manager github login
}

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin master
Write-Host "Push complete!" -ForegroundColor Green
