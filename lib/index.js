// dsh-xingtu-skills bundle entry point.
//
// Registers every packaged SKILL.md under ./skills as an on-demand agent skill.
// Each skill keeps its own directory as the resourceBase, so relative references
// (./scripts, ./references, etc.) inside a SKILL.md resolve against that skill's
// directory — progressive disclosure, loaded only when a task needs them.
//
// The package imports nothing from the harness: it only consumes the `skills`
// service at apply time, so no Cordis copy is brought in and the peer dependency
// on `@deepseek-ai/dsh` is metadata-only (optional).
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'dsh-xingtu-skills'
export const inject = ['skills']

const packageRoot = dirname(fileURLToPath(import.meta.url))

/**
 * Strip the YAML frontmatter block from SKILL.md and return the description
 * plus the instruction body. Supports single-line and folded (`>` / `|`)
 * description blocks. A malformed or missing block fails loud through the read
 * itself or falls back to the full text as the body.
 * @param text - raw SKILL.md content.
 * @returns parsed description (when the frontmatter carries one) and body.
 */
function splitFrontmatter(text) {
  if (!text.startsWith('---\n')) return { description: undefined, body: text }
  const end = text.indexOf('\n---', 4)
  if (end < 0) return { description: undefined, body: text }
  const meta = text.slice(4, end)
  const body = text.slice(end + 4).replace(/^\n+/, '')
  const match = /^description:\s*(.+)$/m.exec(meta)
  if (!match) return { description: undefined, body }
  let description = match[1].trim()
  if (description === '>' || description === '|') {
    // Folded / literal block: join the following indented lines.
    const after = meta.slice(match.index + match[0].length).match(/\n(\s+.+)/g)
    if (after) description = after.map((s) => s.trim()).join(' ').trim()
  }
  return { description: description || undefined, body }
}

/**
 * Register every skill. Registration is an effect: each disposer returned by
 * `ctx.skills.register()` removes the contribution on unload.
 * @param ctx - Cordis context with the injected `skills` service.
 */
export function apply(ctx) {
  // skills/ lives at the package root, while this entry is under lib/ — step up one level.
  const skillsDir = join(packageRoot, '..', 'skills')
  const entries = readdirSync(skillsDir, { withFileTypes: true }).filter(
    (e) => e.isDirectory() && !e.name.startsWith('_'),
  )
  for (const entry of entries) {
    const skillDir = join(skillsDir, entry.name)
    const raw = readFileSync(join(skillDir, 'SKILL.md'), 'utf8')
    const { description, body } = splitFrontmatter(raw)
    ctx.effect(() =>
      ctx.skills.register({
        name: entry.name,
        source: 'bundled',
        description:
          description ??
          `XingTu skill ${entry.name} — see SKILL.md for when to use it.`,
        content: body,
        resourceBase: { kind: 'directory', path: skillDir },
      }),
    )
  }
}
