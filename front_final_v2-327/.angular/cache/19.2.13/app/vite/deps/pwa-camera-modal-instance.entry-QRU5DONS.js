import {
  createEvent,
  getElement,
  h,
  registerInstance
} from "./chunk-BF5TN4SU.js";
import "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/pwa-elements/dist/esm-es5/pwa-camera-modal-instance.entry.js
var __awaiter = function(e, t, n, o) {
  function r(e2) {
    return e2 instanceof n ? e2 : new n(function(t2) {
      t2(e2);
    });
  }
  return new (n || (n = Promise))(function(n2, i) {
    function a(e2) {
      try {
        s(o.next(e2));
      } catch (e3) {
        i(e3);
      }
    }
    function c(e2) {
      try {
        s(o["throw"](e2));
      } catch (e3) {
        i(e3);
      }
    }
    function s(e2) {
      e2.done ? n2(e2.value) : r(e2.value).then(a, c);
    }
    s((o = o.apply(e, t || [])).next());
  });
};
var __generator = function(e, t) {
  var n = {
    label: 0,
    sent: function() {
      if (i[0] & 1) throw i[1];
      return i[1];
    },
    trys: [],
    ops: []
  }, o, r, i, a;
  return a = {
    next: c(0),
    throw: c(1),
    return: c(2)
  }, typeof Symbol === "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function c(e2) {
    return function(t2) {
      return s([e2, t2]);
    };
  }
  function s(c2) {
    if (o) throw new TypeError("Generator is already executing.");
    while (a && (a = 0, c2[0] && (n = 0)), n) try {
      if (o = 1, r && (i = c2[0] & 2 ? r["return"] : c2[0] ? r["throw"] || ((i = r["return"]) && i.call(r), 0) : r.next) && !(i = i.call(r, c2[1])).done) return i;
      if (r = 0, i) c2 = [c2[0] & 2, i.value];
      switch (c2[0]) {
        case 0:
        case 1:
          i = c2;
          break;
        case 4:
          n.label++;
          return {
            value: c2[1],
            done: false
          };
        case 5:
          n.label++;
          r = c2[1];
          c2 = [0];
          continue;
        case 7:
          c2 = n.ops.pop();
          n.trys.pop();
          continue;
        default:
          if (!(i = n.trys, i = i.length > 0 && i[i.length - 1]) && (c2[0] === 6 || c2[0] === 2)) {
            n = 0;
            continue;
          }
          if (c2[0] === 3 && (!i || c2[1] > i[0] && c2[1] < i[3])) {
            n.label = c2[1];
            break;
          }
          if (c2[0] === 6 && n.label < i[1]) {
            n.label = i[1];
            i = c2;
            break;
          }
          if (i && n.label < i[2]) {
            n.label = i[2];
            n.ops.push(c2);
            break;
          }
          if (i[2]) n.ops.pop();
          n.trys.pop();
          continue;
      }
      c2 = t.call(e, n);
    } catch (e2) {
      c2 = [6, e2];
      r = 0;
    } finally {
      o = i = 0;
    }
    if (c2[0] & 5) throw c2[1];
    return {
      value: c2[0] ? c2[1] : void 0,
      done: true
    };
  }
};
var cameraModalInstanceCss = ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:var(--inset-width);height:var(--inset-height);max-height:100%}@media only screen and (max-width: 600px){.content{width:100%;height:100%}}";
var PWACameraModal = function() {
  function e(e2) {
    var t = this;
    registerInstance(this, e2);
    this.onPhoto = createEvent(this, "onPhoto", 7);
    this.noDeviceError = createEvent(this, "noDeviceError", 7);
    this.handlePhoto = function(e3) {
      return __awaiter(t, void 0, void 0, function() {
        return __generator(this, function(t2) {
          this.onPhoto.emit(e3);
          return [2];
        });
      });
    };
    this.handleNoDeviceError = function(e3) {
      return __awaiter(t, void 0, void 0, function() {
        return __generator(this, function(t2) {
          this.noDeviceError.emit(e3);
          return [2];
        });
      });
    };
    this.facingMode = "user";
    this.hidePicker = false;
    this.noDevicesText = "No camera found";
    this.noDevicesButtonText = "Choose image";
  }
  e.prototype.handleBackdropClick = function(e2) {
    if (e2.target !== this.el) {
      this.onPhoto.emit(null);
    }
  };
  e.prototype.handleComponentClick = function(e2) {
    e2.stopPropagation();
  };
  e.prototype.handleBackdropKeyUp = function(e2) {
    if (e2.key === "Escape") {
      this.onPhoto.emit(null);
    }
  };
  e.prototype.render = function() {
    var e2 = this;
    return h("div", {
      class: "wrapper",
      onClick: function(t) {
        return e2.handleBackdropClick(t);
      }
    }, h("div", {
      class: "content"
    }, h("pwa-camera", {
      onClick: function(t) {
        return e2.handleComponentClick(t);
      },
      facingMode: this.facingMode,
      hidePicker: this.hidePicker,
      handlePhoto: this.handlePhoto,
      handleNoDeviceError: this.handleNoDeviceError,
      noDevicesButtonText: this.noDevicesButtonText,
      noDevicesText: this.noDevicesText
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
PWACameraModal.style = cameraModalInstanceCss;
export {
  PWACameraModal as pwa_camera_modal_instance
};
//# sourceMappingURL=pwa-camera-modal-instance.entry-QRU5DONS.js.map
