# Branch protection

`main` is protected by a GitHub ruleset stored in `.github/rulesets/protect-main.json`. It is not applied automatically. Run the commands below once, after the first push.

Rulesets need a public repository or a paid GitHub plan. On a private repository on the free plan the first command fails.

## What the ruleset does

- Blocks deleting `main` and force-pushing to it.
- Requires a pull request for every change (no approvals needed, so a solo maintainer can merge).
- Allows merge commits only. No squash, no rebase.
- Requires the `checks` job from `.github/workflows/ci.yml` to pass on an up-to-date branch.
- Has no bypass list, so it applies to admins too.

## Apply it

Replace `OWNER/REPO` with the repository, for example `your-name/quehealth`.

```sh
gh api -X POST repos/OWNER/REPO/rulesets --input .github/rulesets/protect-main.json
```

To change it later, edit the JSON file, find the ruleset id, and update it:

```sh
gh api repos/OWNER/REPO/rulesets
gh api -X PUT repos/OWNER/REPO/rulesets/RULESET_ID --input .github/rulesets/protect-main.json
```

## Merge commit titles

By default GitHub titles a merge commit "Merge pull request #12 from ...", which is not a conventional commit. This setting makes the merge commit use the pull request title and body instead, and turns off the other merge methods:

```sh
gh api -X PATCH repos/OWNER/REPO \
  -F allow_merge_commit=true \
  -F allow_squash_merge=false \
  -F allow_rebase_merge=false \
  -f merge_commit_title=PR_TITLE \
  -f merge_commit_message=PR_BODY
```

This is a preference, not a requirement. To go back to the GitHub default:

```sh
gh api -X PATCH repos/OWNER/REPO -f merge_commit_title=MERGE_MESSAGE -f merge_commit_message=PR_TITLE
```

## Check it worked

```sh
gh api repos/OWNER/REPO/rulesets
git push origin main
```

The push should be rejected.
