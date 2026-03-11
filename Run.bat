@echo off
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
   set ip=%%a
)
set ip=%ip:~1%
echo VITE_BACKEND_ADDRESS=http://%ip%:5000 > frontend\PDD_Interface\.env
start cmd /c "echo [ Starting Frontend Here! ] && cd frontend && npm run dev"
start cmd /c "echo [ Starting Backend Here! ] && cd backend && .venv\Scripts\activate && python app.py"