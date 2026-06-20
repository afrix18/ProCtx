export function evaluateRules(spec, context) {
  const rules = spec.rules || []

  for (const rule of rules) {
    if (matchRule(rule.when, context)) {
      return {
        id: rule.id,
        output: rule.output,
        confidence: rule.confidence ?? 1
      }
    }
  }

  return {
    id: "default",
    output: spec.default || {},
    confidence: 0
  }
}

function matchRule(when, context) {
  if (!when) return false

  // match files
  if (when.files) {
    return when.files.every(file =>
      context.files.includes(file)
    )
  }

  // match folders
  if (when.folders) {
    return when.folders.every(folder =>
      context.folders.includes(folder)
    )
  }

  return false
}