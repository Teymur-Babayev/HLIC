import { createRequire as v } from "node:module";
import h from "@rollup/plugin-inject";
import y from "node-stdlib-browser";
import { handleCircularDependancyWarning as _ } from "node-stdlib-browser/helpers/rollup/plugin";
import B from "node-stdlib-browser/helpers/esbuild/plugin";
const g = (e, r) => u(e) === u(r), i = (e, r) => e ? e === !0 ? !0 : e === r : !1, x = (e) => e.startsWith("node:"), T = (e) => {
  const r = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${r}$`);
}, u = (e) => e.replace(/^node:/, ""), a = [
  "import __buffer_polyfill from 'vite-plugin-node-polyfills/shims/buffer'",
  "import __global_polyfill from 'vite-plugin-node-polyfills/shims/global'",
  "import __process_polyfill from 'vite-plugin-node-polyfills/shims/process'",
  "",
  "globalThis.Buffer = globalThis.Buffer || __buffer_polyfill",
  "globalThis.global = globalThis.global || __global_polyfill",
  "globalThis.process = globalThis.process || __process_polyfill",
  ""
].join(`
`), w = (e = {}) => {
  const r = v(import.meta.url), f = [
    r.resolve("vite-plugin-node-polyfills/shims/buffer"),
    r.resolve("vite-plugin-node-polyfills/shims/global"),
    r.resolve("vite-plugin-node-polyfills/shims/process")
  ], l = {
    include: [],
    exclude: [],
    overrides: {},
    protocolImports: !0,
    ...e,
    globals: {
      Buffer: !0,
      global: !0,
      process: !0,
      ...e.globals
    }
  }, c = (o) => l.include.length > 0 ? !l.include.some((s) => g(o, s)) : l.exclude.some((s) => g(o, s)), d = (o) => {
    if (i(l.globals.Buffer, "dev") && /^buffer$/.test(o))
      return "vite-plugin-node-polyfills/shims/buffer";
    if (i(l.globals.global, "dev") && /^global$/.test(o))
      return "vite-plugin-node-polyfills/shims/global";
    if (i(l.globals.process, "dev") && /^process$/.test(o))
      return "vite-plugin-node-polyfills/shims/process";
    if (o in l.overrides)
      return l.overrides[o];
  }, b = Object.entries(y).reduce((o, [s, t]) => (!l.protocolImports && x(s) || c(s) || (o[s] = d(u(s)) || t), o), {});
  return {
    name: "vite-plugin-node-polyfills",
    config: (o, s) => {
      const t = s.command === "serve";
      return {
        build: {
          rollupOptions: {
            onwarn: (n, p) => {
              _(n, () => {
                if (o.build?.rollupOptions?.onwarn)
                  return o.build.rollupOptions.onwarn(n, p);
                p(n);
              });
            },
            plugins: [
              {
                ...h({
                  // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md#vite
                  ...i(l.globals.Buffer, "build") ? { Buffer: "vite-plugin-node-polyfills/shims/buffer" } : {},
                  ...i(l.globals.global, "build") ? { global: "vite-plugin-node-polyfills/shims/global" } : {},
                  ...i(l.globals.process, "build") ? { process: "vite-plugin-node-polyfills/shims/process" } : {}
                })
              }
            ]
          }
        },
        esbuild: {
          // In dev, the global polyfills need to be injected as a banner in order for isolated scripts (such as Vue SFCs) to have access to them.
          banner: t ? a : void 0
        },
        optimizeDeps: {
          exclude: [
            ...f
          ],
          esbuildOptions: {
            banner: t ? { js: a } : void 0,
            // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md?plain=1#L203-L209
            define: {
              ...t && i(l.globals.Buffer, "dev") ? { Buffer: "Buffer" } : {},
              ...t && i(l.globals.global, "dev") ? { global: "global" } : {},
              ...t && i(l.globals.process, "dev") ? { process: "process" } : {}
            },
            inject: [
              ...f
            ],
            plugins: [
              B(b),
              // Supress the 'injected path "..." cannot be marked as external' error in Vite 4 (emitted by esbuild).
              // https://github.com/evanw/esbuild/blob/edede3c49ad6adddc6ea5b3c78c6ea7507e03020/internal/bundler/bundler.go#L1469
              {
                name: "vite-plugin-node-polyfills-shims-resolver",
                setup(n) {
                  for (const p of f) {
                    const m = T(p);
                    n.onResolve({ filter: m }, () => ({
                      // https://github.com/evanw/esbuild/blob/edede3c49ad6adddc6ea5b3c78c6ea7507e03020/internal/bundler/bundler.go#L1468
                      external: !1,
                      path: p
                    }));
                  }
                }
              }
            ]
          }
        },
        resolve: {
          // https://github.com/niksy/node-stdlib-browser/blob/3e7cd7f3d115ac5c4593b550e7d8c4a82a0d4ac4/README.md?plain=1#L150
          alias: {
            ...b
          }
        }
      };
    }
  };
};
export {
  w as nodePolyfills
};
//# sourceMappingURL=index.js.map
