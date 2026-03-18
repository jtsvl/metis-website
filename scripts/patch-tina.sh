#!/bin/sh
# Patches a broken import in @tinacms/app that references tinacms internal
# posthog files not exposed via package.json exports.
# Known packaging bug in tinacms@3.6.2 / @tinacms/app@2.3.29.

FILE="node_modules/@tinacms/app/src/fields/rich-text/monaco/index.tsx"

if [ -f "$FILE" ] && grep -q "posthog" "$FILE"; then
  sed -i.bak \
    -e "s|import { RichTextEditorSwitchedEvent } from.*posthog.*|const RichTextEditorSwitchedEvent = 'richTextEditorSwitched';|" \
    -e "s|import { captureEvent } from.*posthog.*|const captureEvent = () => {};|" \
    "$FILE"
  rm -f "${FILE}.bak"
  echo "Patched @tinacms/app: stubbed out broken posthog imports"
fi
