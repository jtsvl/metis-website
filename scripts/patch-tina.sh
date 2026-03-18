#!/bin/sh
# Patches a broken import in @tinacms/app that references tinacms source files
# instead of dist files. This is a known packaging bug in tinacms@3.6.2.
# See: https://github.com/tinacms/tinacms/issues/5793

FILE="node_modules/@tinacms/app/src/fields/rich-text/monaco/index.tsx"

if [ -f "$FILE" ]; then
  sed -i.bak \
    -e "s|from '../../../../../../tinacms/src/lib/posthog/posthog'|from 'tinacms/dist/lib/posthog/posthog'|" \
    -e "s|from '../../../../../../tinacms/src/lib/posthog/posthogProvider'|from 'tinacms/dist/lib/posthog/posthogProvider'|" \
    "$FILE"
  rm -f "${FILE}.bak"
  echo "Patched @tinacms/app posthog imports"
fi
