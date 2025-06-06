import {
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-BF5TN4SU.js";
import "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/pwa-elements/dist/esm-es5/pwa-action-sheet.entry.js
var actionSheetCss = ':host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Roboto", sans-serif}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0);-webkit-transition:400ms background-color cubic-bezier(.36,.66,.04,1);transition:400ms background-color cubic-bezier(.36,.66,.04,1)}.wrapper.open{background-color:rgba(0, 0, 0, 0.32)}.title{color:#999;height:23px;line-height:23px;padding-bottom:17px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:20px}.content{width:568px;-ms-flex-item-align:end;align-self:flex-end;background-color:#fff;-webkit-transition:400ms -webkit-transform cubic-bezier(.36,.66,.04,1);transition:400ms -webkit-transform cubic-bezier(.36,.66,.04,1);transition:400ms transform cubic-bezier(.36,.66,.04,1);transition:400ms transform cubic-bezier(.36,.66,.04,1), 400ms -webkit-transform cubic-bezier(.36,.66,.04,1);-webkit-transform:translateY(100%);transform:translateY(100%)}.wrapper.open .content{-webkit-transform:translateY(0%);transform:translateY(0%)}@media only screen and (max-width: 568px){.content{width:100%}}.action-sheet-option{cursor:pointer;height:52px;line-height:52px}.action-sheet-button{color:rgb(38, 38, 38);font-size:16px;-webkit-padding-end:16px;padding-inline-end:16px;-webkit-padding-start:16px;padding-inline-start:16px;padding-left:16px;padding-right:16px;padding-top:0px}.action-sheet-button:hover{background-color:#F6F6F6}';
var PWAActionSheet = function() {
  function e(e2) {
    registerInstance(this, e2);
    this.onSelection = createEvent(this, "onSelection", 7);
    this.header = void 0;
    this.cancelable = true;
    this.options = [];
    this.open = false;
  }
  e.prototype.componentDidLoad = function() {
    var e2 = this;
    requestAnimationFrame(function() {
      e2.open = true;
    });
  };
  e.prototype.dismiss = function() {
    if (this.cancelable) {
      this.close();
    }
  };
  e.prototype.close = function() {
    var e2 = this;
    this.open = false;
    setTimeout(function() {
      e2.el.parentNode.removeChild(e2.el);
    }, 500);
  };
  e.prototype.handleOptionClick = function(e2, t) {
    e2.stopPropagation();
    this.onSelection.emit(t);
    this.close();
  };
  e.prototype.render = function() {
    var e2 = this;
    return h("div", {
      class: "wrapper".concat(this.open ? " open" : ""),
      onClick: function() {
        return e2.dismiss();
      }
    }, h("div", {
      class: "content"
    }, h("div", {
      class: "title"
    }, this.header), this.options.map(function(t, n) {
      return h("div", {
        class: "action-sheet-option",
        onClick: function(t2) {
          return e2.handleOptionClick(t2, n);
        }
      }, h("div", {
        class: "action-sheet-button"
      }, t.title));
    })));
  };
  Object.defineProperty(e.prototype, "el", {
    get: function() {
      return getElement(this);
    },
    enumerable: false,
    configurable: true
  });
  return e;
}();
PWAActionSheet.style = actionSheetCss;
export {
  PWAActionSheet as pwa_action_sheet
};
//# sourceMappingURL=pwa-action-sheet.entry-2N4JD6TB.js.map
