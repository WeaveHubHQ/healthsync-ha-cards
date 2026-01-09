const ue = globalThis, Ce = ue.ShadowRoot && (ue.ShadyCSS === void 0 || ue.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, je = /* @__PURE__ */ Symbol(), ze = /* @__PURE__ */ new WeakMap();
let Ke = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== je) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ce && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = ze.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ze.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const E = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Ke(s, e, je);
}, Me = Ce ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ((i) => new Ke(typeof i == "string" ? i : i + "", void 0, je))(s);
})(e) : e, { is: rt, defineProperty: at, getOwnPropertyDescriptor: ot, getOwnPropertyNames: lt, getOwnPropertySymbols: ct, getPrototypeOf: dt } = Object, _e = globalThis, Te = _e.trustedTypes, ht = Te ? Te.emptyScript : "", ut = _e.reactiveElementPolyfillSupport, F = (e, t) => e, me = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ht : null;
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
} }, He = (e, t) => !rt(e, t), Re = { attribute: !0, type: String, converter: me, reflect: !1, useDefault: !1, hasChanged: He };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), _e.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Re) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && at(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = ot(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const a = i?.call(this);
      r?.call(this, n), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Re;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = dt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, s = [...lt(t), ...ct(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(Me(i));
    } else e !== void 0 && t.push(Me(e));
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
      if (Ce) t.adoptedStyleSheets = s.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
      else for (const i of s) {
        const r = document.createElement("style"), n = ue.litNonce;
        n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, t.appendChild(r);
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
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : me).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : me;
      this._$Em = i;
      const a = n.fromAttribute(t, r.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    if (e !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? He)(r, t) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: r }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), r !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: n } = r, a = this[i];
        n !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, r, a);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[F("elementProperties")] = /* @__PURE__ */ new Map(), D[F("finalized")] = /* @__PURE__ */ new Map(), ut?.({ ReactiveElement: D }), (_e.reactiveElementVersions ??= []).push("2.1.2");
const Oe = globalThis, Ue = (e) => e, pe = Oe.trustedTypes, Je = pe ? pe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ge = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Ze = "?" + k, mt = `<${Ze}>`, S = document, K = () => S.createComment(""), G = (e) => e === null || typeof e != "object" && typeof e != "function", Pe = Array.isArray, ve = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ne = /-->/g, We = />/g, x = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Le = /'/g, Be = /"/g, Qe = /^(?:script|style|textarea|title)$/i, h = /* @__PURE__ */ ((e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }))(1), z = /* @__PURE__ */ Symbol.for("lit-noChange"), c = /* @__PURE__ */ Symbol.for("lit-nothing"), Ie = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function Ye(e, t) {
  if (!Pe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Je !== void 0 ? Je.createHTML(t) : t;
}
const pt = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = B;
  for (let o = 0; o < s; o++) {
    const l = e[o];
    let u, m, d = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, m = a.exec(l), m !== null); ) f = a.lastIndex, a === B ? m[1] === "!--" ? a = Ne : m[1] !== void 0 ? a = We : m[2] !== void 0 ? (Qe.test(m[2]) && (r = RegExp("</" + m[2], "g")), a = x) : m[3] !== void 0 && (a = x) : a === x ? m[0] === ">" ? (a = r ?? B, d = -1) : m[1] === void 0 ? d = -2 : (d = a.lastIndex - m[2].length, u = m[1], a = m[3] === void 0 ? x : m[3] === '"' ? Be : Le) : a === Be || a === Le ? a = x : a === Ne || a === We ? a = B : (a = x, r = void 0);
    const p = a === x && e[o + 1].startsWith("/>") ? " " : "";
    n += a === B ? l + mt : d >= 0 ? (i.push(u), l.slice(0, d) + Ge + l.slice(d) + k + p) : l + k + (d === -2 ? o : p);
  }
  return [Ye(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const o = t.length - 1, l = this.parts, [u, m] = pt(t, s);
    if (this.el = Z.createElement(u, i), A.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = A.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ge)) {
          const f = m[a++], p = r.getAttribute(d).split(k), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: n, name: v[2], strings: p, ctor: v[1] === "." ? gt : v[1] === "?" ? ft : v[1] === "@" ? yt : ge }), r.removeAttribute(d);
        } else d.startsWith(k) && (l.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Qe.test(r.tagName)) {
          const d = r.textContent.split(k), f = d.length - 1;
          if (f > 0) {
            r.textContent = pe ? pe.emptyScript : "";
            for (let p = 0; p < f; p++) r.append(d[p], K()), A.nextNode(), l.push({ type: 2, index: ++n });
            r.append(d[f], K());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ze) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(k, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += k.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = S.createElement("template");
    return i.innerHTML = t, i;
  }
}
function M(e, t, s = e, i) {
  if (t === z) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = G(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = M(e, r._$AS(e, t.values), r, i)), t;
}
class _t {
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
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? S).importNode(s, !0);
    A.currentNode = r;
    let n = A.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new X(n, n.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (u = new vt(n, this, t)), this._$AV.push(u), l = i[++o];
      }
      a !== l?.index && (n = A.nextNode(), a++);
    }
    return A.currentNode = S, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class X {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = M(this, t, s), G(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== z && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ((i) => Pe(i) || typeof i?.[Symbol.iterator] == "function")(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && G(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Z.createElement(Ye(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new _t(r, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Ie.get(t.strings);
    return s === void 0 && Ie.set(t.strings, s = new Z(t)), s;
  }
  k(t) {
    Pe(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new X(this.O(K()), this.O(K()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = Ue(t).nextSibling;
      Ue(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ge {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = M(this, t, s, 0), a = !G(t) || t !== this._$AH && t !== z, a && (this._$AH = t);
    else {
      const o = t;
      let l, u;
      for (t = n[0], l = 0; l < n.length - 1; l++) u = M(this, o[i + l], s, l), u === z && (u = this._$AH[l]), a ||= !G(u) || u !== this._$AH[l], u === c ? t = c : t !== c && (t += (u ?? "") + n[l + 1]), this._$AH[l] = u;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gt extends ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class ft extends ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class yt extends ge {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = M(this, t, s, 0) ?? c) === z) return;
    const i = this._$AH, r = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== c && (i === c || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class vt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const bt = Oe.litHtmlPolyfillSupport;
bt?.(Z, X), (Oe.litHtmlVersions ??= []).push("3.3.2");
const De = globalThis;
class _ extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ((i, r, n) => {
      const a = n?.renderBefore ?? r;
      let o = a._$litPart$;
      if (o === void 0) {
        const l = n?.renderBefore ?? null;
        a._$litPart$ = o = new X(r.insertBefore(K(), l), l, void 0, n ?? {});
      }
      return o._$AI(i), o;
    })(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return z;
  }
}
_._$litElement$ = !0, _.finalized = !0, De.litElementHydrateSupport?.({ LitElement: _ });
const $t = De.litElementPolyfillSupport;
$t?.({ LitElement: _ }), (De.litElementVersions ??= []).push("4.2.2");
const w = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
}, wt = { attribute: !0, type: String, converter: me, reflect: !1, hasChanged: He }, kt = (e = wt, t, s) => {
  const { kind: i, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: a } = s;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, e, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = s;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function y(e) {
  return (t, s) => typeof s == "object" ? kt(e, t, s) : ((i, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
function g(e) {
  return y({ ...e, state: !0, attribute: !1 });
}
const J = E`
  :host {
    display: block;
  }

  .chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 999px;
    background: var(
      --ha-chip-background,
      color-mix(in srgb, var(--card-background-color, #111) 70%, transparent)
    );
    color: var(--primary-text-color);
    font-size: 0.9rem;
  }

  .mini-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-radius: 10px;
    background: var(
      --ha-card-section-background,
      color-mix(
        in srgb,
        var(--card-background-color, var(--ha-card-background, #1e1e1e)) 70%,
        var(--secondary-background-color, rgba(0, 0, 0, 0.04))
      )
    );
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
`, xt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", "null", "nan", ""]);
function b(e) {
  if (e == null) return null;
  const t = String(e).trim();
  if (xt.has(t)) return null;
  const s = Number(t);
  return Number.isFinite(s) ? s : null;
}
function Xe(e) {
  switch (e) {
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
}
function q(e) {
  if (e >= 90)
    return `${Math.floor(e / 60)}h ${Math.round(e % 60)}m`;
  const t = e >= 10 ? 0 : 1;
  return `${e.toFixed(t)} min`;
}
function et(e, t, s, i) {
  if (e == null || Number.isNaN(e)) return "—";
  const r = i ?? t;
  if (t === "min") return q(e);
  if (t === "s") return (function(o) {
    return o >= 3600 ? `${Math.floor(o / 3600)}h ${Math.floor(o % 3600 / 60)}m` : o >= 90 ? `${Math.floor(o / 60)}m ${Math.round(o % 60)}s` : `${Math.round(o)}s`;
  })(e);
  const n = s ?? Xe(t), a = e.toFixed(n);
  return r ? `${a} ${r}` : a;
}
function fe(e, t, s) {
  if (e === null || Number.isNaN(e)) return "—";
  const i = e > 0 ? "+" : "", r = s ?? Xe(t), n = e.toFixed(r);
  return t ? `${i}${n} ${t}` : `${i}${n}`;
}
function tt(e, t) {
  if (!t) return typeof e.goal == "number" ? e.goal : void 0;
  if (typeof e.goal == "number") return e.goal;
  if (e.goal_entity) {
    const s = t.states?.[e.goal_entity], i = b(s?.state);
    if (i !== null) return i;
  }
  if (e.goal && typeof e.goal == "object" && "entity" in e.goal) {
    const s = t.states?.[e.goal.entity], i = b(s?.state);
    if (i !== null) return i;
  }
}
function st(e, t) {
  return e === null || t === void 0 || t === 0 ? null : Math.min(Math.round(e / t * 100), 999);
}
function At(e, t) {
  if (e === null || t === void 0) return {};
  const s = (function(a) {
    if (a) return Array.isArray(a) ? { bands: a } : a;
  })(t);
  if (!s) return {};
  if (s.bands && s.bands.length) {
    const a = s.bands.find((o) => (o.min === void 0 || e >= o.min) && (o.max === void 0 || e <= o.max));
    return a ? { status: "band", band: a } : {};
  }
  const { low: i, normal: r, high: n } = s;
  if (i !== void 0 && e < i) return { status: "low" };
  if (n !== void 0 && e > n) return { status: "high" };
  if (Array.isArray(r)) {
    if ((r[0] === void 0 || e >= r[0]) && (r[1] === void 0 || e <= r[1])) return { status: "normal" };
  } else {
    if (typeof r == "number" && e === r) return { status: "normal" };
    if (i !== void 0 || n !== void 0) return { status: "normal" };
  }
  return {};
}
function Q(e, t) {
  const s = t.entity ?? "", i = s ? e?.states?.[s] : void 0, r = t.unit_override ?? i?.attributes?.unit_of_measurement, n = (function(a) {
    return a ? b(a.state) : null;
  })(i);
  return { value: n, unit: r, text: et(n, r, t.decimals, t.unit_override), entity: i };
}
function Y(e, t) {
  return e.name || t?.attributes?.friendly_name || (e.entity ? e.entity.split(".").slice(1).join(".") : "Metric");
}
const ee = { en: { "card.activity_title": "Activity", "card.vitals_title": "Vitals", "card.sleep_title": "Sleep", "card.body_title": "Body Metrics", "card.workouts_title": "Workouts", "card.overview_title": "Overview", "label.goal": "Goal", "label.of_goal": "{percent}% of goal", "label.total": "Total", "label.duration": "Duration", "label.energy": "Energy", "label.distance": "Distance", "label.asleep": "Asleep", "label.in_bed": "In bed", "label.core": "Core", "label.deep": "Deep", "label.rem": "REM", "label.unknown": "Unknown", "label.no_data": "No data", "label.no_previous": "No previous reading", "label.low": "Low", "label.high": "High", "label.ok": "OK", "label.trend": "Trend", "label.period.current": "Current", "label.period.today": "Today", "label.period.7d": "7 days", "label.period.30d": "30 days" }, es: { "card.activity_title": "Actividad", "card.vitals_title": "Signos vitales", "card.sleep_title": "Sueño", "card.body_title": "Métricas corporales", "label.goal": "Meta", "label.total": "Total", "label.no_data": "Sin datos", "label.low": "Bajo", "label.high": "Alto", "label.ok": "OK" } };
function St(e, t, s) {
  const i = (function(n) {
    if (!n) return ee.en;
    const a = n.split("-")[0];
    return ee[a] || ee.en;
  })(t), r = i[e] ?? ee.en[e] ?? e;
  return s ? Object.entries(s).reduce((n, [a, o]) => n.replace(`{${a}}`, String(o)), r) : r;
}
function N(e) {
  const t = e?.locale?.language || e?.language;
  return (s, i) => St(s, t, i);
}
const it = { steps: { id: "steps", name: "Steps", icon: "mdi:shoe-print", unit: "count", decimals: 0 }, active_energy: { id: "active_energy", name: "Active Energy", icon: "mdi:fire", unit: "kcal", decimals: 0 }, distance_walk_run: { id: "distance_walk_run", name: "Walk/Run Distance", icon: "mdi:walk", unit: "mi", decimals: 2 }, flights_climbed: { id: "flights_climbed", name: "Flights Climbed", icon: "mdi:stairs-up", unit: "count", decimals: 0 }, heart_rate: { id: "heart_rate", name: "Heart Rate", icon: "mdi:heart-pulse", unit: "bpm", decimals: 0, ranges: { low: 50, normal: [55, 95], high: 120 } }, resting_heart_rate: { id: "resting_heart_rate", name: "Resting HR", icon: "mdi:heart", unit: "bpm", decimals: 0, ranges: { low: 45, normal: [50, 90], high: 110 } }, hrv_sdnn: { id: "hrv_sdnn", name: "HRV (SDNN)", icon: "mdi:heart-flash", unit: "ms", decimals: 0, ranges: { low: 20 } }, spo2: { id: "spo2", name: "SpO2", icon: "mdi:water-percent", unit: "%", decimals: 1, ranges: { low: 92, normal: [95, 100] } }, respiratory_rate: { id: "respiratory_rate", name: "Respiratory Rate", icon: "mdi:lungs", unit: "breaths/min", decimals: 0, ranges: { low: 10, normal: [12, 20], high: 24 } }, asleep: { id: "asleep", name: "Asleep", icon: "mdi:sleep", unit: "min", decimals: 0 }, in_bed: { id: "in_bed", name: "In bed", icon: "mdi:bed", unit: "min", decimals: 0 }, sleep_core: { id: "sleep_core", name: "Core", icon: "mdi:alpha-c-circle", unit: "min", decimals: 0 }, sleep_deep: { id: "sleep_deep", name: "Deep", icon: "mdi:alpha-d-circle", unit: "min", decimals: 0 }, sleep_rem: { id: "sleep_rem", name: "REM", icon: "mdi:alpha-r-circle", unit: "min", decimals: 0 }, sleep_unknown: { id: "sleep_unknown", name: "Unknown", icon: "mdi:help-circle-outline", unit: "min", decimals: 0 }, weight: { id: "weight", name: "Weight", icon: "mdi:scale-bathroom", unit: "lb", decimals: 1 }, bmi: { id: "bmi", name: "BMI", icon: "mdi:human-male-height", unit: "count", decimals: 1 }, body_fat_percentage: { id: "body_fat_percentage", name: "Body Fat", icon: "mdi:percent", unit: "%", decimals: 1 }, lean_body_mass: { id: "lean_body_mass", name: "Lean Mass", icon: "mdi:human", unit: "lb", decimals: 1 }, vo2_max: { id: "vo2_max", name: "VO2 Max", icon: "mdi:run", unit: "mL/(kg*min)", decimals: 1 }, workout_cycling: { id: "workout_cycling", name: "Cycling", icon: "mdi:bike" }, workout_walking: { id: "workout_walking", name: "Walking", icon: "mdi:walk" }, workout_strength_training: { id: "workout_strength_training", name: "Strength Training", icon: "mdi:weight-lifter" }, workout_functional_strength: { id: "workout_functional_strength", name: "Functional Strength", icon: "mdi:arm-flex" }, workout_hiit: { id: "workout_hiit", name: "HIIT", icon: "mdi:lightning-bolt" }, workout_generic: { id: "workout_generic", name: "Workout", icon: "mdi:arm-flex-outline" } }, Ve = { activity: [{ preset: "active_energy" }, { preset: "steps" }, { preset: "distance_walk_run" }, { preset: "flights_climbed" }], vitals: [{ preset: "heart_rate" }, { preset: "resting_heart_rate" }, { preset: "hrv_sdnn" }, { preset: "spo2" }, { preset: "respiratory_rate" }], sleep: [{ preset: "asleep", stage: "asleep" }, { preset: "in_bed", stage: "in_bed" }, { preset: "sleep_core", stage: "core" }, { preset: "sleep_deep", stage: "deep" }, { preset: "sleep_rem", stage: "rem" }, { preset: "sleep_unknown", stage: "unknown" }], body: [{ preset: "weight" }, { preset: "bmi" }, { preset: "body_fat_percentage" }, { preset: "lean_body_mass" }, { preset: "vo2_max" }], workouts: [], overview: [] };
function T(e = [], t) {
  return e.length === 0 && t && Ve[t] && (e = Ve[t].map((s) => ({ ...s }))), e.map((s) => (function(i) {
    if (!i.preset) return i;
    const r = it[i.preset];
    return r ? { ...r, ...i, name: i.name ?? r.name, icon: i.icon ?? r.icon, unit_override: i.unit_override ?? r.unit, decimals: i.decimals ?? r.decimals, ranges: i.ranges ?? r.ranges } : i;
  })(s));
}
function $(e) {
  return e ?? "current";
}
const te = /* @__PURE__ */ new Map();
async function Fe(e, t, s, i) {
  const r = (function(o, l, u) {
    return `${o}-${l.toISOString()}-${u.toISOString()}`;
  })(t, s, i), n = Date.now(), a = te.get(r);
  if (a && n - a.ts < 3e4) return a.value;
  try {
    const o = `history/period/${s.toISOString()}?filter_entity_id=${t}&end_time=${i.toISOString()}&minimal_response`, l = await e.callApi("GET", o), u = Array.isArray(l) ? l[0] : void 0;
    if (!u || !u.length) return te.set(r, { ts: n, value: null }), null;
    const m = [...u].reverse().find((f) => b(f.state) !== null), d = m ? b(m.state) : null;
    return te.set(r, { ts: n, value: d }), d;
  } catch {
    return te.set(r, { ts: n, value: null }), null;
  }
}
async function ye(e, t, s) {
  if (!e || !t) return { current: null, previous: null, diff: null, label: s };
  const { start: i, end: r, prevStart: n, prevEnd: a } = (function(u) {
    const m = /* @__PURE__ */ new Date(), d = /* @__PURE__ */ new Date();
    if (u === "today") {
      d.setHours(0, 0, 0, 0);
      const p = new Date(d);
      return p.setDate(p.getDate() - 1), { start: d, end: m, prevStart: p, prevEnd: new Date(d) };
    }
    if (u === "7d") {
      d.setDate(d.getDate() - 7);
      const p = new Date(d), v = new Date(d);
      return v.setDate(v.getDate() - 7), { start: d, end: m, prevStart: v, prevEnd: p };
    }
    if (u === "30d") {
      d.setDate(d.getDate() - 30);
      const p = new Date(d), v = new Date(d);
      return v.setDate(v.getDate() - 30), { start: d, end: m, prevStart: v, prevEnd: p };
    }
    const f = /* @__PURE__ */ new Date();
    return { start: d, end: m, prevStart: new Date(f.getTime() - 18e5), prevEnd: f };
  })(s), o = await Fe(e, t, i, r), l = await Fe(e, t, n, a);
  return { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: s };
}
function R(e) {
  if (!e) return null;
  const t = [e.attributes?.previous_state, e.attributes?.previous, e.attributes?.last_value, e.attributes?.prior_value];
  for (const s of t) {
    const i = b(s);
    if (i !== null) return i;
  }
  return null;
}
var Et = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, se = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Pt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Et(t, s, n), n;
};
let P = class extends _ {
  constructor() {
    super(...arguments), this.trends = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-activity-summary-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: T(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && this.loadTrends();
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = $(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0, n = s.trend_entity ?? i;
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      if (e === "current") {
        const o = r ? Number(r.state) : null, l = s.trend_entity ? R(this.hass?.states?.[s.trend_entity]) : R(r);
        return void (t[i] = { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: e });
      }
      const a = await ye(this.hass, n, e);
      t[i] = a;
    })), this.trends = t;
  }
  renderTrend(e, t) {
    const s = $(this.config?.period);
    if (this.config?.show_trends === !1) return c;
    const i = this.trends[e.entity ?? ""];
    return i && i.diff !== null ? h`<div class="subtle">
      ${this.localize("label.trend")} (${this.localize(`label.period.${s}`)}):
      ${fe(i.diff, t, e.decimals)}
    </div>` : c;
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = Q(this.hass, e), r = tt(e, this.hass), n = st(t, r), a = Y(e, i), o = e.icon ?? i?.attributes?.icon;
    return h`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${o ? h`<ha-icon .icon=${o}></ha-icon>` : c}
          <span>${a}</span>
        </div>
        <div class="value">${s}</div>
        ${this.renderTrend(e, e.unit_override ?? i?.attributes?.unit_of_measurement)}
        ${r !== void 0 && n !== null ? h`
              <div class="goal-row">
                <span class="progress-label">${n}% of goal</span>
                <span class="progress-label">${this.localize("label.goal")}: ${r}</span>
              </div>
              <div class="progress">
                <div class="bar" style="width: ${Math.min(n, 100)}%"></div>
              </div>
            ` : c}
      </div>
    `;
  }
  render() {
    return this.config ? h`
      <ha-card>
        <div class="header">
          <div class="title">
            ${this.config.title ?? this.localize("card.activity_title")}
          </div>
          <div class="subtle">${this.localize(`label.period.${$(this.config.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : c;
  }
};
P.styles = [J, E`
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
    `], se([y({ attribute: !1 })], P.prototype, "hass", 2), se([g()], P.prototype, "config", 2), se([g()], P.prototype, "trends", 2), P = se([w("fitness-activity-summary-card")], P);
var Ct = Object.defineProperty, jt = Object.getOwnPropertyDescriptor, ie = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? jt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Ct(t, s, n), n;
};
let C = class extends _ {
  constructor() {
    super(...arguments), this.trends = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-vitals-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: T(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && this.loadTrends();
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = $(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0;
      if (e === "current") {
        const a = r ? b(r.state) : null, o = R(r);
        return void (t[i] = { current: a, previous: o, diff: a !== null && o !== null ? a - o : null, label: e });
      }
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      const n = await ye(this.hass, s.trend_entity ?? i, e);
      t[i] = n;
    })), this.trends = t;
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  renderTrend(e, t) {
    if (this.config?.show_trends === !1) return c;
    const s = this.trends[e.entity ?? ""];
    if (!s || s.diff === null) return c;
    const i = $(this.config?.period);
    return h`<div class="subtle">
      ${this.localize("label.trend")} (${this.localize(`label.period.${i}`)}):
      ${fe(s.diff, t, e.decimals)}
    </div>`;
  }
  defaultRanges(e, t) {
    const s = t.toLowerCase();
    return s.includes("oxygen") || s.includes("spo2") ? { low: 92, normal: [95, 100] } : s.includes("respiratory") ? { low: 10, high: 24, normal: [12, 20] } : s.includes("resting") || s.includes("heart rate") ? { low: 45, high: 110, normal: [55, 95] } : s.includes("variability") || s.includes("hrv") ? { low: 15, normal: [20, 150] } : s.includes("glucose") ? { low: 70, high: 180, normal: [80, 140] } : e.ranges;
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = Q(this.hass, e), r = Y(e, i), n = e.icon ?? i?.attributes?.icon, a = e.ranges ?? this.defaultRanges(e, r), { status: o, band: l } = At(t, a), u = l?.label ?? (o === "low" ? this.localize("label.low") : o === "high" ? this.localize("label.high") : o === "normal" ? this.localize("label.ok") : "");
    return h`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${n ? h`<ha-icon .icon=${n}></ha-icon>` : c}
          <span>${r}</span>
          ${u ? h`<span class="pill status-${o ?? "normal"} status-chip">${u}</span>` : c}
        </div>
        <div class="value status-${o ?? "normal"}">${s}</div>
        ${this.renderTrend(e, e.unit_override ?? i?.attributes?.unit_of_measurement)}
        ${l?.min !== void 0 || l?.max !== void 0 ? h`<div class="subtle">
              ${l.min !== void 0 ? `≥ ${l.min}` : ""} ${l.max !== void 0 ? `≤ ${l.max}` : ""}
            </div>` : c}
      </div>
    `;
  }
  render() {
    return this.config ? h`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.vitals_title")}</div>
          <div class="subtle">${this.localize(`label.period.${$(this.config.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : c;
  }
};
C.styles = [J, E`
      .metric {
        position: relative;
      }
      .status-chip {
        align-self: flex-start;
      }
    `], ie([y({ attribute: !1 })], C.prototype, "hass", 2), ie([g()], C.prototype, "config", 2), ie([g()], C.prototype, "trends", 2), C = ie([w("fitness-vitals-card")], C);
var Ht = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, be = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Ot(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Ht(t, s, n), n;
};
const qe = { asleep: "var(--primary-color)", in_bed: "var(--secondary-text-color)", core: "var(--accent-color, #5c7cfa)", deep: "var(--success-color, #4caf50)", rem: "var(--warning-color, #f9a825)", unknown: "var(--divider-color, #888)" };
let I = class extends _ {
  static async getConfigElement() {
    return document.createElement("fitness-sleep-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with sleep stages");
    this.config = { ...e, metrics: T(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  stageFromMetric(e) {
    if (e.stage) return e.stage;
    const t = (e.entity ?? "").toLowerCase();
    return t.includes("in_bed") ? "in_bed" : t.includes("sleep_core") ? "core" : t.includes("sleep_deep") ? "deep" : t.includes("sleep_rem") ? "rem" : t.includes("sleep_unknown") ? "unknown" : (t.includes("sleep_asleep"), "asleep");
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  render() {
    if (!this.config) return c;
    const e = {};
    this.config.metrics.forEach((n) => {
      const a = n.entity ?? "", o = a ? this.hass?.states?.[a] : void 0, l = b(o?.state);
      if (l === null) return;
      const u = this.stageFromMetric(n);
      e[u] = l;
    });
    const t = ["core", "deep", "rem", "unknown"], s = e.asleep ?? t.reduce((n, a) => n + (e[a] ?? 0), 0), i = e.in_bed ?? s, r = t.reduce((n, a) => n + (e[a] ?? 0), 0);
    return h`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.sleep_title")}</div>
          ${this.config?.period ? h`<div class="subtle">
                ${this.localize(`label.period.${this.config.period}`) || this.config.period}
              </div>` : c}
        </div>
        <div class="summary">
          <div>
            <div class="label">${this.localize("label.asleep")}</div>
            <div class="value">${s !== void 0 ? q(s) : "—"}</div>
          </div>
          <div>
            <div class="label">${this.localize("label.in_bed")}</div>
            <div class="value">${i !== void 0 ? q(i) : "—"}</div>
          </div>
        </div>
        <div class="stage-bar">
          ${t.filter((n) => (e[n] ?? 0) > 0).map((n) => {
      const a = e[n] ?? 0;
      return h`<div
                class="stage-segment"
                style="width: ${r > 0 ? a / r * 100 : 0}%; background: ${qe[n]}"
              ></div>`;
    })}
        </div>
        <div class="stage-legend">
          ${t.map((n) => {
      const a = e[n], o = this.localize(`label.${n}`) || n.toUpperCase();
      return h`<div class="legend-item">
              <span class="swatch" style="background:${qe[n]}"></span>
              <div>
                <div class="label">${o}</div>
                <div class="subtle">
                  ${a != null ? q(a) : "—"}
                </div>
              </div>
            </div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
I.styles = [J, E`
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
    `], be([y({ attribute: !1 })], I.prototype, "hass", 2), be([g()], I.prototype, "config", 2), I = be([w("fitness-sleep-card")], I);
var Dt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, ne = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? zt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Dt(t, s, n), n;
};
let j = class extends _ {
  constructor() {
    super(...arguments), this.trends = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-body-metrics-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with body metrics");
    this.config = { ...e, metrics: T(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && this.loadTrends();
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = $(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0;
      if (e === "current") {
        const a = r ? b(r.state) : null, o = R(r);
        return void (t[i] = { current: a, previous: o, diff: a !== null && o !== null ? a - o : null, label: e });
      }
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      const n = await ye(this.hass, s.trend_entity ?? i, e);
      t[i] = n;
    })), this.trends = t;
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  previousValue(e) {
    return R(e);
  }
  trendIcon(e) {
    return e > 0 ? "mdi:arrow-up-bold" : e < 0 ? "mdi:arrow-down-bold" : "mdi:minus";
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = Q(this.hass, e), r = Y(e, i), n = e.icon ?? i?.attributes?.icon, a = this.trends[e.entity ?? ""], o = this.previousValue(i), l = a?.diff !== void 0 ? a.diff : t !== null && o !== null ? t - o : null;
    return h`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${n ? h`<ha-icon .icon=${n}></ha-icon>` : c}
          <span>${r}</span>
        </div>
        <div class="value">${s}</div>
        <div class="subtle">
          ${l !== null ? h`<span class="trend ${l > 0 ? "up" : l < 0 ? "down" : ""}">
                <ha-icon .icon=${this.trendIcon(l)}></ha-icon>
                ${fe(l, e.unit_override ?? i?.attributes?.unit_of_measurement)}
              </span>` : h`<span class="trend">${this.localize("label.no_previous")}</span>`}
        </div>
      </div>
    `;
  }
  render() {
    return this.config ? h`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.body_title")}</div>
          <div class="subtle">${this.localize(`label.period.${$(this.config?.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : c;
  }
};
j.styles = [J, E`
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
    `], ne([y({ attribute: !1 })], j.prototype, "hass", 2), ne([g()], j.prototype, "config", 2), ne([g()], j.prototype, "trends", 2), j = ne([w("fitness-body-metrics-card")], j);
var Mt = Object.defineProperty, Tt = Object.getOwnPropertyDescriptor, $e = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Tt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Mt(t, s, n), n;
};
let V = class extends _ {
  static async getConfigElement() {
    return document.createElement("fitness-workouts-card-editor");
  }
  setConfig(e) {
    if (!e.workouts || !Array.isArray(e.workouts) || e.workouts.length === 0) throw new Error("Add a workouts array");
    this.config = { ...e, workouts: [...e.workouts] };
  }
  getCardSize() {
    return 4;
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  workoutValues(e) {
    return { duration: b(this.hass?.states?.[e.duration_entity ?? ""]?.state), energy: b(this.hass?.states?.[e.energy_entity ?? ""]?.state), distance: b(this.hass?.states?.[e.distance_entity ?? ""]?.state) };
  }
  renderValue(e, t) {
    return t === "min" && e !== null ? q(e) : et(e, t);
  }
  totalRow() {
    if (!this.config) return c;
    const e = { duration: 0, energy: 0, distance: 0 };
    return this.config.workouts.forEach((t) => {
      const s = this.workoutValues(t);
      e.duration = s.duration !== null ? (e.duration ?? 0) + s.duration : e.duration, e.energy = s.energy !== null ? (e.energy ?? 0) + s.energy : e.energy, e.distance = s.distance !== null ? (e.distance ?? 0) + s.distance : e.distance;
    }), h`
      <div class="row total">
        <div>${this.localize("label.total")}</div>
        <div class="value">${this.renderValue(e.duration, "min")}</div>
        <div class="value">${this.renderValue(e.energy, "kcal")}</div>
        ${this.config.workouts.some((t) => t.distance_entity) ? h`<div class="value">${this.renderValue(e.distance, "mi")}</div>` : c}
      </div>
    `;
  }
  renderRow(e) {
    const { duration: t, energy: s, distance: i } = this.workoutValues(e), r = !!e.distance_entity;
    return h`
      <div class="row">
        <div class="label">
          ${e.icon ? h`<ha-icon .icon=${e.icon}></ha-icon>` : c}
          <span>${e.name}</span>
        </div>
        <div class="value">${this.renderValue(t, "min")}</div>
        <div class="value">${this.renderValue(s, "kcal")}</div>
        ${r ? h`<div class="value">${this.renderValue(i, "mi")}</div>` : c}
      </div>
    `;
  }
  render() {
    return this.config ? h`
      <ha-card class=${this.config.compact ? "compact" : ""}>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.workouts_title")}</div>
          <div class="subtle">${this.localize(`label.period.${$(this.config.period)}`)}</div>
        </div>
        <div class="workout-list">
          <div class="row header-row">
            <div></div>
            <div class="value">${this.localize("label.duration")}</div>
            <div class="value">${this.localize("label.energy")}</div>
            ${this.config.workouts.some((e) => e.distance_entity) ? h`<div class="value">${this.localize("label.distance")}</div>` : c}
          </div>
          ${this.totalRow()}
          ${this.config.workouts.map((e) => this.renderRow(e))}
        </div>
      </ha-card>
    ` : c;
  }
};
V.styles = [J, E`
      .workout-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr repeat(3, minmax(70px, 100px));
        gap: 10px;
        align-items: center;
      }
      .header-row {
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .total {
        font-weight: 700;
      }
      .value {
        text-align: right;
      }
      .compact .row {
        grid-template-columns: 1fr repeat(2, minmax(60px, 80px));
      }
    `], $e([y({ attribute: !1 })], V.prototype, "hass", 2), $e([g()], V.prototype, "config", 2), V = $e([w("fitness-workouts-card")], V);
var Rt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, re = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Ut(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Rt(t, s, n), n;
};
let H = class extends _ {
  constructor() {
    super(...arguments), this.trends = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-overview-card-editor");
  }
  setConfig(e) {
    if (!e.primary_metrics || !Array.isArray(e.primary_metrics) || e.primary_metrics.length === 0) throw new Error("Add primary_metrics");
    this.config = { ...e, primary_metrics: T(e.primary_metrics, e.preset), secondary_metrics: T(e.secondary_metrics ?? [], e.preset) };
  }
  getCardSize() {
    return 4;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && this.loadTrends();
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = $(this.config.period), t = { ...this.trends }, s = [...this.config.primary_metrics, ...this.config.secondary_metrics ?? []];
    await Promise.all(s.map(async (i) => {
      const r = i.entity ?? "", n = r ? this.hass?.states?.[r] : void 0;
      if (e === "current") {
        const o = n ? Number(n.state) : null, l = R(n);
        return void (t[r] = { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: e });
      }
      if (!r) return void (t[r] = { current: null, previous: null, diff: null, label: e });
      const a = await ye(this.hass, i.trend_entity ?? r, e);
      t[r] = a;
    })), this.trends = t;
  }
  localize(e, t) {
    return N(this.hass)(e, t);
  }
  renderTrend(e, t) {
    if (this.config?.show_trends === !1) return c;
    const s = this.trends[e.entity ?? ""];
    if (!s || s.diff === null) return c;
    const i = $(this.config?.period);
    return h`<div class="subtle">
      ${this.localize("label.trend")} (${this.localize(`label.period.${i}`)}):
      ${fe(s.diff, t, e.decimals)}
    </div>`;
  }
  renderProgressRing(e) {
    if (e == null) return c;
    const t = Math.min(e, 100);
    return h`
      <div class="progress-ring">
        <div class="progress-fill" style="background:${`conic-gradient(var(--accent-color, var(--primary-color)) ${t}%, var(--divider-color, #ccc) ${t}% 100%)`}"></div>
      </div>
    `;
  }
  renderPrimary(e) {
    const { value: t, text: s, entity: i } = Q(this.hass, e), r = Y(e, i), n = e.icon ?? i?.attributes?.icon, a = tt(e, this.hass), o = st(t, a), l = e.unit_override ?? i?.attributes?.unit_of_measurement;
    return h`
      <div class="metric">
        <div class="label">
          ${n ? h`<ha-icon .icon=${n}></ha-icon>` : c}
          <span>${r}</span>
          ${this.renderProgressRing(o ?? void 0)}
        </div>
        <div class="value">${s}</div>
        ${a !== void 0 && o !== null ? h`<div class="subtle">
              ${this.localize("label.of_goal", { percent: o })}
              • ${this.localize("label.goal")}: ${a}
            </div>` : c}
        ${this.renderTrend(e, l)}
      </div>
    `;
  }
  renderSecondary(e) {
    const { text: t, entity: s } = Q(this.hass, e), i = Y(e, s), r = e.icon ?? s?.attributes?.icon, n = this.renderTrend(e, e.unit_override ?? s?.attributes?.unit_of_measurement);
    return h`
      <div class="chip">
        ${r ? h`<ha-icon .icon=${r}></ha-icon>` : c}
        <span>${i}</span>
        <span class="chip-value">${t}</span>
        ${n}
      </div>
    `;
  }
  render() {
    return this.config ? h`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.overview_title")}</div>
          <div class="subtle">${this.localize(`label.period.${$(this.config.period)}`)}</div>
        </div>
        <div class="primary-grid">
          ${this.config.primary_metrics.map((e) => this.renderPrimary(e))}
        </div>
        ${this.config.secondary_metrics && this.config.secondary_metrics.length ? h`<div class="secondary">
              ${this.config.secondary_metrics.map((e) => this.renderSecondary(e))}
            </div>` : c}
      </ha-card>
    ` : c;
  }
};
function W(e, t, s) {
  e.dispatchEvent(new CustomEvent(t, { detail: s, bubbles: !0, composed: !0 }));
}
H.styles = [J, E`
      .primary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
      }
      .secondary {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .chip-value {
        font-weight: 700;
      }
      .progress-ring {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--divider-color);
        position: relative;
      }
      .progress-ring::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: var(--card-background-color, var(--ha-card-background, #1e1e1e));
      }
      .progress-fill {
        position: absolute;
        inset: 0;
        border-radius: 50%;
      }
    `], re([y({ attribute: !1 })], H.prototype, "hass", 2), re([g()], H.prototype, "config", 2), re([g()], H.prototype, "trends", 2), H = re([w("fitness-overview-card")], H);
const L = [{ value: "current", label: "Current" }, { value: "today", label: "Today" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }], U = [{ name: "entity", selector: { entity: {} } }, { name: "preset", selector: { select: { options: Object.values(it).map((e) => ({ value: e.id, label: e.name })) } } }, { name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }, { name: "unit_override", selector: { text: {} } }, { name: "decimals", selector: { number: { min: 0, max: 4, mode: "box" } } }, { name: "goal", selector: { number: { min: 0, mode: "box" } } }, { name: "goal_entity", selector: { entity: {} } }, { name: "trend_entity", selector: { entity: {} } }, { name: "ranges", schema: [{ name: "low", selector: { number: { mode: "box" } } }, { name: "normal", selector: { text: {} } }, { name: "high", selector: { number: { mode: "box" } } }] }];
var Jt = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, we = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Nt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Jt(t, s, n), n;
};
let ae = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-activity-summary-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["activity", "vitals", "sleep", "body"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, { name: "metrics", type: "array", schema: U }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
we([y({ attribute: !1 })], ae.prototype, "hass", 2), we([g()], ae.prototype, "_config", 2), ae = we([w("fitness-activity-summary-card-editor")], ae);
var Wt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, ke = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Lt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Wt(t, s, n), n;
};
let oe = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-vitals-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["vitals"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, { name: "metrics", type: "array", schema: U }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
ke([y({ attribute: !1 })], oe.prototype, "hass", 2), ke([g()], oe.prototype, "_config", 2), oe = ke([w("fitness-vitals-card-editor")], oe);
var Bt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, xe = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? It(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Bt(t, s, n), n;
};
let le = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-sleep-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["sleep"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "metrics", type: "array", schema: U }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
xe([y({ attribute: !1 })], le.prototype, "hass", 2), xe([g()], le.prototype, "_config", 2), le = xe([w("fitness-sleep-card-editor")], le);
var Vt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, Ae = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Ft(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Vt(t, s, n), n;
};
let ce = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-body-metrics-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["body"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, { name: "metrics", type: "array", schema: U }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Ae([y({ attribute: !1 })], ce.prototype, "hass", 2), Ae([g()], ce.prototype, "_config", 2), ce = Ae([w("fitness-body-metrics-card-editor")], ce);
var qt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Se = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Kt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && qt(t, s, n), n;
};
const Gt = [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }, { name: "duration_entity", selector: { entity: {} } }, { name: "energy_entity", selector: { entity: {} } }, { name: "distance_entity", selector: { entity: {} } }];
let de = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-workouts-card", workouts: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["workouts"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "workouts", type: "array", schema: Gt }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Se([y({ attribute: !1 })], de.prototype, "hass", 2), Se([g()], de.prototype, "_config", 2), de = Se([w("fitness-workouts-card-editor")], de);
var Zt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, Ee = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Qt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Zt(t, s, n), n;
};
let he = class extends _ {
  setConfig(e) {
    this._config = { ...e };
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, W(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-overview-card", primary_metrics: [], secondary_metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["overview"] } } }, { name: "period", selector: { select: { options: L } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, { name: "primary_metrics", type: "array", schema: U }, { name: "secondary_metrics", type: "array", schema: U }];
    return h`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${(s) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Ee([y({ attribute: !1 })], he.prototype, "hass", 2), Ee([g()], he.prototype, "_config", 2), he = Ee([w("fitness-overview-card-editor")], he);
const nt = JSON.parse('[{"entity_id":"sensor.jasons_iphone_health_oxygen_saturation","state":"97","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Oxygen Saturation","icon":"mdi:water-percent","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_steps","state":"10","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Steps","icon":"mdi:shoe-print","category":"steps"},{"entity_id":"sensor.jasons_iphone_health_resting_heart_rate","state":"75","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Resting Heart Rate","icon":"mdi:heart","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_respiratory_rate","state":"17","unit_of_measurement":"breaths/min","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Respiratory Rate","icon":"mdi:lungs","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_heart_rate_variability_sdnn","state":"19.0986089955471","unit_of_measurement":"ms","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate Variability Sdnn","icon":"mdi:heart-flash","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed","state":"1","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Flights Climbed","icon":"mdi:stairs-up","category":"flights"},{"entity_id":"sensor.jasons_iphone_health_connectivity_test","state":"unavailable","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Connectivity Test","icon":null,"category":"other"},{"entity_id":"sensor.jasons_iphone_health_heart_rate","state":"84","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate","icon":"mdi:heart-pulse","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_distance_cycling","state":"0.0673205280488492","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Cycling","icon":"mdi:bike","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running","state":"0.00497096953789867","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Walking Running","icon":"mdi:walk","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned","state":"0.45","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Active Energy Burned","icon":"mdi:fire","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_environmental_sound_exposure","state":"71.6872025924761","unit_of_measurement":"dB","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Environmental Sound Exposure","icon":"mdi:volume-high","category":"other"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned","state":"26.309","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Basal Energy Burned","icon":"mdi:fire-circle","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_weight","state":"359.022793968073","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Weight","icon":"mdi:scale-bathroom","category":"body"},{"entity_id":"sensor.jasons_iphone_health_vo2_max","state":"24.81","unit_of_measurement":"mL/(kg*min)","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Vo2 Max","icon":"mdi:run","category":"body"},{"entity_id":"sensor.jasons_iphone_health_body_fat_percentage","state":"49.2","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Body Fat Percentage","icon":"mdi:percent","category":"body"},{"entity_id":"sensor.jasons_iphone_health_blood_glucose","state":"113","unit_of_measurement":"mg/dL","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Blood Glucose","icon":"mdi:diabetes","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_bmi","state":"44.6","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Bmi","icon":"mdi:human-male-height","category":"body"},{"entity_id":"sensor.jasons_iphone_health_lean_body_mass","state":"182.190013469583","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Lean Body Mass","icon":"mdi:human","category":"body"},{"entity_id":"sensor.jasons_iphone_health_hydration","state":"29.9254100911311","unit_of_measurement":"fl oz US","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Hydration","icon":"mdi:cup-water","category":"other"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_walking","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Walking","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_walking","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Walking","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_walking","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Walking","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_workout_44","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Workout 44","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_workout_44","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Workout 44","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_cycling","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Cycling","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_cycling","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Cycling","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_cycling","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Cycling","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_hiit","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Hiit","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_hiit","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Hiit","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_in_bed","state":"398.612829041481","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep In Bed","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_functional_strength","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Functional Strength","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_functional_strength","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Functional Strength","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_core","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Core","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_deep","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Deep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_rem","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Rem","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_unknown","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Unknown","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_asleep","state":"14.0041869501273","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Asleep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_steps_daily_total","state":"493","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Steps Daily Total","icon":null,"category":"steps"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned_daily_total","state":"485.150999999998","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Active Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed_daily_total","state":"3","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Flights Climbed Daily Total","icon":null,"category":"flights"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned_daily_total","state":"1841.22300000003","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Basal Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running_daily_total","state":"0.21617157233949","unit_of_measurement":"mi","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Distance Walking Running Daily Total","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_strength_training","state":"1494.09190797806","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Strength Training","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_strength_training","state":"283.444680942575","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Strength Training","icon":null,"category":"energy"}]').map((e) => ({ ...e, category: e.category ?? "other" }));
function Yt(e) {
  return nt.filter((t) => t.category === e);
}
function Xt(e) {
  return nt.find((t) => t.entity_id === e);
}
function O(e, t, s) {
  window.customCards || (window.customCards = []), window.customCards.some((i) => i.type === e) || window.customCards.push({ type: e, name: t, description: s });
}
O("fitness-activity-summary-card", "Fitness Activity Summary", "Shows configurable activity totals with goals."), O("fitness-vitals-card", "Fitness Vitals", "Displays heart metrics with optional thresholds."), O("fitness-sleep-card", "Fitness Sleep", "Summarises sleep totals and stage breakdown."), O("fitness-body-metrics-card", "Fitness Body Metrics", "Shows body metrics with trend indicators."), O("fitness-workouts-card", "Fitness Workouts", "Summarises workout energy/duration."), O("fitness-overview-card", "Fitness Overview", "Highlights primary and secondary metrics.");
export {
  Yt as byCategory,
  Xt as findMetric,
  nt as metricCatalog
};
//# sourceMappingURL=fitness-cards.js.map
