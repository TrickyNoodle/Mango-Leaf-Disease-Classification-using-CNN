@echo off
color 60
echo [Installing Prerequisites]
start /wait cmd /c "echo Installing Nodejs Packages && cd frontend\PDD_Interface && npm i"
start /wait cmd /c "echo Creating Virtual Environment && cd backend && python -m venv .venv"
start /wait cmd /c "echo Installing Python Packages && cd backend && .venv\Scripts\pip install tensorflow numpy flask flask-cors pillow"
cls
echo [All Done]
echo  - Launch the App from the Run.bat Script
color 20
pause