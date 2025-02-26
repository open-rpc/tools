# Semantic Release Style Changelog Generator

This project uses a custom changelog generator that produces semantic-release style changelogs for both the root project and individual packages.

## Features

- Generates changelogs in semantic-release style format
- Creates package-specific changelogs
- Includes links to commits and issues
- Groups changes by type (features, fixes, etc.)
- Integrates with the Changesets workflow
- Logs detailed information about the generation process
- Supports dry run mode to preview changes without writing files
- Supports quiet mode for CI/CD pipelines
- Intelligently merges entries instead of replacing existing version entries
- Deduplicates entries based on commit hash and content similarity

## Usage

### Generating Changelogs

To generate changelogs for the root project and all packages:

```bash
npm run generate-changelog
```

This will:

1. Analyze all commits since the last tag
2. Process all changesets
3. Determine which packages each change affects
4. Generate a root changelog
5. Generate package-specific changelogs
6. Log the process to `changelog-generator.log`

### Using the Fixed Script Directly

For more control, you can use the fixed script directly:

```bash
# Standard usage
node scripts/generate-changelog-fixed.mjs

# Dry run mode (doesn't write files)
node scripts/generate-changelog-fixed.mjs --dry-run
# or
node scripts/generate-changelog-fixed.mjs -d

# Quiet mode (suppresses console output)
node scripts/generate-changelog-fixed.mjs --quiet
# or
node scripts/generate-changelog-fixed.mjs -q

# Combine options
node scripts/generate-changelog-fixed.mjs --dry-run --quiet
```

### Automatic Generation During Releases

Changelogs are automatically generated during the version and release process:

```bash
npm run version  # Runs generate-changelog before versioning
npm run release  # Publishes packages with updated changelogs
```

## Conventional Commit Format

For best results, use the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Where:

- `type` is one of:
  - `feat`: A new feature (minor version bump)
  - `fix`: A bug fix (patch version bump)
  - `docs`: Documentation changes
  - `style`: Changes that don't affect the code's meaning
  - `refactor`: Code changes that neither fix a bug nor add a feature
  - `perf`: Performance improvements
  - `test`: Adding or correcting tests
  - `build`: Changes to the build system or dependencies
  - `ci`: Changes to CI configuration
  - `chore`: Other changes that don't modify source or test files
  - `revert`: Reverts a previous commit
  - `breaking`: Breaking changes (major version bump)
- `scope` is optional and indicates the section of the codebase affected
- `description` is a short description of the change

### Breaking Changes

Breaking changes can be indicated in three ways:

1. Using the `breaking` type
2. Adding a `!` before the colon (e.g., `feat!: breaking change`)
3. Including `BREAKING CHANGE:` in the commit body

## Changelog Format

The generated changelog will group changes by type:

- 🚀 Features
- 🐛 Bug Fixes
- 📝 Documentation
- 💄 Styles
- ♻️ Code Refactoring
- ⚡️ Performance Improvements
- ✅ Tests
- 👷 Build System
- 🔧 CI Configuration
- 🧹 Chores
- ⏪ Reverts
- 💥 BREAKING CHANGES

Each entry will include:

- The scope (if provided)
- The commit description
- A link to the commit (if available)
- Links to related issues (if referenced in the commit)

## Troubleshooting

If you encounter issues with the changelog generation:

1. Check the `changelog-generator.log` file for detailed information
2. Ensure your commits follow the conventional commit format
3. Make sure your repository has at least one commit
4. Verify that package directories contain valid package.json files
5. Try running with the `--dry-run` flag to see what would be generated without making changes

## Entry Merging Behavior

When generating a changelog for a version that already has entries, the generator will:

1. Parse the existing entries by section type (Features, Bug Fixes, etc.)
2. Parse the new entries from recent commits and changesets
3. Intelligently merge both sets of entries, keeping all unique items
4. Deduplicate entries based on:
   - Exact matching commit hashes
   - Similar content after removing formatting, links, and references

This ensures that:

- Existing manually added entries are preserved
- New entries from recent commits are added
- No duplicate entries appear in the changelog
- The changelog remains properly organized by type

If the merging process fails for any reason, the generator will fall back to replacing the existing entries as a safety measure.
