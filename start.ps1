# SmartPrep - Start Script
# This script starts a local web server and opens SmartPrep in your browser

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting SmartPrep Interview Prep" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if port 8088 is already in use
$portInUse = Get-NetTCPConnection -LocalPort 8088 -ErrorAction SilentlyContinue

if ($portInUse) {
    Write-Host "Port 8088 is already in use. Opening browser..." -ForegroundColor Yellow
    Start-Process "http://localhost:8088"
} else {
    Write-Host "Starting web server on port 8088..." -ForegroundColor Green
    
    # Start Python HTTP server in background
    Start-Process python -ArgumentList "-m", "http.server", "8088" -WindowStyle Minimized
    
    # Wait for server to start
    Start-Sleep -Seconds 2
    
    Write-Host "Opening SmartPrep in your browser..." -ForegroundColor Green
    Start-Process "http://localhost:8088"
    
    Write-Host ""
    Write-Host "SmartPrep is now running!" -ForegroundColor Green
    Write-Host "URL: http://localhost:8088" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To stop the server, close the Python window or press Ctrl+C" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
