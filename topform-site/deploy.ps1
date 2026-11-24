param([string]$Repo = "topform-site")
$ErrorActionPreference = "Stop"
foreach ($t in "git","gh") { if (-not (Get-Command $t -ErrorAction SilentlyContinue)) { throw "Install $t first (winget install $(if($t -eq 'gh'){'GitHub.cli'}else{'Git.Git'}))" } }
if (-not (Test-Path .git)) { git init -b main }
git add -A; git commit -m "Topform site" 2>$null
gh auth status 2>$null; if ($LASTEXITCODE -ne 0) { gh auth login }
$me = gh api user --jq .login
gh repo create "$me/$Repo" --public --source . --push 2>$null
if ($LASTEXITCODE -ne 0) { git remote get-url origin 2>$null | Out-Null; git push -u origin main }
Start-Process "https://render.com/deploy?repo=https://github.com/$me/$Repo"
Write-Host "Pushed to https://github.com/$me/$Repo - click 'Deploy Blueprint' on the Render page that just opened."
