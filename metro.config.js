/* eslint-disable */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const {
    resolver: {
        sourceExts,
        assetExts
    }
} = getDefaultConfig();

const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [ ...sourceExts, 'svg' ],
        // Allow Metro to resolve symlinked modules (e.g., local react-native-webrtc)
        unstable_enableSymlinks: true,
        // Ensure peer deps of symlinked packages resolve from the app
        extraNodeModules: {
            'react-native': path.resolve(__dirname, 'node_modules/react-native'),
            'react': path.resolve(__dirname, 'node_modules/react')
        }
    },
    // Ensure Metro watches the local package folder so the symlink is followed
    watchFolders: [
        path.resolve(__dirname, '../JitsiWebRTC/ios'),
        path.resolve(__dirname, '../react-native-webrtc')
    ]
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
