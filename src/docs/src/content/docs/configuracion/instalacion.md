---
title: Instalación y Setup
description: Script de instalación y setup del entorno de los agentes.
---

El script `install.ps1` permite realizar la instalación y despliegue del repositorio de configuración de agentes de forma local en la máquina de desarrollo.

```powershell
<#
.SYNOPSIS
    Instala o sincroniza la configuración del agente Gemini desde GitHub.
.DESCRIPTION
    Este script clona el repositorio de backup de configuración del agente
    en la ubicación correcta del sistema. Si ya existe configuración previa,
    ofrece opciones para fusionar o reemplazar.
.NOTES
    Repositorio: https://github.com/JoelJuana/gemini-agent-config
    Autor: Joel Juana
#>

param(
    [switch]$Force  # Fuerza el reemplazo sin preguntar
)

$RepoUrl = "https://github.com/JoelJuana/gemini-agent-config.git"
$TargetDir = Join-Path $env:USERPROFILE ".gemini\config"
$BackupDir = Join-Path $env:USERPROFILE ".gemini\config_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Gemini Agent Config — Instalador Automatico   " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que git esté instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git no esta instalado. Instala Git primero:" -ForegroundColor Red
    Write-Host "  https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# Caso 1: No existe el directorio — clonado limpio
if (-not (Test-Path $TargetDir)) {
    Write-Host "[INFO] No se encontro configuracion previa." -ForegroundColor Yellow
    Write-Host "[INFO] Clonando repositorio en: $TargetDir" -ForegroundColor Green
    git clone $RepoUrl $TargetDir
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Configuracion instalada correctamente!" -ForegroundColor Green
        Write-Host "     Skills y plugins listos en: $TargetDir" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] Fallo al clonar el repositorio." -ForegroundColor Red
        exit 1
    }
    exit 0
}

# Caso 2: Ya existe el directorio
Write-Host "[INFO] Se encontro configuracion existente en: $TargetDir" -ForegroundColor Yellow

# Verificar si ya es un repo git
$isGitRepo = Test-Path (Join-Path $TargetDir ".git")

if ($isGitRepo) {
    # Ya es un repo git — simplemente hacer pull
    Write-Host "[INFO] El directorio ya es un repositorio Git. Sincronizando..." -ForegroundColor Green
    Push-Location $TargetDir
    git pull origin main
    Pop-Location
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Configuracion sincronizada correctamente!" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Hubo conflictos al sincronizar. Revisalos manualmente." -ForegroundColor Yellow
    }
    exit 0
}

# No es un repo git — hay configuración suelta
if (-not $Force) {
    Write-Host ""
    Write-Host "El directorio existe pero NO es un repositorio Git." -ForegroundColor Yellow
    Write-Host "Se creara un backup antes de reemplazar." -ForegroundColor Yellow
    $confirm = Read-Host "Continuar? (S/N)"
    if ($confirm -ne "S" -and $confirm -ne "s") {
        Write-Host "[INFO] Operacion cancelada por el usuario." -ForegroundColor Yellow
        exit 0
    }
}

# Crear backup de la configuración existente
Write-Host "[INFO] Creando backup en: $BackupDir" -ForegroundColor Yellow
Copy-Item -Path $TargetDir -Destination $BackupDir -Recurse -Force

# Clonar el repo en una carpeta temporal y copiar archivos seguros
$TempDir = Join-Path $env:TEMP "gemini-config-temp"
if (Test-Path $TempDir) { Remove-Item -Recurse -Force $TempDir }

Write-Host "[INFO] Descargando configuracion desde GitHub..." -ForegroundColor Green
git clone $RepoUrl $TempDir

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Fallo al descargar. Restaurando backup..." -ForegroundColor Red
    exit 1
}

# Copiar skills y plugins del repo al directorio existente
$folders = @("skills", "plugins")
foreach ($folder in $folders) {
    $source = Join-Path $TempDir $folder
    $dest = Join-Path $TargetDir $folder
    if (Test-Path $source) {
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Path $source -Destination $dest -Recurse -Force
        Write-Host "[OK] Carpeta '$folder' restaurada." -ForegroundColor Green
    }
}

# Copiar archivos sueltos seguros
$files = @(".gitignore", "README.md", "AGENTS.md", "install.ps1")
foreach ($file in $files) {
    $source = Join-Path $TempDir $file
    if (Test-Path $source) {
        Copy-Item -Path $source -Destination (Join-Path $TargetDir $file) -Force
        Write-Host "[OK] Archivo '$file' restaurado." -ForegroundColor Green
    }
}

# Inicializar git en el directorio destino
Push-Location $TargetDir
git init
git remote add origin $RepoUrl
git fetch origin
git reset --hard origin/main
Pop-Location

# Limpiar temporal
Remove-Item -Recurse -Force $TempDir

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Instalacion completada correctamente!         " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Backup guardado en: $BackupDir" -ForegroundColor Yellow
Write-Host "  Config activa en:   $TargetDir" -ForegroundColor Green
Write-Host ""

```
