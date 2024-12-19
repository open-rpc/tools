#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import process from 'process';

// Add global declaration for console to fix linter errors
/* global console */

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || args.includes('-d');
const QUIET_MODE = args.includes('--quiet') || args.includes('-q');

// Configuration
const ROOT_CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md');
const LOG_FILE_PATH = path.join(process.cwd(), 'changelog-generator.log');
const PACKAGES_DIR = path.join(process.cwd(), 'packages');

// Commit types configuration
const TYPES = {
  feat: { title: '🚀 Features', semver: 'minor' },
  fix: { title: '🐛 Bug Fixes', semver: 'patch' },
  docs: { title: '📝 Documentation', semver: 'patch' },
  style: { title: '💄 Styles', semver: 'patch' },
  refactor: { title: '♻️ Code Refactoring', semver: 'patch' },
  perf: { title: '⚡️ Performance Improvements', semver: 'patch' },
  test: { title: '✅ Tests', semver: 'patch' },
  build: { title: '👷 Build System', semver: 'patch' },
  ci: { title: '🔧 CI Configuration', semver: 'patch' },
  chore: { title: '🧹 Chores', semver: 'patch' },
  revert: { title: '⏪ Reverts', semver: 'patch' },
  breaking: { title: '💥 BREAKING CHANGES', semver: 'major' }
};

// Logger
class Logger {
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
    this.logs = [];
    this.initLogFile();
  }

  initLogFile() {
    try {
      fs.writeFileSync(this.logFilePath, `Changelog Generator Log - ${new Date().toISOString()}\n\n`);
    } catch (error) {
      if (!QUIET_MODE) {
        console.error(`Failed to initialize log file: ${error.message}`);
      }
    }
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    this.logs.push(formattedMessage);
    
    try {
      fs.appendFileSync(this.logFilePath, formattedMessage + '\n');
    } catch (error) {
      if (!QUIET_MODE) {
        console.error(`Failed to write to log file: ${error.message}`);
      }
    }
    
    if (!QUIET_MODE) {
      if (level === 'error') {
        console.error(message);
      } else {
        console.log(message);
      }
    }
  }

  debug(message) {
    this.log(message, 'debug');
  }

  info(message) {
    this.log(message, 'info');
  }

  warn(message) {
    this.log(message, 'warn');
  }

  error(message) {
    this.log(message, 'error');
  }
}

// Initialize logger
const logger = new Logger(LOG_FILE_PATH);

// Helper to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

// Helper to get package version
function getPackageVersion(packagePath) {
  try {
    const packageJsonPath = path.join(packagePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.version;
    }
  } catch (error) {
    logger.error(`Failed to get package version: ${error.message}`);
  }
  return null;
}

// Helper to get the root package version
function getRootVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    return packageJson.version;
  } catch (error) {
    logger.error(`Failed to get root version: ${error.message}`);
    return '0.0.0';
  }
}

// Get all packages in the monorepo
function getPackages() {
  try {
    const packages = [];
    
    if (fs.existsSync(PACKAGES_DIR)) {
      const packageDirs = fs.readdirSync(PACKAGES_DIR)
        .filter(dir => {
          const packagePath = path.join(PACKAGES_DIR, dir);
          return fs.statSync(packagePath).isDirectory() && 
                 fs.existsSync(path.join(packagePath, 'package.json'));
        });
      
      for (const dir of packageDirs) {
        const packagePath = path.join(PACKAGES_DIR, dir);
        const packageJsonPath = path.join(packagePath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        packages.push({
          name: packageJson.name,
          path: packagePath,
          version: packageJson.version
        });
      }
    }
    
    logger.info(`Found ${packages.length} packages in the monorepo`);
    return packages;
  } catch (error) {
    logger.error(`Failed to get packages: ${error.message}`);
    return [];
  }
}

// Parse conventional commit message to extract type, scope, description, and body
function parseCommitMessage(hash, message) {
  // Split the message into title and body
  const [title, ...bodyLines] = message.split('\n');
  const body = bodyLines.join('\n').trim();
  
  // Parse the title
  const titleRegex = /^(\w+)(?:\(([^)]+)\))?: (.+)$/;
  const titleMatch = title.match(titleRegex);
  
  if (!titleMatch) {
    return { 
      hash,
      type: 'other', 
      scope: null, 
      description: title,
      body,
      breaking: body.includes('BREAKING CHANGE:')
    };
  }
  
  const [, type, scope, description] = titleMatch;
  
  // Check for breaking changes
  const breaking = type === 'breaking' || 
                  title.includes('!:') || 
                  body.includes('BREAKING CHANGE:');
  
  // Extract GitHub issue references
  const issueReferences = [];
  const issueRegex = /#(\d+)/g;
  let issueMatch;
  
  while ((issueMatch = issueRegex.exec(title + ' ' + body)) !== null) {
    issueReferences.push(issueMatch[1]);
  }
  
  return { 
    hash,
    type, 
    scope, 
    description,
    body,
    breaking,
    issues: issueReferences
  };
}

// Get git commits
function getGitCommits() {
  try {
    // Get recent commits for changelog
    logger.info('Getting recent commits for changelog');
    
    // Get all commits with hash and message
    const gitLogCommand = `git log -n 50 --pretty=format:"%H||%s||%b"`;
    logger.debug(`Running git command: ${gitLogCommand}`);
    
    const commitsOutput = execSync(gitLogCommand, { encoding: 'utf8' });
    
    // If no commits found, return empty array
    if (!commitsOutput || commitsOutput.trim() === '') {
      logger.warn('No commits found');
      return [];
    }
    
    const commits = commitsOutput
      .split('\n')
      .filter(commit => commit.trim() !== '')
      .map(commit => {
        const [hash, subject, body] = commit.split('||');
        return parseCommitMessage(hash, `${subject}\n${body}`);
      });
    
    logger.info(`Found ${commits.length} commits`);
    return commits;
  } catch (error) {
    logger.error(`Failed to get git commits: ${error.message}`);
    return [];
  }
}

// Get all changesets
function getChangesets() {
  try {
    const changesetDir = path.join(process.cwd(), '.changeset');
    
    if (!fs.existsSync(changesetDir)) {
      logger.warn('Changeset directory not found');
      return [];
    }
    
    const files = fs.readdirSync(changesetDir)
      .filter(file => file.endsWith('.md') && file !== 'README.md');
    
    logger.info(`Found ${files.length} changesets`);
    
    return files.map(file => {
      const content = fs.readFileSync(path.join(changesetDir, file), 'utf8');
      const lines = content.split('\n');
      
      // First line is the changeset header (usually "---")
      // Second line might contain package info and bump type
      // The rest is the commit message
      const message = lines.slice(2).join('\n').trim();
      
      // Extract package information
      const packageInfoLine = lines[1];
      const packageInfo = {};
      
      if (packageInfoLine && packageInfoLine.includes(':')) {
        const packageMatches = packageInfoLine.match(/"([^"]+)":\s*(\w+)/g);
        
        if (packageMatches) {
          packageMatches.forEach(match => {
            const [, packageName, bumpType] = match.match(/"([^"]+)":\s*(\w+)/);
            packageInfo[packageName] = bumpType;
          });
        }
      }
      
      const parsedMessage = parseCommitMessage(`changeset-${file}`, message);
      parsedMessage.packages = Object.keys(packageInfo);
      
      return parsedMessage;
    });
  } catch (error) {
    logger.error(`Failed to get changesets: ${error.message}`);
    return [];
  }
}

// Determine which packages a commit affects based on changed files
function getAffectedPackages(commitHash) {
  try {
    if (commitHash.startsWith('changeset-')) {
      // For changesets, the affected packages are already determined
      return [];
    }
    
    // Get the list of files changed in this commit
    const changedFilesCommand = `git show --name-only --pretty=format: ${commitHash}`;
    const changedFiles = execSync(changedFilesCommand, { encoding: 'utf8' })
      .split('\n')
      .filter(file => file.trim() !== '');
    
    // Get all packages
    const packages = getPackages();
    
    // Determine which packages are affected by the changed files
    const affectedPackages = packages.filter(pkg => {
      const packageRelativePath = path.relative(process.cwd(), pkg.path);
      return changedFiles.some(file => file.startsWith(packageRelativePath));
    });
    
    return affectedPackages.map(pkg => pkg.name);
  } catch (error) {
    logger.error(`Failed to get affected packages for commit ${commitHash}: ${error.message}`);
    return [];
  }
}

// Group changes by type
function groupChangesByType(changes) {
  const grouped = {};
  
  changes.forEach(change => {
    const type = change.type;
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(change);
  });
  
  return grouped;
}

// Format a commit for the changelog
function formatCommit(commit, repoUrl) {
  let output = '';
  
  // Add scope if available
  const scope = commit.scope ? `**${commit.scope}:** ` : '';
  
  // Add commit hash link if available
  let commitLink = '';
  if (commit.hash && !commit.hash.startsWith('changeset-') && repoUrl) {
    commitLink = ` ([${commit.hash.substring(0, 7)}](${repoUrl}/commit/${commit.hash}))`;
  }
  
  // Add issue links if available
  let issueLinks = '';
  if (commit.issues && commit.issues.length > 0 && repoUrl) {
    issueLinks = commit.issues
      .map(issue => ` [#${issue}](${repoUrl}/issues/${issue})`)
      .join('');
  }
  
  output = `* ${scope}${commit.description}${commitLink}${issueLinks}`;
  
  return output;
}

// Generate markdown for the changelog
function generateChangelog(version, changes, packageName = null, repoUrl = null) {
  const groupedChanges = groupChangesByType(changes);
  const date = getCurrentDate();
  
  let markdown = `# ${version} (${date})\n\n`;
  
  if (packageName) {
    markdown = `# ${packageName} ${version} (${date})\n\n`;
  }
  
  // Add each type of change
  Object.keys(TYPES).forEach(type => {
    if (groupedChanges[type] && groupedChanges[type].length > 0) {
      markdown += `## ${TYPES[type].title}\n\n`;
      
      groupedChanges[type].forEach(change => {
        markdown += `${formatCommit(change, repoUrl)}\n`;
      });
      
      markdown += '\n';
    }
  });
  
  // Handle other changes that don't match conventional commit types
  if (groupedChanges.other && groupedChanges.other.length > 0) {
    markdown += `## Other Changes\n\n`;
    
    groupedChanges.other.forEach(change => {
      markdown += `${formatCommit(change, repoUrl)}\n`;
    });
    
    markdown += '\n';
  }
  
  return markdown;
}

// Get GitHub repository URL from package.json or git remote
function getRepositoryUrl() {
  try {
    // Try to get from package.json first
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    if (packageJson.repository) {
      if (typeof packageJson.repository === 'string') {
        return packageJson.repository.replace(/\.git$/, '');
      } else if (packageJson.repository.url) {
        return packageJson.repository.url.replace(/\.git$/, '');
      }
    }
    
    // Try to get from git remote
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    
    // Convert SSH URL to HTTPS URL
    if (remoteUrl.startsWith('git@github.com:')) {
      return `https://github.com/${remoteUrl.substring(15).replace(/\.git$/, '')}`;
    }
    
    // Already HTTPS URL
    if (remoteUrl.startsWith('https://')) {
      return remoteUrl.replace(/\.git$/, '');
    }
    
    return null;
  } catch (error) {
    logger.error(`Failed to get repository URL: ${error.message}`);
    return null;
  }
}

// Parse changelog content into a structured format
function parseChangelogContent(content, version, packageName = null) {
  try {
    // Create regex pattern based on whether this is a package changelog or root changelog
    const headerPattern = packageName 
      ? `# ${packageName} ${version} \\([^)]+\\)`
      : `# ${version} \\([^)]+\\)`;
    
    // Find the section for this version
    const sectionRegex = new RegExp(`${headerPattern}([\\s\\S]*?)(?=# |$)`, 'g');
    const match = sectionRegex.exec(content);
    
    if (!match) {
      return null;
    }
    
    // Extract the section content
    const sectionContent = match[1].trim();
    
    // Parse the sections (Features, Bug Fixes, etc.)
    const sectionStructure = {};
    const sectionRegex2 = /## ([^\n]+)\n\n([\s\S]*?)(?=\n## |$)/g;
    
    let sectionMatch;
    while ((sectionMatch = sectionRegex2.exec(sectionContent)) !== null) {
      const sectionTitle = sectionMatch[1];
      const sectionEntries = sectionMatch[2].trim().split('\n').filter(line => line.trim().startsWith('*'));
      
      // Find type key from section title
      const typeKey = Object.keys(TYPES).find(key => TYPES[key].title === sectionTitle);
      if (typeKey) {
        sectionStructure[typeKey] = sectionEntries;
      } else if (sectionTitle === 'Other Changes') {
        sectionStructure.other = sectionEntries;
      }
    }
    
    return {
      sectionContent,
      sectionStructure
    };
  } catch (error) {
    logger.error(`Failed to parse changelog content: ${error.message}`);
    return null;
  }
}

// Merge two changelog structures
function mergeChangelogStructures(existing, newChanges) {
  const merged = { ...newChanges };
  
  // For each section in existing changelog
  Object.keys(existing).forEach(sectionType => {
    if (!merged[sectionType]) {
      // Section only exists in existing changelog, copy it
      merged[sectionType] = [...existing[sectionType]];
    } else {
      // Section exists in both, merge entries and remove duplicates
      const existingEntries = existing[sectionType];
      const newEntries = merged[sectionType];
      
      // Add existing entries that aren't in the new changelog
      existingEntries.forEach(entry => {
        // Normalize entry for comparison (remove leading/trailing spaces and asterisk)
        const normalizedEntry = entry.trim().replace(/^\* /, '');
        
        // Check if a similar entry exists in new entries
        const isDuplicate = newEntries.some(newEntry => {
          const normalizedNewEntry = newEntry.trim().replace(/^\* /, '');
          
          // Check for commit hash similarity
          if (normalizedEntry.includes('](') && normalizedNewEntry.includes('](')) {
            const hashRegex = /\[([a-f0-9]+)\]/;
            const existingHash = normalizedEntry.match(hashRegex);
            const newHash = normalizedNewEntry.match(hashRegex);
            
            if (existingHash && newHash && existingHash[1] === newHash[1]) {
              return true;
            }
          }
          
          // Check for description similarity
          // Remove commit hash links and issue links for comparison
          const cleanExisting = normalizedEntry
            .replace(/\([^)]+\)/g, '')  // Remove URLs
            .replace(/\[[^\]]+\]/g, '') // Remove commit hashes
            .replace(/#\d+/g, '')       // Remove issue references
            .trim();
            
          const cleanNew = normalizedNewEntry
            .replace(/\([^)]+\)/g, '')
            .replace(/\[[^\]]+\]/g, '')
            .replace(/#\d+/g, '')
            .trim();
          
          return cleanExisting === cleanNew;
        });
        
        if (!isDuplicate) {
          merged[sectionType].push(entry);
        }
      });
    }
  });
  
  return merged;
}

// Convert merged structure back to markdown
function generateMergedChangelog(version, mergedStructure, packageName = null, date = getCurrentDate()) {
  let markdown = packageName
    ? `# ${packageName} ${version} (${date})\n\n`
    : `# ${version} (${date})\n\n`;
  
  // Add each type of change in proper order
  Object.keys(TYPES).forEach(type => {
    if (mergedStructure[type] && mergedStructure[type].length > 0) {
      markdown += `## ${TYPES[type].title}\n\n`;
      
      mergedStructure[type].forEach(entry => {
        markdown += `${entry}\n`;
      });
      
      markdown += '\n';
    }
  });
  
  // Handle other changes that don't match conventional commit types
  if (mergedStructure.other && mergedStructure.other.length > 0) {
    markdown += `## Other Changes\n\n`;
    
    mergedStructure.other.forEach(entry => {
      markdown += `${entry}\n`;
    });
    
    markdown += '\n';
  }
  
  return markdown;
}

// Update the changelog files
function updateChangelogs() {
  try {
    // Get repository URL for linking commits and issues
    const repoUrl = getRepositoryUrl();
    logger.info(`Repository URL: ${repoUrl || 'Not found'}`);
    
    // Get all commits and changesets
    const gitCommits = getGitCommits();
    const changesetCommits = getChangesets();
    
    // Combine both sources
    const allCommits = [...gitCommits, ...changesetCommits];
    
    // Remove duplicates (same type, scope, and description)
    const uniqueCommits = [];
    const seen = new Set();
    
    allCommits.forEach(commit => {
      const key = `${commit.type}|${commit.scope || ''}|${commit.description}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueCommits.push(commit);
      }
    });
    
    logger.info(`Total unique commits: ${uniqueCommits.length}`);
    
    // If no commits found, log a message and return
    if (uniqueCommits.length === 0) {
      logger.warn('No commits found to generate changelog');
      return 'No changes found to generate changelog.';
    }
    
    // Get all packages
    const packages = getPackages();
    
    // For each commit, determine which packages it affects
    uniqueCommits.forEach(commit => {
      if (!commit.packages) {
        commit.packages = getAffectedPackages(commit.hash);
        logger.debug(`Commit ${commit.hash.substring(0, 7)} affects packages: ${commit.packages.join(', ') || 'none'}`);
      }
    });
    
    // Generate root changelog
    const rootVersion = getRootVersion();
    const newRootChangelog = generateChangelog(rootVersion, uniqueCommits, null, repoUrl);
    
    // Write root changelog
    let existingRootChangelog = '';
    let finalRootChangelog = newRootChangelog;
    
    try {
      if (fs.existsSync(ROOT_CHANGELOG_PATH)) {
        existingRootChangelog = fs.readFileSync(ROOT_CHANGELOG_PATH, 'utf8');
        
        // Check if there's already an entry for this version
        const versionHeaderRegex = new RegExp(`# ${rootVersion} \\([^)]+\\)([\\s\\S]*?)(?=# |$)`, 'g');
        
        if (versionHeaderRegex.test(existingRootChangelog)) {
          logger.info(`Found existing changelog entry for version ${rootVersion}, merging entries`);
          
          // Parse existing content
          const existingContent = parseChangelogContent(existingRootChangelog, rootVersion);
          
          // Parse new content - we need to create a temporary structure as if it were a file
          const tempNewContent = newRootChangelog + "# placeholder";
          const newContent = parseChangelogContent(tempNewContent, rootVersion);
          
          if (existingContent && newContent) {
            // Merge structures
            const mergedStructure = mergeChangelogStructures(
              existingContent.sectionStructure, 
              newContent.sectionStructure
            );
            
            // Generate merged markdown
            const mergedChangelog = generateMergedChangelog(rootVersion, mergedStructure);
            
            // Replace existing version section with merged content
            existingRootChangelog = existingRootChangelog.replace(versionHeaderRegex, '');
            finalRootChangelog = mergedChangelog;
          }
        }
      }
    } catch (error) {
      logger.warn(`Failed to merge existing root changelog: ${error.message}`);
      // Continue with replacement strategy as fallback
    }
    
    if (!DRY_RUN) {
      fs.writeFileSync(ROOT_CHANGELOG_PATH, finalRootChangelog + existingRootChangelog);
      logger.info(`Updated root changelog at ${ROOT_CHANGELOG_PATH}`);
    } else {
      logger.info(`[DRY RUN] Would update root changelog at ${ROOT_CHANGELOG_PATH}`);
    }
    
    // Generate package-specific changelogs
    packages.forEach(pkg => {
      // Filter commits that affect this package
      const packageCommits = uniqueCommits.filter(commit => 
        commit.packages && commit.packages.includes(pkg.name)
      );
      
      if (packageCommits.length === 0) {
        logger.info(`No changes for package ${pkg.name}, skipping changelog`);
        return;
      }
      
      const packageVersion = getPackageVersion(pkg.path);
      if (!packageVersion) {
        logger.warn(`Could not determine version for package ${pkg.name}, skipping changelog`);
        return;
      }
      
      const packageChangelogPath = path.join(pkg.path, 'CHANGELOG.md');
      const newPackageChangelog = generateChangelog(packageVersion, packageCommits, pkg.name, repoUrl);
      
      // Write package changelog
      let existingPackageChangelog = '';
      let finalPackageChangelog = newPackageChangelog;
      
      try {
        if (fs.existsSync(packageChangelogPath)) {
          existingPackageChangelog = fs.readFileSync(packageChangelogPath, 'utf8');
          
          // Check if there's already an entry for this version
          const versionHeaderRegex = new RegExp(`# ${pkg.name} ${packageVersion} \\([^)]+\\)([\\s\\S]*?)(?=# |$)`, 'g');
          
          if (versionHeaderRegex.test(existingPackageChangelog)) {
            logger.info(`Found existing changelog entry for ${pkg.name} version ${packageVersion}, merging entries`);
            
            // Parse existing content
            const existingContent = parseChangelogContent(existingPackageChangelog, packageVersion, pkg.name);
            
            // Parse new content - we need to create a temporary structure as if it were a file
            const tempNewContent = newPackageChangelog + "# placeholder";
            const newContent = parseChangelogContent(tempNewContent, packageVersion, pkg.name);
            
            if (existingContent && newContent) {
              // Merge structures
              const mergedStructure = mergeChangelogStructures(
                existingContent.sectionStructure, 
                newContent.sectionStructure
              );
              
              // Generate merged markdown
              const mergedChangelog = generateMergedChangelog(packageVersion, mergedStructure, pkg.name);
              
              // Replace existing version section with merged content
              existingPackageChangelog = existingPackageChangelog.replace(versionHeaderRegex, '');
              finalPackageChangelog = mergedChangelog;
            }
          }
        }
      } catch (error) {
        logger.warn(`Failed to merge existing changelog for ${pkg.name}: ${error.message}`);
        // Continue with replacement strategy as fallback
      }
      
      if (!DRY_RUN) {
        fs.writeFileSync(packageChangelogPath, finalPackageChangelog + existingPackageChangelog);
        logger.info(`Updated changelog for package ${pkg.name} at ${packageChangelogPath}`);
      } else {
        logger.info(`[DRY RUN] Would update changelog for package ${pkg.name} at ${packageChangelogPath}`);
      }
    });
    
    logger.info(`Changelog generation completed successfully${DRY_RUN ? ' (dry run)' : ''}`);
    
    // Return the root changelog for display
    return finalRootChangelog;
  } catch (error) {
    logger.error(`Failed to update changelogs: ${error.message}`);
    return null;
  }
}

// Main function
function main() {
  if (DRY_RUN) {
    logger.info('Starting changelog generation (DRY RUN)');
  } else {
    logger.info('Starting changelog generation');
  }
  
  const changelog = updateChangelogs();
  
  if (changelog && !QUIET_MODE) {
    console.log('\n--- Generated Changelog ---\n');
    console.log(changelog);
    console.log('\n--- End of Changelog ---\n');
  } else if (!changelog && !QUIET_MODE) {
    console.log('Failed to generate changelog. Check the log file for details.');
  }
  
  logger.info(`Log file written to ${LOG_FILE_PATH}`);
  
  return changelog ? 0 : 1;
}

// Run the main function and exit with appropriate code
process.exit(main()); 