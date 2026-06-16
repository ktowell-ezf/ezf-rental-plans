// config.example.js — safe to commit, no real secrets
// To set up: copy this file to config.js and fill in your values.
//
// GIST_ID:  The ID from your GitHub Gist URL
//           e.g. gist.github.com/username/THIS_PART
//
// GIST_PAT: A GitHub Personal Access Token with gist scope
//           Create one at: github.com → Settings → Developer settings →
//           Personal access tokens → Tokens (classic) → New token
//           Select scope: gist
//
const ANN_CONFIG = {
  GIST_ID:      'YOUR_GIST_ID_HERE',
  GIST_PAT:     'YOUR_GITHUB_PAT_HERE',
  GIST_FILE:    'rental-plan-annotations.json',
  SESSION_DAYS: 30,
  SEED_ADMIN:   { username: 'admin', password: 'CHOOSE_A_PASSWORD', role: 'admin', displayName: 'Admin' }
};
