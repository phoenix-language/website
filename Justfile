default:
    just --list

# Serve the static site locally.
dev port="8080":
    python3 -m http.server {{port}}

# Open the local dev server in the default browser (macOS).
open port="8080":
    open "http://localhost:{{port}}"
