@echo off
set /p name=Enter pattern name
for /r %%f in (*%name%*) do git add "%%f"

echo done

pause