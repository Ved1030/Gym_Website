@echo off
echo ========================================
echo   Evolve Fitness - Project Setup
echo ========================================
echo.

echo [1/6] Installing backend dependencies...
cd /d "%~dp0backend"
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend install failed
    pause
    exit /b 1
)
echo.

echo [2/6] Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo WARNING: Prisma generate failed. Ensure PostgreSQL is running.
)
echo.

echo [3/6] Installing frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend install failed
    pause
    exit /b 1
)
echo.

echo [4/6] Setup Complete!
echo.
echo ========================================
echo   How to Run:
echo ========================================
echo.
echo   Terminal 1 (Backend):
echo     cd backend
echo     npm run dev
echo.
echo   Terminal 2 (Frontend):
echo     cd frontend
echo     npm run dev
echo.
echo   Then open: http://localhost:3000
echo.
echo   Admin Login:
echo     First run: cd backend ^&^& npx prisma db push ^&^& npx tsx src/prisma/seed.ts
echo     Then login at: http://localhost:3000/admin
echo     Email: admin@evolvefitness.in
echo     Password: admin123
echo.
pause
