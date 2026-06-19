default:
    @just --list

port := "5173"

# Install Node dependencies (run after clone or when package.json changes).
install:
    pnpm install

dev:
    pnpm run dev -- --port {{port}}

build:
    pnpm run build

# Preview the production build (run build first).
preview:
    pnpm run preview -- --port {{port}}

open:
    open "http://localhost:{{port}}/website/"

# Submodule often checks out detached HEAD — attach to main before editing.
branch:
    git fetch origin
    git checkout main
    git pull --ff-only origin main

status:
    @git status -sb
    @git log -1 --oneline

# Copy the canonical logo from the language repo (parent assets/).
logo-sync:
    cp ../assets/phoenix_logo.png docs/public/phoenix-logo.png
