// node_modules/@ionic/pwa-elements/dist/esm-es5/index-1c5c47b4.js
var __extends = /* @__PURE__ */ function() {
  var e = function(t, n) {
    e = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(e2, t2) {
      e2.__proto__ = t2;
    } || function(e2, t2) {
      for (var n2 in t2) if (Object.prototype.hasOwnProperty.call(t2, n2)) e2[n2] = t2[n2];
    };
    return e(t, n);
  };
  return function(t, n) {
    if (typeof n !== "function" && n !== null) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    e(t, n);
    function r() {
      this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
var __awaiter = function(e, t, n, r) {
  function a(e2) {
    return e2 instanceof n ? e2 : new n(function(t2) {
      t2(e2);
    });
  }
  return new (n || (n = Promise))(function(n2, o) {
    function s(e2) {
      try {
        l(r.next(e2));
      } catch (e3) {
        o(e3);
      }
    }
    function i(e2) {
      try {
        l(r["throw"](e2));
      } catch (e3) {
        o(e3);
      }
    }
    function l(e2) {
      e2.done ? n2(e2.value) : a(e2.value).then(s, i);
    }
    l((r = r.apply(e, t || [])).next());
  });
};
var __generator = function(e, t) {
  var n = {
    label: 0,
    sent: function() {
      if (o[0] & 1) throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  }, r, a, o, s;
  return s = {
    next: i(0),
    throw: i(1),
    return: i(2)
  }, typeof Symbol === "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function i(e2) {
    return function(t2) {
      return l([e2, t2]);
    };
  }
  function l(i2) {
    if (r) throw new TypeError("Generator is already executing.");
    while (s && (s = 0, i2[0] && (n = 0)), n) try {
      if (r = 1, a && (o = i2[0] & 2 ? a["return"] : i2[0] ? a["throw"] || ((o = a["return"]) && o.call(a), 0) : a.next) && !(o = o.call(a, i2[1])).done) return o;
      if (a = 0, o) i2 = [i2[0] & 2, o.value];
      switch (i2[0]) {
        case 0:
        case 1:
          o = i2;
          break;
        case 4:
          n.label++;
          return {
            value: i2[1],
            done: false
          };
        case 5:
          n.label++;
          a = i2[1];
          i2 = [0];
          continue;
        case 7:
          i2 = n.ops.pop();
          n.trys.pop();
          continue;
        default:
          if (!(o = n.trys, o = o.length > 0 && o[o.length - 1]) && (i2[0] === 6 || i2[0] === 2)) {
            n = 0;
            continue;
          }
          if (i2[0] === 3 && (!o || i2[1] > o[0] && i2[1] < o[3])) {
            n.label = i2[1];
            break;
          }
          if (i2[0] === 6 && n.label < o[1]) {
            n.label = o[1];
            o = i2;
            break;
          }
          if (o && n.label < o[2]) {
            n.label = o[2];
            n.ops.push(i2);
            break;
          }
          if (o[2]) n.ops.pop();
          n.trys.pop();
          continue;
      }
      i2 = t.call(e, n);
    } catch (e2) {
      i2 = [6, e2];
      a = 0;
    } finally {
      r = o = 0;
    }
    if (i2[0] & 5) throw i2[1];
    return {
      value: i2[0] ? i2[1] : void 0,
      done: true
    };
  }
};
var __spreadArray = function(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, a = t.length, o; r < a; r++) {
    if (o || !(r in t)) {
      if (!o) o = Array.prototype.slice.call(t, 0, r);
      o[r] = t[r];
    }
  }
  return e.concat(o || Array.prototype.slice.call(t));
};
var NAMESPACE = "ionicpwaelements";
var scopeId;
var hostTagName;
var isSvgMode = false;
var queuePending = false;
var createTime = function(e, t) {
  if (t === void 0) {
    t = "";
  }
  {
    return function() {
      return;
    };
  }
};
var uniqueTime = function(e, t) {
  {
    return function() {
      return;
    };
  }
};
var HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
var EMPTY_OBJ = {};
var SVG_NS = "http://www.w3.org/2000/svg";
var HTML_NS = "http://www.w3.org/1999/xhtml";
var isDef = function(e) {
  return e != null;
};
var isComplexType = function(e) {
  e = typeof e;
  return e === "object" || e === "function";
};
function queryNonceMetaTagContent(e) {
  var t, n, r;
  return (r = (n = (t = e.head) === null || t === void 0 ? void 0 : t.querySelector('meta[name="csp-nonce"]')) === null || n === void 0 ? void 0 : n.getAttribute("content")) !== null && r !== void 0 ? r : void 0;
}
var h = function(e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = null;
  var o = false;
  var s = false;
  var i = [];
  var l = function(t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      a = t2[n2];
      if (Array.isArray(a)) {
        l(a);
      } else if (a != null && typeof a !== "boolean") {
        if (o = typeof e !== "function" && !isComplexType(a)) {
          a = String(a);
        }
        if (o && s) {
          i[i.length - 1].$text$ += a;
        } else {
          i.push(o ? newVNode(null, a) : a);
        }
        s = o;
      }
    }
  };
  l(n);
  if (t) {
    {
      var u = t.className || t.class;
      if (u) {
        t.class = typeof u !== "object" ? u : Object.keys(u).filter(function(e2) {
          return u[e2];
        }).join(" ");
      }
    }
  }
  var c = newVNode(e, null);
  c.$attrs$ = t;
  if (i.length > 0) {
    c.$children$ = i;
  }
  return c;
};
var newVNode = function(e, t) {
  var n = {
    $flags$: 0,
    $tag$: e,
    $text$: t,
    $elm$: null,
    $children$: null
  };
  {
    n.$attrs$ = null;
  }
  return n;
};
var Host = {};
var isHost = function(e) {
  return e && e.$tag$ === Host;
};
var parsePropertyValue = function(e, t) {
  if (e != null && !isComplexType(e)) {
    if (t & 4) {
      return e === "false" ? false : e === "" || !!e;
    }
    if (t & 2) {
      return parseFloat(e);
    }
    if (t & 1) {
      return String(e);
    }
    return e;
  }
  return e;
};
var getElement = function(e) {
  return getHostRef(e).$hostElement$;
};
var createEvent = function(e, t, n) {
  var r = getElement(e);
  return {
    emit: function(e2) {
      return emitEvent(r, t, {
        bubbles: !!(n & 4),
        composed: !!(n & 2),
        cancelable: !!(n & 1),
        detail: e2
      });
    }
  };
};
var emitEvent = function(e, t, n) {
  var r = plt.ce(t, n);
  e.dispatchEvent(r);
  return r;
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = function(e, t, n) {
  var r = styles.get(e);
  if (supportsConstructableStylesheets && n) {
    r = r || new CSSStyleSheet();
    if (typeof r === "string") {
      r = t;
    } else {
      r.replaceSync(t);
    }
  } else {
    r = t;
  }
  styles.set(e, r);
};
var addStyle = function(e, t, n, r) {
  var a;
  var o = getScopeId(t);
  var s = styles.get(o);
  e = e.nodeType === 11 ? e : doc;
  if (s) {
    if (typeof s === "string") {
      e = e.head || e;
      var i = rootAppliedStyles.get(e);
      var l = void 0;
      if (!i) {
        rootAppliedStyles.set(e, i = /* @__PURE__ */ new Set());
      }
      if (!i.has(o)) {
        {
          {
            l = doc.createElement("style");
            l.innerHTML = s;
          }
          var u = (a = plt.$nonce$) !== null && a !== void 0 ? a : queryNonceMetaTagContent(doc);
          if (u != null) {
            l.setAttribute("nonce", u);
          }
          e.insertBefore(l, e.querySelector("link"));
        }
        if (i) {
          i.add(o);
        }
      }
    } else if (!e.adoptedStyleSheets.includes(s)) {
      e.adoptedStyleSheets = __spreadArray(__spreadArray([], e.adoptedStyleSheets, true), [s], false);
    }
  }
  return o;
};
var attachStyles = function(e) {
  var t = e.$cmpMeta$;
  var n = e.$hostElement$;
  var r = t.$flags$;
  var a = createTime("attachStyles", t.$tagName$);
  var o = addStyle(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
  if (r & 10) {
    n["s-sc"] = o;
    n.classList.add(o + "-h");
  }
  a();
};
var getScopeId = function(e, t) {
  return "sc-" + e.$tagName$;
};
var setAccessor = function(e, t, n, r, a, o) {
  if (n !== r) {
    var s = isMemberInElement(e, t);
    var i = t.toLowerCase();
    if (t === "class") {
      var l = e.classList;
      var u = parseClassList(n);
      var c = parseClassList(r);
      l.remove.apply(l, u.filter(function(e2) {
        return e2 && !c.includes(e2);
      }));
      l.add.apply(l, c.filter(function(e2) {
        return e2 && !u.includes(e2);
      }));
    } else if (t === "style") {
      {
        for (var f in n) {
          if (!r || r[f] == null) {
            if (f.includes("-")) {
              e.style.removeProperty(f);
            } else {
              e.style[f] = "";
            }
          }
        }
      }
      for (var f in r) {
        if (!n || r[f] !== n[f]) {
          if (f.includes("-")) {
            e.style.setProperty(f, r[f]);
          } else {
            e.style[f] = r[f];
          }
        }
      }
    } else if (t === "ref") {
      if (r) {
        r(e);
      }
    } else if (!s && t[0] === "o" && t[1] === "n") {
      if (t[2] === "-") {
        t = t.slice(3);
      } else if (isMemberInElement(win, i)) {
        t = i.slice(2);
      } else {
        t = i[2] + t.slice(3);
      }
      if (n) {
        plt.rel(e, t, n, false);
      }
      if (r) {
        plt.ael(e, t, r, false);
      }
    } else {
      var $ = isComplexType(r);
      if ((s || $ && r !== null) && !a) {
        try {
          if (!e.tagName.includes("-")) {
            var d = r == null ? "" : r;
            if (t === "list") {
              s = false;
            } else if (n == null || e[t] != d) {
              e[t] = d;
            }
          } else {
            e[t] = r;
          }
        } catch (e2) {
        }
      }
      if (r == null || r === false) {
        if (r !== false || e.getAttribute(t) === "") {
          {
            e.removeAttribute(t);
          }
        }
      } else if ((!s || o & 4 || a) && !$) {
        r = r === true ? "" : r;
        {
          e.setAttribute(t, r);
        }
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = function(e) {
  return !e ? [] : e.split(parseClassListRegex);
};
var updateElement = function(e, t, n, r) {
  var a = t.$elm$.nodeType === 11 && t.$elm$.host ? t.$elm$.host : t.$elm$;
  var o = e && e.$attrs$ || EMPTY_OBJ;
  var s = t.$attrs$ || EMPTY_OBJ;
  {
    for (r in o) {
      if (!(r in s)) {
        setAccessor(a, r, o[r], void 0, n, t.$flags$);
      }
    }
  }
  for (r in s) {
    setAccessor(a, r, o[r], s[r], n, t.$flags$);
  }
};
var createElm = function(e, t, n, r) {
  var a = t.$children$[n];
  var o = 0;
  var s;
  var i;
  if (a.$text$ !== null) {
    s = a.$elm$ = doc.createTextNode(a.$text$);
  } else {
    if (!isSvgMode) {
      isSvgMode = a.$tag$ === "svg";
    }
    s = a.$elm$ = doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, a.$tag$);
    if (isSvgMode && a.$tag$ === "foreignObject") {
      isSvgMode = false;
    }
    {
      updateElement(null, a, isSvgMode);
    }
    if (isDef(scopeId) && s["s-si"] !== scopeId) {
      s.classList.add(s["s-si"] = scopeId);
    }
    if (a.$children$) {
      for (o = 0; o < a.$children$.length; ++o) {
        i = createElm(e, a, o);
        if (i) {
          s.appendChild(i);
        }
      }
    }
    {
      if (a.$tag$ === "svg") {
        isSvgMode = false;
      } else if (s.tagName === "foreignObject") {
        isSvgMode = true;
      }
    }
  }
  return s;
};
var addVnodes = function(e, t, n, r, a, o) {
  var s = e;
  var i;
  if (s.shadowRoot && s.tagName === hostTagName) {
    s = s.shadowRoot;
  }
  for (; a <= o; ++a) {
    if (r[a]) {
      i = createElm(null, n, a);
      if (i) {
        r[a].$elm$ = i;
        s.insertBefore(i, t);
      }
    }
  }
};
var removeVnodes = function(e, t, n) {
  for (var r = t; r <= n; ++r) {
    var a = e[r];
    if (a) {
      var o = a.$elm$;
      nullifyVNodeRefs(a);
      if (o) {
        o.remove();
      }
    }
  }
};
var updateChildren = function(e, t, n, r) {
  var a = 0;
  var o = 0;
  var s = t.length - 1;
  var i = t[0];
  var l = t[s];
  var u = r.length - 1;
  var c = r[0];
  var f = r[u];
  var $;
  while (a <= s && o <= u) {
    if (i == null) {
      i = t[++a];
    } else if (l == null) {
      l = t[--s];
    } else if (c == null) {
      c = r[++o];
    } else if (f == null) {
      f = r[--u];
    } else if (isSameVnode(i, c)) {
      patch(i, c);
      i = t[++a];
      c = r[++o];
    } else if (isSameVnode(l, f)) {
      patch(l, f);
      l = t[--s];
      f = r[--u];
    } else if (isSameVnode(i, f)) {
      patch(i, f);
      e.insertBefore(i.$elm$, l.$elm$.nextSibling);
      i = t[++a];
      f = r[--u];
    } else if (isSameVnode(l, c)) {
      patch(l, c);
      e.insertBefore(l.$elm$, i.$elm$);
      l = t[--s];
      c = r[++o];
    } else {
      {
        $ = createElm(t && t[o], n, o);
        c = r[++o];
      }
      if ($) {
        {
          i.$elm$.parentNode.insertBefore($, i.$elm$);
        }
      }
    }
  }
  if (a > s) {
    addVnodes(e, r[u + 1] == null ? null : r[u + 1].$elm$, n, r, o, u);
  } else if (o > u) {
    removeVnodes(t, a, s);
  }
};
var isSameVnode = function(e, t) {
  if (e.$tag$ === t.$tag$) {
    return true;
  }
  return false;
};
var patch = function(e, t) {
  var n = t.$elm$ = e.$elm$;
  var r = e.$children$;
  var a = t.$children$;
  var o = t.$tag$;
  var s = t.$text$;
  if (s === null) {
    {
      isSvgMode = o === "svg" ? true : o === "foreignObject" ? false : isSvgMode;
    }
    {
      {
        updateElement(e, t, isSvgMode);
      }
    }
    if (r !== null && a !== null) {
      updateChildren(n, r, t, a);
    } else if (a !== null) {
      if (e.$text$ !== null) {
        n.textContent = "";
      }
      addVnodes(n, null, t, a, 0, a.length - 1);
    } else if (r !== null) {
      removeVnodes(r, 0, r.length - 1);
    }
    if (isSvgMode && o === "svg") {
      isSvgMode = false;
    }
  } else if (e.$text$ !== s) {
    n.data = s;
  }
};
var nullifyVNodeRefs = function(e) {
  {
    e.$attrs$ && e.$attrs$.ref && e.$attrs$.ref(null);
    e.$children$ && e.$children$.map(nullifyVNodeRefs);
  }
};
var renderVdom = function(e, t) {
  var n = e.$hostElement$;
  var r = e.$vnode$ || newVNode(null, null);
  var a = isHost(t) ? t : h(null, null, t);
  hostTagName = n.tagName;
  a.$tag$ = null;
  a.$flags$ |= 4;
  e.$vnode$ = a;
  a.$elm$ = r.$elm$ = n.shadowRoot || n;
  {
    scopeId = n["s-sc"];
  }
  patch(r, a);
};
var attachToAncestor = function(e, t) {
  if (t && !e.$onRenderResolve$ && t["s-p"]) {
    t["s-p"].push(new Promise(function(t2) {
      return e.$onRenderResolve$ = t2;
    }));
  }
};
var scheduleUpdate = function(e, t) {
  {
    e.$flags$ |= 16;
  }
  if (e.$flags$ & 4) {
    e.$flags$ |= 512;
    return;
  }
  attachToAncestor(e, e.$ancestorComponent$);
  var n = function() {
    return dispatchHooks(e, t);
  };
  return writeTask(n);
};
var dispatchHooks = function(e, t) {
  var n = createTime("scheduleUpdate", e.$cmpMeta$.$tagName$);
  var r = e.$lazyInstance$;
  var a;
  if (t) {
    {
      e.$flags$ |= 256;
      if (e.$queuedListeners$) {
        e.$queuedListeners$.map(function(e2) {
          var t2 = e2[0], n2 = e2[1];
          return safeCall(r, t2, n2);
        });
        e.$queuedListeners$ = void 0;
      }
    }
  }
  n();
  return enqueue(a, function() {
    return updateComponent(e, r, t);
  });
};
var enqueue = function(e, t) {
  return isPromisey(e) ? e.then(t) : t();
};
var isPromisey = function(e) {
  return e instanceof Promise || e && e.then && typeof e.then === "function";
};
var updateComponent = function(e, t, n) {
  return __awaiter(void 0, void 0, void 0, function() {
    var r, a, o, s, i, l, u;
    return __generator(this, function(c) {
      a = e.$hostElement$;
      o = createTime("update", e.$cmpMeta$.$tagName$);
      s = a["s-rc"];
      if (n) {
        attachStyles(e);
      }
      i = createTime("render", e.$cmpMeta$.$tagName$);
      {
        callRender(e, t);
      }
      if (s) {
        s.map(function(e2) {
          return e2();
        });
        a["s-rc"] = void 0;
      }
      i();
      o();
      {
        l = (r = a["s-p"]) !== null && r !== void 0 ? r : [];
        u = function() {
          return postUpdateComponent(e);
        };
        if (l.length === 0) {
          u();
        } else {
          Promise.all(l).then(u);
          e.$flags$ |= 4;
          l.length = 0;
        }
      }
      return [2];
    });
  });
};
var callRender = function(e, t, n) {
  try {
    t = t.render();
    {
      e.$flags$ &= ~16;
    }
    {
      e.$flags$ |= 2;
    }
    {
      {
        {
          renderVdom(e, t);
        }
      }
    }
  } catch (t2) {
    consoleError(t2, e.$hostElement$);
  }
  return null;
};
var postUpdateComponent = function(e) {
  var t = e.$cmpMeta$.$tagName$;
  var n = e.$hostElement$;
  var r = createTime("postUpdate", t);
  var a = e.$lazyInstance$;
  var o = e.$ancestorComponent$;
  if (!(e.$flags$ & 64)) {
    e.$flags$ |= 64;
    {
      addHydratedFlag(n);
    }
    {
      safeCall(a, "componentDidLoad");
    }
    r();
    {
      e.$onReadyResolve$(n);
      if (!o) {
        appDidLoad();
      }
    }
  } else {
    r();
  }
  {
    e.$onInstanceResolve$(n);
  }
  {
    if (e.$onRenderResolve$) {
      e.$onRenderResolve$();
      e.$onRenderResolve$ = void 0;
    }
    if (e.$flags$ & 512) {
      nextTick(function() {
        return scheduleUpdate(e, false);
      });
    }
    e.$flags$ &= ~(4 | 512);
  }
};
var forceUpdate = function(e) {
  {
    var t = getHostRef(e);
    var n = t.$hostElement$.isConnected;
    if (n && (t.$flags$ & (2 | 16)) === 2) {
      scheduleUpdate(t, false);
    }
    return n;
  }
};
var appDidLoad = function(e) {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(function() {
    return emitEvent(win, "appload", {
      detail: {
        namespace: NAMESPACE
      }
    });
  });
};
var safeCall = function(e, t, n) {
  if (e && e[t]) {
    try {
      return e[t](n);
    } catch (e2) {
      consoleError(e2);
    }
  }
  return void 0;
};
var addHydratedFlag = function(e) {
  return e.classList.add("hydrated");
};
var getValue = function(e, t) {
  return getHostRef(e).$instanceValues$.get(t);
};
var setValue = function(e, t, n, r) {
  var a = getHostRef(e);
  var o = a.$instanceValues$.get(t);
  var s = a.$flags$;
  var i = a.$lazyInstance$;
  n = parsePropertyValue(n, r.$members$[t][0]);
  var l = Number.isNaN(o) && Number.isNaN(n);
  var u = n !== o && !l;
  if ((!(s & 8) || o === void 0) && u) {
    a.$instanceValues$.set(t, n);
    if (i) {
      if ((s & (2 | 16)) === 2) {
        scheduleUpdate(a, false);
      }
    }
  }
};
var proxyComponent = function(e, t, n) {
  if (t.$members$) {
    var r = Object.entries(t.$members$);
    var a = e.prototype;
    r.map(function(e2) {
      var r2 = e2[0], o2 = e2[1][0];
      if (o2 & 31 || n & 2 && o2 & 32) {
        Object.defineProperty(a, r2, {
          get: function() {
            return getValue(this, r2);
          },
          set: function(e3) {
            setValue(this, r2, e3, t);
          },
          configurable: true,
          enumerable: true
        });
      } else if (n & 1 && o2 & 64) {
        Object.defineProperty(a, r2, {
          value: function() {
            var e3 = [];
            for (var t2 = 0; t2 < arguments.length; t2++) {
              e3[t2] = arguments[t2];
            }
            var n2 = getHostRef(this);
            return n2.$onInstancePromise$.then(function() {
              var t3;
              return (t3 = n2.$lazyInstance$)[r2].apply(t3, e3);
            });
          }
        });
      }
    });
    if (n & 1) {
      var o = /* @__PURE__ */ new Map();
      a.attributeChangedCallback = function(e2, t2, n2) {
        var r2 = this;
        plt.jmp(function() {
          var t3 = o.get(e2);
          if (r2.hasOwnProperty(t3)) {
            n2 = r2[t3];
            delete r2[t3];
          } else if (a.hasOwnProperty(t3) && typeof r2[t3] === "number" && r2[t3] == n2) {
            return;
          }
          r2[t3] = n2 === null && typeof r2[t3] === "boolean" ? false : n2;
        });
      };
      e.observedAttributes = r.filter(function(e2) {
        var t2 = e2[0], n2 = e2[1];
        return n2[0] & 15;
      }).map(function(e2) {
        var t2 = e2[0], n2 = e2[1];
        var r2 = n2[1] || t2;
        o.set(r2, t2);
        return r2;
      });
    }
  }
  return e;
};
var initializeComponent = function(e, t, n, r, a) {
  return __awaiter(void 0, void 0, void 0, function() {
    var e2, r2, o, s, i, l, u;
    return __generator(this, function(c) {
      switch (c.label) {
        case 0:
          if (!((t.$flags$ & 32) === 0)) return [3, 3];
          t.$flags$ |= 32;
          a = loadModule(n);
          if (!a.then) return [3, 2];
          e2 = uniqueTime();
          return [4, a];
        case 1:
          a = c.sent();
          e2();
          c.label = 2;
        case 2:
          if (!a.isProxied) {
            proxyComponent(a, n, 2);
            a.isProxied = true;
          }
          r2 = createTime("createInstance", n.$tagName$);
          {
            t.$flags$ |= 8;
          }
          try {
            new a(t);
          } catch (e3) {
            consoleError(e3);
          }
          {
            t.$flags$ &= ~8;
          }
          r2();
          if (a.style) {
            o = a.style;
            s = getScopeId(n);
            if (!styles.has(s)) {
              i = createTime("registerStyles", n.$tagName$);
              registerStyle(s, o, !!(n.$flags$ & 1));
              i();
            }
          }
          c.label = 3;
        case 3:
          l = t.$ancestorComponent$;
          u = function() {
            return scheduleUpdate(t, true);
          };
          if (l && l["s-rc"]) {
            l["s-rc"].push(u);
          } else {
            u();
          }
          return [2];
      }
    });
  });
};
var connectedCallback = function(e) {
  if ((plt.$flags$ & 1) === 0) {
    var t = getHostRef(e);
    var n = t.$cmpMeta$;
    var r = createTime("connectedCallback", n.$tagName$);
    if (!(t.$flags$ & 1)) {
      t.$flags$ |= 1;
      {
        var a = e;
        while (a = a.parentNode || a.host) {
          if (a["s-p"]) {
            attachToAncestor(t, t.$ancestorComponent$ = a);
            break;
          }
        }
      }
      if (n.$members$) {
        Object.entries(n.$members$).map(function(t2) {
          var n2 = t2[0], r2 = t2[1][0];
          if (r2 & 31 && e.hasOwnProperty(n2)) {
            var a2 = e[n2];
            delete e[n2];
            e[n2] = a2;
          }
        });
      }
      {
        initializeComponent(e, t, n);
      }
    } else {
      addHostEventListeners(e, t, n.$listeners$);
    }
    r();
  }
};
var disconnectedCallback = function(e) {
  if ((plt.$flags$ & 1) === 0) {
    var t = getHostRef(e);
    var n = t.$lazyInstance$;
    {
      if (t.$rmListeners$) {
        t.$rmListeners$.map(function(e2) {
          return e2();
        });
        t.$rmListeners$ = void 0;
      }
    }
    {
      safeCall(n, "disconnectedCallback");
    }
  }
};
var bootstrapLazy = function(e, t) {
  if (t === void 0) {
    t = {};
  }
  var n;
  var r = createTime();
  var a = [];
  var o = t.exclude || [];
  var s = win.customElements;
  var i = doc.head;
  var l = i.querySelector("meta[charset]");
  var u = doc.createElement("style");
  var c = [];
  var f;
  var $ = true;
  Object.assign(plt, t);
  plt.$resourcesUrl$ = new URL(t.resourcesUrl || "./", doc.baseURI).href;
  e.map(function(e2) {
    e2[1].map(function(t2) {
      var n2 = {
        $flags$: t2[0],
        $tagName$: t2[1],
        $members$: t2[2],
        $listeners$: t2[3]
      };
      {
        n2.$members$ = t2[2];
      }
      {
        n2.$listeners$ = t2[3];
      }
      var r2 = n2.$tagName$;
      var i2 = function(e3) {
        __extends(t3, e3);
        function t3(t4) {
          var r3 = e3.call(this, t4) || this;
          t4 = r3;
          registerHost(t4, n2);
          if (n2.$flags$ & 1) {
            {
              {
                t4.attachShadow({
                  mode: "open"
                });
              }
            }
          }
          return r3;
        }
        t3.prototype.connectedCallback = function() {
          var e4 = this;
          if (f) {
            clearTimeout(f);
            f = null;
          }
          if ($) {
            c.push(this);
          } else {
            plt.jmp(function() {
              return connectedCallback(e4);
            });
          }
        };
        t3.prototype.disconnectedCallback = function() {
          var e4 = this;
          plt.jmp(function() {
            return disconnectedCallback(e4);
          });
        };
        t3.prototype.componentOnReady = function() {
          return getHostRef(this).$onReadyPromise$;
        };
        return t3;
      }(HTMLElement);
      n2.$lazyBundleId$ = e2[0];
      if (!o.includes(r2) && !s.get(r2)) {
        a.push(r2);
        s.define(r2, proxyComponent(i2, n2, 1));
      }
    });
  });
  {
    u.innerHTML = a + HYDRATED_CSS;
    u.setAttribute("data-styles", "");
    var d = (n = plt.$nonce$) !== null && n !== void 0 ? n : queryNonceMetaTagContent(doc);
    if (d != null) {
      u.setAttribute("nonce", d);
    }
    i.insertBefore(u, l ? l.nextSibling : i.firstChild);
  }
  $ = false;
  if (c.length) {
    c.map(function(e2) {
      return e2.connectedCallback();
    });
  } else {
    {
      plt.jmp(function() {
        return f = setTimeout(appDidLoad, 30);
      });
    }
  }
  r();
};
var addHostEventListeners = function(e, t, n, r) {
  if (n) {
    n.map(function(n2) {
      var r2 = n2[0], a = n2[1], o = n2[2];
      var s = getHostListenerTarget(e, r2);
      var i = hostListenerProxy(t, o);
      var l = hostListenerOpts(r2);
      plt.ael(s, a, i, l);
      (t.$rmListeners$ = t.$rmListeners$ || []).push(function() {
        return plt.rel(s, a, i, l);
      });
    });
  }
};
var hostListenerProxy = function(e, t) {
  return function(n) {
    try {
      {
        if (e.$flags$ & 256) {
          e.$lazyInstance$[t](n);
        } else {
          (e.$queuedListeners$ = e.$queuedListeners$ || []).push([t, n]);
        }
      }
    } catch (e2) {
      consoleError(e2);
    }
  };
};
var getHostListenerTarget = function(e, t) {
  if (t & 16) return doc.body;
  return e;
};
var hostListenerOpts = function(e) {
  return (e & 2) !== 0;
};
var setNonce = function(e) {
  return plt.$nonce$ = e;
};
var hostRefs = /* @__PURE__ */ new WeakMap();
var getHostRef = function(e) {
  return hostRefs.get(e);
};
var registerInstance = function(e, t) {
  return hostRefs.set(t.$lazyInstance$ = e, t);
};
var registerHost = function(e, t) {
  var n = {
    $flags$: 0,
    $hostElement$: e,
    $cmpMeta$: t,
    $instanceValues$: /* @__PURE__ */ new Map()
  };
  {
    n.$onInstancePromise$ = new Promise(function(e2) {
      return n.$onInstanceResolve$ = e2;
    });
  }
  {
    n.$onReadyPromise$ = new Promise(function(e2) {
      return n.$onReadyResolve$ = e2;
    });
    e["s-p"] = [];
    e["s-rc"] = [];
  }
  addHostEventListeners(e, n, t.$listeners$);
  return hostRefs.set(e, n);
};
var isMemberInElement = function(e, t) {
  return t in e;
};
var consoleError = function(e, t) {
  return (0, console.error)(e, t);
};
var cmpModules = /* @__PURE__ */ new Map();
var loadModule = function(e, t, n) {
  var r = e.$tagName$.replace(/-/g, "_");
  var a = e.$lazyBundleId$;
  var o = cmpModules.get(a);
  if (o) {
    return o[r];
  }
  if (!n || !BUILD.hotModuleReplacement) {
    var s = function(e2) {
      cmpModules.set(a, e2);
      return e2[r];
    };
    switch (a) {
      case "pwa-action-sheet":
        return import("./pwa-action-sheet.entry-2N4JD6TB.js").then(s, consoleError);
      case "pwa-camera-modal":
        return import("./pwa-camera-modal.entry-3TQ7TB4N.js").then(s, consoleError);
      case "pwa-toast":
        return import("./pwa-toast.entry-WFRXBFVF.js").then(s, consoleError);
      case "pwa-camera-modal-instance":
        return import("./pwa-camera-modal-instance.entry-QRU5DONS.js").then(s, consoleError);
      case "pwa-camera":
        return import("./pwa-camera.entry-SIJBTFQU.js").then(s, consoleError);
    }
  }
  return import("./".concat(a, ".entry.js").concat("")).then(function(e2) {
    {
      cmpModules.set(a, e2);
    }
    return e2[r];
  }, consoleError);
};
var styles = /* @__PURE__ */ new Map();
var win = typeof window !== "undefined" ? window : {};
var doc = win.document || {
  head: {}
};
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: function(e) {
    return e();
  },
  raf: function(e) {
    return requestAnimationFrame(e);
  },
  ael: function(e, t, n, r) {
    return e.addEventListener(t, n, r);
  },
  rel: function(e, t, n, r) {
    return e.removeEventListener(t, n, r);
  },
  ce: function(e, t) {
    return new CustomEvent(e, t);
  }
};
var promiseResolve = function(e) {
  return Promise.resolve(e);
};
var supportsConstructableStylesheets = function() {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
}();
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = function(e, t) {
  return function(n) {
    e.push(n);
    if (!queuePending) {
      queuePending = true;
      if (t && plt.$flags$ & 4) {
        nextTick(flush);
      } else {
        plt.raf(flush);
      }
    }
  };
};
var consume = function(e) {
  for (var t = 0; t < e.length; t++) {
    try {
      e[t](performance.now());
    } catch (e2) {
      consoleError(e2);
    }
  }
  e.length = 0;
};
var flush = function() {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
var nextTick = function(e) {
  return promiseResolve().then(e);
};
var writeTask = queueTask(queueDomWrites, true);

export {
  h,
  Host,
  getElement,
  createEvent,
  forceUpdate,
  bootstrapLazy,
  setNonce,
  registerInstance,
  promiseResolve
};
//# sourceMappingURL=chunk-BF5TN4SU.js.map
