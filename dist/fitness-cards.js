const N = globalThis, ee = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = /* @__PURE__ */ Symbol(), oe = /* @__PURE__ */ new WeakMap();
let ve = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const U = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, i, a) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new ve(s, e, te);
}, le = ee ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return ((n) => new ve(typeof n == "string" ? n : n + "", void 0, te))(s);
})(e) : e, { is: Pe, defineProperty: Se, getOwnPropertyDescriptor: ke, getOwnPropertyNames: Ee, getOwnPropertySymbols: He, getPrototypeOf: Ce } = Object, L = globalThis, ce = L.trustedTypes, je = ce ? ce.emptyScript : "", Me = L.reactiveElementPolyfillSupport, H = (e, t) => e, z = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? je : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, se = (e, t) => !Pe(e, t), he = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), L.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = he) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(e, s, t);
      n !== void 0 && Se(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: n, set: i } = ke(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: n, set(a) {
      const r = n?.call(this);
      i?.call(this, a), this.requestUpdate(e, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? he;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const e = Ce(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const t = this.properties, s = [...Ee(t), ...He(t)];
      for (const n of s) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, n] of t) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const n = this._$Eu(t, s);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const n of s) t.unshift(le(n));
    } else e !== void 0 && t.push(le(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((t, s) => {
      if (ee) t.adoptedStyleSheets = s.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
      else for (const n of s) {
        const i = document.createElement("style"), a = N.litNonce;
        a !== void 0 && i.setAttribute("nonce", a), i.textContent = n.cssText, t.appendChild(i);
      }
    })(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(t, s.type);
      this._$Em = e, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, n = s._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : z;
      this._$Em = n;
      const r = a.fromAttribute(t, i.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, n = !1, i) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (i = this[e]), s ??= a.getPropertyOptions(e), !((s.hasChanged ?? se)(i, t) || s.useDefault && s.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: n, wrapped: i }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), i !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, i] of s) {
        const { wrapped: a } = i, r = this[n];
        a !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, i, r);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[H("elementProperties")] = /* @__PURE__ */ new Map(), b[H("finalized")] = /* @__PURE__ */ new Map(), Me?.({ ReactiveElement: b }), (L.reactiveElementVersions ??= []).push("2.1.2");
const ne = globalThis, de = (e) => e, B = ne.trustedTypes, ue = B ? B.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $e = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, be = "?" + y, Oe = `<${be}>`, $ = document, C = () => $.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", X = Array.isArray, K = `[ 	
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _e = /-->/g, me = />/g, f = RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ye = /"/g, we = /^(?:script|style|textarea|title)$/i, _ = /* @__PURE__ */ ((e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }))(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), v = $.createTreeWalker($, 129);
function Ae(e, t) {
  if (!X(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(t) : t;
}
const Ue = (e, t) => {
  const s = e.length - 1, n = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = x;
  for (let l = 0; l < s; l++) {
    const o = e[l];
    let h, u, c = -1, m = 0;
    for (; m < o.length && (r.lastIndex = m, u = r.exec(o), u !== null); ) m = r.lastIndex, r === x ? u[1] === "!--" ? r = _e : u[1] !== void 0 ? r = me : u[2] !== void 0 ? (we.test(u[2]) && (i = RegExp("</" + u[2], "g")), r = f) : u[3] !== void 0 && (r = f) : r === f ? u[0] === ">" ? (r = i ?? x, c = -1) : u[1] === void 0 ? c = -2 : (c = r.lastIndex - u[2].length, h = u[1], r = u[3] === void 0 ? f : u[3] === '"' ? ye : pe) : r === ye || r === pe ? r = f : r === _e || r === me ? r = x : (r = f, i = void 0);
    const p = r === f && e[l + 1].startsWith("/>") ? " " : "";
    a += r === x ? o + Oe : c >= 0 ? (n.push(h), o.slice(0, c) + $e + o.slice(c) + y + p) : o + y + (c === -2 ? l : p);
  }
  return [Ae(e, a + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class M {
  constructor({ strings: t, _$litType$: s }, n) {
    let i;
    this.parts = [];
    let a = 0, r = 0;
    const l = t.length - 1, o = this.parts, [h, u] = Ue(t, s);
    if (this.el = M.createElement(h, n), v.currentNode = this.el.content, s === 2 || s === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = v.nextNode()) !== null && o.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith($e)) {
          const m = u[r++], p = i.getAttribute(c).split(y), R = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: a, name: R[2], strings: p, ctor: R[1] === "." ? Te : R[1] === "?" ? Re : R[1] === "@" ? De : F }), i.removeAttribute(c);
        } else c.startsWith(y) && (o.push({ type: 6, index: a }), i.removeAttribute(c));
        if (we.test(i.tagName)) {
          const c = i.textContent.split(y), m = c.length - 1;
          if (m > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let p = 0; p < m; p++) i.append(c[p], C()), v.nextNode(), o.push({ type: 2, index: ++a });
            i.append(c[m], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === be) o.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(y, c + 1)) !== -1; ) o.push({ type: 7, index: a }), c += y.length - 1;
      }
      a++;
    }
  }
  static createElement(t, s) {
    const n = $.createElement("template");
    return n.innerHTML = t, n;
  }
}
function A(e, t, s = e, n) {
  if (t === w) return t;
  let i = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const a = j(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = i : s._$Cl = i), i !== void 0 && (t = A(e, i._$AS(e, t.values), i, n)), t;
}
class Je {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: n } = this._$AD, i = (t?.creationScope ?? $).importNode(s, !0);
    v.currentNode = i;
    let a = v.nextNode(), r = 0, l = 0, o = n[0];
    for (; o !== void 0; ) {
      if (r === o.index) {
        let h;
        o.type === 2 ? h = new J(a, a.nextSibling, this, t) : o.type === 1 ? h = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (h = new Ne(a, this, t)), this._$AV.push(h), o = n[++l];
      }
      r !== o?.index && (a = v.nextNode(), r++);
    }
    return v.currentNode = $, i;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class J {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = A(this, t, s), j(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ((n) => X(n) || typeof n?.[Symbol.iterator] == "function")(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && j(this._$AH) ? this._$AA.nextSibling.data = t : this.T($.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = M.createElement(Ae(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(s);
    else {
      const a = new Je(i, this), r = a.u(this.options);
      a.p(s), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let s = ge.get(t.strings);
    return s === void 0 && ge.set(t.strings, s = new M(t)), s;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, i = 0;
    for (const a of t) i === s.length ? s.push(n = new J(this.O(C()), this.O(C()), this, this.options)) : n = s[i], n._$AI(a), i++;
    i < s.length && (this._$AR(n && n._$AB.nextSibling, i), s.length = i);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = de(t).nextSibling;
      de(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, n, i, a) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = s, this._$AM = i, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = d;
  }
  _$AI(t, s = this, n, i) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) t = A(this, t, s, 0), r = !j(t) || t !== this._$AH && t !== w, r && (this._$AH = t);
    else {
      const l = t;
      let o, h;
      for (t = a[0], o = 0; o < a.length - 1; o++) h = A(this, l[n + o], s, o), h === w && (h = this._$AH[o]), r ||= !j(h) || h !== this._$AH[o], h === d ? t = d : t !== d && (t += (h ?? "") + a[o + 1]), this._$AH[o] = h;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Re extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class De extends F {
  constructor(t, s, n, i, a) {
    super(t, s, n, i, a), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = A(this, t, s, 0) ?? d) === w) return;
    const n = this._$AH, i = t === d && n !== d || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== d && (n === d || i);
    i && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ne {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const We = ne.litHtmlPolyfillSupport;
We?.(M, J), (ne.litHtmlVersions ??= []).push("3.3.2");
const ie = globalThis;
class g extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((n, i, a) => {
      const r = a?.renderBefore ?? i;
      let l = r._$litPart$;
      if (l === void 0) {
        const o = a?.renderBefore ?? null;
        r._$litPart$ = l = new J(i.insertBefore(C(), o), o, void 0, a ?? {});
      }
      return l._$AI(n), l;
    })(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
g._$litElement$ = !0, g.finalized = !0, ie.litElementHydrateSupport?.({ LitElement: g });
const ze = ie.litElementPolyfillSupport;
ze?.({ LitElement: g }), (ie.litElementVersions ??= []).push("4.2.2");
const I = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
}, Be = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: se }, Le = (e = Be, t, s) => {
  const { kind: n, metadata: i } = s;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(s.name, e), n === "accessor") {
    const { name: r } = s;
    return { set(l) {
      const o = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, o, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (n === "setter") {
    const { name: r } = s;
    return function(l) {
      const o = this[r];
      t.call(this, l), this.requestUpdate(r, o, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function T(e) {
  return (t, s) => typeof s == "object" ? Le(e, t, s) : ((n, i, a) => {
    const r = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, n), r ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, s);
}
function V(e) {
  return T({ ...e, state: !0, attribute: !1 });
}
const q = U`
  :host {
    display: block;
  }

  ha-card {
    padding: var(--ha-card-padding, 16px);
    background: var(
      --ha-card-background,
      var(--card-background-color, var(--primary-background-color))
    );
    color: var(--primary-text-color);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    gap: 8px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  .metric {
    border-radius: 12px;
    padding: 12px;
    background: var(
      --ha-card-section-background,
      color-mix(
        in srgb,
        var(--card-background-color, var(--ha-card-background, #1e1e1e)) 70%,
        var(--secondary-background-color, rgba(0, 0, 0, 0.04))
      )
    );
    box-shadow: var(--ha-card-box-shadow, none);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .metric.compact {
    padding: 10px;
  }

  .metric .label {
    display: flex;
    gap: 6px;
    align-items: center;
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    text-transform: none;
  }

  .metric .value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .metric .subtle {
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }

  .progress {
    height: 6px;
    border-radius: 999px;
    background: var(--divider-color, rgba(128, 128, 128, 0.25));
    overflow: hidden;
  }

  .progress .bar {
    height: 100%;
    border-radius: 999px;
    background: var(--accent-color, var(--primary-color));
    width: 0%;
    transition: width 0.3s ease;
  }

  .status-low {
    color: var(--warning-color, #f9a825);
  }

  .status-high {
    color: var(--error-color, #ef5350);
  }

  .status-normal {
    color: var(--success-color, var(--primary-color));
  }

  .pill {
    padding: 3px 8px;
    border-radius: 999px;
    background: color-mix(
      in srgb,
      var(--accent-color, var(--primary-color)) 15%,
      transparent
    );
    color: var(--accent-color, var(--primary-color));
    font-size: 0.75rem;
    font-weight: 600;
  }
`, Fe = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", "null", "nan", ""]);
function O(e) {
  if (e == null) return null;
  const t = String(e).trim();
  if (Fe.has(t)) return null;
  const s = Number(t);
  return Number.isFinite(s) ? s : null;
}
function W(e) {
  if (e >= 90)
    return `${Math.floor(e / 60)}h ${Math.round(e % 60)}m`;
  const t = e >= 10 ? 0 : 1;
  return `${e.toFixed(t)} min`;
}
function Ie(e, t, s, n) {
  if (e == null || Number.isNaN(e)) return "—";
  const i = n ?? t;
  if (t === "min") return W(e);
  if (t === "s") return (function(l) {
    return l >= 3600 ? `${Math.floor(l / 3600)}h ${Math.floor(l % 3600 / 60)}m` : l >= 90 ? `${Math.floor(l / 60)}m ${Math.round(l % 60)}s` : `${Math.round(l)}s`;
  })(e);
  const a = s ?? (function(l) {
    switch (l) {
      case "bpm":
      case "breaths/min":
      case "count":
      case "kcal":
      case "ms":
      case "mg/dL":
      case "s":
        return 0;
      case "%":
      case "lb":
      case "fl oz US":
      case "mL/(kg*min)":
      default:
        return 1;
      case "mi":
        return 2;
    }
  })(t), r = e.toFixed(a);
  return i ? `${r} ${i}` : r;
}
function Ve(e, t) {
  if (e === null || t === void 0) return {};
  const s = (function(r) {
    if (r) return Array.isArray(r) ? { bands: r } : r;
  })(t);
  if (!s) return {};
  if (s.bands && s.bands.length) {
    const r = s.bands.find((l) => (l.min === void 0 || e >= l.min) && (l.max === void 0 || e <= l.max));
    return r ? { status: "band", band: r } : {};
  }
  const { low: n, normal: i, high: a } = s;
  if (n !== void 0 && e < n) return { status: "low" };
  if (a !== void 0 && e > a) return { status: "high" };
  if (Array.isArray(i)) {
    if ((i[0] === void 0 || e >= i[0]) && (i[1] === void 0 || e <= i[1])) return { status: "normal" };
  } else {
    if (typeof i == "number" && e === i) return { status: "normal" };
    if (n !== void 0 || a !== void 0) return { status: "normal" };
  }
  return {};
}
function ae(e, t) {
  const s = e?.states?.[t.entity], n = t.unit_override ?? s?.attributes?.unit_of_measurement, i = (function(a) {
    return a ? O(a.state) : null;
  })(s);
  return { value: i, unit: n, text: Ie(i, n, t.decimals, t.unit_override), entity: s };
}
function re(e, t) {
  return e.name || t?.attributes?.friendly_name || (e.entity ? e.entity.split(".").slice(1).join(".") : "Metric");
}
var qe = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, Z = (e, t, s, n) => {
  for (var i, a = n > 1 ? void 0 : n ? Ke(t, s) : t, r = e.length - 1; r >= 0; r--) (i = e[r]) && (a = (n ? i(t, s, a) : i(a)) || a);
  return n && a && qe(t, s, a), a;
};
let P = class extends g {
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: [...e.metrics] };
  }
  getCardSize() {
    return 3;
  }
  renderMetric(e) {
    const { value: t, text: s, entity: n } = ae(this.hass, e), i = (function(o, h) {
      if (!h) return typeof o.goal == "number" ? o.goal : void 0;
      if (typeof o.goal == "number") return o.goal;
      if (o.goal_entity) {
        const u = h.states?.[o.goal_entity], c = O(u?.state);
        if (c !== null) return c;
      }
      if (o.goal && typeof o.goal == "object" && "entity" in o.goal) {
        const u = h.states?.[o.goal.entity], c = O(u?.state);
        if (c !== null) return c;
      }
    })(e, this.hass), a = (function(o, h) {
      return o === null || h === void 0 || h === 0 ? null : Math.min(Math.round(o / h * 100), 999);
    })(t, i), r = re(e, n), l = e.icon ?? n?.attributes?.icon;
    return _`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${l ? _`<ha-icon .icon=${l}></ha-icon>` : d}
          <span>${r}</span>
        </div>
        <div class="value">${s}</div>
        ${i !== void 0 && a !== null ? _`
              <div class="goal-row">
                <span class="progress-label">${a}% of goal</span>
                <span class="progress-label">Goal: ${i}</span>
              </div>
              <div class="progress">
                <div class="bar" style="width: ${Math.min(a, 100)}%"></div>
              </div>
            ` : d}
      </div>
    `;
  }
  render() {
    return this.config ? _`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Fitness Activity"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
P.styles = [q, U`
      .metric {
        position: relative;
      }
      .goal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
      }
      .progress-label {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
    `], Z([T({ attribute: !1 })], P.prototype, "hass", 2), Z([V()], P.prototype, "config", 2), P = Z([I("fitness-activity-summary-card")], P);
var Ze = Object.defineProperty, Ge = Object.getOwnPropertyDescriptor, G = (e, t, s, n) => {
  for (var i, a = n > 1 ? void 0 : n ? Ge(t, s) : t, r = e.length - 1; r >= 0; r--) (i = e[r]) && (a = (n ? i(t, s, a) : i(a)) || a);
  return n && a && Ze(t, s, a), a;
};
let S = class extends g {
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: [...e.metrics] };
  }
  getCardSize() {
    return 3;
  }
  defaultRanges(e, t) {
    const s = t.toLowerCase();
    return s.includes("oxygen") || s.includes("spo2") ? { low: 92, normal: [95, 100] } : s.includes("respiratory") ? { low: 10, high: 24, normal: [12, 20] } : s.includes("resting") || s.includes("heart rate") ? { low: 45, high: 110, normal: [55, 95] } : s.includes("variability") || s.includes("hrv") ? { low: 15, normal: [20, 150] } : s.includes("glucose") ? { low: 70, high: 180, normal: [80, 140] } : e.ranges;
  }
  renderMetric(e) {
    const { value: t, text: s, entity: n } = ae(this.hass, e), i = re(e, n), a = e.icon ?? n?.attributes?.icon, r = e.ranges ?? this.defaultRanges(e, i), { status: l, band: o } = Ve(t, r), h = o?.label ?? (l === "low" ? "Low" : l === "high" ? "High" : l === "normal" ? "OK" : "");
    return _`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${a ? _`<ha-icon .icon=${a}></ha-icon>` : d}
          <span>${i}</span>
          ${h ? _`<span class="pill status-${l ?? "normal"} status-chip">${h}</span>` : d}
        </div>
        <div class="value status-${l ?? "normal"}">${s}</div>
        ${o?.min !== void 0 || o?.max !== void 0 ? _`<div class="subtle">
              ${o.min !== void 0 ? `≥ ${o.min}` : ""} ${o.max !== void 0 ? `≤ ${o.max}` : ""}
            </div>` : d}
      </div>
    `;
  }
  render() {
    return this.config ? _`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Vitals"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
S.styles = [q, U`
      .metric {
        position: relative;
      }
      .status-chip {
        align-self: flex-start;
      }
    `], G([T({ attribute: !1 })], S.prototype, "hass", 2), G([V()], S.prototype, "config", 2), S = G([I("fitness-vitals-card")], S);
var Qe = Object.defineProperty, Ye = Object.getOwnPropertyDescriptor, Q = (e, t, s, n) => {
  for (var i, a = n > 1 ? void 0 : n ? Ye(t, s) : t, r = e.length - 1; r >= 0; r--) (i = e[r]) && (a = (n ? i(t, s, a) : i(a)) || a);
  return n && a && Qe(t, s, a), a;
};
const fe = { asleep: "var(--primary-color)", in_bed: "var(--secondary-text-color)", core: "var(--accent-color, #5c7cfa)", deep: "var(--success-color, #4caf50)", rem: "var(--warning-color, #f9a825)", unknown: "var(--divider-color, #888)" };
let k = class extends g {
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with sleep stages");
    this.config = { ...e, metrics: [...e.metrics] };
  }
  getCardSize() {
    return 3;
  }
  stageFromMetric(e) {
    if (e.stage) return e.stage;
    const t = e.entity.toLowerCase();
    return t.includes("in_bed") ? "in_bed" : t.includes("sleep_core") ? "core" : t.includes("sleep_deep") ? "deep" : t.includes("sleep_rem") ? "rem" : t.includes("sleep_unknown") ? "unknown" : (t.includes("sleep_asleep"), "asleep");
  }
  render() {
    if (!this.config) return d;
    const e = {};
    this.config.metrics.forEach((a) => {
      const r = this.hass?.states?.[a.entity], l = O(r?.state);
      if (l === null) return;
      const o = this.stageFromMetric(a);
      e[o] = l;
    });
    const t = ["core", "deep", "rem", "unknown"], s = e.asleep ?? t.reduce((a, r) => a + (e[r] ?? 0), 0), n = e.in_bed ?? s, i = t.reduce((a, r) => a + (e[r] ?? 0), 0);
    return _`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Sleep"}</div>
        </div>
        <div class="summary">
          <div>
            <div class="label">Asleep</div>
            <div class="value">${s !== void 0 ? W(s) : "—"}</div>
          </div>
          <div>
            <div class="label">In bed</div>
            <div class="value">${n !== void 0 ? W(n) : "—"}</div>
          </div>
        </div>
        <div class="stage-bar">
          ${t.filter((a) => (e[a] ?? 0) > 0).map((a) => {
      const r = e[a] ?? 0;
      return _`<div
                class="stage-segment"
                style="width: ${i > 0 ? r / i * 100 : 0}%; background: ${fe[a]}"
              ></div>`;
    })}
        </div>
        <div class="stage-legend">
          ${t.map((a) => {
      const r = e[a], l = a.toUpperCase();
      return _`<div class="legend-item">
              <span class="swatch" style="background:${fe[a]}"></span>
              <div>
                <div class="label">${l}</div>
                <div class="subtle">
                  ${r != null ? W(r) : "—"}
                </div>
              </div>
            </div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
k.styles = [q, U`
      .summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
        margin-bottom: 8px;
      }
      .stage-bar {
        height: 12px;
        border-radius: 999px;
        background: var(--divider-color, rgba(128, 128, 128, 0.3));
        overflow: hidden;
        display: flex;
        margin: 8px 0;
      }
      .stage-segment {
        height: 100%;
      }
      .stage-legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 6px;
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
      }
    `], Q([T({ attribute: !1 })], k.prototype, "hass", 2), Q([V()], k.prototype, "config", 2), k = Q([I("fitness-sleep-card")], k);
var Xe = Object.defineProperty, et = Object.getOwnPropertyDescriptor, Y = (e, t, s, n) => {
  for (var i, a = n > 1 ? void 0 : n ? et(t, s) : t, r = e.length - 1; r >= 0; r--) (i = e[r]) && (a = (n ? i(t, s, a) : i(a)) || a);
  return n && a && Xe(t, s, a), a;
};
let E = class extends g {
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with body metrics");
    this.config = { ...e, metrics: [...e.metrics] };
  }
  getCardSize() {
    return 3;
  }
  previousValue(e) {
    if (!e) return null;
    const t = [e.attributes?.previous_state, e.attributes?.previous, e.attributes?.last_value, e.attributes?.prior_value];
    for (const s of t) {
      const n = O(s);
      if (n !== null) return n;
    }
    return null;
  }
  trendIcon(e) {
    return e > 0 ? "mdi:arrow-up-bold" : e < 0 ? "mdi:arrow-down-bold" : "mdi:minus";
  }
  renderMetric(e) {
    const { value: t, text: s, entity: n } = ae(this.hass, e), i = re(e, n), a = e.icon ?? n?.attributes?.icon, r = this.previousValue(n), l = t !== null && r !== null ? t - r : null;
    return _`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${a ? _`<ha-icon .icon=${a}></ha-icon>` : d}
          <span>${i}</span>
        </div>
        <div class="value">${s}</div>
        <div class="subtle">
          ${l !== null ? _`<span class="trend ${l > 0 ? "up" : l < 0 ? "down" : ""}">
                <ha-icon .icon=${this.trendIcon(l)}></ha-icon>
                ${l > 0 ? "+" : ""}${l.toFixed(1)}
              </span>` : _`<span class="trend">No previous reading</span>`}
        </div>
      </div>
    `;
  }
  render() {
    return this.config ? _`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Body Metrics"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
E.styles = [q, U`
      .trend {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .trend.up {
        color: var(--success-color, var(--primary-color));
      }
      .trend.down {
        color: var(--error-color, #ef5350);
      }
    `], Y([T({ attribute: !1 })], E.prototype, "hass", 2), Y([V()], E.prototype, "config", 2), E = Y([I("fitness-body-metrics-card")], E);
const xe = JSON.parse('[{"entity_id":"sensor.jasons_iphone_health_oxygen_saturation","state":"97","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Oxygen Saturation","icon":"mdi:water-percent","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_steps","state":"10","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Steps","icon":"mdi:shoe-print","category":"steps"},{"entity_id":"sensor.jasons_iphone_health_resting_heart_rate","state":"75","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Resting Heart Rate","icon":"mdi:heart","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_respiratory_rate","state":"17","unit_of_measurement":"breaths/min","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Respiratory Rate","icon":"mdi:lungs","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_heart_rate_variability_sdnn","state":"19.0986089955471","unit_of_measurement":"ms","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate Variability Sdnn","icon":"mdi:heart-flash","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed","state":"1","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Flights Climbed","icon":"mdi:stairs-up","category":"flights"},{"entity_id":"sensor.jasons_iphone_health_connectivity_test","state":"unavailable","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Connectivity Test","icon":null,"category":"other"},{"entity_id":"sensor.jasons_iphone_health_heart_rate","state":"84","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate","icon":"mdi:heart-pulse","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_distance_cycling","state":"0.0673205280488492","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Cycling","icon":"mdi:bike","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running","state":"0.00497096953789867","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Walking Running","icon":"mdi:walk","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned","state":"0.45","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Active Energy Burned","icon":"mdi:fire","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_environmental_sound_exposure","state":"71.6872025924761","unit_of_measurement":"dB","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Environmental Sound Exposure","icon":"mdi:volume-high","category":"other"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned","state":"26.309","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Basal Energy Burned","icon":"mdi:fire-circle","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_weight","state":"359.022793968073","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Weight","icon":"mdi:scale-bathroom","category":"body"},{"entity_id":"sensor.jasons_iphone_health_vo2_max","state":"24.81","unit_of_measurement":"mL/(kg*min)","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Vo2 Max","icon":"mdi:run","category":"body"},{"entity_id":"sensor.jasons_iphone_health_body_fat_percentage","state":"49.2","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Body Fat Percentage","icon":"mdi:percent","category":"body"},{"entity_id":"sensor.jasons_iphone_health_blood_glucose","state":"113","unit_of_measurement":"mg/dL","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Blood Glucose","icon":"mdi:diabetes","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_bmi","state":"44.6","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Bmi","icon":"mdi:human-male-height","category":"body"},{"entity_id":"sensor.jasons_iphone_health_lean_body_mass","state":"182.190013469583","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Lean Body Mass","icon":"mdi:human","category":"body"},{"entity_id":"sensor.jasons_iphone_health_hydration","state":"29.9254100911311","unit_of_measurement":"fl oz US","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Hydration","icon":"mdi:cup-water","category":"other"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_walking","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Walking","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_walking","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Walking","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_walking","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Walking","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_workout_44","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Workout 44","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_workout_44","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Workout 44","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_cycling","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Cycling","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_cycling","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Cycling","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_cycling","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Cycling","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_hiit","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Hiit","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_hiit","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Hiit","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_in_bed","state":"398.612829041481","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep In Bed","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_functional_strength","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Functional Strength","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_functional_strength","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Functional Strength","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_core","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Core","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_deep","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Deep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_rem","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Rem","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_unknown","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Unknown","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_asleep","state":"14.0041869501273","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Asleep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_steps_daily_total","state":"493","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Steps Daily Total","icon":null,"category":"steps"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned_daily_total","state":"485.150999999998","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Active Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed_daily_total","state":"3","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Flights Climbed Daily Total","icon":null,"category":"flights"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned_daily_total","state":"1841.22300000003","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Basal Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running_daily_total","state":"0.21617157233949","unit_of_measurement":"mi","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Distance Walking Running Daily Total","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_strength_training","state":"1494.09190797806","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Strength Training","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_strength_training","state":"283.444680942575","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Strength Training","icon":null,"category":"energy"}]').map((e) => ({ ...e, category: e.category ?? "other" }));
function tt(e) {
  return xe.filter((t) => t.category === e);
}
function st(e) {
  return xe.find((t) => t.entity_id === e);
}
function D(e, t, s) {
  window.customCards || (window.customCards = []), window.customCards.some((n) => n.type === e) || window.customCards.push({ type: e, name: t, description: s });
}
D("fitness-activity-summary-card", "Fitness Activity Summary", "Shows configurable activity totals with goals."), D("fitness-vitals-card", "Fitness Vitals", "Displays heart metrics with optional thresholds."), D("fitness-sleep-card", "Fitness Sleep", "Summarises sleep totals and stage breakdown."), D("fitness-body-metrics-card", "Fitness Body Metrics", "Shows body metrics with trend indicators.");
export {
  tt as byCategory,
  st as findMetric,
  xe as metricCatalog
};
//# sourceMappingURL=fitness-cards.js.map
