#!/usr/bin/env node

import esbuild from 'esbuild'

const prod = process.argv.indexOf('prod') !== -1

esbuild
  .build({
    bundle: true,
    entryPoints: {
      'popup.build': './extension/popup.jsx',
      'styles.build': './extension/styles.css',
      'prompt.build': './extension/prompt.jsx',
      'options.build': './extension/options.jsx',
      'background.build': './extension/background.js',
      'content-script.build': './extension/content-script.js'
    },
    outdir: './extension',
    sourcemap: prod ? false : 'inline',
    define: {
      window: 'self',
      global: 'self'
    },
    loader: {
      '.js': 'jsx', // Ensure jsx loader for js files
      '.ts': 'ts',  // Use the TypeScript loader for .ts files
      '.tsx': 'tsx' // Use the TypeScript loader for .tsx files
    }
  })
  .then(() => console.log('build success.'))
