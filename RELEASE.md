## Release Checklist

Whenever a new version of iD is released:

```bash
- Update version number `package.json`
- Update iD dependency in `package.json`
$  npm install
$  npm run test
$  git add .
$  git commit -m 'vA.B.C'
$  git tag vA.B.C
$  git push origin main vA.B.C
$  npm publish
```
