# SmartPrep - Stop Script
# This script stops the local web server

Write-Host "Stopping SmartPrep web server..." -ForegroundColor Yellow

# Find and stop Python HTTP server on port 8088
$processes = Get-NetTCPConnection -LocalPort 8088 -ErrorAction SilentlyContinue | 
    Select-Object -ExpandProperty OwningProcess -Unique

if ($processes) {
    foreach ($pid in $processes) {
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($process -and $process.Name -eq "python") {
            Write-Host "Stopping Python server (PID: $pid)..." -ForegroundColor Green
            Stop-Process -Id $pid -Force
        }
    }
    Write-Host "Server stopped successfully!" -ForegroundColor Green
} else {
    Write-Host "No server running on port 8088" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
