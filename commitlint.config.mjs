/** Conventional Commits, read by release-please to pick the next version. */
const config = {
  extends: ["@commitlint/config-conventional"],
  // Commits written before the switch ("Feat : …", "Fix : …") still pass in CI.
  ignores: [(message) => /^(Feat|Fix|Chore|Docs) : /.test(message)],
}

export default config
