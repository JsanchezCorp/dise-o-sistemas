import {
  bootstrapLazy,
  promiseResolve,
  setNonce
} from "./chunk-BF5TN4SU.js";
import "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/pwa-elements/dist/esm/polyfills/index.js
function applyPolyfills() {
  var promises = [];
  if (typeof window !== "undefined") {
    var win = window;
    if (!win.customElements || win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove || !win.Element.prototype.getRootNode)) {
      promises.push(import(
        /* webpackChunkName: "polyfills-dom" */
        "./dom-E5QJVCWU.js"
      ));
    }
    var checkIfURLIsSupported = function() {
      try {
        var u = new URL("b", "http://a");
        u.pathname = "c%20d";
        return u.href === "http://a/c%20d" && u.searchParams;
      } catch (e) {
        return false;
      }
    };
    if ("function" !== typeof Object.assign || !Object.entries || !Array.prototype.find || !Array.prototype.includes || !String.prototype.startsWith || !String.prototype.endsWith || win.NodeList && !win.NodeList.prototype.forEach || !win.fetch || !checkIfURLIsSupported() || typeof WeakMap == "undefined") {
      promises.push(import(
        /* webpackChunkName: "polyfills-core-js" */
        "./core-js-N4INUHSW.js"
      ));
    }
  }
  return Promise.all(promises);
}

// node_modules/@ionic/pwa-elements/dist/esm-es5/loader.js
var patchEsm = function() {
  return promiseResolve();
};
var defineCustomElements = function(e, o) {
  if (typeof window === "undefined") return Promise.resolve();
  return patchEsm().then(function() {
    return bootstrapLazy([["pwa-camera-modal", [[1, "pwa-camera-modal", {
      facingMode: [1, "facing-mode"],
      hidePicker: [4, "hide-picker"],
      present: [64],
      dismiss: [64]
    }]]], ["pwa-action-sheet", [[1, "pwa-action-sheet", {
      header: [1],
      cancelable: [4],
      options: [16],
      open: [32]
    }]]], ["pwa-toast", [[1, "pwa-toast", {
      message: [1],
      duration: [2],
      closing: [32]
    }]]], ["pwa-camera", [[1, "pwa-camera", {
      facingMode: [1, "facing-mode"],
      handlePhoto: [16],
      hidePicker: [4, "hide-picker"],
      handleNoDeviceError: [16],
      noDevicesText: [1, "no-devices-text"],
      noDevicesButtonText: [1, "no-devices-button-text"],
      photo: [32],
      photoSrc: [32],
      showShutterOverlay: [32],
      flashIndex: [32],
      hasCamera: [32],
      rotation: [32],
      deviceError: [32]
    }]]], ["pwa-camera-modal-instance", [[1, "pwa-camera-modal-instance", {
      facingMode: [1, "facing-mode"],
      hidePicker: [4, "hide-picker"],
      noDevicesText: [1, "no-devices-text"],
      noDevicesButtonText: [1, "no-devices-button-text"]
    }, [[16, "keyup", "handleBackdropKeyUp"]]]]]], o);
  });
};

// node_modules/@ionic/pwa-elements/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();
export {
  applyPolyfills,
  defineCustomElements,
  setNonce
};
//# sourceMappingURL=@ionic_pwa-elements_loader.js.map
