## Release Checklist

Whenever a new version of id-tagging-schema is released:

```bash
- Update version number `package.json`
- Update id-tagging-schema dependency in `package.json`
$  npm install
$  npm run all
$  git add .
$  git commit -m 'vA.B.C'
$  git tag vA.B.C
$  git push origin main vA.B.C
$  npm publish
```
