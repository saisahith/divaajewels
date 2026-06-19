@echo off
cd /d "C:\SAHITH\Divaa-Jewels-Codex\_theme_v3\divaa-shopify-theme"
echo Removing lock file if exists...
if exist .git\index.lock del /f .git\index.lock
echo.
echo Running git add...
git add -A
echo.
echo Running git commit...
git commit -m "Update theme: filters, header, product card, cart drawer, home sections"
echo.
echo Running git push...
git push origin divaa-newdesign
echo.
echo Done!
pause
