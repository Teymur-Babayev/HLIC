'use client';
import { extends as _extends } from './_virtual/_rollupPluginBabelHelpers.mjs';
import * as React from 'react';
import { persistQueryClientRestore, persistQueryClientSubscribe } from '@tanstack/query-persist-client-core';
import { QueryClientProvider, IsRestoringProvider } from '@tanstack/react-query';

const PersistQueryClientProvider = ({
  client,
  children,
  persistOptions,
  onSuccess,
  ...props
}) => {
  const [isRestoring, setIsRestoring] = React.useState(true);
  const refs = React.useRef({
    persistOptions,
    onSuccess
  });
  const didRestore = React.useRef(false);
  React.useEffect(() => {
    refs.current = {
      persistOptions,
      onSuccess
    };
  });
  React.useEffect(() => {
    const options = { ...refs.current.persistOptions,
      queryClient: client
    };

    if (!didRestore.current) {
      didRestore.current = true;
      setIsRestoring(true);
      persistQueryClientRestore(options).then(async () => {
        try {
          await (refs.current.onSuccess == null ? void 0 : refs.current.onSuccess());
        } finally {
          setIsRestoring(false);
        }
      });
    }

    return isRestoring ? undefined : persistQueryClientSubscribe(options);
  }, [client, isRestoring]);
  return /*#__PURE__*/React.createElement(QueryClientProvider, _extends({
    client: client
  }, props), /*#__PURE__*/React.createElement(IsRestoringProvider, {
    value: isRestoring
  }, children));
};

export { PersistQueryClientProvider };
//# sourceMappingURL=PersistQueryClientProvider.mjs.map
