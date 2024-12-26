import _objectSpread from '@babel/runtime/helpers/objectSpread2';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { SafeEventEmitter } from '@toruslabs/openlogin-jrpc';
import { ADAPTER_STATUS, WalletInitializationError, log, CHAIN_NAMESPACES, storageAvailable, getChainConfig, ADAPTER_NAMESPACES, WalletLoginError, ADAPTER_EVENTS } from '@web3auth/base';
import { PLUGIN_NAMESPACES } from '@web3auth/base-plugin';
import { CommonJRPCProvider } from '@web3auth/base-provider';

const ADAPTER_CACHE_KEY = "Web3Auth-cachedAdapter";
class Web3AuthNoModal extends SafeEventEmitter {
  constructor(options) {
    var _options$chainConfig, _options$chainConfig2, _options$chainConfig3, _options$chainConfig4;
    super();
    _defineProperty(this, "coreOptions", void 0);
    _defineProperty(this, "connectedAdapterName", null);
    _defineProperty(this, "status", ADAPTER_STATUS.NOT_READY);
    _defineProperty(this, "cachedAdapter", null);
    _defineProperty(this, "walletAdapters", {});
    _defineProperty(this, "commonJRPCProvider", null);
    _defineProperty(this, "plugins", {});
    _defineProperty(this, "storage", "localStorage");
    if (!options.clientId) throw WalletInitializationError.invalidParams("Please provide a valid clientId in constructor");
    if (options.enableLogging) log.enableAll();else log.setLevel("error");
    if (!((_options$chainConfig = options.chainConfig) !== null && _options$chainConfig !== void 0 && _options$chainConfig.chainNamespace) || !Object.values(CHAIN_NAMESPACES).includes((_options$chainConfig2 = options.chainConfig) === null || _options$chainConfig2 === void 0 ? void 0 : _options$chainConfig2.chainNamespace)) throw WalletInitializationError.invalidParams("Please provide a valid chainNamespace in chainConfig");
    if (options.storageKey === "session") this.storage = "sessionStorage";
    this.cachedAdapter = storageAvailable(this.storage) ? window[this.storage].getItem(ADAPTER_CACHE_KEY) : null;
    this.coreOptions = _objectSpread(_objectSpread({}, options), {}, {
      chainConfig: _objectSpread(_objectSpread({}, getChainConfig((_options$chainConfig3 = options.chainConfig) === null || _options$chainConfig3 === void 0 ? void 0 : _options$chainConfig3.chainNamespace, (_options$chainConfig4 = options.chainConfig) === null || _options$chainConfig4 === void 0 ? void 0 : _options$chainConfig4.chainId) || {}), options.chainConfig)
    });
    this.subscribeToAdapterEvents = this.subscribeToAdapterEvents.bind(this);
  }
  get connected() {
    return Boolean(this.connectedAdapterName);
  }
  get provider() {
    if (this.status !== ADAPTER_STATUS.NOT_READY && this.commonJRPCProvider) {
      return this.commonJRPCProvider;
    }
    return null;
  }
  set provider(_) {
    throw new Error("Not implemented");
  }
  async init() {
    this.commonJRPCProvider = await CommonJRPCProvider.getProviderInstance({
      chainConfig: this.coreOptions.chainConfig
    });
    const initPromises = Object.keys(this.walletAdapters).map(adapterName => {
      this.subscribeToAdapterEvents(this.walletAdapters[adapterName]);
      // if adapter doesn't have any chain config yet thn set it based on provided namespace and chainId.
      // if no chainNamespace or chainId is being provided, it will connect with mainnet.
      if (!this.walletAdapters[adapterName].chainConfigProxy) {
        const providedChainConfig = this.coreOptions.chainConfig;
        if (!providedChainConfig.chainNamespace) throw WalletInitializationError.invalidParams("Please provide chainNamespace in chainConfig");
        this.walletAdapters[adapterName].setAdapterSettings({
          chainConfig: providedChainConfig,
          sessionTime: this.coreOptions.sessionTime,
          clientId: this.coreOptions.clientId,
          web3AuthNetwork: this.coreOptions.web3AuthNetwork,
          useCoreKitKey: this.coreOptions.useCoreKitKey
        });
      } else {
        this.walletAdapters[adapterName].setAdapterSettings({
          sessionTime: this.coreOptions.sessionTime,
          clientId: this.coreOptions.clientId,
          web3AuthNetwork: this.coreOptions.web3AuthNetwork,
          useCoreKitKey: this.coreOptions.useCoreKitKey
        });
      }
      return this.walletAdapters[adapterName].init({
        autoConnect: this.cachedAdapter === adapterName
      }).catch(e => log.error(e));
    });
    this.status = ADAPTER_STATUS.READY;
    await Promise.all(initPromises);
  }
  configureAdapter(adapter) {
    this.checkInitRequirements();
    const providedChainConfig = this.coreOptions.chainConfig;
    if (!providedChainConfig.chainNamespace) throw WalletInitializationError.invalidParams("Please provide chainNamespace in chainConfig");
    const adapterAlreadyExists = this.walletAdapters[adapter.name];
    if (adapterAlreadyExists) throw WalletInitializationError.duplicateAdapterError(`Wallet adapter for ${adapter.name} already exists`);
    if (adapter.adapterNamespace !== ADAPTER_NAMESPACES.MULTICHAIN && adapter.adapterNamespace !== providedChainConfig.chainNamespace) throw WalletInitializationError.incompatibleChainNameSpace(`This wallet adapter belongs to ${adapter.adapterNamespace} which is incompatible with currently used namespace: ${providedChainConfig.chainNamespace}`);
    if (adapter.adapterNamespace === ADAPTER_NAMESPACES.MULTICHAIN && adapter.currentChainNamespace && providedChainConfig.chainNamespace !== adapter.currentChainNamespace) {
      // chainConfig checks are already validated in constructor so using typecast is safe here.
      adapter.setAdapterSettings({
        chainConfig: providedChainConfig
      });
    }
    this.walletAdapters[adapter.name] = adapter;
    return this;
  }
  clearCache() {
    if (!storageAvailable(this.storage)) return;
    window[this.storage].removeItem(ADAPTER_CACHE_KEY);
    this.cachedAdapter = null;
  }
  async addChain(chainConfig) {
    if (this.status === ADAPTER_STATUS.CONNECTED && this.connectedAdapterName) return this.walletAdapters[this.connectedAdapterName].addChain(chainConfig);
    if (this.commonJRPCProvider) {
      return this.commonJRPCProvider.addChain(chainConfig);
    }
    throw WalletInitializationError.notReady(`No wallet is ready`);
  }
  async switchChain(params) {
    if (this.status === ADAPTER_STATUS.CONNECTED && this.connectedAdapterName) return this.walletAdapters[this.connectedAdapterName].switchChain(params);
    if (this.commonJRPCProvider) {
      return this.commonJRPCProvider.switchChain(params);
    }
    throw WalletInitializationError.notReady(`No wallet is ready`);
  }

  /**
   * Connect to a specific wallet adapter
   * @param walletName - Key of the walletAdapter to use.
   */
  async connectTo(walletName, loginParams) {
    if (!this.walletAdapters[walletName] || !this.commonJRPCProvider) throw WalletInitializationError.notFound(`Please add wallet adapter for ${walletName} wallet, before connecting`);
    const provider = await this.walletAdapters[walletName].connect(loginParams);
    this.commonJRPCProvider.updateProviderEngineProxy(provider.provider || provider);
    return this.provider;
  }
  async logout() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      cleanup: false
    };
    if (this.status !== ADAPTER_STATUS.CONNECTED || !this.connectedAdapterName) throw WalletLoginError.notConnectedError(`No wallet is connected`);
    await this.walletAdapters[this.connectedAdapterName].disconnect(options);
  }
  async getUserInfo() {
    log.debug("Getting user info", this.status, this.connectedAdapterName);
    if (this.status !== ADAPTER_STATUS.CONNECTED || !this.connectedAdapterName) throw WalletLoginError.notConnectedError(`No wallet is connected`);
    return this.walletAdapters[this.connectedAdapterName].getUserInfo();
  }
  async authenticateUser() {
    if (this.status !== ADAPTER_STATUS.CONNECTED || !this.connectedAdapterName) throw WalletLoginError.notConnectedError(`No wallet is connected`);
    return this.walletAdapters[this.connectedAdapterName].authenticateUser();
  }
  async addPlugin(plugin) {
    if (this.plugins[plugin.name]) throw new Error(`Plugin ${plugin.name} already exist`);
    if (plugin.pluginNamespace !== PLUGIN_NAMESPACES.MULTICHAIN && plugin.pluginNamespace !== this.coreOptions.chainConfig.chainNamespace) throw new Error(`This plugin belongs to ${plugin.pluginNamespace} namespace which is incompatible with currently used namespace: ${this.coreOptions.chainConfig.chainNamespace}`);
    this.plugins[plugin.name] = plugin;
    return this;
  }
  subscribeToAdapterEvents(walletAdapter) {
    walletAdapter.on(ADAPTER_EVENTS.CONNECTED, async data => {
      if (!this.commonJRPCProvider) throw WalletInitializationError.notFound(`CommonJrpcProvider not found`);
      const {
        provider
      } = this.walletAdapters[data.adapter];
      this.commonJRPCProvider.updateProviderEngineProxy(provider.provider || provider);
      this.status = ADAPTER_STATUS.CONNECTED;
      this.connectedAdapterName = data.adapter;
      this.cacheWallet(data.adapter);
      log.debug("connected", this.status, this.connectedAdapterName);
      Object.values(this.plugins).map(async plugin => {
        try {
          if (!plugin.SUPPORTED_ADAPTERS.includes(data.adapter)) {
            return;
          }
          await plugin.initWithWeb3Auth(this);
          await plugin.connect();
        } catch (error) {
          // swallow error if connector adapter doesn't supports this plugin.
          if (error.code === 5211) {
            return;
          }
          log.error(error);
        }
      });
      this.emit(ADAPTER_EVENTS.CONNECTED, _objectSpread({}, data));
    });
    walletAdapter.on(ADAPTER_EVENTS.DISCONNECTED, async data => {
      // get back to ready state for rehydrating.
      this.status = ADAPTER_STATUS.READY;
      if (storageAvailable(this.storage)) {
        const cachedAdapter = window[this.storage].getItem(ADAPTER_CACHE_KEY);
        if (this.connectedAdapterName === cachedAdapter) {
          this.clearCache();
        }
      }
      log.debug("disconnected", this.status, this.connectedAdapterName);
      await Promise.all(Object.values(this.plugins).map(plugin => {
        return plugin.disconnect().catch(error => {
          // swallow error if adapter doesn't supports this plugin.
          if (error.code === 5211) {
            return;
          }
          // throw error;
          log.error(error);
        });
      }));
      this.connectedAdapterName = null;
      this.emit(ADAPTER_EVENTS.DISCONNECTED, data);
    });
    walletAdapter.on(ADAPTER_EVENTS.CONNECTING, data => {
      this.status = ADAPTER_STATUS.CONNECTING;
      this.emit(ADAPTER_EVENTS.CONNECTING, data);
      log.debug("connecting", this.status, this.connectedAdapterName);
    });
    walletAdapter.on(ADAPTER_EVENTS.ERRORED, data => {
      this.status = ADAPTER_STATUS.ERRORED;
      this.clearCache();
      this.emit(ADAPTER_EVENTS.ERRORED, data);
      log.debug("errored", this.status, this.connectedAdapterName);
    });
    walletAdapter.on(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, data => {
      log.debug("adapter data updated", data);
      this.emit(ADAPTER_EVENTS.ADAPTER_DATA_UPDATED, data);
    });
    walletAdapter.on(ADAPTER_EVENTS.CACHE_CLEAR, data => {
      log.debug("adapter cache clear", data);
      if (storageAvailable(this.storage)) {
        this.clearCache();
      }
    });
  }
  checkInitRequirements() {
    if (this.status === ADAPTER_STATUS.CONNECTING) throw WalletInitializationError.notReady("Already pending connection");
    if (this.status === ADAPTER_STATUS.CONNECTED) throw WalletInitializationError.notReady("Already connected");
    if (this.status === ADAPTER_STATUS.READY) throw WalletInitializationError.notReady("Adapter is already initialized");
  }
  cacheWallet(walletName) {
    if (!storageAvailable(this.storage)) return;
    window[this.storage].setItem(ADAPTER_CACHE_KEY, walletName);
    this.cachedAdapter = walletName;
  }
}

export { Web3AuthNoModal };
//# sourceMappingURL=noModal.esm.js.map
