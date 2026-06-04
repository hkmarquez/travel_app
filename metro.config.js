//// Learn more https://docs.expo.io/guides/customizing-metro
//const { getDefaultConfig } = require('expo/metro-config');
//
//const config = getDefaultConfig(__dirname);
//
//config.resolver.assetExts.push(
//  // Adds support for `.db` files for SQLite databases
//  'cjs'
//);
//
//module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;