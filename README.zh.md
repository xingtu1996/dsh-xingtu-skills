# dsh-xingtu-skills · XingTu 技能插件（DeepSeek Harness / DSH）

> **26 个生产级 AI Agent 技能，打包成一个 DeepSeek Harness（DSH）标准插件，一条命令安装即用。**

[![MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE) [![npm](https://img.shields.io/npm/v/dsh-xingtu-skills)](https://www.npmjs.com/package/dsh-xingtu-skills)

---

## 这是什么

本插件把 [xingtu-skills](https://github.com/xingtu1996/xingtu-skills) 的 **26 个生产级 SKILL.md 技能**打包为标准的 DeepSeek Harness 插件包。安装后，DSH 的会话技能目录会自动加载全部技能，按需触发（progressive disclosure），无需手动拷贝。

每个技能遵循跨工具事实标准（`name + description + when_to_use`），同一份技能也兼容 Claude Code / CodeBuddy / Codex / Cursor / Gemini CLI。

## 安装

```bash
# 从 npm 安装（推荐）
dsh plugin add dsh-xingtu-skills

# 从 GitHub Release 压缩包安装
dsh plugin add -w https://github.com/xingtu1996/dsh-xingtu-skills/releases/latest/download/dsh-xingtu-skills-0.1.0.tgz
```

## 技能清单（26）

| 系列 | 技能 |
|---|---|
| **Caveman · token 压缩** | `caveman` `caveman-commit` `caveman-compress` `caveman-discover` `caveman-evidence-review` `caveman-explore` `caveman-help` `caveman-learn` `caveman-manage` `caveman-optimize` `caveman-review` `caveman-setup` `caveman-stats` `cavecrew` |
| **Ponytail · 极简与债务** | `ponytail` `ponytail-audit` `ponytail-debt` `ponytail-gain` `ponytail-help` `ponytail-review` |
| **工程实践** | `investigate-first` `lean-build` `migration` `safe-refactor` `surgical-patch` `verify-and-stop` |

## 插件结构

```
dsh-xingtu-skills/
├── package.json        # dsh.bundle.patch → ./cordis.patch.yml（标准插件声明）
├── cordis.patch.yml    # 插入本插件行（bundle layer）
├── lib/index.js        # 入口：apply() 逐个注册 skills/ 下的 SKILL.md
└── skills/<name>/      # 26 个技能目录（含各自 SKILL.md 与资源）
```

- **插件契约**：导出 `name` + `apply(ctx)`（`inject: ['skills']`），全部贡献走 `ctx.effect()` / `ctx.skills.register()`，卸载自动清理。
- **零依赖**：不引入任何 Cordis 副本，`@deepseek-ai/dsh` 仅为可选 peerDependency。
- **已验证**：通过 `dsh-plugin-dev check`（静态检查）+ `dsh-plugin-dev verify`（干净 DSH_HOME 实测安装/启动/卸载）。

## 关联项目

- [xingtu-skills](https://github.com/xingtu1996/xingtu-skills) — 技能源仓库（跨工具通用）
- [xingtu-harness](https://github.com/xingtu1996/xingtu-harness) — 行途 AI 工程化脚手架（一键拉全）
- [xingtu-ai-engineering](https://github.com/xingtu1996/xingtu-ai-engineering) — 方法论旗舰仓

## 许可证

MIT License。技能内容源于真实工程实践，公司敏感信息已全部脱敏。
