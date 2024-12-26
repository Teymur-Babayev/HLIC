"use strict";
/**
 * Returns a Promise that resolves to the value of window.ethereum if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'ethereum#initialized' to
 * be dispatched. Default: 3000
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
function detectEthereumProvider({ mustBeMetaMask = false, silent = false, timeout = 3000, } = {}) {
    _validateInputs();
    let handled = false;
    return new Promise((resolve) => {
        if (window.ethereum) {
            handleEthereum();
        }
        else {
            window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
            setTimeout(() => {
                handleEthereum();
            }, timeout);
        }
        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;
            window.removeEventListener('ethereum#initialized', handleEthereum);
            const { ethereum } = window;
            if (ethereum && (!mustBeMetaMask || ethereum.isMetaMask)) {
                resolve(ethereum);
            }
            else {
                const message = mustBeMetaMask && ethereum
                    ? 'Non-MetaMask window.ethereum detected.'
                    : 'Unable to detect window.ethereum.';
                !silent && console.error('@metamask/detect-provider:', message);
                resolve(null);
            }
        }
    });
    function _validateInputs() {
        if (typeof mustBeMetaMask !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== 'boolean') {
            throw new Error(`@metamask/detect-provider: Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== 'number') {
            throw new Error(`@metamask/detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}
module.exports = detectEthereumProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWdCQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUFTLHNCQUFzQixDQUErQixFQUM1RCxjQUFjLEdBQUcsS0FBSyxFQUN0QixNQUFNLEdBQUcsS0FBSyxFQUNkLE9BQU8sR0FBRyxJQUFJLEdBQ2YsR0FBRyxFQUFFO0lBRUosZUFBZSxFQUFFLENBQUM7SUFFbEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixJQUFLLE1BQWlCLENBQUMsUUFBUSxFQUFFO1lBRS9CLGNBQWMsRUFBRSxDQUFDO1NBRWxCO2FBQU07WUFFTCxNQUFNLENBQUMsZ0JBQWdCLENBQ3JCLHNCQUFzQixFQUN0QixjQUFjLEVBQ2QsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQ2YsQ0FBQztZQUVGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsY0FBYyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2I7UUFFRCxTQUFTLGNBQWM7WUFFckIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTzthQUNSO1lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUVmLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQztZQUVuRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBZ0IsQ0FBQztZQUV0QyxJQUFJLFFBQVEsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDeEQsT0FBTyxDQUFDLFFBQXdCLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFFTCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksUUFBUTtvQkFDeEMsQ0FBQyxDQUFDLHdDQUF3QztvQkFDMUMsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDO2dCQUV4QyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsZUFBZTtRQUN0QixJQUFJLE9BQU8sY0FBYyxLQUFLLFNBQVMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7U0FDakc7UUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7U0FDekY7UUFDRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLHNFQUFzRSxDQUFDLENBQUM7U0FDekY7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQWxGRCxpQkFBUyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBNZXRhTWFza0V0aGVyZXVtUHJvdmlkZXIge1xuICBpc01ldGFNYXNrPzogYm9vbGVhbjtcbiAgb25jZShldmVudE5hbWU6IHN0cmluZyB8IHN5bWJvbCwgbGlzdGVuZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHRoaXM7XG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nIHwgc3ltYm9sLCBsaXN0ZW5lcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogdGhpcztcbiAgb2ZmKGV2ZW50TmFtZTogc3RyaW5nIHwgc3ltYm9sLCBsaXN0ZW5lcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogdGhpcztcbiAgYWRkTGlzdGVuZXIoZXZlbnROYW1lOiBzdHJpbmcgfCBzeW1ib2wsIGxpc3RlbmVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQpOiB0aGlzO1xuICByZW1vdmVMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZyB8IHN5bWJvbCwgbGlzdGVuZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCk6IHRoaXM7XG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudD86IHN0cmluZyB8IHN5bWJvbCk6IHRoaXM7XG59XG5cbmludGVyZmFjZSBXaW5kb3cge1xuICBldGhlcmV1bT86IE1ldGFNYXNrRXRoZXJldW1Qcm92aWRlcjtcbn1cblxuZXhwb3J0ID0gZGV0ZWN0RXRoZXJldW1Qcm92aWRlcjtcblxuLyoqXG4gKiBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSB2YWx1ZSBvZiB3aW5kb3cuZXRoZXJldW0gaWYgaXQgaXNcbiAqIHNldCB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQsIG9yIG51bGwuXG4gKiBUaGUgUHJvbWlzZSB3aWxsIG5vdCByZWplY3QsIGJ1dCBhbiBlcnJvciB3aWxsIGJlIHRocm93biBpZiBpbnZhbGlkIG9wdGlvbnNcbiAqIGFyZSBwcm92aWRlZC5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgYmFnLlxuICogQHBhcmFtIG9wdGlvbnMubXVzdEJlTWV0YU1hc2sgLSBXaGV0aGVyIHRvIG9ubHkgbG9vayBmb3IgTWV0YU1hc2sgcHJvdmlkZXJzLlxuICogRGVmYXVsdDogZmFsc2VcbiAqIEBwYXJhbSBvcHRpb25zLnNpbGVudCAtIFdoZXRoZXIgdG8gc2lsZW5jZSBjb25zb2xlIGVycm9ycy4gRG9lcyBub3QgYWZmZWN0XG4gKiB0aHJvd24gZXJyb3JzLiBEZWZhdWx0OiBmYWxzZVxuICogQHBhcmFtIG9wdGlvbnMudGltZW91dCAtIE1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciAnZXRoZXJldW0jaW5pdGlhbGl6ZWQnIHRvXG4gKiBiZSBkaXNwYXRjaGVkLiBEZWZhdWx0OiAzMDAwXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBQcm92aWRlciBpZiBpdCBpcyBkZXRlY3RlZCB3aXRoaW5cbiAqIGdpdmVuIHRpbWVvdXQsIG90aGVyd2lzZSBudWxsLlxuICovXG5mdW5jdGlvbiBkZXRlY3RFdGhlcmV1bVByb3ZpZGVyPFQgPSBNZXRhTWFza0V0aGVyZXVtUHJvdmlkZXI+KHtcbiAgbXVzdEJlTWV0YU1hc2sgPSBmYWxzZSxcbiAgc2lsZW50ID0gZmFsc2UsXG4gIHRpbWVvdXQgPSAzMDAwLFxufSA9IHt9KTogUHJvbWlzZTxUIHwgbnVsbD4ge1xuXG4gIF92YWxpZGF0ZUlucHV0cygpO1xuXG4gIGxldCBoYW5kbGVkID0gZmFsc2U7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKCh3aW5kb3cgYXMgV2luZG93KS5ldGhlcmV1bSkge1xuXG4gICAgICBoYW5kbGVFdGhlcmV1bSgpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdldGhlcmV1bSNpbml0aWFsaXplZCcsXG4gICAgICAgIGhhbmRsZUV0aGVyZXVtLFxuICAgICAgICB7IG9uY2U6IHRydWUgfSxcbiAgICAgICk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBoYW5kbGVFdGhlcmV1bSgpO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRXRoZXJldW0oKSB7XG5cbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXRoZXJldW0jaW5pdGlhbGl6ZWQnLCBoYW5kbGVFdGhlcmV1bSk7XG5cbiAgICAgIGNvbnN0IHsgZXRoZXJldW0gfSA9IHdpbmRvdyBhcyBXaW5kb3c7XG5cbiAgICAgIGlmIChldGhlcmV1bSAmJiAoIW11c3RCZU1ldGFNYXNrIHx8IGV0aGVyZXVtLmlzTWV0YU1hc2spKSB7XG4gICAgICAgIHJlc29sdmUoZXRoZXJldW0gYXMgdW5rbm93biBhcyBUKTtcbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IG11c3RCZU1ldGFNYXNrICYmIGV0aGVyZXVtXG4gICAgICAgICAgPyAnTm9uLU1ldGFNYXNrIHdpbmRvdy5ldGhlcmV1bSBkZXRlY3RlZC4nXG4gICAgICAgICAgOiAnVW5hYmxlIHRvIGRldGVjdCB3aW5kb3cuZXRoZXJldW0uJztcblxuICAgICAgICAhc2lsZW50ICYmIGNvbnNvbGUuZXJyb3IoJ0BtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6JywgbWVzc2FnZSk7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBfdmFsaWRhdGVJbnB1dHMoKSB7XG4gICAgaWYgKHR5cGVvZiBtdXN0QmVNZXRhTWFzayAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEBtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6IEV4cGVjdGVkIG9wdGlvbiAnbXVzdEJlTWV0YU1hc2snIHRvIGJlIGEgYm9vbGVhbi5gKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzaWxlbnQgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBAbWV0YW1hc2svZGV0ZWN0LXByb3ZpZGVyOiBFeHBlY3RlZCBvcHRpb24gJ3NpbGVudCcgdG8gYmUgYSBib29sZWFuLmApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRpbWVvdXQgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEBtZXRhbWFzay9kZXRlY3QtcHJvdmlkZXI6IEV4cGVjdGVkIG9wdGlvbiAndGltZW91dCcgdG8gYmUgYSBudW1iZXIuYCk7XG4gICAgfVxuICB9XG59XG4iXX0=