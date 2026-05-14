#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  echo "Not on a branch. Checkout a branch before publishing." >&2
  exit 1
fi

message="${*:-Update site $(date '+%Y-%m-%d %H:%M')}"

echo "Rendering Quarto site..."
quarto render

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Committing changes:"
  git status --short
  git add -A
  git commit -m "$message"
else
  echo "No local changes to commit."
fi

if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  echo "Syncing with upstream..."
  git pull --rebase --autostash
  git push
else
  echo "No upstream set. Pushing and setting origin/$branch..."
  git push -u origin "$branch"
fi

echo "Published. GitHub Pages deployment will run from the push."
