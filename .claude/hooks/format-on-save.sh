#!/bin/bash
# runs after every Edit or Write, keeps formatting consistent without a manual step

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

case "$FILE_PATH" in
  *.ts|*.tsx|*.json|*.mjs|*.css)
    pnpm exec biome check --write "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
