const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Ensure assets shipped within dependencies (e.g., react-native-paper) resolve correctly.
config.resolver.assetExts = [...new Set([...config.resolver.assetExts, 'png'])];

module.exports = config;
