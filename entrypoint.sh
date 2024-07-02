#!/bin/sh
test -n "$NEXT_PUBLIC_API_KEY"
find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#PLACEHOLDER_NEXT_PUBLIC_API_URL#$NEXT_PUBLIC_API_URL#g"
exec "$@"