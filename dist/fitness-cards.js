const $e = globalThis, Te = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ne = /* @__PURE__ */ Symbol(), Ie = /* @__PURE__ */ new WeakMap();
let ot = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== Ne) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Te && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Ie.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ie.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const z = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, r, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new ot(s, e, Ne);
}, Fe = Te ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return ((i) => new ot(typeof i == "string" ? i : i + "", void 0, Ne))(s);
})(e) : e, { is: vt, defineProperty: bt, getOwnPropertyDescriptor: $t, getOwnPropertyNames: wt, getOwnPropertySymbols: kt, getPrototypeOf: xt } = Object, Ae = globalThis, Ve = Ae.trustedTypes, St = Ve ? Ve.emptyScript : "", At = Ae.reactiveElementPolyfillSupport, ce = (e, t) => e, ke = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? St : null;
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
} }, Re = (e, t) => !vt(e, t), qe = { attribute: !0, type: String, converter: ke, reflect: !1, useDefault: !1, hasChanged: Re };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ae.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let L = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = qe) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && bt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: r } = $t(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? qe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ce("elementProperties"))) return;
    const e = xt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ce("properties"))) {
      const t = this.properties, s = [...wt(t), ...kt(t)];
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
      for (const i of s) t.unshift(Fe(i));
    } else e !== void 0 && t.push(Fe(e));
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
      if (Te) t.adoptedStyleSheets = s.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
      else for (const i of s) {
        const r = document.createElement("style"), n = $e.litNonce;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : ke).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), n = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : ke;
      this._$Em = i;
      const a = n.fromAttribute(t, r.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, r) {
    if (e !== void 0) {
      const n = this.constructor;
      if (i === !1 && (r = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? Re)(r, t) || s.useDefault && s.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
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
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[ce("elementProperties")] = /* @__PURE__ */ new Map(), L[ce("finalized")] = /* @__PURE__ */ new Map(), At?.({ ReactiveElement: L }), (Ae.reactiveElementVersions ??= []).push("2.1.2");
const Ue = globalThis, Ge = (e) => e, xe = Ue.trustedTypes, Ke = xe ? xe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, lt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + S, Et = `<${ct}>`, O = document, he = () => O.createComment(""), ue = (e) => e === null || typeof e != "object" && typeof e != "function", Me = Array.isArray, Oe = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ze = /-->/g, Xe = />/g, A = RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ye = /'/g, Qe = /"/g, dt = /^(?:script|style|textarea|title)$/i, ht = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), c = ht(1), et = ht(2), W = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), j = O.createTreeWalker(O, 129);
function ut(e, t) {
  if (!Me(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ke !== void 0 ? Ke.createHTML(t) : t;
}
const Pt = (e, t) => {
  const s = e.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Z;
  for (let o = 0; o < s; o++) {
    const l = e[o];
    let p, u, h = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, u = a.exec(l), u !== null); ) m = a.lastIndex, a === Z ? u[1] === "!--" ? a = Ze : u[1] !== void 0 ? a = Xe : u[2] !== void 0 ? (dt.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = A) : u[3] !== void 0 && (a = A) : a === A ? u[0] === ">" ? (a = r ?? Z, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, p = u[1], a = u[3] === void 0 ? A : u[3] === '"' ? Qe : Ye) : a === Qe || a === Ye ? a = A : a === Ze || a === Xe ? a = Z : (a = A, r = void 0);
    const g = a === A && e[o + 1].startsWith("/>") ? " " : "";
    n += a === Z ? l + Et : h >= 0 ? (i.push(p), l.slice(0, h) + lt + l.slice(h) + S + g) : l + S + (h === -2 ? o : g);
  }
  return [ut(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class pe {
  constructor({ strings: t, _$litType$: s }, i) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const o = t.length - 1, l = this.parts, [p, u] = Pt(t, s);
    if (this.el = pe.createElement(p, i), j.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = j.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(lt)) {
          const m = u[a++], g = r.getAttribute(h).split(S), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: f[2], strings: g, ctor: f[1] === "." ? Ht : f[1] === "?" ? jt : f[1] === "@" ? Ot : Ee }), r.removeAttribute(h);
        } else h.startsWith(S) && (l.push({ type: 6, index: n }), r.removeAttribute(h));
        if (dt.test(r.tagName)) {
          const h = r.textContent.split(S), m = h.length - 1;
          if (m > 0) {
            r.textContent = xe ? xe.emptyScript : "";
            for (let g = 0; g < m; g++) r.append(h[g], he()), j.nextNode(), l.push({ type: 2, index: ++n });
            r.append(h[m], he());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ct) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(S, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += S.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = O.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(e, t, s = e, i) {
  if (t === W) return t;
  let r = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = ue(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = r : s._$Cl = r), r !== void 0 && (t = B(e, r._$AS(e, t.values), r, i)), t;
}
class Ct {
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
    const { el: { content: s }, parts: i } = this._$AD, r = (t?.creationScope ?? O).importNode(s, !0);
    j.currentNode = r;
    let n = j.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new ge(n, n.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (p = new zt(n, this, t)), this._$AV.push(p), l = i[++o];
      }
      a !== l?.index && (n = j.nextNode(), a++);
    }
    return j.currentNode = O, r;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class ge {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = B(this, t, s), ue(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== W && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ((i) => Me(i) || typeof i?.[Symbol.iterator] == "function")(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && ue(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = pe.createElement(ut(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new Ct(r, this), a = n.u(this.options);
      n.p(s), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = tt.get(t.strings);
    return s === void 0 && tt.set(t.strings, s = new pe(t)), s;
  }
  k(t) {
    Me(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, r = 0;
    for (const n of t) r === s.length ? s.push(i = new ge(this.O(he()), this.O(he()), this, this.options)) : i = s[r], i._$AI(n), r++;
    r < s.length && (this._$AR(i && i._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = Ge(t).nextSibling;
      Ge(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, i, r, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, s = this, i, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = B(this, t, s, 0), a = !ue(t) || t !== this._$AH && t !== W, a && (this._$AH = t);
    else {
      const o = t;
      let l, p;
      for (t = n[0], l = 0; l < n.length - 1; l++) p = B(this, o[i + l], s, l), p === W && (p = this._$AH[l]), a ||= !ue(p) || p !== this._$AH[l], p === d ? t = d : t !== d && (t += (p ?? "") + n[l + 1]), this._$AH[l] = p;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ht extends Ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class jt extends Ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Ot extends Ee {
  constructor(t, s, i, r, n) {
    super(t, s, i, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = B(this, t, s, 0) ?? d) === W) return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const Dt = Ue.litHtmlPolyfillSupport;
Dt?.(pe, ge), (Ue.litHtmlVersions ??= []).push("3.3.2");
const Je = globalThis;
class y extends L {
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
        a._$litPart$ = o = new ge(r.insertBefore(he(), l), l, void 0, n ?? {});
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
    return W;
  }
}
y._$litElement$ = !0, y.finalized = !0, Je.litElementHydrateSupport?.({ LitElement: y });
const Mt = Je.litElementPolyfillSupport;
Mt?.({ LitElement: y }), (Je.litElementVersions ??= []).push("4.2.2");
const k = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
}, Tt = { attribute: !0, type: String, converter: ke, reflect: !1, hasChanged: Re }, Nt = (e = Tt, t, s) => {
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
function $(e) {
  return (t, s) => typeof s == "object" ? Nt(e, t, s) : ((i, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
function _(e) {
  return $({ ...e, state: !0, attribute: !1 });
}
const q = z`
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
`, Rt = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", "null", "nan", ""]);
function b(e) {
  if (e == null) return null;
  const t = String(e).trim();
  if (Rt.has(t)) return null;
  const s = Number(t);
  return Number.isFinite(s) ? s : null;
}
function pt(e) {
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
function de(e) {
  if (e >= 90)
    return `${Math.floor(e / 60)}h ${Math.round(e % 60)}m`;
  const t = e >= 10 ? 0 : 1;
  return `${e.toFixed(t)} min`;
}
function _t(e, t, s, i) {
  if (e == null || Number.isNaN(e)) return "—";
  const r = i ?? t;
  if (t === "min") return de(e);
  if (t === "s") return (function(o) {
    return o >= 3600 ? `${Math.floor(o / 3600)}h ${Math.floor(o % 3600 / 60)}m` : o >= 90 ? `${Math.floor(o / 60)}m ${Math.round(o % 60)}s` : `${Math.round(o)}s`;
  })(e);
  const n = s ?? pt(t), a = e.toFixed(n);
  return r ? `${a} ${r}` : a;
}
function Pe(e, t, s) {
  if (e === null || Number.isNaN(e)) return "—";
  const i = e > 0 ? "+" : "", r = s ?? pt(t), n = e.toFixed(r);
  return t ? `${i}${n} ${t}` : `${i}${n}`;
}
function mt(e, t, s) {
  if (typeof e.goal == "number") return e.goal;
  if (e.goal_entity) {
    const r = t?.states?.[e.goal_entity], n = b(r?.state);
    if (n !== null) return n;
  }
  if (e.goal && typeof e.goal == "object" && "entity" in e.goal) {
    const r = t?.states?.[e.goal.entity], n = b(r?.state);
    if (n !== null) return n;
  }
  const i = e.preset || e.entity;
  if (s && i && s[i] !== void 0) {
    const r = s[i];
    if (typeof r == "number") return r;
    if (r && typeof r == "object" && "entity" in r) {
      const n = t?.states?.[r.entity], a = b(n?.state);
      if (a !== null) return a;
    }
  }
}
function gt(e, t) {
  return e === null || t === void 0 || t === 0 ? null : Math.min(Math.round(e / t * 100), 999);
}
function Ut(e, t) {
  if (e === null || t === void 0) return {};
  const s = (function(a) {
    if (a) return Array.isArray(a) ? { bands: a } : a;
  })(t);
  if (!s) return {};
  if (s.bands && s.bands.length) {
    const a = s.bands.find((o) => (o.min === void 0 || e >= o.min) && (o.max === void 0 || e <= o.max));
    return a ? a.severity === "low" ? { status: "low", band: a } : a.severity === "high" || a.severity === "error" ? { status: "high", band: a } : a.severity === "normal" || a.severity === "info" ? { status: "normal", band: a } : { status: "band", band: a } : {};
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
function _e(e, t) {
  const s = t.entity ?? "", i = s ? e?.states?.[s] : void 0, r = t.unit_override ?? i?.attributes?.unit_of_measurement, n = (function(a) {
    return a ? b(a.state) : null;
  })(i);
  return { value: n, unit: r, text: _t(n, r, t.decimals, t.unit_override), entity: i };
}
function me(e, t) {
  return e.name || t?.attributes?.friendly_name || (e.entity ? e.entity.split(".").slice(1).join(".") : "Metric");
}
const fe = { en: { "card.activity_title": "Activity", "card.vitals_title": "Vitals", "card.sleep_title": "Sleep", "card.body_title": "Body Metrics", "card.workouts_title": "Workouts", "card.overview_title": "Overview", "label.goal": "Goal", "label.of_goal": "{percent}% of goal", "label.total": "Total", "label.duration": "Duration", "label.energy": "Energy", "label.distance": "Distance", "label.asleep": "Asleep", "label.in_bed": "In bed", "label.core": "Core", "label.deep": "Deep", "label.rem": "REM", "label.unknown": "Unknown", "label.no_data": "No data", "label.no_previous": "No previous reading", "label.low": "Low", "label.high": "High", "label.ok": "OK", "label.trend": "Trend", "label.period.current": "Current", "label.period.today": "Today", "label.period.7d": "7 days", "label.period.30d": "30 days", "action.auto_detect": "Auto-detect metrics", "action.apply_suggestions": "Apply suggestions", "label.suggestions": "Suggestions", "label.history": "History", "label.history_window_days": "History window (days)", "label.history_points": "History points", "label.vs_previous": "vs previous {period}" }, es: { "card.activity_title": "Actividad", "card.vitals_title": "Signos vitales", "card.sleep_title": "Sueño", "card.body_title": "Métricas corporales", "label.goal": "Meta", "label.total": "Total", "label.no_data": "Sin datos", "label.low": "Bajo", "label.high": "Alto", "label.ok": "OK", "action.auto_detect": "Detectar métricas", "action.apply_suggestions": "Aplicar sugerencias", "label.history": "Historial" } };
function Jt(e, t, s) {
  const i = (function(n) {
    if (!n) return fe.en;
    const a = n.split("-")[0];
    return fe[a] || fe.en;
  })(t), r = i[e] ?? fe.en[e] ?? e;
  return s ? Object.entries(s).reduce((n, [a, o]) => n.replace(`{${a}}`, String(o)), r) : r;
}
function x(e) {
  const t = e?.locale?.language || e?.language;
  return (s, i) => Jt(s, t, i);
}
const Le = { steps: { id: "steps", name: "Steps", icon: "mdi:shoe-print", unit: "count", decimals: 0 }, active_energy: { id: "active_energy", name: "Active Energy", icon: "mdi:fire", unit: "kcal", decimals: 0 }, distance_walk_run: { id: "distance_walk_run", name: "Walk/Run Distance", icon: "mdi:walk", unit: "mi", decimals: 2 }, distance_cycling: { id: "distance_cycling", name: "Cycling Distance", icon: "mdi:bike", unit: "mi", decimals: 2 }, flights_climbed: { id: "flights_climbed", name: "Flights Climbed", icon: "mdi:stairs-up", unit: "count", decimals: 0 }, heart_rate: { id: "heart_rate", name: "Heart Rate", icon: "mdi:heart-pulse", unit: "bpm", decimals: 0, ranges: { low: 50, normal: [55, 95], high: 120 } }, resting_heart_rate: { id: "resting_heart_rate", name: "Resting HR", icon: "mdi:heart", unit: "bpm", decimals: 0, ranges: { low: 45, normal: [50, 90], high: 110 } }, hrv_sdnn: { id: "hrv_sdnn", name: "HRV (SDNN)", icon: "mdi:heart-flash", unit: "ms", decimals: 0, ranges: { low: 20 } }, spo2: { id: "spo2", name: "SpO2", icon: "mdi:water-percent", unit: "%", decimals: 1, ranges: { low: 92, normal: [95, 100] } }, respiratory_rate: { id: "respiratory_rate", name: "Respiratory Rate", icon: "mdi:lungs", unit: "breaths/min", decimals: 0, ranges: { low: 10, normal: [12, 20], high: 24 } }, asleep: { id: "asleep", name: "Asleep", icon: "mdi:sleep", unit: "min", decimals: 0 }, in_bed: { id: "in_bed", name: "In bed", icon: "mdi:bed", unit: "min", decimals: 0 }, sleep_core: { id: "sleep_core", name: "Core", icon: "mdi:alpha-c-circle", unit: "min", decimals: 0 }, sleep_deep: { id: "sleep_deep", name: "Deep", icon: "mdi:alpha-d-circle", unit: "min", decimals: 0 }, sleep_rem: { id: "sleep_rem", name: "REM", icon: "mdi:alpha-r-circle", unit: "min", decimals: 0 }, sleep_unknown: { id: "sleep_unknown", name: "Unknown", icon: "mdi:help-circle-outline", unit: "min", decimals: 0 }, weight: { id: "weight", name: "Weight", icon: "mdi:scale-bathroom", unit: "lb", decimals: 1 }, bmi: { id: "bmi", name: "BMI", icon: "mdi:human-male-height", unit: "count", decimals: 1 }, body_fat_percentage: { id: "body_fat_percentage", name: "Body Fat", icon: "mdi:percent", unit: "%", decimals: 1 }, lean_body_mass: { id: "lean_body_mass", name: "Lean Mass", icon: "mdi:human", unit: "lb", decimals: 1 }, vo2_max: { id: "vo2_max", name: "VO2 Max", icon: "mdi:run", unit: "mL/(kg*min)", decimals: 1 }, glucose: { id: "glucose", name: "Blood Glucose", icon: "mdi:diabetes", unit: "mg/dL", decimals: 0 }, workout_cycling: { id: "workout_cycling", name: "Cycling", icon: "mdi:bike" }, workout_walking: { id: "workout_walking", name: "Walking", icon: "mdi:walk" }, workout_strength_training: { id: "workout_strength_training", name: "Strength Training", icon: "mdi:weight-lifter" }, workout_functional_strength: { id: "workout_functional_strength", name: "Functional Strength", icon: "mdi:arm-flex" }, workout_hiit: { id: "workout_hiit", name: "HIIT", icon: "mdi:lightning-bolt" }, workout_generic: { id: "workout_generic", name: "Workout", icon: "mdi:arm-flex-outline" } }, st = { activity: [{ preset: "active_energy" }, { preset: "steps" }, { preset: "distance_walk_run" }, { preset: "flights_climbed" }], vitals: [{ preset: "heart_rate" }, { preset: "resting_heart_rate" }, { preset: "hrv_sdnn" }, { preset: "spo2" }, { preset: "respiratory_rate" }], sleep: [{ preset: "asleep", stage: "asleep" }, { preset: "in_bed", stage: "in_bed" }, { preset: "sleep_core", stage: "core" }, { preset: "sleep_deep", stage: "deep" }, { preset: "sleep_rem", stage: "rem" }, { preset: "sleep_unknown", stage: "unknown" }], body: [{ preset: "weight" }, { preset: "bmi" }, { preset: "body_fat_percentage" }, { preset: "lean_body_mass" }, { preset: "vo2_max" }], workouts: [], overview: [] };
function I(e = [], t) {
  return e.length === 0 && t && st[t] && (e = st[t].map((s) => ({ ...s }))), e.map((s) => (function(i) {
    if (!i.preset) return i;
    const r = Le[i.preset];
    return r ? { ...r, ...i, name: i.name ?? r.name, icon: i.icon ?? r.icon, unit_override: i.unit_override ?? r.unit, decimals: i.decimals ?? r.decimals, ranges: i.ranges ?? r.ranges } : i;
  })(s));
}
function v(e) {
  return e ?? "current";
}
const ve = /* @__PURE__ */ new Map(), be = /* @__PURE__ */ new Map(), we = {};
async function it(e, t, s, i) {
  const r = (function(o, l, p) {
    return `${o}-${l.toISOString()}-${p.toISOString()}`;
  })(t, s, i), n = Date.now(), a = ve.get(r);
  if (we[r] && n - we[r] < 2e3 && a || a && n - a.ts < 3e4) return a.value;
  try {
    const o = `history/period/${s.toISOString()}?filter_entity_id=${t}&end_time=${i.toISOString()}&minimal_response`;
    we[r] = n;
    const l = await e.callApi?.("GET", o), p = Array.isArray(l) ? l[0] : void 0;
    if (!p || !p.length) return ve.set(r, { ts: n, value: null }), null;
    const u = [...p].reverse().find((m) => b(m.state) !== null), h = u ? b(u.state) : null;
    return ve.set(r, { ts: n, value: h }), h;
  } catch {
    return ve.set(r, { ts: n, value: null }), null;
  }
}
async function Ce(e, t, s) {
  if (!e || !t) return { current: null, previous: null, diff: null, label: s };
  const { start: i, end: r, prevStart: n, prevEnd: a } = (function(p) {
    const u = /* @__PURE__ */ new Date(), h = /* @__PURE__ */ new Date();
    if (p === "today") {
      h.setHours(0, 0, 0, 0);
      const g = new Date(h);
      return g.setDate(g.getDate() - 1), { start: h, end: u, prevStart: g, prevEnd: new Date(h) };
    }
    if (p === "7d") {
      h.setDate(h.getDate() - 7);
      const g = new Date(h), f = new Date(h);
      return f.setDate(f.getDate() - 7), { start: h, end: u, prevStart: f, prevEnd: g };
    }
    if (p === "30d") {
      h.setDate(h.getDate() - 30);
      const g = new Date(h), f = new Date(h);
      return f.setDate(f.getDate() - 30), { start: h, end: u, prevStart: f, prevEnd: g };
    }
    const m = /* @__PURE__ */ new Date();
    return { start: h, end: u, prevStart: new Date(m.getTime() - 18e5), prevEnd: m };
  })(s), o = await it(e, t, i, r), l = await it(e, t, n, a);
  return { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: s };
}
function F(e) {
  if (!e) return null;
  const t = [e.attributes?.previous_state, e.attributes?.previous, e.attributes?.last_value, e.attributes?.prior_value];
  for (const s of t) {
    const i = b(s);
    if (i !== null) return i;
  }
  return null;
}
async function He(e, t, s, i, r) {
  if (!e || !t) return [];
  const n = `${t}-${s.toISOString()}-${i.toISOString()}-${r}`, a = Date.now(), o = be.get(n);
  if (o && a - o.ts < 3e4) return o.value;
  try {
    we[n] = a;
    const l = `history/period/${s.toISOString()}?filter_entity_id=${t}&end_time=${i.toISOString()}&minimal_response`, p = await e.callApi?.("GET", l), u = Array.isArray(p) ? p[0] : void 0;
    if (!u || !u.length) return be.set(n, { ts: a, value: [] }), [];
    const h = [], m = (i.getTime() - s.getTime()) / r;
    for (let g = 0; g < r; g++) {
      const f = s.getTime() + g * m, ft = f + m, We = [...u.filter((je) => {
        const Be = new Date(je.last_changed).getTime();
        return Be >= f && Be < ft;
      })].reverse().find((je) => b(je.state) !== null);
      h.push(We ? b(We.state) : NaN);
    }
    return be.set(n, { ts: a, value: h }), h;
  } catch {
    return be.set(n, { ts: a, value: [] }), [];
  }
}
var Lt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, X = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Wt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Lt(t, s, n), n;
};
let E = class extends y {
  constructor() {
    super(...arguments), this.trends = {}, this.historySeries = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-activity-summary-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: I(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && (this.loadTrends(), this.loadHistory());
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = v(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0, n = s.trend_entity ?? i;
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      if (e === "current") {
        const o = r ? Number(r.state) : null, l = s.trend_entity ? F(this.hass?.states?.[s.trend_entity]) : F(r);
        return void (t[i] = { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: e });
      }
      const a = await Ce(this.hass, n, e);
      t[i] = a;
    })), this.trends = t;
  }
  async loadHistory() {
    if (!this.config || !this.hass || !this.config.history) return;
    const e = this.config.history_window_days ?? 7, t = this.config.history_points ?? Math.max(e, 7), s = /* @__PURE__ */ new Date(), i = /* @__PURE__ */ new Date();
    i.setDate(s.getDate() - e);
    const r = { ...this.historySeries };
    await Promise.all(this.config.metrics.filter((n) => n.entity).map(async (n) => {
      const a = n.entity, o = await He(this.hass, a, i, s, t);
      r[a] = o;
    })), this.historySeries = r;
  }
  renderTrend(e, t) {
    const s = v(this.config?.period);
    if (this.config?.show_trends === !1) return d;
    const i = this.trends[e.entity ?? ""];
    if (!i || i.diff === null) return d;
    const r = this.localize(`label.period.${s}`) || s, n = this.localize("label.vs_previous", { period: r });
    return c`<div class="subtle">
      ${this.localize("label.trend")} (${n}):
      ${Pe(i.diff, t, e.decimals)}
    </div>`;
  }
  localize(e, t) {
    return x(this.hass)(e, t);
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = _e(this.hass, e), r = mt(e, this.hass, this.config?.goals), n = gt(t, r), a = me(e, i), o = e.icon ?? i?.attributes?.icon;
    return c`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${o ? c`<ha-icon .icon=${o}></ha-icon>` : d}
          <span>${a}</span>
        </div>
        <div class="value">${s}</div>
        ${this.renderTrend(e, e.unit_override ?? i?.attributes?.unit_of_measurement)}
        ${r !== void 0 && n !== null ? c`
              <div class="goal-row">
                <span class="progress-label">${n}% of goal</span>
                <span class="progress-label">${this.localize("label.goal")}: ${r}</span>
              </div>
              <div class="progress">
                <div class="bar" style="width: ${Math.min(n, 100)}%"></div>
              </div>
            ` : d}
      </div>
    `;
  }
  renderHistoryBars() {
    if (!this.config?.history) return d;
    const e = v(this.config.period);
    if (e !== "7d" && e !== "30d") return d;
    const t = this.config.history_window_days ?? (e === "7d" ? 7 : 30), s = this.config.metrics.filter((o) => (o.preset || "").match(/steps|active_energy|distance/));
    if (!s.length) return d;
    const i = s[0], r = i.entity ? this.historySeries[i.entity] : [];
    if (!r || !r.length) return d;
    const n = Array.from({ length: Math.min(r.length, t) }, (o, l) => `${l + 1}`), a = r.slice(-t).map((o) => Number.isFinite(o) ? Number(o.toFixed(2)) : 0);
    return c`<div class="subtle" style="margin-bottom:8px;">
      ${this.localize("label.trend")} (${this.localize(`label.period.${e}`)}): ${i.name ?? i.preset}
    </div>
    ${(function(o, l) {
      const p = Math.max(...o.filter((u) => Number.isFinite(u)), 0);
      return c`
    <div style="display:flex; gap:6px; align-items:flex-end;">
      ${o.map((u, h) => {
        const m = p > 0 && Number.isFinite(u) ? Math.max(u / p * 100, 4) : 4;
        return c`<div style="text-align:center; flex:1;">
          <div
            style="height:${m}px; background: var(--accent-color, var(--primary-color)); border-radius:6px;"
            title=${Number.isFinite(u) ? String(u) : "—"}
          ></div>
          ${l ? c`<div style="font-size:0.7rem; color:var(--secondary-text-color);">${l[h]}</div>` : ""}
        </div>`;
      })}
    </div>
  `;
    })(a, n)}`;
  }
  render() {
    return this.config ? c`
      <ha-card>
        <div class="header">
          <div class="title">
            ${this.config.title ?? this.localize("card.activity_title")}
          </div>
          <div class="subtle">${this.localize(`label.period.${v(this.config.period)}`)}</div>
        </div>
        ${this.renderHistoryBars()}
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
E.styles = [q, z`
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
    `], X([$({ attribute: !1 })], E.prototype, "hass", 2), X([_()], E.prototype, "config", 2), X([_()], E.prototype, "trends", 2), X([_()], E.prototype, "historySeries", 2), E = X([k("fitness-activity-summary-card")], E);
const nt = { heart_rate: { bands: [{ label: "Low", max: 50, severity: "low" }, { label: "Normal", min: 50, max: 100, severity: "normal" }, { label: "High", min: 100, severity: "high" }] }, resting_heart_rate: { bands: [{ label: "Low", max: 45, severity: "low" }, { label: "Normal", min: 45, max: 90, severity: "normal" }, { label: "High", min: 90, severity: "high" }] }, spo2: { bands: [{ label: "Low", max: 92, severity: "low" }, { label: "Normal", min: 95, max: 100, severity: "normal" }] }, respiratory_rate: { bands: [{ label: "Low", max: 10, severity: "low" }, { label: "Normal", min: 12, max: 20, severity: "normal" }, { label: "High", min: 24, severity: "high" }] }, glucose: { bands: [{ label: "Low", max: 70, severity: "low" }, { label: "Normal", min: 80, max: 140, severity: "normal" }, { label: "High", min: 180, severity: "high" }] }, weight: { bands: [] } };
function Se(e, t = 120, s = 40) {
  const i = e.filter((l) => Number.isFinite(l));
  if (!i.length) return et``;
  const r = Math.min(...i), n = Math.max(...i) - r || 1, a = t / Math.max(e.length - 1, 1), o = e.map((l, p) => {
    const u = Number.isFinite(l) ? (l - r) / n : 0.5;
    return `${p * a},${s - u * s}`;
  });
  return et`<svg viewBox="0 0 ${t} ${s}" width="${t}" height="${s}">
    <polyline
      fill="none"
      stroke="var(--accent-color, var(--primary-color))"
      stroke-width="2"
      points="${o.join(" ")}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
}
var Bt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, Y = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? It(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Bt(t, s, n), n;
};
let P = class extends y {
  constructor() {
    super(...arguments), this.trends = {}, this.historySeries = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-vitals-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with at least one entry");
    this.config = { ...e, metrics: I(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && (this.loadTrends(), this.loadHistory());
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = v(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0;
      if (e === "current") {
        const a = r ? b(r.state) : null, o = F(r);
        return void (t[i] = { current: a, previous: o, diff: a !== null && o !== null ? a - o : null, label: e });
      }
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      const n = await Ce(this.hass, s.trend_entity ?? i, e);
      t[i] = n;
    })), this.trends = t;
  }
  async loadHistory() {
    if (!this.config || !this.hass || !this.config.history) return;
    const e = this.config.history_window_days ?? 7, t = this.config.history_points ?? 24, s = /* @__PURE__ */ new Date(), i = /* @__PURE__ */ new Date();
    i.setDate(s.getDate() - e);
    const r = { ...this.historySeries };
    await Promise.all(this.config.metrics.filter((n) => n.entity).map(async (n) => {
      const a = n.entity, o = await He(this.hass, a, i, s, t);
      r[a] = o;
    })), this.historySeries = r;
  }
  localize(e, t) {
    return x(this.hass)(e, t);
  }
  renderTrend(e, t) {
    if (this.config?.show_trends === !1) return d;
    const s = this.trends[e.entity ?? ""];
    if (!s || s.diff === null) return d;
    const i = v(this.config?.period), r = this.localize(`label.period.${i}`) || i, n = this.localize("label.vs_previous", { period: r });
    return c`<div class="subtle">
      ${this.localize("label.trend")} (${n}): ${Pe(s.diff, t, e.decimals)}
    </div>`;
  }
  defaultRanges(e, t) {
    const s = t.toLowerCase();
    return s.includes("oxygen") || s.includes("spo2") ? { low: 92, normal: [95, 100] } : s.includes("respiratory") ? { low: 10, high: 24, normal: [12, 20] } : s.includes("resting") || s.includes("heart rate") ? { low: 45, high: 110, normal: [55, 95] } : s.includes("variability") || s.includes("hrv") ? { low: 15, normal: [20, 150] } : s.includes("glucose") ? { low: 70, high: 180, normal: [80, 140] } : e.ranges;
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = _e(this.hass, e), r = me(e, i), n = e.icon ?? i?.attributes?.icon, a = (function(u, h) {
      if (u.zones_disabled) return;
      const m = (function(g) {
        return g.preset || g.entity;
      })(u);
      return m ? u.ranges ? Array.isArray(u.ranges) ? { bands: u.ranges } : u.ranges : h && h[m] ? h[m] : u.preset && nt[u.preset] ? nt[u.preset] : void 0 : void 0;
    })(e, this.config?.zones) ?? e.ranges ?? this.defaultRanges(e, r), { status: o, band: l } = Ut(t, a), p = l?.label ?? (o === "low" ? this.localize("label.low") : o === "high" ? this.localize("label.high") : o === "normal" ? this.localize("label.ok") : "");
    return c`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${n ? c`<ha-icon .icon=${n}></ha-icon>` : d}
          <span>${r}</span>
          ${p ? c`<span class="pill status-${o ?? "normal"} status-chip">${p}</span>` : d}
        </div>
        <div class="value status-${o ?? "normal"}">${s}</div>
        ${this.renderTrend(e, e.unit_override ?? i?.attributes?.unit_of_measurement)}
        ${this.config?.history && e.entity && this.historySeries[e.entity] ? c`<div>${Se(this.historySeries[e.entity])}</div>` : d}
        ${l?.min !== void 0 || l?.max !== void 0 ? c`<div class="subtle">
              ${l.min !== void 0 ? `≥ ${l.min}` : ""} ${l.max !== void 0 ? `≤ ${l.max}` : ""}
            </div>` : d}
      </div>
    `;
  }
  render() {
    return this.config ? c`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.vitals_title")}</div>
          <div class="subtle">${this.localize(`label.period.${v(this.config.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
P.styles = [q, z`
      .metric {
        position: relative;
      }
      .status-chip {
        align-self: flex-start;
      }
    `], Y([$({ attribute: !1 })], P.prototype, "hass", 2), Y([_()], P.prototype, "config", 2), Y([_()], P.prototype, "trends", 2), Y([_()], P.prototype, "historySeries", 2), P = Y([k("fitness-vitals-card")], P);
var Ft = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, ze = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Vt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Ft(t, s, n), n;
};
const rt = { asleep: "var(--primary-color)", in_bed: "var(--secondary-text-color)", core: "var(--accent-color, #5c7cfa)", deep: "var(--success-color, #4caf50)", rem: "var(--warning-color, #f9a825)", unknown: "var(--divider-color, #888)" };
let Q = class extends y {
  static async getConfigElement() {
    return document.createElement("fitness-sleep-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with sleep stages");
    this.config = { ...e, metrics: I(e.metrics, e.preset) };
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
    return x(this.hass)(e, t);
  }
  render() {
    if (!this.config) return d;
    const e = {};
    this.config.metrics.forEach((n) => {
      const a = n.entity ?? "", o = a ? this.hass?.states?.[a] : void 0, l = b(o?.state);
      if (l === null) return;
      const p = this.stageFromMetric(n);
      e[p] = l;
    });
    const t = ["core", "deep", "rem", "unknown"], s = e.asleep ?? t.reduce((n, a) => n + (e[a] ?? 0), 0), i = e.in_bed ?? s, r = t.reduce((n, a) => n + (e[a] ?? 0), 0);
    return c`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.sleep_title")}</div>
          ${this.config?.period ? c`<div class="subtle">
                ${this.localize(`label.period.${this.config.period}`) || this.config.period}
              </div>` : d}
        </div>
        <div class="summary">
          <div>
            <div class="label">${this.localize("label.asleep")}</div>
            <div class="value">${s !== void 0 ? de(s) : "—"}</div>
          </div>
          <div>
            <div class="label">${this.localize("label.in_bed")}</div>
            <div class="value">${i !== void 0 ? de(i) : "—"}</div>
          </div>
        </div>
        <div class="stage-bar">
          ${t.filter((n) => (e[n] ?? 0) > 0).map((n) => {
      const a = e[n] ?? 0;
      return c`<div
                class="stage-segment"
                style="width: ${r > 0 ? a / r * 100 : 0}%; background: ${rt[n]}"
              ></div>`;
    })}
        </div>
        <div class="stage-legend">
          ${t.map((n) => {
      const a = e[n], o = this.localize(`label.${n}`) || n.toUpperCase();
      return c`<div class="legend-item">
              <span class="swatch" style="background:${rt[n]}"></span>
              <div>
                <div class="label">${o}</div>
                <div class="subtle">
                  ${a != null ? de(a) : "—"}
                </div>
              </div>
            </div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
Q.styles = [q, z`
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
    `], ze([$({ attribute: !1 })], Q.prototype, "hass", 2), ze([_()], Q.prototype, "config", 2), Q = ze([k("fitness-sleep-card")], Q);
var qt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, ee = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Gt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && qt(t, s, n), n;
};
let C = class extends y {
  constructor() {
    super(...arguments), this.trends = {}, this.historySeries = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-body-metrics-card-editor");
  }
  setConfig(e) {
    if (!e.metrics || !Array.isArray(e.metrics) || e.metrics.length === 0) throw new Error("Add a metrics array with body metrics");
    this.config = { ...e, metrics: I(e.metrics, e.preset) };
  }
  getCardSize() {
    return 3;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && (this.loadTrends(), this.loadHistory());
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = v(this.config.period), t = { ...this.trends };
    await Promise.all(this.config.metrics.map(async (s) => {
      const i = s.entity ?? "", r = i ? this.hass?.states?.[i] : void 0;
      if (e === "current") {
        const a = r ? b(r.state) : null, o = F(r);
        return void (t[i] = { current: a, previous: o, diff: a !== null && o !== null ? a - o : null, label: e });
      }
      if (!i) return void (t[i] = { current: null, previous: null, diff: null, label: e });
      const n = await Ce(this.hass, s.trend_entity ?? i, e);
      t[i] = n;
    })), this.trends = t;
  }
  async loadHistory() {
    if (!this.config || !this.hass || !this.config.history) return;
    const e = this.config.history_window_days ?? 7, t = this.config.history_points ?? 24, s = /* @__PURE__ */ new Date(), i = /* @__PURE__ */ new Date();
    i.setDate(s.getDate() - e);
    const r = { ...this.historySeries };
    await Promise.all(this.config.metrics.filter((n) => n.entity).map(async (n) => {
      const a = n.entity, o = await He(this.hass, a, i, s, t);
      r[a] = o;
    })), this.historySeries = r;
  }
  localize(e, t) {
    return x(this.hass)(e, t);
  }
  previousValue(e) {
    return F(e);
  }
  trendIcon(e) {
    return e > 0 ? "mdi:arrow-up-bold" : e < 0 ? "mdi:arrow-down-bold" : "mdi:minus";
  }
  renderMetric(e) {
    const { value: t, text: s, entity: i } = _e(this.hass, e), r = me(e, i), n = e.icon ?? i?.attributes?.icon, a = this.trends[e.entity ?? ""], o = this.previousValue(i), l = a?.diff !== void 0 ? a.diff : t !== null && o !== null ? t - o : null;
    return c`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${n ? c`<ha-icon .icon=${n}></ha-icon>` : d}
          <span>${r}</span>
        </div>
        <div class="value">${s}</div>
        <div class="subtle">
          ${l !== null ? c`<span class="trend ${l > 0 ? "up" : l < 0 ? "down" : ""}">
                <ha-icon .icon=${this.trendIcon(l)}></ha-icon>
                ${Pe(l, e.unit_override ?? i?.attributes?.unit_of_measurement)}
                (${this.localize("label.vs_previous", { period: this.localize(`label.period.${v(this.config?.period)}`) || v(this.config?.period) })})
              </span>` : c`<span class="trend">${this.localize("label.no_previous")}</span>`}
        </div>
        ${this.config?.history && e.entity && this.historySeries[e.entity] ? c`<div>${Se(this.historySeries[e.entity])}</div>` : d}
      </div>
    `;
  }
  render() {
    return this.config ? c`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.body_title")}</div>
          <div class="subtle">${this.localize(`label.period.${v(this.config?.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((e) => this.renderMetric(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
C.styles = [q, z`
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
    `], ee([$({ attribute: !1 })], C.prototype, "hass", 2), ee([_()], C.prototype, "config", 2), ee([_()], C.prototype, "trends", 2), ee([_()], C.prototype, "historySeries", 2), C = ee([k("fitness-body-metrics-card")], C);
var Kt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, De = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Zt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Kt(t, s, n), n;
};
let te = class extends y {
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
    return x(this.hass)(e, t);
  }
  workoutValues(e) {
    return { duration: b(this.hass?.states?.[e.duration_entity ?? ""]?.state), energy: b(this.hass?.states?.[e.energy_entity ?? ""]?.state), distance: b(this.hass?.states?.[e.distance_entity ?? ""]?.state) };
  }
  renderValue(e, t) {
    return t === "min" && e !== null ? de(e) : _t(e, t);
  }
  totalRow() {
    if (!this.config) return d;
    const e = { duration: 0, energy: 0, distance: 0 };
    return this.config.workouts.forEach((t) => {
      const s = this.workoutValues(t);
      e.duration = s.duration !== null ? (e.duration ?? 0) + s.duration : e.duration, e.energy = s.energy !== null ? (e.energy ?? 0) + s.energy : e.energy, e.distance = s.distance !== null ? (e.distance ?? 0) + s.distance : e.distance;
    }), c`
      <div class="row total">
        <div>${this.localize("label.total")}</div>
        <div class="value">${this.renderValue(e.duration, "min")}</div>
        <div class="value">${this.renderValue(e.energy, "kcal")}</div>
        ${this.config.workouts.some((t) => t.distance_entity) ? c`<div class="value">${this.renderValue(e.distance, "mi")}</div>` : d}
      </div>
    `;
  }
  renderRow(e) {
    const { duration: t, energy: s, distance: i } = this.workoutValues(e), r = !!e.distance_entity;
    return c`
      <div class="row">
        <div class="label">
          ${e.icon ? c`<ha-icon .icon=${e.icon}></ha-icon>` : d}
          <span>${e.name}</span>
        </div>
        <div class="value">${this.renderValue(t, "min")}</div>
        <div class="value">${this.renderValue(s, "kcal")}</div>
        ${r ? c`<div class="value">${this.renderValue(i, "mi")}</div>` : d}
      </div>
    `;
  }
  render() {
    return this.config ? c`
      <ha-card class=${this.config.compact ? "compact" : ""}>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.workouts_title")}</div>
          <div class="subtle">${this.localize(`label.period.${v(this.config.period)}`)}</div>
        </div>
        <div class="workout-list">
          <div class="row header-row">
            <div></div>
            <div class="value">${this.localize("label.duration")}</div>
            <div class="value">${this.localize("label.energy")}</div>
            ${this.config.workouts.some((e) => e.distance_entity) ? c`<div class="value">${this.localize("label.distance")}</div>` : d}
          </div>
          ${this.totalRow()}
          ${this.config.workouts.map((e) => this.renderRow(e))}
        </div>
      </ha-card>
    ` : d;
  }
};
te.styles = [q, z`
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
    `], De([$({ attribute: !1 })], te.prototype, "hass", 2), De([_()], te.prototype, "config", 2), te = De([k("fitness-workouts-card")], te);
var Xt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, se = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? Yt(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Xt(t, s, n), n;
};
let H = class extends y {
  constructor() {
    super(...arguments), this.trends = {}, this.historySeries = {};
  }
  static async getConfigElement() {
    return document.createElement("fitness-overview-card-editor");
  }
  setConfig(e) {
    if (!e.primary_metrics || !Array.isArray(e.primary_metrics) || e.primary_metrics.length === 0) throw new Error("Add primary_metrics");
    this.config = { ...e, primary_metrics: I(e.primary_metrics, e.preset), secondary_metrics: I(e.secondary_metrics ?? [], e.preset) };
  }
  getCardSize() {
    return 4;
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.config && (this.loadTrends(), this.loadHistory());
  }
  async loadTrends() {
    if (!this.config || !this.hass) return;
    const e = v(this.config.period), t = { ...this.trends }, s = [...this.config.primary_metrics, ...this.config.secondary_metrics ?? []];
    await Promise.all(s.map(async (i) => {
      const r = i.entity ?? "", n = r ? this.hass?.states?.[r] : void 0;
      if (e === "current") {
        const o = n ? Number(n.state) : null, l = F(n);
        return void (t[r] = { current: o, previous: l, diff: o !== null && l !== null ? o - l : null, label: e });
      }
      if (!r) return void (t[r] = { current: null, previous: null, diff: null, label: e });
      const a = await Ce(this.hass, i.trend_entity ?? r, e);
      t[r] = a;
    })), this.trends = t;
  }
  async loadHistory() {
    if (!this.config || !this.hass || !this.config.history) return;
    const e = this.config.history_window_days ?? 7, t = this.config.history_points ?? 24, s = /* @__PURE__ */ new Date(), i = /* @__PURE__ */ new Date();
    i.setDate(s.getDate() - e);
    const r = { ...this.historySeries }, n = [...this.config.primary_metrics, ...this.config.secondary_metrics ?? []];
    await Promise.all(n.filter((a) => a.entity).map(async (a) => {
      const o = a.entity, l = await He(this.hass, o, i, s, t);
      r[o] = l;
    })), this.historySeries = r;
  }
  localize(e, t) {
    return x(this.hass)(e, t);
  }
  renderTrend(e, t) {
    if (this.config?.show_trends === !1) return d;
    const s = this.trends[e.entity ?? ""];
    if (!s || s.diff === null) return d;
    const i = v(this.config?.period), r = this.localize(`label.period.${i}`) || i, n = this.localize("label.vs_previous", { period: r });
    return c`<div class="subtle">
      ${this.localize("label.trend")} (${n}): ${Pe(s.diff, t, e.decimals)}
    </div>`;
  }
  renderProgressRing(e) {
    if (e == null) return d;
    const t = Math.min(e, 100);
    return c`
      <div class="progress-ring">
        <div class="progress-fill" style="background:${`conic-gradient(var(--accent-color, var(--primary-color)) ${t}%, var(--divider-color, #ccc) ${t}% 100%)`}"></div>
      </div>
    `;
  }
  renderPrimary(e) {
    const { value: t, text: s, entity: i } = _e(this.hass, e), r = me(e, i), n = e.icon ?? i?.attributes?.icon, a = mt(e, this.hass, this.config?.goals), o = gt(t, a), l = e.unit_override ?? i?.attributes?.unit_of_measurement;
    return c`
      <div class="metric">
        <div class="label">
          ${n ? c`<ha-icon .icon=${n}></ha-icon>` : d}
          <span>${r}</span>
          ${this.renderProgressRing(o ?? void 0)}
        </div>
        <div class="value">${s}</div>
        ${a !== void 0 && o !== null ? c`<div class="subtle">
              ${this.localize("label.of_goal", { percent: o })}
              • ${this.localize("label.goal")}: ${a}
            </div>` : d}
        ${this.renderTrend(e, l)}
        ${this.config?.history && e.entity && this.historySeries[e.entity] ? c`<div>${Se(this.historySeries[e.entity], 140, 40)}</div>` : d}
      </div>
    `;
  }
  renderSecondary(e) {
    const { text: t, entity: s } = _e(this.hass, e), i = me(e, s), r = e.icon ?? s?.attributes?.icon, n = this.renderTrend(e, e.unit_override ?? s?.attributes?.unit_of_measurement);
    return c`
      <div class="chip">
        ${r ? c`<ha-icon .icon=${r}></ha-icon>` : d}
        <span>${i}</span>
        <span class="chip-value">${t}</span>
        ${n}
        ${this.config?.history && e.entity && this.historySeries[e.entity] ? c`<div>${Se(this.historySeries[e.entity], 80, 30)}</div>` : d}
      </div>
    `;
  }
  render() {
    return this.config ? c`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.overview_title")}</div>
          <div class="subtle">${this.localize(`label.period.${v(this.config.period)}`)}</div>
        </div>
        <div class="primary-grid">
          ${this.config.primary_metrics.map((e) => this.renderPrimary(e))}
        </div>
        ${this.config.secondary_metrics && this.config.secondary_metrics.length ? c`<div class="secondary">
              ${this.config.secondary_metrics.map((e) => this.renderSecondary(e))}
            </div>` : d}
      </ha-card>
    ` : d;
  }
};
function w(e, t, s) {
  e.dispatchEvent(new CustomEvent(t, { detail: s, bubbles: !0, composed: !0 }));
}
H.styles = [q, z`
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
    `], se([$({ attribute: !1 })], H.prototype, "hass", 2), se([_()], H.prototype, "config", 2), se([_()], H.prototype, "trends", 2), se([_()], H.prototype, "historySeries", 2), H = se([k("fitness-overview-card")], H);
const G = [{ value: "current", label: "Current" }, { value: "today", label: "Today" }, { value: "7d", label: "7 days" }, { value: "30d", label: "30 days" }], V = [{ name: "entity", selector: { entity: {} } }, { name: "preset", selector: { select: { options: Object.values(Le).map((e) => ({ value: e.id, label: e.name })) } } }, { name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }, { name: "unit_override", selector: { text: {} } }, { name: "decimals", selector: { number: { min: 0, max: 4, mode: "box" } } }, { name: "goal", selector: { number: { min: 0, mode: "box" } } }, { name: "goal_entity", selector: { entity: {} } }, { name: "trend_entity", selector: { entity: {} } }, { name: "ranges", schema: [{ name: "low", selector: { number: { mode: "box" } } }, { name: "normal", selector: { text: {} } }, { name: "high", selector: { number: { mode: "box" } } }] }], ye = [{ name: "history", selector: { boolean: {} } }, { name: "history_window_days", selector: { number: { min: 1, max: 60, mode: "box" } } }, { name: "history_points", selector: { number: { min: 4, max: 120, mode: "box" } } }], at = { steps: "steps", heart_rate_variability: "hrv_sdnn", hrv: "hrv_sdnn", heart_rate: "heart_rate", resting_heart_rate: "resting_heart_rate", oxygen_saturation: "spo2", respiratory_rate: "respiratory_rate", sleep_asleep: "asleep", sleep_in_bed: "in_bed", sleep_core: "sleep_core", sleep_deep: "sleep_deep", sleep_rem: "sleep_rem", sleep_unknown: "sleep_unknown", weight: "weight", bmi: "bmi", body_fat: "body_fat_percentage", vo2: "vo2_max", hydration: "hydration", distance_walking_running: "distance_walk_run", distance_cycling: "distance_cycling", active_energy: "active_energy", basal_energy: "basal_energy", flights_climbed: "flights_climbed", workout_duration: "workout_generic", workout_energy: "workout_generic" };
function K(e) {
  if (!e?.states) return [];
  const t = [];
  Object.entries(e.states).forEach(([i, r]) => {
    const n = i.toLowerCase();
    for (const o of Object.keys(at)) if (n.includes(o)) return void t.push({ preset: at[o], entity: i });
    const a = r.attributes?.unit_of_measurement;
    a === "bpm" && t.push({ preset: "heart_rate", entity: i }), a === "%" && t.push({ preset: "spo2", entity: i }), a === "kcal" && t.push({ preset: "active_energy", entity: i }), a !== "mi" && a !== "km" || t.push({ preset: "distance_walk_run", entity: i }), a === "ms" && t.push({ preset: "hrv_sdnn", entity: i }), a === "mg/dL" && t.push({ preset: "glucose", entity: i });
  });
  const s = {};
  return t.forEach((i) => {
    s[i.preset] || (s[i.preset] = { preset: i.preset, entity: i.entity, name: Le[i.preset]?.name });
  }), Object.values(s);
}
var Qt = Object.defineProperty, es = Object.getOwnPropertyDescriptor, ie = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? es(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && Qt(t, s, n), n;
};
let D = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = K(this.hass).filter((s) => ["steps", "active_energy", "distance_walk_run", "flights_climbed"].includes(s.preset || "")).map((s) => ({ ...s, key: s.preset || s.entity })), t = {};
    e.forEach((s) => s.key && (t[s.key] = !0)), this._suggestions = e, this._selected = t;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((i) => i.key && this._selected[i.key]);
    if (!e.length) return;
    const t = [...e.map(({ key: i, ...r }) => r), ...this._config.metrics || []], s = { ...this._config, metrics: t };
    this._config = s, w(this, "config-changed", { config: s });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-activity-summary-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["activity", "vitals", "sleep", "body"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, ...ye, { name: "metrics", type: "array", schema: V }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
ie([$({ attribute: !1 })], D.prototype, "hass", 2), ie([_()], D.prototype, "_config", 2), ie([_()], D.prototype, "_suggestions", 2), ie([_()], D.prototype, "_selected", 2), D = ie([k("fitness-activity-summary-card-editor")], D);
var ts = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, ne = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? ss(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && ts(t, s, n), n;
};
let M = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = K(this.hass).filter((s) => ["heart_rate", "resting_heart_rate", "hrv_sdnn", "spo2", "respiratory_rate"].includes(s.preset || "")).map((s) => ({ ...s, key: s.preset || s.entity })), t = {};
    e.forEach((s) => s.key && (t[s.key] = !0)), this._suggestions = e, this._selected = t;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((i) => i.key && this._selected[i.key]);
    if (!e.length) return;
    const t = [...e.map(({ key: i, ...r }) => r), ...this._config.metrics || []], s = { ...this._config, metrics: t };
    this._config = s, w(this, "config-changed", { config: s });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-vitals-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["vitals"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, ...ye, { name: "metrics", type: "array", schema: V }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
ne([$({ attribute: !1 })], M.prototype, "hass", 2), ne([_()], M.prototype, "_config", 2), ne([_()], M.prototype, "_suggestions", 2), ne([_()], M.prototype, "_selected", 2), M = ne([k("fitness-vitals-card-editor")], M);
var is = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, re = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? ns(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && is(t, s, n), n;
};
let T = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = ["asleep", "in_bed", "sleep_core", "sleep_deep", "sleep_rem", "sleep_unknown"], t = K(this.hass).filter((i) => e.includes(i.preset || "")).map((i) => ({ ...i, key: i.preset || i.entity })), s = {};
    t.forEach((i) => i.key && (s[i.key] = !0)), this._suggestions = t, this._selected = s;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((i) => i.key && this._selected[i.key]);
    if (!e.length) return;
    const t = [...e.map(({ key: i, ...r }) => r), ...this._config.metrics || []], s = { ...this._config, metrics: t };
    this._config = s, w(this, "config-changed", { config: s });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-sleep-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["sleep"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, ...ye, { name: "metrics", type: "array", schema: V }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
re([$({ attribute: !1 })], T.prototype, "hass", 2), re([_()], T.prototype, "_config", 2), re([_()], T.prototype, "_suggestions", 2), re([_()], T.prototype, "_selected", 2), T = re([k("fitness-sleep-card-editor")], T);
var rs = Object.defineProperty, as = Object.getOwnPropertyDescriptor, ae = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? as(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && rs(t, s, n), n;
};
let N = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = ["weight", "bmi", "body_fat_percentage", "lean_body_mass", "vo2_max"], t = K(this.hass).filter((i) => e.includes(i.preset || "")).map((i) => ({ ...i, key: i.preset || i.entity })), s = {};
    t.forEach((i) => i.key && (s[i.key] = !0)), this._suggestions = t, this._selected = s;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((i) => i.key && this._selected[i.key]);
    if (!e.length) return;
    const t = [...e.map(({ key: i, ...r }) => r), ...this._config.metrics || []], s = { ...this._config, metrics: t };
    this._config = s, w(this, "config-changed", { config: s });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-body-metrics-card", metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["body"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, ...ye, { name: "metrics", type: "array", schema: V }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
ae([$({ attribute: !1 })], N.prototype, "hass", 2), ae([_()], N.prototype, "_config", 2), ae([_()], N.prototype, "_suggestions", 2), ae([_()], N.prototype, "_selected", 2), N = ae([k("fitness-body-metrics-card-editor")], N);
var os = Object.defineProperty, ls = Object.getOwnPropertyDescriptor, oe = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? ls(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && os(t, s, n), n;
};
const cs = [{ name: "name", selector: { text: {} } }, { name: "icon", selector: { icon: {} } }, { name: "duration_entity", selector: { entity: {} } }, { name: "energy_entity", selector: { entity: {} } }, { name: "distance_entity", selector: { entity: {} } }];
let R = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = K(this.hass).filter((s) => (s.preset || "").startsWith("workout")).map((s) => ({ ...s, key: s.preset || s.entity })), t = {};
    e.forEach((s) => s.key && (t[s.key] = !0)), this._suggestions = e, this._selected = t;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((i) => i.key && this._selected[i.key]);
    if (!e.length) return;
    const t = e.map((i) => ({ name: i.name || i.preset, duration_entity: i.entity })), s = { ...this._config, workouts: [...t, ...this._config.workouts || []] };
    this._config = s, w(this, "config-changed", { config: s });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-workouts-card", workouts: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["workouts"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, { name: "workouts", type: "array", schema: cs }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
oe([$({ attribute: !1 })], R.prototype, "hass", 2), oe([_()], R.prototype, "_config", 2), oe([_()], R.prototype, "_suggestions", 2), oe([_()], R.prototype, "_selected", 2), R = oe([k("fitness-workouts-card-editor")], R);
var ds = Object.defineProperty, hs = Object.getOwnPropertyDescriptor, le = (e, t, s, i) => {
  for (var r, n = i > 1 ? void 0 : i ? hs(t, s) : t, a = e.length - 1; a >= 0; a--) (r = e[a]) && (n = (i ? r(t, s, n) : r(n)) || n);
  return i && n && ds(t, s, n), n;
};
let U = class extends y {
  constructor() {
    super(...arguments), this._suggestions = [], this._selected = {};
  }
  setConfig(e) {
    this._config = { ...e };
  }
  localize(e) {
    return x(this.hass)(e);
  }
  _valueChanged(e) {
    const t = e.detail.value;
    this._config = t, w(this, "config-changed", { config: t });
  }
  _detect() {
    if (!this.hass) return;
    const e = K(this.hass).map((s) => ({ ...s, key: s.preset || s.entity })), t = {};
    e.forEach((s) => s.key && (t[s.key] = !0)), this._suggestions = e, this._selected = t;
  }
  _applySuggestions() {
    if (!this._config) return;
    const e = this._suggestions.filter((s) => this._selected[s.preset]);
    if (!e.length) return;
    const t = { ...this._config, primary_metrics: [...e.slice(0, 4), ...this._config.primary_metrics || []], secondary_metrics: [...e.slice(4), ...this._config.secondary_metrics || []] };
    this._config = t, w(this, "config-changed", { config: t });
  }
  render() {
    if (!this.hass) return null;
    const e = this._config ?? { type: "custom:fitness-overview-card", primary_metrics: [], secondary_metrics: [] }, t = [{ name: "title", selector: { text: {} } }, { name: "preset", selector: { select: { options: ["overview"] } } }, { name: "period", selector: { select: { options: G } } }, { name: "compact", selector: { boolean: {} } }, { name: "show_trends", selector: { boolean: {} } }, ...ye, { name: "primary_metrics", type: "array", schema: V }, { name: "secondary_metrics", type: "array", schema: V }];
    return c`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length ? c`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>` : ""}
      </div>
      ${this._suggestions.length ? c`<div>
            ${this._suggestions.map((s) => c`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(i) => this._selected = { ...this._selected, [s.preset]: i.target.checked }}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`)}
          </div>` : ""}
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
le([$({ attribute: !1 })], U.prototype, "hass", 2), le([_()], U.prototype, "_config", 2), le([_()], U.prototype, "_suggestions", 2), le([_()], U.prototype, "_selected", 2), U = le([k("fitness-overview-card-editor")], U);
const yt = JSON.parse('[{"entity_id":"sensor.jasons_iphone_health_oxygen_saturation","state":"97","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Oxygen Saturation","icon":"mdi:water-percent","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_steps","state":"10","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Steps","icon":"mdi:shoe-print","category":"steps"},{"entity_id":"sensor.jasons_iphone_health_resting_heart_rate","state":"75","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Resting Heart Rate","icon":"mdi:heart","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_respiratory_rate","state":"17","unit_of_measurement":"breaths/min","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Respiratory Rate","icon":"mdi:lungs","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_heart_rate_variability_sdnn","state":"19.0986089955471","unit_of_measurement":"ms","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate Variability Sdnn","icon":"mdi:heart-flash","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed","state":"1","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Flights Climbed","icon":"mdi:stairs-up","category":"flights"},{"entity_id":"sensor.jasons_iphone_health_connectivity_test","state":"unavailable","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Connectivity Test","icon":null,"category":"other"},{"entity_id":"sensor.jasons_iphone_health_heart_rate","state":"84","unit_of_measurement":"bpm","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Heart Rate","icon":"mdi:heart-pulse","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_distance_cycling","state":"0.0673205280488492","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Cycling","icon":"mdi:bike","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running","state":"0.00497096953789867","unit_of_measurement":"mi","device_class":"distance","state_class":"measurement","friendly_name":"Jasons iPhone Health Distance Walking Running","icon":"mdi:walk","category":"distance"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned","state":"0.45","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Active Energy Burned","icon":"mdi:fire","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_environmental_sound_exposure","state":"71.6872025924761","unit_of_measurement":"dB","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Environmental Sound Exposure","icon":"mdi:volume-high","category":"other"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned","state":"26.309","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Basal Energy Burned","icon":"mdi:fire-circle","category":"energy"},{"entity_id":"sensor.jasons_iphone_health_weight","state":"359.022793968073","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Weight","icon":"mdi:scale-bathroom","category":"body"},{"entity_id":"sensor.jasons_iphone_health_vo2_max","state":"24.81","unit_of_measurement":"mL/(kg*min)","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Vo2 Max","icon":"mdi:run","category":"body"},{"entity_id":"sensor.jasons_iphone_health_body_fat_percentage","state":"49.2","unit_of_measurement":"%","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Body Fat Percentage","icon":"mdi:percent","category":"body"},{"entity_id":"sensor.jasons_iphone_health_blood_glucose","state":"113","unit_of_measurement":"mg/dL","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Blood Glucose","icon":"mdi:diabetes","category":"vitals"},{"entity_id":"sensor.jasons_iphone_health_bmi","state":"44.6","unit_of_measurement":"count","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Bmi","icon":"mdi:human-male-height","category":"body"},{"entity_id":"sensor.jasons_iphone_health_lean_body_mass","state":"182.190013469583","unit_of_measurement":"lb","device_class":"weight","state_class":"measurement","friendly_name":"Jasons iPhone Health Lean Body Mass","icon":"mdi:human","category":"body"},{"entity_id":"sensor.jasons_iphone_health_hydration","state":"29.9254100911311","unit_of_measurement":"fl oz US","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Hydration","icon":"mdi:cup-water","category":"other"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_walking","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Walking","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_walking","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Walking","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_walking","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Walking","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_workout_44","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Workout 44","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_workout_44","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Workout 44","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_cycling","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Cycling","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_cycling","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Cycling","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_workout_distance_cycling","state":"unavailable","unit_of_measurement":"mi","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Distance Cycling","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_hiit","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Hiit","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_hiit","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Hiit","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_in_bed","state":"398.612829041481","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep In Bed","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_functional_strength","state":"unavailable","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Functional Strength","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_functional_strength","state":"unavailable","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Functional Strength","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_sleep_core","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Core","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_deep","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Deep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_rem","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Rem","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_unknown","state":"unavailable","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Unknown","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_sleep_asleep","state":"14.0041869501273","unit_of_measurement":"min","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Sleep Asleep","icon":null,"category":"sleep"},{"entity_id":"sensor.jasons_iphone_health_steps_daily_total","state":"493","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Steps Daily Total","icon":null,"category":"steps"},{"entity_id":"sensor.jasons_iphone_health_active_energy_burned_daily_total","state":"485.150999999998","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Active Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_flights_climbed_daily_total","state":"3","unit_of_measurement":"count","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Flights Climbed Daily Total","icon":null,"category":"flights"},{"entity_id":"sensor.jasons_iphone_health_basal_energy_burned_daily_total","state":"1841.22300000003","unit_of_measurement":"kcal","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Basal Energy Burned Daily Total","icon":null,"category":"energy"},{"entity_id":"sensor.jasons_iphone_health_distance_walking_running_daily_total","state":"0.21617157233949","unit_of_measurement":"mi","device_class":null,"state_class":null,"friendly_name":"Jasons iPhone Health Distance Walking Running Daily Total","icon":null,"category":"distance"},{"entity_id":"sensor.jasons_iphone_health_workout_duration_strength_training","state":"1494.09190797806","unit_of_measurement":"s","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Duration Strength Training","icon":null,"category":"workout"},{"entity_id":"sensor.jasons_iphone_health_workout_energy_strength_training","state":"283.444680942575","unit_of_measurement":"kcal","device_class":null,"state_class":"measurement","friendly_name":"Jasons iPhone Health Workout Energy Strength Training","icon":null,"category":"energy"}]').map((e) => ({ ...e, category: e.category ?? "other" }));
function us(e) {
  return yt.filter((t) => t.category === e);
}
function ps(e) {
  return yt.find((t) => t.entity_id === e);
}
function J(e, t, s) {
  window.customCards || (window.customCards = []), window.customCards.some((i) => i.type === e) || window.customCards.push({ type: e, name: t, description: s });
}
J("fitness-activity-summary-card", "Fitness Activity Summary", "Shows configurable activity totals with goals."), J("fitness-vitals-card", "Fitness Vitals", "Displays heart metrics with optional thresholds."), J("fitness-sleep-card", "Fitness Sleep", "Summarises sleep totals and stage breakdown."), J("fitness-body-metrics-card", "Fitness Body Metrics", "Shows body metrics with trend indicators."), J("fitness-workouts-card", "Fitness Workouts", "Summarises workout energy/duration."), J("fitness-overview-card", "Fitness Overview", "Highlights primary and secondary metrics.");
export {
  us as byCategory,
  ps as findMetric,
  yt as metricCatalog
};
//# sourceMappingURL=fitness-cards.js.map
