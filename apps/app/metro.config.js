const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')
const { FileStore } = require('metro-cache')

// Find the project and workspace directories
const projectRoot = __dirname
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot]
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
]

config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
  }),
]

// Enable Symlinks and Package Exports
config.resolver.unstable_enableSymlinks = true
config.resolver.unstable_enablePackageExports = true

// Use browser package
config.resolver.unstable_conditionNames = ['require', 'react-native', 'browser']

// Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true

module.exports = config
