#!/bin/sh

npx ts-node src/infrastructure/scheduler/BatchUpdatePosts.ts &

npm run dev