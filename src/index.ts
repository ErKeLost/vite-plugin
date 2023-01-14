import { resolveDefaultOptions } from './core/compressOptions';
import type { PluginOptions } from './core/types';
import { createUnplugin } from 'unplugin';
import Context from './core/context';
const PLUGIN_NAME = 'unplugin:webpack';
// squoosh navigator error
delete globalThis.navigator;
export default createUnplugin((options: PluginOptions = {}): any => {
  const ctx = new Context();
  // eslint-disable-next-line prefer-object-spread
  const assignOptions = Object.assign({}, resolveDefaultOptions, options);
  return {
    name: 'unplugin-imagemin',
    apply: 'build',
    enforce: 'pre',
    async configResolved(config) {
      ctx.handleMergeOptionHook({ ...config, options: assignOptions });
    },
    // vite: {
    async load(id) {
      if (assignOptions.beforeBundle) {
        const imageModule = ctx.loadBundleHook(id);
        if (imageModule) {
          return imageModule;
        }
      }
    },
    // },
    webpack(complier) {
      complier.hooks.done.tap(PLUGIN_NAME, () => {});
    },
    async generateBundle(_, bundler) {
      if (assignOptions.beforeBundle) {
        await ctx.generateBundleHook(bundler);
      } else {
        ctx.TransformChunksHook(bundler);
      }
    },
    async closeBundle() {
      ctx.closeBundleHook();
    },
  };
});
