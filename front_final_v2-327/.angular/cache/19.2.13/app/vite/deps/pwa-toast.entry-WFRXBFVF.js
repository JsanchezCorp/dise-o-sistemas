import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-BF5TN4SU.js";
import "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/pwa-elements/dist/esm-es5/pwa-toast.entry.js
var toastCss = ':host{position:fixed;bottom:20px;left:0;right:0;display:-ms-flexbox;display:flex;opacity:0}:host(.in){-webkit-transition:opacity 300ms;transition:opacity 300ms;opacity:1}:host(.out){-webkit-transition:opacity 1s;transition:opacity 1s;opacity:0}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.toast{font-family:-apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;background-color:#eee;color:black;border-radius:5px;padding:10px 15px;font-size:14px;font-weight:500;-webkit-box-shadow:0px 1px 2px rgba(0, 0, 0, 0.20);box-shadow:0px 1px 2px rgba(0, 0, 0, 0.20)}';
var PWAToast = function() {
  function t(t2) {
    registerInstance(this, t2);
    this.message = void 0;
    this.duration = 2e3;
    this.closing = null;
  }
  t.prototype.hostData = function() {
    var t2 = {
      out: !!this.closing
    };
    if (this.closing !== null) {
      t2["in"] = !this.closing;
    }
    return {
      class: t2
    };
  };
  t.prototype.componentDidLoad = function() {
    var t2 = this;
    setTimeout(function() {
      t2.closing = false;
    });
    setTimeout(function() {
      t2.close();
    }, this.duration);
  };
  t.prototype.close = function() {
    var t2 = this;
    this.closing = true;
    setTimeout(function() {
      t2.el.parentNode.removeChild(t2.el);
    }, 1e3);
  };
  t.prototype.__stencil_render = function() {
    return h("div", {
      class: "wrapper"
    }, h("div", {
      class: "toast"
    }, this.message));
  };
  Object.defineProperty(t.prototype, "el", {
    get: function() {
      return getElement(this);
    },
    enumerable: false,
    configurable: true
  });
  t.prototype.render = function() {
    return h(Host, this.hostData(), this.__stencil_render());
  };
  return t;
}();
PWAToast.style = toastCss;
export {
  PWAToast as pwa_toast
};
//# sourceMappingURL=pwa-toast.entry-WFRXBFVF.js.map
