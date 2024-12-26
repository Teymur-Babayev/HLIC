'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var queryPersistClientCore = require('@tanstack/query-persist-client-core');
var reactQuery = require('@tanstack/react-query');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

const PersistQueryClientProvider = ({
  client,
  children,
  persistOptions,
  onSuccess,
  ...props
}) => {
  const [isRestoring, setIsRestoring] = React__namespace.useState(true);
  const refs = React__namespace.useRef({
    persistOptions,
    onSuccess
  });
  const didRestore = React__namespace.useRef(false);
  React__namespace.useEffect(() => {
    refs.current = {
      persistOptions,
      onSuccess
    };
  });
  React__namespace.useEffect(() => {
    const options = { ...refs.current.persistOptions,
      queryClient: client
    };

    if (!didRestore.current) {
      didRestore.current = true;
      setIsRestoring(true);
      queryPersistClientCore.persistQueryClientRestore(options).then(async () => {
        try {
          await (refs.current.onSuccess == null ? void 0 : refs.current.onSuccess());
        } finally {
          setIsRestoring(false);
        }
      });
    }

    return isRestoring ? undefined : queryPersistClientCore.persistQueryClientSubscribe(options);
  }, [client, isRestoring]);
  return /*#__PURE__*/React__namespace.createElement(reactQuery.QueryClientProvider, _rollupPluginBabelHelpers["extends"]({
    client: client
  }, props), /*#__PURE__*/React__namespace.createElement(reactQuery.IsRestoringProvider, {
    value: isRestoring
  }, children));
};

exports.PersistQueryClientProvider = PersistQueryClientProvider;
//# sourceMappingURL=PersistQueryClientProvider.js.map
