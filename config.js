// config.js — NOT tracked by git (see .gitignore)
// Copy config.example.js to config.js and fill in your values.
const ANN_CONFIG = {
  GIST_ID:      '4377397ba2b40bd586d9b515cdb0a5ba',
  GIST_PAT:     'REMOVED_TOKEN',
  GIST_FILE:    'rental-plan-annotations.json',
  SESSION_DAYS: 30,
  // Bootstrap admin — only used when no users exist in the Gist yet
  SEED_ADMIN:   { username: 'katy', password: '?ANl4byrint123', role: 'admin', displayName: 'Katy' }
};
