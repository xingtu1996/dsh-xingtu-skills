# AGENTS.md — dsh-xingtu-skills

## Project-specific instructions
Read `README.md` and any directory-level agent instructions before edits. This is a DeepSeek Harness plugin packaging skills mirrored from xingtu-skills. Check upstream skill counts, file parity, package metadata and install scripts before publication. Do not auto-publish npm packages or run install hooks without reviewing their side effects.

## Shared assets and scope
- Shared Skills: https://github.com/xingtu1996/xingtu-skills
- SDD engine: https://github.com/xingtu1996/xingtu-sdd
- Reusable rules and hooks: xingtu-rules and xingtu-hooks.
These are references, not automatically inherited rules or installed tools. Verify supported installation paths and pinned versions before invoking them.

## Delivery and evidence
1. Inspect source of truth, repository-specific constraints and actual tests.
2. Write acceptance criteria and an SDD spec before nontrivial implementation.
3. Use isolated branches and reviewable Draft PRs; do not merge, publish, change license or visibility without approval.
4. Run safe checks and record actual commands, CI links and results; mark unrun checks NOT_RUN.
5. Never disclose private Vault material, secrets, personal data or private customer content. Preserve a rollback commit.

## Codex 本地仓库工作流程

- 标准工程目录为行途工作区的 `github/dsh-xingtu-skills/`。开始任务先在此处核对 Git 根目录、工作区状态、`origin`、分支/上游和同目标 PR；默认在此本地工作树操作，不另建 `/tmp` Clone。
- 按“本地修改 → 适用检查 → 隔离分支 commit → push → 核验本地、远端分支和 PR head SHA”交付；仅在 SHA 一致、PR 文件清单包含改动且工作区干净时报告已同步。
- 已有同目标 PR 时优先续用其分支并核查 base/head 和 changed files，避免重复开 PR；不得自动合并、发布包或运行未经审查的安装钩子。
- 标准 Clone 不可用或远端异常时保留现场并说明证据；临时 Clone 仅作为说明原因后的例外，并确保改动回到标准工程目录。
