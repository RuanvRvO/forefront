import {
  a as o,
  b as Da,
  c as Wo,
  d as Ka,
  e as h,
  f as $o,
  h as Bo,
  i as Jo,
  j as un,
  l as rt
} from "./Q5VBJYR5.js";

// node_modules/cookie/dist/index.js
var Fo = Da((ne) => {
  "use strict";
  Object.defineProperty(ne, "__esModule", { value: !0 });
  ne.parseCookie = jo;
  ne.parse = jo;
  ne.stringifyCookie = Ma;
  ne.stringifySetCookie = Pt;
  ne.serialize = Pt;
  ne.parseSetCookie = za;
  ne.stringifySetCookie = Pt;
  ne.serialize = Pt;
  var Mo = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, zo = /^[\u0021-\u003A\u003C-\u007E]*$/, Na = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Wa = /^[\u0020-\u003A\u003D-\u007E]*$/, $a = /^-?\d+$/, Ba = Object.prototype.toString, Ja = /* @__PURE__ */ (() => {
    let e = /* @__PURE__ */ o(function() {
    }, "C");
    return e.prototype = /* @__PURE__ */ Object.create(null), e;
  })();
  function jo(e, t) {
    let r = new Ja(), n = e.length;
    if (n < 2)
      return r;
    let i = t?.decode || Vo, s = 0;
    do {
      let a = ln(e, s, n);
      if (a === -1)
        break;
      let c = dn(e, s, n);
      if (a > c) {
        s = e.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      let d = fe(e, s, a);
      r[d] === void 0 && (r[d] = i(fe(e, a + 1, c))), s = c + 1;
    } while (s < n);
    return r;
  }
  o(jo, "parseCookie");
  function Ma(e, t) {
    let r = t?.encode || encodeURIComponent, n = [];
    for (let i of Object.keys(e)) {
      let s = e[i];
      if (s === void 0)
        continue;
      if (!Mo.test(i))
        throw new TypeError(`cookie name is invalid: ${i}`);
      let a = r(s);
      if (!zo.test(a))
        throw new TypeError(`cookie val is invalid: ${s}`);
      n.push(`${i}=${a}`);
    }
    return n.join("; ");
  }
  o(Ma, "stringifyCookie");
  function Pt(e, t, r) {
    let n = typeof e == "object" ? e : { ...r, name: e, value: String(t) }, s = (typeof t == "object" ? t : r)?.encode || encodeURIComponent;
    if (!Mo.test(n.name))
      throw new TypeError(`argument name is invalid: ${n.name}`);
    let a = n.value ? s(n.value) : "";
    if (!zo.test(a))
      throw new TypeError(`argument val is invalid: ${n.value}`);
    let c = n.name + "=" + a;
    if (n.maxAge !== void 0) {
      if (!Number.isInteger(n.maxAge))
        throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
      c += "; Max-Age=" + n.maxAge;
    }
    if (n.domain) {
      if (!Na.test(n.domain))
        throw new TypeError(`option domain is invalid: ${n.domain}`);
      c += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!Wa.test(n.path))
        throw new TypeError(`option path is invalid: ${n.path}`);
      c += "; Path=" + n.path;
    }
    if (n.expires) {
      if (!ja(n.expires) || !Number.isFinite(n.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${n.expires}`);
      c += "; Expires=" + n.expires.toUTCString();
    }
    if (n.httpOnly && (c += "; HttpOnly"), n.secure && (c += "; Secure"), n.partitioned && (c += "; Partitioned"), n.priority)
      switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
        case "low":
          c += "; Priority=Low";
          break;
        case "medium":
          c += "; Priority=Medium";
          break;
        case "high":
          c += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${n.priority}`);
      }
    if (n.sameSite)
      switch (typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite) {
        case !0:
        case "strict":
          c += "; SameSite=Strict";
          break;
        case "lax":
          c += "; SameSite=Lax";
          break;
        case "none":
          c += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
      }
    return c;
  }
  o(Pt, "stringifySetCookie");
  function za(e, t) {
    let r = t?.decode || Vo, n = e.length, i = dn(e, 0, n), s = ln(e, 0, i), a = s === -1 ? { name: "", value: r(fe(e, 0, i)) } : {
      name: fe(e, 0, s),
      value: r(fe(e, s + 1, i))
    }, c = i + 1;
    for (; c < n; ) {
      let d = dn(e, c, n), u = ln(e, c, d), f = u === -1 ? fe(e, c, d) : fe(e, c, u), l = u === -1 ? void 0 : fe(e, u + 1, d);
      switch (f.toLowerCase()) {
        case "httponly":
          a.httpOnly = !0;
          break;
        case "secure":
          a.secure = !0;
          break;
        case "partitioned":
          a.partitioned = !0;
          break;
        case "domain":
          a.domain = l;
          break;
        case "path":
          a.path = l;
          break;
        case "max-age":
          l && $a.test(l) && (a.maxAge = Number(l));
          break;
        case "expires":
          if (!l)
            break;
          let y = new Date(l);
          Number.isFinite(y.valueOf()) && (a.expires = y);
          break;
        case "priority":
          if (!l)
            break;
          let p = l.toLowerCase();
          (p === "low" || p === "medium" || p === "high") && (a.priority = p);
          break;
        case "samesite":
          if (!l)
            break;
          let m = l.toLowerCase();
          (m === "lax" || m === "strict" || m === "none") && (a.sameSite = m);
          break;
      }
      c = d + 1;
    }
    return a;
  }
  o(za, "parseSetCookie");
  function dn(e, t, r) {
    let n = e.indexOf(";", t);
    return n === -1 ? r : n;
  }
  o(dn, "endIndex");
  function ln(e, t, r) {
    let n = e.indexOf("=", t);
    return n < r ? n : -1;
  }
  o(ln, "eqIndex");
  function fe(e, t, r) {
    let n = t, i = r;
    do {
      let s = e.charCodeAt(n);
      if (s !== 32 && s !== 9)
        break;
    } while (++n < i);
    for (; i > n; ) {
      let s = e.charCodeAt(i - 1);
      if (s !== 32 && s !== 9)
        break;
      i--;
    }
    return e.slice(n, i);
  }
  o(fe, "valueSlice");
  function Vo(e) {
    if (e.indexOf("%") === -1)
      return e;
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  }
  o(Vo, "decode");
  function ja(e) {
    return Ba.call(e) === "[object Date]";
  }
  o(ja, "isDate");
});

// node_modules/@convex-dev/auth/dist/server/implementation/index.js
var cn = Ka(Fo(), 1);

// node_modules/@convex-dev/auth/dist/server/utils.js
function F(e) {
  let t = process.env[e];
  if (t === void 0)
    throw new Error(`Missing environment variable \`${e}\``);
  return t;
}
o(F, "requireEnv");
function Ut(e) {
  return /(localhost|127\.0\.0\.1):\d+/.test(e ?? "");
}
o(Ut, "isLocalHost");

// node_modules/@convex-dev/auth/dist/server/cookies.js
var oe = {
  httpOnly: !0,
  sameSite: "none",
  secure: !0,
  path: "/",
  partitioned: !0
}, Va = 900;
function Go(e, t) {
  return {
    name: Xo(e),
    value: t,
    options: { ...oe, maxAge: Va }
  };
}
o(Go, "redirectToParamCookie");
function qo(e, t) {
  let r = Xo(e), n = t[r];
  if (n === void 0)
    return null;
  let i = {
    name: r,
    value: "",
    options: { ...oe, maxAge: 0 }
  };
  return { redirectTo: n, updatedCookie: i };
}
o(qo, "useRedirectToParam");
function Xo(e) {
  return (Ut(process.env.CONVEX_SITE_URL) ? "" : "__Host-") + e + "RedirectTo";
}
o(Xo, "redirectToParamCookieName");

// node_modules/@auth/core/lib/utils/cookie.js
var De = function(e, t, r, n) {
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
}, Fa, nt, Zo, Qo, Ga, qa;
nt = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap(), Fa = /* @__PURE__ */ new WeakSet(), Ga = /* @__PURE__ */ o(function(t) {
  let r = Math.ceil(t.value.length / 3936);
  if (r === 1)
    return De(this, nt, "f")[t.name] = t.value, [t];
  let n = [];
  for (let i = 0; i < r; i++) {
    let s = `${t.name}.${i}`, a = t.value.substr(i * 3936, 3936);
    n.push({ ...t, name: s, value: a }), De(this, nt, "f")[s] = a;
  }
  return De(this, Qo, "f").debug("CHUNKING_SESSION_COOKIE", {
    message: "Session cookie exceeds allowed 4096 bytes.",
    emptyCookieSize: 160,
    valueSize: t.value.length,
    chunks: n.map((i) => i.value.length + 160)
  }), n;
}, "_SessionStore_chunk"), qa = /* @__PURE__ */ o(function() {
  let t = {};
  for (let r in De(this, nt, "f"))
    delete De(this, nt, "f")?.[r], t[r] = {
      name: r,
      value: "",
      options: { ...De(this, Zo, "f").options, maxAge: 0 }
    };
  return t;
}, "_SessionStore_clean");

// node_modules/@auth/core/errors.js
var T = class extends Error {
  static {
    o(this, "AuthError");
  }
  constructor(t, r) {
    t instanceof Error ? super(void 0, {
      cause: { err: t, ...t.cause, ...r }
    }) : typeof t == "string" ? (r instanceof Error && (r = { err: r, ...r.cause }), super(t, r)) : super(void 0, t), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
    let n = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
    this.message += `${this.message ? ". " : ""}Read more at ${n}`;
  }
}, ie = class extends T {
  static {
    o(this, "SignInError");
  }
};
ie.kind = "signIn";
var ot = class extends T {
  static {
    o(this, "AdapterError");
  }
};
ot.type = "AdapterError";
var it = class extends T {
  static {
    o(this, "AccessDenied");
  }
};
it.type = "AccessDenied";
var Ot = class extends T {
  static {
    o(this, "CallbackRouteError");
  }
};
Ot.type = "CallbackRouteError";
var Lt = class extends T {
  static {
    o(this, "ErrorPageLoop");
  }
};
Lt.type = "ErrorPageLoop";
var Ht = class extends T {
  static {
    o(this, "EventError");
  }
};
Ht.type = "EventError";
var Dt = class extends T {
  static {
    o(this, "InvalidCallbackUrl");
  }
};
Dt.type = "InvalidCallbackUrl";
var st = class extends ie {
  static {
    o(this, "CredentialsSignin");
  }
  constructor() {
    super(...arguments), this.code = "credentials";
  }
};
st.type = "CredentialsSignin";
var Kt = class extends T {
  static {
    o(this, "InvalidEndpoints");
  }
};
Kt.type = "InvalidEndpoints";
var pe = class extends T {
  static {
    o(this, "InvalidCheck");
  }
};
pe.type = "InvalidCheck";
var Nt = class extends T {
  static {
    o(this, "JWTSessionError");
  }
};
Nt.type = "JWTSessionError";
var at = class extends T {
  static {
    o(this, "MissingAdapter");
  }
};
at.type = "MissingAdapter";
var Wt = class extends T {
  static {
    o(this, "MissingAdapterMethods");
  }
};
Wt.type = "MissingAdapterMethods";
var $t = class extends T {
  static {
    o(this, "MissingAuthorize");
  }
};
$t.type = "MissingAuthorize";
var ct = class extends T {
  static {
    o(this, "MissingSecret");
  }
};
ct.type = "MissingSecret";
var Bt = class extends ie {
  static {
    o(this, "OAuthAccountNotLinked");
  }
};
Bt.type = "OAuthAccountNotLinked";
var Jt = class extends ie {
  static {
    o(this, "OAuthCallbackError");
  }
};
Jt.type = "OAuthCallbackError";
var Mt = class extends T {
  static {
    o(this, "OAuthProfileParseError");
  }
};
Mt.type = "OAuthProfileParseError";
var zt = class extends T {
  static {
    o(this, "SessionTokenError");
  }
};
zt.type = "SessionTokenError";
var fn = class extends ie {
  static {
    o(this, "OAuthSignInError");
  }
};
fn.type = "OAuthSignInError";
var pn = class extends ie {
  static {
    o(this, "EmailSignInError");
  }
};
pn.type = "EmailSignInError";
var jt = class extends T {
  static {
    o(this, "SignOutError");
  }
};
jt.type = "SignOutError";
var Ke = class extends T {
  static {
    o(this, "UnknownAction");
  }
};
Ke.type = "UnknownAction";
var Vt = class extends T {
  static {
    o(this, "UnsupportedStrategy");
  }
};
Vt.type = "UnsupportedStrategy";
var ut = class extends T {
  static {
    o(this, "InvalidProvider");
  }
};
ut.type = "InvalidProvider";
var Ft = class extends T {
  static {
    o(this, "UntrustedHost");
  }
};
Ft.type = "UntrustedHost";
var Gt = class extends T {
  static {
    o(this, "Verification");
  }
};
Gt.type = "Verification";
var qt = class extends ie {
  static {
    o(this, "MissingCSRF");
  }
};
qt.type = "MissingCSRF";
var Xt = class extends T {
  static {
    o(this, "DuplicateConditionalUI");
  }
};
Xt.type = "DuplicateConditionalUI";
var Zt = class extends T {
  static {
    o(this, "MissingWebAuthnAutocomplete");
  }
};
Zt.type = "MissingWebAuthnAutocomplete";
var Qt = class extends T {
  static {
    o(this, "WebAuthnVerificationError");
  }
};
Qt.type = "WebAuthnVerificationError";
var Yt = class extends ie {
  static {
    o(this, "AccountNotLinked");
  }
};
Yt.type = "AccountNotLinked";
var er = class extends T {
  static {
    o(this, "ExperimentalFeatureNotEnabled");
  }
};
er.type = "ExperimentalFeatureNotEnabled";

// node_modules/@panva/hkdf/dist/web/runtime/hkdf.js
var Za = /* @__PURE__ */ o(() => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  throw new Error("unable to locate global object");
}, "getGlobal"), ei = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  let { crypto: { subtle: s } } = Za();
  return new Uint8Array(await s.deriveBits({
    name: "HKDF",
    hash: `SHA-${e.substr(3)}`,
    salt: r,
    info: n
  }, await s.importKey("raw", t, "HKDF", !1, ["deriveBits"]), i << 3));
}, "default");

// node_modules/@panva/hkdf/dist/web/index.js
function Qa(e) {
  switch (e) {
    case "sha256":
    case "sha384":
    case "sha512":
    case "sha1":
      return e;
    default:
      throw new TypeError('unsupported "digest" value');
  }
}
o(Qa, "normalizeDigest");
function hn(e, t) {
  if (typeof e == "string")
    return new TextEncoder().encode(e);
  if (!(e instanceof Uint8Array))
    throw new TypeError(`"${t}"" must be an instance of Uint8Array or a string`);
  return e;
}
o(hn, "normalizeUint8Array");
function Ya(e) {
  let t = hn(e, "ikm");
  if (!t.byteLength)
    throw new TypeError('"ikm" must be at least one byte in length');
  return t;
}
o(Ya, "normalizeIkm");
function ec(e) {
  let t = hn(e, "info");
  if (t.byteLength > 1024)
    throw TypeError('"info" must not contain more than 1024 bytes');
  return t;
}
o(ec, "normalizeInfo");
function tc(e, t) {
  if (typeof e != "number" || !Number.isInteger(e) || e < 1)
    throw new TypeError('"keylen" must be a positive integer');
  let r = parseInt(t.substr(3), 10) >> 3 || 20;
  if (e > 255 * r)
    throw new TypeError('"keylen" too large');
  return e;
}
o(tc, "normalizeKeylen");
async function ti(e, t, r, n, i) {
  return ei(Qa(e), Ya(t), hn(r, "salt"), ec(n), tc(i, e));
}
o(ti, "hkdf");

// node_modules/jose/dist/browser/runtime/webcrypto.js
var _ = crypto, K = /* @__PURE__ */ o((e) => e instanceof CryptoKey, "isCryptoKey");

// node_modules/jose/dist/browser/runtime/digest.js
var rc = /* @__PURE__ */ o(async (e, t) => {
  let r = `SHA-${e.slice(-3)}`;
  return new Uint8Array(await _.subtle.digest(r, t));
}, "digest"), tr = rc;

// node_modules/jose/dist/browser/lib/buffer_utils.js
var U = new TextEncoder(), Q = new TextDecoder(), rr = 2 ** 32;
function j(...e) {
  let t = e.reduce((i, { length: s }) => i + s, 0), r = new Uint8Array(t), n = 0;
  for (let i of e)
    r.set(i, n), n += i.length;
  return r;
}
o(j, "concat");
function ri(e, t) {
  return j(U.encode(e), new Uint8Array([0]), t);
}
o(ri, "p2s");
function mn(e, t, r) {
  if (t < 0 || t >= rr)
    throw new RangeError(`value must be >= 0 and <= ${rr - 1}. Received ${t}`);
  e.set([t >>> 24, t >>> 16, t >>> 8, t & 255], r);
}
o(mn, "writeUInt32BE");
function nr(e) {
  let t = Math.floor(e / rr), r = e % rr, n = new Uint8Array(8);
  return mn(n, t, 0), mn(n, r, 4), n;
}
o(nr, "uint64be");
function or(e) {
  let t = new Uint8Array(4);
  return mn(t, e), t;
}
o(or, "uint32be");
function ir(e) {
  return j(or(e.length), e);
}
o(ir, "lengthAndInput");
async function ni(e, t, r) {
  let n = Math.ceil((t >> 3) / 32), i = new Uint8Array(n * 32);
  for (let s = 0; s < n; s++) {
    let a = new Uint8Array(4 + e.length + r.length);
    a.set(or(s + 1)), a.set(e, 4), a.set(r, 4 + e.length), i.set(await tr("sha256", a), s * 32);
  }
  return i.slice(0, t >> 3);
}
o(ni, "concatKdf");

// node_modules/jose/dist/browser/runtime/base64url.js
var nc = /* @__PURE__ */ o((e) => {
  let t = e;
  typeof t == "string" && (t = U.encode(t));
  let r = 32768, n = [];
  for (let i = 0; i < t.length; i += r)
    n.push(String.fromCharCode.apply(null, t.subarray(i, i + r)));
  return btoa(n.join(""));
}, "encodeBase64"), O = /* @__PURE__ */ o((e) => nc(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), "encode"), oc = /* @__PURE__ */ o((e) => {
  let t = atob(e), r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t.charCodeAt(n);
  return r;
}, "decodeBase64"), W = /* @__PURE__ */ o((e) => {
  let t = e;
  t instanceof Uint8Array && (t = Q.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return oc(t);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}, "decode");

// node_modules/jose/dist/browser/util/errors.js
var M = class extends Error {
  static {
    o(this, "JOSEError");
  }
  constructor(t, r) {
    super(t, r), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
};
M.code = "ERR_JOSE_GENERIC";
var B = class extends M {
  static {
    o(this, "JWTClaimValidationFailed");
  }
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = i, this.payload = r;
  }
};
B.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var Ne = class extends M {
  static {
    o(this, "JWTExpired");
  }
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = i, this.payload = r;
  }
};
Ne.code = "ERR_JWT_EXPIRED";
var We = class extends M {
  static {
    o(this, "JOSEAlgNotAllowed");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
We.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var E = class extends M {
  static {
    o(this, "JOSENotSupported");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
};
E.code = "ERR_JOSE_NOT_SUPPORTED";
var Ae = class extends M {
  static {
    o(this, "JWEDecryptionFailed");
  }
  constructor(t = "decryption operation failed", r) {
    super(t, r), this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
};
Ae.code = "ERR_JWE_DECRYPTION_FAILED";
var w = class extends M {
  static {
    o(this, "JWEInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWE_INVALID";
  }
};
w.code = "ERR_JWE_INVALID";
var ue = class extends M {
  static {
    o(this, "JWSInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWS_INVALID";
  }
};
ue.code = "ERR_JWS_INVALID";
var Ee = class extends M {
  static {
    o(this, "JWTInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWT_INVALID";
  }
};
Ee.code = "ERR_JWT_INVALID";
var dt = class extends M {
  static {
    o(this, "JWKInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWK_INVALID";
  }
};
dt.code = "ERR_JWK_INVALID";
var yn = class extends M {
  static {
    o(this, "JWKSInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWKS_INVALID";
  }
};
yn.code = "ERR_JWKS_INVALID";
var wn = class extends M {
  static {
    o(this, "JWKSNoMatchingKey");
  }
  constructor(t = "no applicable key found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
};
wn.code = "ERR_JWKS_NO_MATCHING_KEY";
var gn = class extends M {
  static {
    o(this, "JWKSMultipleMatchingKeys");
  }
  constructor(t = "multiple matching keys found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
gn.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var bn = class extends M {
  static {
    o(this, "JWKSTimeout");
  }
  constructor(t = "request timed out", r) {
    super(t, r), this.code = "ERR_JWKS_TIMEOUT";
  }
};
bn.code = "ERR_JWKS_TIMEOUT";
var _n = class extends M {
  static {
    o(this, "JWSSignatureVerificationFailed");
  }
  constructor(t = "signature verification failed", r) {
    super(t, r), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};
_n.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

// node_modules/jose/dist/browser/runtime/random.js
var $e = _.getRandomValues.bind(_);

// node_modules/jose/dist/browser/lib/iv.js
function xn(e) {
  switch (e) {
    case "A128GCM":
    case "A128GCMKW":
    case "A192GCM":
    case "A192GCMKW":
    case "A256GCM":
    case "A256GCMKW":
      return 96;
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return 128;
    default:
      throw new E(`Unsupported JWE Algorithm: ${e}`);
  }
}
o(xn, "bitLength");
var oi = /* @__PURE__ */ o((e) => $e(new Uint8Array(xn(e) >> 3)), "default");

// node_modules/jose/dist/browser/lib/check_iv_length.js
var ac = /* @__PURE__ */ o((e, t) => {
  if (t.length << 3 !== xn(e))
    throw new w("Invalid Initialization Vector length");
}, "checkIvLength"), sr = ac;

// node_modules/jose/dist/browser/runtime/check_cek_length.js
var cc = /* @__PURE__ */ o((e, t) => {
  let r = e.byteLength << 3;
  if (r !== t)
    throw new w(`Invalid Content Encryption Key length. Expected ${t} bits, got ${r} bits`);
}, "checkCekLength"), Be = cc;

// node_modules/jose/dist/browser/runtime/timing_safe_equal.js
var uc = /* @__PURE__ */ o((e, t) => {
  if (!(e instanceof Uint8Array))
    throw new TypeError("First argument must be a buffer");
  if (!(t instanceof Uint8Array))
    throw new TypeError("Second argument must be a buffer");
  if (e.length !== t.length)
    throw new TypeError("Input buffers must have the same length");
  let r = e.length, n = 0, i = -1;
  for (; ++i < r; )
    n |= e[i] ^ t[i];
  return n === 0;
}, "timingSafeEqual"), ii = uc;

// node_modules/jose/dist/browser/lib/crypto_key.js
function J(e, t = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
o(J, "unusable");
function de(e, t) {
  return e.name === t;
}
o(de, "isAlgorithm");
function ar(e) {
  return parseInt(e.name.slice(4), 10);
}
o(ar, "getHashLength");
function dc(e) {
  switch (e) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
o(dc, "getNamedCurve");
function si(e, t) {
  if (t.length && !t.some((r) => e.usages.includes(r))) {
    let r = "CryptoKey does not support this operation, its usages must include ";
    if (t.length > 2) {
      let n = t.pop();
      r += `one of ${t.join(", ")}, or ${n}.`;
    } else t.length === 2 ? r += `one of ${t[0]} or ${t[1]}.` : r += `${t[0]}.`;
    throw new TypeError(r);
  }
}
o(si, "checkUsage");
function ai(e, t, ...r) {
  switch (t) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!de(e.algorithm, "HMAC"))
        throw J("HMAC");
      let n = parseInt(t.slice(2), 10);
      if (ar(e.algorithm.hash) !== n)
        throw J(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!de(e.algorithm, "RSASSA-PKCS1-v1_5"))
        throw J("RSASSA-PKCS1-v1_5");
      let n = parseInt(t.slice(2), 10);
      if (ar(e.algorithm.hash) !== n)
        throw J(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!de(e.algorithm, "RSA-PSS"))
        throw J("RSA-PSS");
      let n = parseInt(t.slice(2), 10);
      if (ar(e.algorithm.hash) !== n)
        throw J(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448")
        throw J("Ed25519 or Ed448");
      break;
    }
    case "Ed25519": {
      if (!de(e.algorithm, "Ed25519"))
        throw J("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!de(e.algorithm, "ECDSA"))
        throw J("ECDSA");
      let n = dc(t);
      if (e.algorithm.namedCurve !== n)
        throw J(n, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  si(e, r);
}
o(ai, "checkSigCryptoKey");
function G(e, t, ...r) {
  switch (t) {
    case "A128GCM":
    case "A192GCM":
    case "A256GCM": {
      if (!de(e.algorithm, "AES-GCM"))
        throw J("AES-GCM");
      let n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw J(n, "algorithm.length");
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (!de(e.algorithm, "AES-KW"))
        throw J("AES-KW");
      let n = parseInt(t.slice(1, 4), 10);
      if (e.algorithm.length !== n)
        throw J(n, "algorithm.length");
      break;
    }
    case "ECDH": {
      switch (e.algorithm.name) {
        case "ECDH":
        case "X25519":
        case "X448":
          break;
        default:
          throw J("ECDH, X25519, or X448");
      }
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW":
      if (!de(e.algorithm, "PBKDF2"))
        throw J("PBKDF2");
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (!de(e.algorithm, "RSA-OAEP"))
        throw J("RSA-OAEP");
      let n = parseInt(t.slice(9), 10) || 1;
      if (ar(e.algorithm.hash) !== n)
        throw J(`SHA-${n}`, "algorithm.hash");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  si(e, r);
}
o(G, "checkEncCryptoKey");

// node_modules/jose/dist/browser/lib/invalid_key_input.js
function ci(e, t, ...r) {
  if (r = r.filter(Boolean), r.length > 2) {
    let n = r.pop();
    e += `one of type ${r.join(", ")}, or ${n}.`;
  } else r.length === 2 ? e += `one of type ${r[0]} or ${r[1]}.` : e += `of type ${r[0]}.`;
  return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t != null && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
o(ci, "message");
var N = /* @__PURE__ */ o((e, ...t) => ci("Key must be ", e, ...t), "default");
function Sn(e, t, ...r) {
  return ci(`Key for the ${e} algorithm must be `, t, ...r);
}
o(Sn, "withAlg");

// node_modules/jose/dist/browser/runtime/is_key_like.js
var vn = /* @__PURE__ */ o((e) => K(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", "default"), H = ["CryptoKey"];

// node_modules/jose/dist/browser/runtime/decrypt.js
async function lc(e, t, r, n, i, s) {
  if (!(t instanceof Uint8Array))
    throw new TypeError(N(t, "Uint8Array"));
  let a = parseInt(e.slice(1, 4), 10), c = await _.subtle.importKey("raw", t.subarray(a >> 3), "AES-CBC", !1, ["decrypt"]), d = await _.subtle.importKey("raw", t.subarray(0, a >> 3), {
    hash: `SHA-${a << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), u = j(s, n, r, nr(s.length << 3)), f = new Uint8Array((await _.subtle.sign("HMAC", d, u)).slice(0, a >> 3)), l;
  try {
    l = ii(i, f);
  } catch {
  }
  if (!l)
    throw new Ae();
  let y;
  try {
    y = new Uint8Array(await _.subtle.decrypt({ iv: n, name: "AES-CBC" }, c, r));
  } catch {
  }
  if (!y)
    throw new Ae();
  return y;
}
o(lc, "cbcDecrypt");
async function fc(e, t, r, n, i, s) {
  let a;
  t instanceof Uint8Array ? a = await _.subtle.importKey("raw", t, "AES-GCM", !1, ["decrypt"]) : (G(t, e, "decrypt"), a = t);
  try {
    return new Uint8Array(await _.subtle.decrypt({
      additionalData: s,
      iv: n,
      name: "AES-GCM",
      tagLength: 128
    }, a, j(r, i)));
  } catch {
    throw new Ae();
  }
}
o(fc, "gcmDecrypt");
var pc = /* @__PURE__ */ o(async (e, t, r, n, i, s) => {
  if (!K(t) && !(t instanceof Uint8Array))
    throw new TypeError(N(t, ...H, "Uint8Array"));
  if (!n)
    throw new w("JWE Initialization Vector missing");
  if (!i)
    throw new w("JWE Authentication Tag missing");
  switch (sr(e, n), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return t instanceof Uint8Array && Be(t, parseInt(e.slice(-3), 10)), lc(e, t, r, n, i, s);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return t instanceof Uint8Array && Be(t, parseInt(e.slice(1, 4), 10)), fc(e, t, r, n, i, s);
    default:
      throw new E("Unsupported JWE Content Encryption Algorithm");
  }
}, "decrypt"), cr = pc;

// node_modules/jose/dist/browser/lib/is_disjoint.js
var hc = /* @__PURE__ */ o((...e) => {
  let t = e.filter(Boolean);
  if (t.length === 0 || t.length === 1)
    return !0;
  let r;
  for (let n of t) {
    let i = Object.keys(n);
    if (!r || r.size === 0) {
      r = new Set(i);
      continue;
    }
    for (let s of i) {
      if (r.has(s))
        return !1;
      r.add(s);
    }
  }
  return !0;
}, "isDisjoint"), Je = hc;

// node_modules/jose/dist/browser/lib/is_object.js
function mc(e) {
  return typeof e == "object" && e !== null;
}
o(mc, "isObjectLike");
function z(e) {
  if (!mc(e) || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(e) === null)
    return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
o(z, "isObject");

// node_modules/jose/dist/browser/runtime/bogus.js
var yc = [
  { hash: "SHA-256", name: "HMAC" },
  !0,
  ["sign"]
], Me = yc;

// node_modules/jose/dist/browser/runtime/aeskw.js
function ui(e, t) {
  if (e.algorithm.length !== parseInt(t.slice(1, 4), 10))
    throw new TypeError(`Invalid key size for alg: ${t}`);
}
o(ui, "checkKeySize");
function di(e, t, r) {
  if (K(e))
    return G(e, t, r), e;
  if (e instanceof Uint8Array)
    return _.subtle.importKey("raw", e, "AES-KW", !0, [r]);
  throw new TypeError(N(e, ...H, "Uint8Array"));
}
o(di, "getCryptoKey");
var lt = /* @__PURE__ */ o(async (e, t, r) => {
  let n = await di(t, e, "wrapKey");
  ui(n, e);
  let i = await _.subtle.importKey("raw", r, ...Me);
  return new Uint8Array(await _.subtle.wrapKey("raw", i, n, "AES-KW"));
}, "wrap"), ft = /* @__PURE__ */ o(async (e, t, r) => {
  let n = await di(t, e, "unwrapKey");
  ui(n, e);
  let i = await _.subtle.unwrapKey("raw", r, n, "AES-KW", ...Me);
  return new Uint8Array(await _.subtle.exportKey("raw", i));
}, "unwrap");

// node_modules/jose/dist/browser/runtime/ecdhes.js
async function ur(e, t, r, n, i = new Uint8Array(0), s = new Uint8Array(0)) {
  if (!K(e))
    throw new TypeError(N(e, ...H));
  if (G(e, "ECDH"), !K(t))
    throw new TypeError(N(t, ...H));
  G(t, "ECDH", "deriveBits");
  let a = j(ir(U.encode(r)), ir(i), ir(s), or(n)), c;
  e.algorithm.name === "X25519" ? c = 256 : e.algorithm.name === "X448" ? c = 448 : c = Math.ceil(parseInt(e.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
  let d = new Uint8Array(await _.subtle.deriveBits({
    name: e.algorithm.name,
    public: e
  }, t, c));
  return ni(d, n, a);
}
o(ur, "deriveKey");
async function li(e) {
  if (!K(e))
    throw new TypeError(N(e, ...H));
  return _.subtle.generateKey(e.algorithm, !0, ["deriveBits"]);
}
o(li, "generateEpk");
function dr(e) {
  if (!K(e))
    throw new TypeError(N(e, ...H));
  return ["P-256", "P-384", "P-521"].includes(e.algorithm.namedCurve) || e.algorithm.name === "X25519" || e.algorithm.name === "X448";
}
o(dr, "ecdhAllowed");

// node_modules/jose/dist/browser/lib/check_p2s.js
function An(e) {
  if (!(e instanceof Uint8Array) || e.length < 8)
    throw new w("PBES2 Salt Input must be 8 or more octets");
}
o(An, "checkP2s");

// node_modules/jose/dist/browser/runtime/pbes2kw.js
function wc(e, t) {
  if (e instanceof Uint8Array)
    return _.subtle.importKey("raw", e, "PBKDF2", !1, ["deriveBits"]);
  if (K(e))
    return G(e, t, "deriveBits", "deriveKey"), e;
  throw new TypeError(N(e, ...H, "Uint8Array"));
}
o(wc, "getCryptoKey");
async function pi(e, t, r, n) {
  An(e);
  let i = ri(t, e), s = parseInt(t.slice(13, 16), 10), a = {
    hash: `SHA-${t.slice(8, 11)}`,
    iterations: r,
    name: "PBKDF2",
    salt: i
  }, c = {
    length: s,
    name: "AES-KW"
  }, d = await wc(n, t);
  if (d.usages.includes("deriveBits"))
    return new Uint8Array(await _.subtle.deriveBits(a, d, s));
  if (d.usages.includes("deriveKey"))
    return _.subtle.deriveKey(a, d, c, !1, ["wrapKey", "unwrapKey"]);
  throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
o(pi, "deriveKey");
var hi = /* @__PURE__ */ o(async (e, t, r, n = 2048, i = $e(new Uint8Array(16))) => {
  let s = await pi(i, e, n, t);
  return { encryptedKey: await lt(e.slice(-6), s, r), p2c: n, p2s: O(i) };
}, "encrypt"), mi = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  let s = await pi(i, e, n, t);
  return ft(e.slice(-6), s, r);
}, "decrypt");

// node_modules/jose/dist/browser/runtime/subtle_rsaes.js
function ze(e) {
  switch (e) {
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      return "RSA-OAEP";
    default:
      throw new E(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
o(ze, "subtleRsaEs");

// node_modules/jose/dist/browser/runtime/check_key_length.js
var pt = /* @__PURE__ */ o((e, t) => {
  if (e.startsWith("RS") || e.startsWith("PS")) {
    let { modulusLength: r } = t.algorithm;
    if (typeof r != "number" || r < 2048)
      throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
  }
}, "default");

// node_modules/jose/dist/browser/runtime/rsaes.js
var yi = /* @__PURE__ */ o(async (e, t, r) => {
  if (!K(t))
    throw new TypeError(N(t, ...H));
  if (G(t, e, "encrypt", "wrapKey"), pt(e, t), t.usages.includes("encrypt"))
    return new Uint8Array(await _.subtle.encrypt(ze(e), t, r));
  if (t.usages.includes("wrapKey")) {
    let n = await _.subtle.importKey("raw", r, ...Me);
    return new Uint8Array(await _.subtle.wrapKey("raw", n, t, ze(e)));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
}, "encrypt"), wi = /* @__PURE__ */ o(async (e, t, r) => {
  if (!K(t))
    throw new TypeError(N(t, ...H));
  if (G(t, e, "decrypt", "unwrapKey"), pt(e, t), t.usages.includes("decrypt"))
    return new Uint8Array(await _.subtle.decrypt(ze(e), t, r));
  if (t.usages.includes("unwrapKey")) {
    let n = await _.subtle.unwrapKey("raw", r, t, ze(e), ...Me);
    return new Uint8Array(await _.subtle.exportKey("raw", n));
  }
  throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
}, "decrypt");

// node_modules/jose/dist/browser/lib/is_jwk.js
function ke(e) {
  return z(e) && typeof e.kty == "string";
}
o(ke, "isJWK");
function gi(e) {
  return e.kty !== "oct" && typeof e.d == "string";
}
o(gi, "isPrivateJWK");
function bi(e) {
  return e.kty !== "oct" && typeof e.d > "u";
}
o(bi, "isPublicJWK");
function _i(e) {
  return ke(e) && e.kty === "oct" && typeof e.k == "string";
}
o(_i, "isSecretJWK");

// node_modules/jose/dist/browser/runtime/jwk_to_key.js
function bc(e) {
  let t, r;
  switch (e.kty) {
    case "RSA": {
      switch (e.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          t = { name: "RSA-PSS", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          t = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          t = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
          }, r = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new E('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (e.alg) {
        case "ES256":
          t = { name: "ECDSA", namedCurve: "P-256" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          t = { name: "ECDSA", namedCurve: "P-384" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          t = { name: "ECDSA", namedCurve: "P-521" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: "ECDH", namedCurve: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new E('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (e.alg) {
        case "Ed25519":
          t = { name: "Ed25519" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          t = { name: e.crv }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new E('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new E('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: t, keyUsages: r };
}
o(bc, "subtleMapping");
var _c = /* @__PURE__ */ o(async (e) => {
  if (!e.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  let { algorithm: t, keyUsages: r } = bc(e), n = [
    t,
    e.ext ?? !1,
    e.key_ops ?? r
  ], i = { ...e };
  return delete i.alg, delete i.use, _.subtle.importKey("jwk", i, ...n);
}, "parse"), lr = _c;

// node_modules/jose/dist/browser/runtime/normalize_key.js
var xi = /* @__PURE__ */ o((e) => W(e), "exportKeyValue"), je, Ve, Si = /* @__PURE__ */ o((e) => e?.[Symbol.toStringTag] === "KeyObject", "isKeyObject"), fr = /* @__PURE__ */ o(async (e, t, r, n, i = !1) => {
  let s = e.get(t);
  if (s?.[n])
    return s[n];
  let a = await lr({ ...r, alg: n });
  return i && Object.freeze(t), s ? s[n] = a : e.set(t, { [n]: a }), a;
}, "importAndCache"), xc = /* @__PURE__ */ o((e, t) => {
  if (Si(e)) {
    let r = e.export({ format: "jwk" });
    return delete r.d, delete r.dp, delete r.dq, delete r.p, delete r.q, delete r.qi, r.k ? xi(r.k) : (Ve || (Ve = /* @__PURE__ */ new WeakMap()), fr(Ve, e, r, t));
  }
  return ke(e) ? e.k ? W(e.k) : (Ve || (Ve = /* @__PURE__ */ new WeakMap()), fr(Ve, e, e, t, !0)) : e;
}, "normalizePublicKey"), Sc = /* @__PURE__ */ o((e, t) => {
  if (Si(e)) {
    let r = e.export({ format: "jwk" });
    return r.k ? xi(r.k) : (je || (je = /* @__PURE__ */ new WeakMap()), fr(je, e, r, t));
  }
  return ke(e) ? e.k ? W(e.k) : (je || (je = /* @__PURE__ */ new WeakMap()), fr(je, e, e, t, !0)) : e;
}, "normalizePrivateKey"), Ie = { normalizePublicKey: xc, normalizePrivateKey: Sc };

// node_modules/jose/dist/browser/lib/cek.js
function ht(e) {
  switch (e) {
    case "A128GCM":
      return 128;
    case "A192GCM":
      return 192;
    case "A256GCM":
    case "A128CBC-HS256":
      return 256;
    case "A192CBC-HS384":
      return 384;
    case "A256CBC-HS512":
      return 512;
    default:
      throw new E(`Unsupported JWE Algorithm: ${e}`);
  }
}
o(ht, "bitLength");
var he = /* @__PURE__ */ o((e) => $e(new Uint8Array(ht(e) >> 3)), "default");

// node_modules/jose/dist/browser/runtime/asn1.js
var me = /* @__PURE__ */ o((e, t, r = 0) => {
  r === 0 && (t.unshift(t.length), t.unshift(6));
  let n = e.indexOf(t[0], r);
  if (n === -1)
    return !1;
  let i = e.subarray(n, n + t.length);
  return i.length !== t.length ? !1 : i.every((s, a) => s === t[a]) || me(e, t, n + 1);
}, "findOid"), vi = /* @__PURE__ */ o((e) => {
  switch (!0) {
    case me(e, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case me(e, [43, 129, 4, 0, 34]):
      return "P-384";
    case me(e, [43, 129, 4, 0, 35]):
      return "P-521";
    case me(e, [43, 101, 110]):
      return "X25519";
    case me(e, [43, 101, 111]):
      return "X448";
    case me(e, [43, 101, 112]):
      return "Ed25519";
    case me(e, [43, 101, 113]):
      return "Ed448";
    default:
      throw new E("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
}, "getNamedCurve"), vc = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  let s, a, c = new Uint8Array(atob(r.replace(e, "")).split("").map((u) => u.charCodeAt(0))), d = t === "spki";
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      s = { name: "RSA-PSS", hash: `SHA-${n.slice(-3)}` }, a = d ? ["verify"] : ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      s = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n.slice(-3)}` }, a = d ? ["verify"] : ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      s = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(n.slice(-3), 10) || 1}`
      }, a = d ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      s = { name: "ECDSA", namedCurve: "P-256" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ES384":
      s = { name: "ECDSA", namedCurve: "P-384" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ES512":
      s = { name: "ECDSA", namedCurve: "P-521" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      let u = vi(c);
      s = u.startsWith("P-") ? { name: "ECDH", namedCurve: u } : { name: u }, a = d ? [] : ["deriveBits"];
      break;
    }
    case "Ed25519":
      s = { name: "Ed25519" }, a = d ? ["verify"] : ["sign"];
      break;
    case "EdDSA":
      s = { name: vi(c) }, a = d ? ["verify"] : ["sign"];
      break;
    default:
      throw new E('Invalid or unsupported "alg" (Algorithm) value');
  }
  return _.subtle.importKey(t, c, s, i?.extractable ?? !1, a);
}, "genericImport"), Ai = /* @__PURE__ */ o((e, t, r) => vc(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e, t, r), "fromPKCS8");

// node_modules/jose/dist/browser/key/import.js
async function En(e, t, r) {
  if (typeof e != "string" || e.indexOf("-----BEGIN PRIVATE KEY-----") !== 0)
    throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
  return Ai(e, t, r);
}
o(En, "importPKCS8");
async function kn(e, t) {
  if (!z(e))
    throw new TypeError("JWK must be an object");
  switch (t || (t = e.alg), e.kty) {
    case "oct":
      if (typeof e.k != "string" || !e.k)
        throw new TypeError('missing "k" (Key Value) Parameter value');
      return W(e.k);
    case "RSA":
      if ("oth" in e && e.oth !== void 0)
        throw new E('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
    case "EC":
    case "OKP":
      return lr({ ...e, alg: t });
    default:
      throw new E('Unsupported "kty" (Key Type) Parameter value');
  }
}
o(kn, "importJWK");

// node_modules/jose/dist/browser/lib/check_key_type.js
var Fe = /* @__PURE__ */ o((e) => e?.[Symbol.toStringTag], "tag"), In = /* @__PURE__ */ o((e, t, r) => {
  if (t.use !== void 0 && t.use !== "sig")
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  if (t.key_ops !== void 0 && t.key_ops.includes?.(r) !== !0)
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${r}`);
  if (t.alg !== void 0 && t.alg !== e)
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
  return !0;
}, "jwkMatchesOp"), Ac = /* @__PURE__ */ o((e, t, r, n) => {
  if (!(t instanceof Uint8Array)) {
    if (n && ke(t)) {
      if (_i(t) && In(e, t, r))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!vn(t))
      throw new TypeError(Sn(e, t, ...H, "Uint8Array", n ? "JSON Web Key" : null));
    if (t.type !== "secret")
      throw new TypeError(`${Fe(t)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck"), Ec = /* @__PURE__ */ o((e, t, r, n) => {
  if (n && ke(t))
    switch (r) {
      case "sign":
        if (gi(t) && In(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a private JWK");
      case "verify":
        if (bi(t) && In(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a public JWK");
    }
  if (!vn(t))
    throw new TypeError(Sn(e, t, ...H, n ? "JSON Web Key" : null));
  if (t.type === "secret")
    throw new TypeError(`${Fe(t)} instances for asymmetric algorithms must not be of type "secret"`);
  if (r === "sign" && t.type === "public")
    throw new TypeError(`${Fe(t)} instances for asymmetric algorithm signing must be of type "private"`);
  if (r === "decrypt" && t.type === "public")
    throw new TypeError(`${Fe(t)} instances for asymmetric algorithm decryption must be of type "private"`);
  if (t.algorithm && r === "verify" && t.type === "private")
    throw new TypeError(`${Fe(t)} instances for asymmetric algorithm verifying must be of type "public"`);
  if (t.algorithm && r === "encrypt" && t.type === "private")
    throw new TypeError(`${Fe(t)} instances for asymmetric algorithm encryption must be of type "public"`);
}, "asymmetricTypeCheck");
function Ei(e, t, r, n) {
  t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? Ac(t, r, n, e) : Ec(t, r, n, e);
}
o(Ei, "checkKeyType");
var pr = Ei.bind(void 0, !1), ki = Ei.bind(void 0, !0);

// node_modules/jose/dist/browser/runtime/encrypt.js
async function kc(e, t, r, n, i) {
  if (!(r instanceof Uint8Array))
    throw new TypeError(N(r, "Uint8Array"));
  let s = parseInt(e.slice(1, 4), 10), a = await _.subtle.importKey("raw", r.subarray(s >> 3), "AES-CBC", !1, ["encrypt"]), c = await _.subtle.importKey("raw", r.subarray(0, s >> 3), {
    hash: `SHA-${s << 1}`,
    name: "HMAC"
  }, !1, ["sign"]), d = new Uint8Array(await _.subtle.encrypt({
    iv: n,
    name: "AES-CBC"
  }, a, t)), u = j(i, n, d, nr(i.length << 3)), f = new Uint8Array((await _.subtle.sign("HMAC", c, u)).slice(0, s >> 3));
  return { ciphertext: d, tag: f, iv: n };
}
o(kc, "cbcEncrypt");
async function Ic(e, t, r, n, i) {
  let s;
  r instanceof Uint8Array ? s = await _.subtle.importKey("raw", r, "AES-GCM", !1, ["encrypt"]) : (G(r, e, "encrypt"), s = r);
  let a = new Uint8Array(await _.subtle.encrypt({
    additionalData: i,
    iv: n,
    name: "AES-GCM",
    tagLength: 128
  }, s, t)), c = a.slice(-16);
  return { ciphertext: a.slice(0, -16), tag: c, iv: n };
}
o(Ic, "gcmEncrypt");
var Tc = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  if (!K(r) && !(r instanceof Uint8Array))
    throw new TypeError(N(r, ...H, "Uint8Array"));
  switch (n ? sr(e, n) : n = oi(e), e) {
    case "A128CBC-HS256":
    case "A192CBC-HS384":
    case "A256CBC-HS512":
      return r instanceof Uint8Array && Be(r, parseInt(e.slice(-3), 10)), kc(e, t, r, n, i);
    case "A128GCM":
    case "A192GCM":
    case "A256GCM":
      return r instanceof Uint8Array && Be(r, parseInt(e.slice(1, 4), 10)), Ic(e, t, r, n, i);
    default:
      throw new E("Unsupported JWE Content Encryption Algorithm");
  }
}, "encrypt"), hr = Tc;

// node_modules/jose/dist/browser/lib/aesgcmkw.js
async function Ii(e, t, r, n) {
  let i = e.slice(0, 7), s = await hr(i, r, t, n, new Uint8Array(0));
  return {
    encryptedKey: s.ciphertext,
    iv: O(s.iv),
    tag: O(s.tag)
  };
}
o(Ii, "wrap");
async function Ti(e, t, r, n, i) {
  let s = e.slice(0, 7);
  return cr(s, t, r, n, i, new Uint8Array(0));
}
o(Ti, "unwrap");

// node_modules/jose/dist/browser/lib/decrypt_key_management.js
async function Rc(e, t, r, n, i) {
  switch (pr(e, t, "decrypt"), t = await Ie.normalizePrivateKey?.(t, e) || t, e) {
    case "dir": {
      if (r !== void 0)
        throw new w("Encountered unexpected JWE Encrypted Key");
      return t;
    }
    case "ECDH-ES":
      if (r !== void 0)
        throw new w("Encountered unexpected JWE Encrypted Key");
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!z(n.epk))
        throw new w('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      if (!dr(t))
        throw new E("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      let s = await kn(n.epk, e), a, c;
      if (n.apu !== void 0) {
        if (typeof n.apu != "string")
          throw new w('JOSE Header "apu" (Agreement PartyUInfo) invalid');
        try {
          a = W(n.apu);
        } catch {
          throw new w("Failed to base64url decode the apu");
        }
      }
      if (n.apv !== void 0) {
        if (typeof n.apv != "string")
          throw new w('JOSE Header "apv" (Agreement PartyVInfo) invalid');
        try {
          c = W(n.apv);
        } catch {
          throw new w("Failed to base64url decode the apv");
        }
      }
      let d = await ur(s, t, e === "ECDH-ES" ? n.enc : e, e === "ECDH-ES" ? ht(n.enc) : parseInt(e.slice(-5, -2), 10), a, c);
      if (e === "ECDH-ES")
        return d;
      if (r === void 0)
        throw new w("JWE Encrypted Key missing");
      return ft(e.slice(-6), d, r);
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      if (r === void 0)
        throw new w("JWE Encrypted Key missing");
      return wi(e, t, r);
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      if (r === void 0)
        throw new w("JWE Encrypted Key missing");
      if (typeof n.p2c != "number")
        throw new w('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      let s = i?.maxPBES2Count || 1e4;
      if (n.p2c > s)
        throw new w('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof n.p2s != "string")
        throw new w('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      let a;
      try {
        a = W(n.p2s);
      } catch {
        throw new w("Failed to base64url decode the p2s");
      }
      return mi(e, t, r, n.p2c, a);
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      if (r === void 0)
        throw new w("JWE Encrypted Key missing");
      return ft(e, t, r);
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      if (r === void 0)
        throw new w("JWE Encrypted Key missing");
      if (typeof n.iv != "string")
        throw new w('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof n.tag != "string")
        throw new w('JOSE Header "tag" (Authentication Tag) missing or invalid');
      let s;
      try {
        s = W(n.iv);
      } catch {
        throw new w("Failed to base64url decode the iv");
      }
      let a;
      try {
        a = W(n.tag);
      } catch {
        throw new w("Failed to base64url decode the tag");
      }
      return Ti(e, t, r, s, a);
    }
    default:
      throw new E('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
}
o(Rc, "decryptKeyManagement");
var Ri = Rc;

// node_modules/jose/dist/browser/lib/validate_crit.js
function Cc(e, t, r, n, i) {
  if (i.crit !== void 0 && n?.crit === void 0)
    throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!n || n.crit === void 0)
    return /* @__PURE__ */ new Set();
  if (!Array.isArray(n.crit) || n.crit.length === 0 || n.crit.some((a) => typeof a != "string" || a.length === 0))
    throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let s;
  r !== void 0 ? s = new Map([...Object.entries(r), ...t.entries()]) : s = t;
  for (let a of n.crit) {
    if (!s.has(a))
      throw new E(`Extension Header Parameter "${a}" is not recognized`);
    if (i[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" is missing`);
    if (s.get(a) && n[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return new Set(n.crit);
}
o(Cc, "validateCrit");
var Ge = Cc;

// node_modules/jose/dist/browser/lib/validate_algorithms.js
var Pc = /* @__PURE__ */ o((e, t) => {
  if (t !== void 0 && (!Array.isArray(t) || t.some((r) => typeof r != "string")))
    throw new TypeError(`"${e}" option must be an array of strings`);
  if (t)
    return new Set(t);
}, "validateAlgorithms"), Tn = Pc;

// node_modules/jose/dist/browser/jwe/flattened/decrypt.js
async function Ci(e, t, r) {
  if (!z(e))
    throw new w("Flattened JWE must be an object");
  if (e.protected === void 0 && e.header === void 0 && e.unprotected === void 0)
    throw new w("JOSE Header missing");
  if (e.iv !== void 0 && typeof e.iv != "string")
    throw new w("JWE Initialization Vector incorrect type");
  if (typeof e.ciphertext != "string")
    throw new w("JWE Ciphertext missing or incorrect type");
  if (e.tag !== void 0 && typeof e.tag != "string")
    throw new w("JWE Authentication Tag incorrect type");
  if (e.protected !== void 0 && typeof e.protected != "string")
    throw new w("JWE Protected Header incorrect type");
  if (e.encrypted_key !== void 0 && typeof e.encrypted_key != "string")
    throw new w("JWE Encrypted Key incorrect type");
  if (e.aad !== void 0 && typeof e.aad != "string")
    throw new w("JWE AAD incorrect type");
  if (e.header !== void 0 && !z(e.header))
    throw new w("JWE Shared Unprotected Header incorrect type");
  if (e.unprotected !== void 0 && !z(e.unprotected))
    throw new w("JWE Per-Recipient Unprotected Header incorrect type");
  let n;
  if (e.protected)
    try {
      let k = W(e.protected);
      n = JSON.parse(Q.decode(k));
    } catch {
      throw new w("JWE Protected Header is invalid");
    }
  if (!Je(n, e.header, e.unprotected))
    throw new w("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
  let i = {
    ...n,
    ...e.header,
    ...e.unprotected
  };
  if (Ge(w, /* @__PURE__ */ new Map(), r?.crit, n, i), i.zip !== void 0)
    throw new E('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
  let { alg: s, enc: a } = i;
  if (typeof s != "string" || !s)
    throw new w("missing JWE Algorithm (alg) in JWE Header");
  if (typeof a != "string" || !a)
    throw new w("missing JWE Encryption Algorithm (enc) in JWE Header");
  let c = r && Tn("keyManagementAlgorithms", r.keyManagementAlgorithms), d = r && Tn("contentEncryptionAlgorithms", r.contentEncryptionAlgorithms);
  if (c && !c.has(s) || !c && s.startsWith("PBES2"))
    throw new We('"alg" (Algorithm) Header Parameter value not allowed');
  if (d && !d.has(a))
    throw new We('"enc" (Encryption Algorithm) Header Parameter value not allowed');
  let u;
  if (e.encrypted_key !== void 0)
    try {
      u = W(e.encrypted_key);
    } catch {
      throw new w("Failed to base64url decode the encrypted_key");
    }
  let f = !1;
  typeof t == "function" && (t = await t(n, e), f = !0);
  let l;
  try {
    l = await Ri(s, t, u, i, r);
  } catch (k) {
    if (k instanceof TypeError || k instanceof w || k instanceof E)
      throw k;
    l = he(a);
  }
  let y, p;
  if (e.iv !== void 0)
    try {
      y = W(e.iv);
    } catch {
      throw new w("Failed to base64url decode the iv");
    }
  if (e.tag !== void 0)
    try {
      p = W(e.tag);
    } catch {
      throw new w("Failed to base64url decode the tag");
    }
  let m = U.encode(e.protected ?? ""), S;
  e.aad !== void 0 ? S = j(m, U.encode("."), U.encode(e.aad)) : S = m;
  let I;
  try {
    I = W(e.ciphertext);
  } catch {
    throw new w("Failed to base64url decode the ciphertext");
  }
  let b = { plaintext: await cr(a, l, I, y, p, S) };
  if (e.protected !== void 0 && (b.protectedHeader = n), e.aad !== void 0)
    try {
      b.additionalAuthenticatedData = W(e.aad);
    } catch {
      throw new w("Failed to base64url decode the aad");
    }
  return e.unprotected !== void 0 && (b.sharedUnprotectedHeader = e.unprotected), e.header !== void 0 && (b.unprotectedHeader = e.header), f ? { ...b, key: t } : b;
}
o(Ci, "flattenedDecrypt");

// node_modules/jose/dist/browser/jwe/compact/decrypt.js
async function Pi(e, t, r) {
  if (e instanceof Uint8Array && (e = Q.decode(e)), typeof e != "string")
    throw new w("Compact JWE must be a string or Uint8Array");
  let { 0: n, 1: i, 2: s, 3: a, 4: c, length: d } = e.split(".");
  if (d !== 5)
    throw new w("Invalid Compact JWE");
  let u = await Ci({
    ciphertext: a,
    iv: s || void 0,
    protected: n,
    tag: c || void 0,
    encrypted_key: i || void 0
  }, t, r), f = { plaintext: u.plaintext, protectedHeader: u.protectedHeader };
  return typeof t == "function" ? { ...f, key: u.key } : f;
}
o(Pi, "compactDecrypt");

// node_modules/jose/dist/browser/lib/private_symbols.js
var Ui = Symbol();

// node_modules/jose/dist/browser/runtime/key_to_jwk.js
var Uc = /* @__PURE__ */ o(async (e) => {
  if (e instanceof Uint8Array)
    return {
      kty: "oct",
      k: O(e)
    };
  if (!K(e))
    throw new TypeError(N(e, ...H, "Uint8Array"));
  if (!e.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  let { ext: t, key_ops: r, alg: n, use: i, ...s } = await _.subtle.exportKey("jwk", e);
  return s;
}, "keyToJWK"), Oi = Uc;

// node_modules/jose/dist/browser/key/export.js
async function Li(e) {
  return Oi(e);
}
o(Li, "exportJWK");

// node_modules/jose/dist/browser/lib/encrypt_key_management.js
async function Oc(e, t, r, n, i = {}) {
  let s, a, c;
  switch (pr(e, r, "encrypt"), r = await Ie.normalizePublicKey?.(r, e) || r, e) {
    case "dir": {
      c = r;
      break;
    }
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      if (!dr(r))
        throw new E("ECDH with the provided key is not allowed or not supported by your javascript runtime");
      let { apu: d, apv: u } = i, { epk: f } = i;
      f || (f = (await li(r)).privateKey);
      let { x: l, y, crv: p, kty: m } = await Li(f), S = await ur(r, f, e === "ECDH-ES" ? t : e, e === "ECDH-ES" ? ht(t) : parseInt(e.slice(-5, -2), 10), d, u);
      if (a = { epk: { x: l, crv: p, kty: m } }, m === "EC" && (a.epk.y = y), d && (a.apu = O(d)), u && (a.apv = O(u)), e === "ECDH-ES") {
        c = S;
        break;
      }
      c = n || he(t);
      let I = e.slice(-6);
      s = await lt(I, S, c);
      break;
    }
    case "RSA1_5":
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512": {
      c = n || he(t), s = await yi(e, r, c);
      break;
    }
    case "PBES2-HS256+A128KW":
    case "PBES2-HS384+A192KW":
    case "PBES2-HS512+A256KW": {
      c = n || he(t);
      let { p2c: d, p2s: u } = i;
      ({ encryptedKey: s, ...a } = await hi(e, r, c, d, u));
      break;
    }
    case "A128KW":
    case "A192KW":
    case "A256KW": {
      c = n || he(t), s = await lt(e, r, c);
      break;
    }
    case "A128GCMKW":
    case "A192GCMKW":
    case "A256GCMKW": {
      c = n || he(t);
      let { iv: d } = i;
      ({ encryptedKey: s, ...a } = await Ii(e, r, c, d));
      break;
    }
    default:
      throw new E('Invalid or unsupported "alg" (JWE Algorithm) header value');
  }
  return { cek: c, encryptedKey: s, parameters: a };
}
o(Oc, "encryptKeyManagement");
var Hi = Oc;

// node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var mr = class {
  static {
    o(this, "FlattenedEncrypt");
  }
  constructor(t) {
    if (!(t instanceof Uint8Array))
      throw new TypeError("plaintext must be an instance of Uint8Array");
    this._plaintext = t;
  }
  setKeyManagementParameters(t) {
    if (this._keyManagementParameters)
      throw new TypeError("setKeyManagementParameters can only be called once");
    return this._keyManagementParameters = t, this;
  }
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setSharedUnprotectedHeader(t) {
    if (this._sharedUnprotectedHeader)
      throw new TypeError("setSharedUnprotectedHeader can only be called once");
    return this._sharedUnprotectedHeader = t, this;
  }
  setUnprotectedHeader(t) {
    if (this._unprotectedHeader)
      throw new TypeError("setUnprotectedHeader can only be called once");
    return this._unprotectedHeader = t, this;
  }
  setAdditionalAuthenticatedData(t) {
    return this._aad = t, this;
  }
  setContentEncryptionKey(t) {
    if (this._cek)
      throw new TypeError("setContentEncryptionKey can only be called once");
    return this._cek = t, this;
  }
  setInitializationVector(t) {
    if (this._iv)
      throw new TypeError("setInitializationVector can only be called once");
    return this._iv = t, this;
  }
  async encrypt(t, r) {
    if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader)
      throw new w("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
    if (!Je(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader))
      throw new w("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
    let n = {
      ...this._protectedHeader,
      ...this._unprotectedHeader,
      ...this._sharedUnprotectedHeader
    };
    if (Ge(w, /* @__PURE__ */ new Map(), r?.crit, this._protectedHeader, n), n.zip !== void 0)
      throw new E('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    let { alg: i, enc: s } = n;
    if (typeof i != "string" || !i)
      throw new w('JWE "alg" (Algorithm) Header Parameter missing or invalid');
    if (typeof s != "string" || !s)
      throw new w('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
    let a;
    if (this._cek && (i === "dir" || i === "ECDH-ES"))
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${i}`);
    let c;
    {
      let S;
      ({ cek: c, encryptedKey: a, parameters: S } = await Hi(i, s, t, this._cek, this._keyManagementParameters)), S && (r && Ui in r ? this._unprotectedHeader ? this._unprotectedHeader = { ...this._unprotectedHeader, ...S } : this.setUnprotectedHeader(S) : this._protectedHeader ? this._protectedHeader = { ...this._protectedHeader, ...S } : this.setProtectedHeader(S));
    }
    let d, u, f;
    this._protectedHeader ? u = U.encode(O(JSON.stringify(this._protectedHeader))) : u = U.encode(""), this._aad ? (f = O(this._aad), d = j(u, U.encode("."), U.encode(f))) : d = u;
    let { ciphertext: l, tag: y, iv: p } = await hr(s, this._plaintext, c, this._iv, d), m = {
      ciphertext: O(l)
    };
    return p && (m.iv = O(p)), y && (m.tag = O(y)), a && (m.encrypted_key = O(a)), f && (m.aad = f), this._protectedHeader && (m.protected = Q.decode(u)), this._sharedUnprotectedHeader && (m.unprotected = this._sharedUnprotectedHeader), this._unprotectedHeader && (m.header = this._unprotectedHeader), m;
  }
};

// node_modules/jose/dist/browser/runtime/subtle_dsa.js
function Rn(e, t) {
  let r = `SHA-${e.slice(-3)}`;
  switch (e) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: r, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: r, name: "RSA-PSS", saltLength: e.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: r, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: r, name: "ECDSA", namedCurve: t.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: t.name };
    default:
      throw new E(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
o(Rn, "subtleDsa");

// node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
async function Cn(e, t, r) {
  if (r === "sign" && (t = await Ie.normalizePrivateKey(t, e)), r === "verify" && (t = await Ie.normalizePublicKey(t, e)), K(t))
    return ai(t, e, r), t;
  if (t instanceof Uint8Array) {
    if (!e.startsWith("HS"))
      throw new TypeError(N(t, ...H));
    return _.subtle.importKey("raw", t, { hash: `SHA-${e.slice(-3)}`, name: "HMAC" }, !1, [r]);
  }
  throw new TypeError(N(t, ...H, "Uint8Array", "JSON Web Key"));
}
o(Cn, "getCryptoKey");

// node_modules/jose/dist/browser/lib/epoch.js
var se = /* @__PURE__ */ o((e) => Math.floor(e.getTime() / 1e3), "default");

// node_modules/jose/dist/browser/lib/secs.js
var Lc = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, Te = /* @__PURE__ */ o((e) => {
  let t = Lc.exec(e);
  if (!t || t[4] && t[1])
    throw new TypeError("Invalid time period format");
  let r = parseFloat(t[2]), n = t[3].toLowerCase(), i;
  switch (n) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      i = Math.round(r);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      i = Math.round(r * 60);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      i = Math.round(r * 3600);
      break;
    case "day":
    case "days":
    case "d":
      i = Math.round(r * 86400);
      break;
    case "week":
    case "weeks":
    case "w":
      i = Math.round(r * 604800);
      break;
    default:
      i = Math.round(r * 31557600);
      break;
  }
  return t[1] === "-" || t[4] === "ago" ? -i : i;
}, "default");

// node_modules/jose/dist/browser/lib/jwt_claims_set.js
var Di = /* @__PURE__ */ o((e) => e.toLowerCase().replace(/^application\//, ""), "normalizeTyp"), Hc = /* @__PURE__ */ o((e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some(Set.prototype.has.bind(new Set(e))) : !1, "checkAudiencePresence"), Ki = /* @__PURE__ */ o((e, t, r = {}) => {
  let n;
  try {
    n = JSON.parse(Q.decode(t));
  } catch {
  }
  if (!z(n))
    throw new Ee("JWT Claims Set must be a top-level JSON object");
  let { typ: i } = r;
  if (i && (typeof e.typ != "string" || Di(e.typ) !== Di(i)))
    throw new B('unexpected "typ" JWT header value', n, "typ", "check_failed");
  let { requiredClaims: s = [], issuer: a, subject: c, audience: d, maxTokenAge: u } = r, f = [...s];
  u !== void 0 && f.push("iat"), d !== void 0 && f.push("aud"), c !== void 0 && f.push("sub"), a !== void 0 && f.push("iss");
  for (let m of new Set(f.reverse()))
    if (!(m in n))
      throw new B(`missing required "${m}" claim`, n, m, "missing");
  if (a && !(Array.isArray(a) ? a : [a]).includes(n.iss))
    throw new B('unexpected "iss" claim value', n, "iss", "check_failed");
  if (c && n.sub !== c)
    throw new B('unexpected "sub" claim value', n, "sub", "check_failed");
  if (d && !Hc(n.aud, typeof d == "string" ? [d] : d))
    throw new B('unexpected "aud" claim value', n, "aud", "check_failed");
  let l;
  switch (typeof r.clockTolerance) {
    case "string":
      l = Te(r.clockTolerance);
      break;
    case "number":
      l = r.clockTolerance;
      break;
    case "undefined":
      l = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  let { currentDate: y } = r, p = se(y || /* @__PURE__ */ new Date());
  if ((n.iat !== void 0 || u) && typeof n.iat != "number")
    throw new B('"iat" claim must be a number', n, "iat", "invalid");
  if (n.nbf !== void 0) {
    if (typeof n.nbf != "number")
      throw new B('"nbf" claim must be a number', n, "nbf", "invalid");
    if (n.nbf > p + l)
      throw new B('"nbf" claim timestamp check failed', n, "nbf", "check_failed");
  }
  if (n.exp !== void 0) {
    if (typeof n.exp != "number")
      throw new B('"exp" claim must be a number', n, "exp", "invalid");
    if (n.exp <= p - l)
      throw new Ne('"exp" claim timestamp check failed', n, "exp", "check_failed");
  }
  if (u) {
    let m = p - n.iat, S = typeof u == "number" ? u : Te(u);
    if (m - l > S)
      throw new Ne('"iat" claim timestamp check failed (too far in the past)', n, "iat", "check_failed");
    if (m < 0 - l)
      throw new B('"iat" claim timestamp check failed (it should be in the past)', n, "iat", "check_failed");
  }
  return n;
}, "default");

// node_modules/jose/dist/browser/jwt/decrypt.js
async function Pn(e, t, r) {
  let n = await Pi(e, t, r), i = Ki(n.protectedHeader, n.plaintext, r), { protectedHeader: s } = n;
  if (s.iss !== void 0 && s.iss !== i.iss)
    throw new B('replicated "iss" claim header parameter mismatch', i, "iss", "mismatch");
  if (s.sub !== void 0 && s.sub !== i.sub)
    throw new B('replicated "sub" claim header parameter mismatch', i, "sub", "mismatch");
  if (s.aud !== void 0 && JSON.stringify(s.aud) !== JSON.stringify(i.aud))
    throw new B('replicated "aud" claim header parameter mismatch', i, "aud", "mismatch");
  let a = { payload: i, protectedHeader: s };
  return typeof t == "function" ? { ...a, key: n.key } : a;
}
o(Pn, "jwtDecrypt");

// node_modules/jose/dist/browser/jwe/compact/encrypt.js
var yr = class {
  static {
    o(this, "CompactEncrypt");
  }
  constructor(t) {
    this._flattened = new mr(t);
  }
  setContentEncryptionKey(t) {
    return this._flattened.setContentEncryptionKey(t), this;
  }
  setInitializationVector(t) {
    return this._flattened.setInitializationVector(t), this;
  }
  setProtectedHeader(t) {
    return this._flattened.setProtectedHeader(t), this;
  }
  setKeyManagementParameters(t) {
    return this._flattened.setKeyManagementParameters(t), this;
  }
  async encrypt(t, r) {
    let n = await this._flattened.encrypt(t, r);
    return [n.protected, n.encrypted_key, n.iv, n.ciphertext, n.tag].join(".");
  }
};

// node_modules/jose/dist/browser/runtime/sign.js
var Dc = /* @__PURE__ */ o(async (e, t, r) => {
  let n = await Cn(e, t, "sign");
  pt(e, n);
  let i = await _.subtle.sign(Rn(e, n.algorithm), n, r);
  return new Uint8Array(i);
}, "sign"), Ni = Dc;

// node_modules/jose/dist/browser/jws/flattened/sign.js
var wr = class {
  static {
    o(this, "FlattenedSign");
  }
  constructor(t) {
    if (!(t instanceof Uint8Array))
      throw new TypeError("payload must be an instance of Uint8Array");
    this._payload = t;
  }
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setUnprotectedHeader(t) {
    if (this._unprotectedHeader)
      throw new TypeError("setUnprotectedHeader can only be called once");
    return this._unprotectedHeader = t, this;
  }
  async sign(t, r) {
    if (!this._protectedHeader && !this._unprotectedHeader)
      throw new ue("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    if (!Je(this._protectedHeader, this._unprotectedHeader))
      throw new ue("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    let n = {
      ...this._protectedHeader,
      ...this._unprotectedHeader
    }, i = Ge(ue, /* @__PURE__ */ new Map([["b64", !0]]), r?.crit, this._protectedHeader, n), s = !0;
    if (i.has("b64") && (s = this._protectedHeader.b64, typeof s != "boolean"))
      throw new ue('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    let { alg: a } = n;
    if (typeof a != "string" || !a)
      throw new ue('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    ki(a, t, "sign");
    let c = this._payload;
    s && (c = U.encode(O(c)));
    let d;
    this._protectedHeader ? d = U.encode(O(JSON.stringify(this._protectedHeader))) : d = U.encode("");
    let u = j(d, U.encode("."), c), f = await Ni(a, t, u), l = {
      signature: O(f),
      payload: ""
    };
    return s && (l.payload = Q.decode(c)), this._unprotectedHeader && (l.header = this._unprotectedHeader), this._protectedHeader && (l.protected = Q.decode(d)), l;
  }
};

// node_modules/jose/dist/browser/jws/compact/sign.js
var gr = class {
  static {
    o(this, "CompactSign");
  }
  constructor(t) {
    this._flattened = new wr(t);
  }
  setProtectedHeader(t) {
    return this._flattened.setProtectedHeader(t), this;
  }
  async sign(t, r) {
    let n = await this._flattened.sign(t, r);
    if (n.payload === void 0)
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    return `${n.protected}.${n.payload}.${n.signature}`;
  }
};

// node_modules/jose/dist/browser/jwt/produce.js
function Re(e, t) {
  if (!Number.isFinite(t))
    throw new TypeError(`Invalid ${e} input`);
  return t;
}
o(Re, "validateInput");
var qe = class {
  static {
    o(this, "ProduceJWT");
  }
  constructor(t = {}) {
    if (!z(t))
      throw new TypeError("JWT Claims Set MUST be an object");
    this._payload = t;
  }
  setIssuer(t) {
    return this._payload = { ...this._payload, iss: t }, this;
  }
  setSubject(t) {
    return this._payload = { ...this._payload, sub: t }, this;
  }
  setAudience(t) {
    return this._payload = { ...this._payload, aud: t }, this;
  }
  setJti(t) {
    return this._payload = { ...this._payload, jti: t }, this;
  }
  setNotBefore(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, nbf: Re("setNotBefore", t) } : t instanceof Date ? this._payload = { ...this._payload, nbf: Re("setNotBefore", se(t)) } : this._payload = { ...this._payload, nbf: se(/* @__PURE__ */ new Date()) + Te(t) }, this;
  }
  setExpirationTime(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, exp: Re("setExpirationTime", t) } : t instanceof Date ? this._payload = { ...this._payload, exp: Re("setExpirationTime", se(t)) } : this._payload = { ...this._payload, exp: se(/* @__PURE__ */ new Date()) + Te(t) }, this;
  }
  setIssuedAt(t) {
    return typeof t > "u" ? this._payload = { ...this._payload, iat: se(/* @__PURE__ */ new Date()) } : t instanceof Date ? this._payload = { ...this._payload, iat: Re("setIssuedAt", se(t)) } : typeof t == "string" ? this._payload = {
      ...this._payload,
      iat: Re("setIssuedAt", se(/* @__PURE__ */ new Date()) + Te(t))
    } : this._payload = { ...this._payload, iat: Re("setIssuedAt", t) }, this;
  }
};

// node_modules/jose/dist/browser/jwt/sign.js
var mt = class extends qe {
  static {
    o(this, "SignJWT");
  }
  setProtectedHeader(t) {
    return this._protectedHeader = t, this;
  }
  async sign(t, r) {
    let n = new gr(U.encode(JSON.stringify(this._payload)));
    if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1)
      throw new Ee("JWTs MUST NOT use unencoded payload");
    return n.sign(t, r);
  }
};

// node_modules/jose/dist/browser/jwt/encrypt.js
var yt = class extends qe {
  static {
    o(this, "EncryptJWT");
  }
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setKeyManagementParameters(t) {
    if (this._keyManagementParameters)
      throw new TypeError("setKeyManagementParameters can only be called once");
    return this._keyManagementParameters = t, this;
  }
  setContentEncryptionKey(t) {
    if (this._cek)
      throw new TypeError("setContentEncryptionKey can only be called once");
    return this._cek = t, this;
  }
  setInitializationVector(t) {
    if (this._iv)
      throw new TypeError("setInitializationVector can only be called once");
    return this._iv = t, this;
  }
  replicateIssuerAsHeader() {
    return this._replicateIssuerAsHeader = !0, this;
  }
  replicateSubjectAsHeader() {
    return this._replicateSubjectAsHeader = !0, this;
  }
  replicateAudienceAsHeader() {
    return this._replicateAudienceAsHeader = !0, this;
  }
  async encrypt(t, r) {
    let n = new yr(U.encode(JSON.stringify(this._payload)));
    return this._replicateIssuerAsHeader && (this._protectedHeader = { ...this._protectedHeader, iss: this._payload.iss }), this._replicateSubjectAsHeader && (this._protectedHeader = { ...this._protectedHeader, sub: this._payload.sub }), this._replicateAudienceAsHeader && (this._protectedHeader = { ...this._protectedHeader, aud: this._payload.aud }), n.setProtectedHeader(this._protectedHeader), this._iv && n.setInitializationVector(this._iv), this._cek && n.setContentEncryptionKey(this._cek), this._keyManagementParameters && n.setKeyManagementParameters(this._keyManagementParameters), n.encrypt(t, r);
  }
};

// node_modules/jose/dist/browser/jwk/thumbprint.js
var ye = /* @__PURE__ */ o((e, t) => {
  if (typeof e != "string" || !e)
    throw new dt(`${t} missing or invalid`);
}, "check");
async function br(e, t) {
  if (!z(e))
    throw new TypeError("JWK must be an object");
  if (t ?? (t = "sha256"), t !== "sha256" && t !== "sha384" && t !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let r;
  switch (e.kty) {
    case "EC":
      ye(e.crv, '"crv" (Curve) Parameter'), ye(e.x, '"x" (X Coordinate) Parameter'), ye(e.y, '"y" (Y Coordinate) Parameter'), r = { crv: e.crv, kty: e.kty, x: e.x, y: e.y };
      break;
    case "OKP":
      ye(e.crv, '"crv" (Subtype of Key Pair) Parameter'), ye(e.x, '"x" (Public Key) Parameter'), r = { crv: e.crv, kty: e.kty, x: e.x };
      break;
    case "RSA":
      ye(e.e, '"e" (Exponent) Parameter'), ye(e.n, '"n" (Modulus) Parameter'), r = { e: e.e, kty: e.kty, n: e.n };
      break;
    case "oct":
      ye(e.k, '"k" (Key Value) Parameter'), r = { k: e.k, kty: e.kty };
      break;
    default:
      throw new E('"kty" (Key Type) Parameter missing or unsupported');
  }
  let n = U.encode(JSON.stringify(r));
  return O(await tr(t, n));
}
o(br, "calculateJwkThumbprint");

// node_modules/jose/dist/browser/util/base64url.js
var wt = {};
Wo(wt, {
  decode: () => Nc,
  encode: () => Kc
});
var Kc = O, Nc = W;

// node_modules/@auth/core/lib/vendored/cookie.js
var gt = {};
Wo(gt, {
  parse: () => jc,
  serialize: () => Vc
});
var Wc = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, $c = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, Bc = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Jc = /^[\u0020-\u003A\u003D-\u007E]*$/, Mc = Object.prototype.toString, zc = /* @__PURE__ */ (() => {
  let e = /* @__PURE__ */ o(function() {
  }, "C");
  return e.prototype = /* @__PURE__ */ Object.create(null), e;
})();
function jc(e, t) {
  let r = new zc(), n = e.length;
  if (n < 2)
    return r;
  let i = t?.decode || Fc, s = 0;
  do {
    let a = e.indexOf("=", s);
    if (a === -1)
      break;
    let c = e.indexOf(";", s), d = c === -1 ? n : c;
    if (a > d) {
      s = e.lastIndexOf(";", a - 1) + 1;
      continue;
    }
    let u = Wi(e, s, a), f = $i(e, a, u), l = e.slice(u, f);
    if (r[l] === void 0) {
      let y = Wi(e, a + 1, d), p = $i(e, d, y), m = i(e.slice(y, p));
      r[l] = m;
    }
    s = d + 1;
  } while (s < n);
  return r;
}
o(jc, "parse");
function Wi(e, t, r) {
  do {
    let n = e.charCodeAt(t);
    if (n !== 32 && n !== 9)
      return t;
  } while (++t < r);
  return r;
}
o(Wi, "startIndex");
function $i(e, t, r) {
  for (; t > r; ) {
    let n = e.charCodeAt(--t);
    if (n !== 32 && n !== 9)
      return t + 1;
  }
  return r;
}
o($i, "endIndex");
function Vc(e, t, r) {
  let n = r?.encode || encodeURIComponent;
  if (!Wc.test(e))
    throw new TypeError(`argument name is invalid: ${e}`);
  let i = n(t);
  if (!$c.test(i))
    throw new TypeError(`argument val is invalid: ${t}`);
  let s = e + "=" + i;
  if (!r)
    return s;
  if (r.maxAge !== void 0) {
    if (!Number.isInteger(r.maxAge))
      throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);
    s += "; Max-Age=" + r.maxAge;
  }
  if (r.domain) {
    if (!Bc.test(r.domain))
      throw new TypeError(`option domain is invalid: ${r.domain}`);
    s += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!Jc.test(r.path))
      throw new TypeError(`option path is invalid: ${r.path}`);
    s += "; Path=" + r.path;
  }
  if (r.expires) {
    if (!Gc(r.expires) || !Number.isFinite(r.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${r.expires}`);
    s += "; Expires=" + r.expires.toUTCString();
  }
  if (r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.partitioned && (s += "; Partitioned"), r.priority)
    switch (typeof r.priority == "string" ? r.priority.toLowerCase() : void 0) {
      case "low":
        s += "; Priority=Low";
        break;
      case "medium":
        s += "; Priority=Medium";
        break;
      case "high":
        s += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${r.priority}`);
    }
  if (r.sameSite)
    switch (typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite) {
      case !0:
      case "strict":
        s += "; SameSite=Strict";
        break;
      case "lax":
        s += "; SameSite=Lax";
        break;
      case "none":
        s += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${r.sameSite}`);
    }
  return s;
}
o(Vc, "serialize");
function Fc(e) {
  if (e.indexOf("%") === -1)
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
o(Fc, "decode");
function Gc(e) {
  return Mc.call(e) === "[object Date]";
}
o(Gc, "isDate");

// node_modules/@auth/core/jwt.js
var { parse: Xy } = gt, Xc = 720 * 60 * 60, Zc = /* @__PURE__ */ o(() => Date.now() / 1e3 | 0, "now"), Bi = "dir", Un = "A256CBC-HS512";
async function _r(e) {
  let { token: t = {}, secret: r, maxAge: n = Xc, salt: i } = e, s = Array.isArray(r) ? r : [r], a = await Ji(Un, s[0], i), c = await br({ kty: "oct", k: wt.encode(a) }, `sha${a.byteLength << 3}`);
  return await new yt(t).setProtectedHeader({ alg: Bi, enc: Un, kid: c }).setIssuedAt().setExpirationTime(Zc() + n).setJti(crypto.randomUUID()).encrypt(a);
}
o(_r, "encode");
async function xr(e) {
  let { token: t, secret: r, salt: n } = e, i = Array.isArray(r) ? r : [r];
  if (!t)
    return null;
  let { payload: s } = await Pn(t, async ({ kid: a, enc: c }) => {
    for (let d of i) {
      let u = await Ji(c, d, n);
      if (a === void 0)
        return u;
      let f = await br({ kty: "oct", k: wt.encode(u) }, `sha${u.byteLength << 3}`);
      if (a === f)
        return u;
    }
    throw new Error("no matching decryption secret");
  }, {
    clockTolerance: 15,
    keyManagementAlgorithms: [Bi],
    contentEncryptionAlgorithms: [Un, "A256GCM"]
  });
  return s;
}
o(xr, "decode");
async function Ji(e, t, r) {
  let n;
  switch (e) {
    case "A256CBC-HS512":
      n = 64;
      break;
    case "A256GCM":
      n = 32;
      break;
    default:
      throw new Error("Unsupported JWT Content Encryption Algorithm");
  }
  return await ti("sha256", t, r, `Auth.js Generated Encryption Key (${r})`, n);
}
o(Ji, "getDerivedEncryptionKey");

// node_modules/@auth/core/lib/utils/logger.js
var On = "\x1B[31m", Yc = "\x1B[33m", eu = "\x1B[90m", bt = "\x1B[0m", tu = {
  error(e) {
    let t = e instanceof T ? e.type : e.name;
    if (console.error(`${On}[auth][error]${bt} ${t}: ${e.message}`), e.cause && typeof e.cause == "object" && "err" in e.cause && e.cause.err instanceof Error) {
      let { err: r, ...n } = e.cause;
      console.error(`${On}[auth][cause]${bt}:`, r.stack), n && console.error(`${On}[auth][details]${bt}:`, JSON.stringify(n, null, 2));
    } else e.stack && console.error(e.stack.replace(/.*/, "").substring(1));
  },
  warn(e) {
    let t = `https://warnings.authjs.dev#${e}`;
    console.warn(`${Yc}[auth][warn][${e}]${bt}`, `Read more: ${t}`);
  },
  debug(e, t) {
    console.log(`${eu}[auth][debug]:${bt} ${e}`, JSON.stringify(t, null, 2));
  }
};
function _t(e) {
  let t = {
    ...tu
  };
  return e.debug || (t.debug = () => {
  }), e.logger?.error && (t.error = e.logger.error), e.logger?.warn && (t.warn = e.logger.warn), e.logger?.debug && (t.debug = e.logger.debug), e.logger ?? (e.logger = t), t;
}
o(_t, "setLogger");

// node_modules/@auth/core/lib/utils/web.js
var { parse: cw, serialize: uw } = gt;

// node_modules/@auth/core/lib/symbols.js
var Ln = Symbol("skip-csrf-check"), ji = Symbol("return-type-raw"), we = Symbol("custom-fetch"), nu = Symbol("conform-internal");

// node_modules/preact/dist/preact.module.js
var Xi, D, Zi, iu, Ce, Vi, Qi, Dn, $n, Kn, Nn, su, Wn = {}, Yi = [], au = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Bn = Array.isArray;
function ge(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
o(ge, "d");
function es(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
o(es, "w");
function Hn(e, t, r, n, i) {
  var s = { type: e, props: t, key: r, ref: n, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++Zi, __i: -1, __u: 0 };
  return i == null && D.vnode != null && D.vnode(s), s;
}
o(Hn, "g");
function Pe(e) {
  return e.children;
}
o(Pe, "b");
function vr(e, t) {
  this.props = e, this.context = t;
}
o(vr, "k");
function Xe(e, t) {
  if (t == null) return e.__ ? Xe(e.__, e.__i + 1) : null;
  for (var r; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) return r.__e;
  return typeof e.type == "function" ? Xe(e) : null;
}
o(Xe, "x");
function ts(e) {
  var t, r;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) {
      e.__e = e.__c.base = r.__e;
      break;
    }
    return ts(e);
  }
}
o(ts, "C");
function Fi(e) {
  (!e.__d && (e.__d = !0) && Ce.push(e) && !Ar.__r++ || Vi !== D.debounceRendering) && ((Vi = D.debounceRendering) || Qi)(Ar);
}
o(Fi, "S");
function Ar() {
  var e, t, r, n, i, s, a, c;
  for (Ce.sort(Dn); e = Ce.shift(); ) e.__d && (t = Ce.length, n = void 0, s = (i = (r = e).__v).__e, a = [], c = [], r.__P && ((n = ge({}, i)).__v = i.__v + 1, D.vnode && D.vnode(n), os(r.__P, n, i, r.__n, r.__P.namespaceURI, 32 & i.__u ? [s] : null, a, s ?? Xe(i), !!(32 & i.__u), c), n.__v = i.__v, n.__.__k[n.__i] = n, du(a, n, c), n.__e != s && ts(n)), Ce.length > t && Ce.sort(Dn));
  Ar.__r = 0;
}
o(Ar, "M");
function rs(e, t, r, n, i, s, a, c, d, u, f) {
  var l, y, p, m, S, I = n && n.__k || Yi, A = t.length;
  for (r.__d = d, cu(r, t, I), d = r.__d, l = 0; l < A; l++) (p = r.__k[l]) != null && (y = p.__i === -1 ? Wn : I[p.__i] || Wn, p.__i = l, os(e, p, y, i, s, a, c, d, u, f), m = p.__e, p.ref && y.ref != p.ref && (y.ref && Jn(y.ref, null, p), f.push(p.ref, p.__c || m, p)), S == null && m != null && (S = m), 65536 & p.__u || y.__k === p.__k ? d = ns(p, d, e) : typeof p.type == "function" && p.__d !== void 0 ? d = p.__d : m && (d = m.nextSibling), p.__d = void 0, p.__u &= -196609);
  r.__d = d, r.__e = S;
}
o(rs, "P");
function cu(e, t, r) {
  var n, i, s, a, c, d = t.length, u = r.length, f = u, l = 0;
  for (e.__k = [], n = 0; n < d; n++) (i = t[n]) != null && typeof i != "boolean" && typeof i != "function" ? (a = n + l, (i = e.__k[n] = typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? Hn(null, i, null, null, null) : Bn(i) ? Hn(Pe, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? Hn(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = e, i.__b = e.__b + 1, s = null, (c = i.__i = uu(i, r, a, f)) !== -1 && (f--, (s = r[c]) && (s.__u |= 131072)), s == null || s.__v === null ? (c == -1 && l--, typeof i.type != "function" && (i.__u |= 65536)) : c !== a && (c == a - 1 ? l-- : c == a + 1 ? l++ : (c > a ? l-- : l++, i.__u |= 65536))) : i = e.__k[n] = null;
  if (f) for (n = 0; n < u; n++) (s = r[n]) != null && (131072 & s.__u) == 0 && (s.__e == e.__d && (e.__d = Xe(s)), is(s, s));
}
o(cu, "$");
function ns(e, t, r) {
  var n, i;
  if (typeof e.type == "function") {
    for (n = e.__k, i = 0; n && i < n.length; i++) n[i] && (n[i].__ = e, t = ns(n[i], t, r));
    return t;
  }
  e.__e != t && (t && e.type && !r.contains(t) && (t = Xe(e)), r.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
o(ns, "I");
function uu(e, t, r, n) {
  var i = e.key, s = e.type, a = r - 1, c = r + 1, d = t[r];
  if (d === null || d && i == d.key && s === d.type && (131072 & d.__u) == 0) return r;
  if (n > (d != null && (131072 & d.__u) == 0 ? 1 : 0)) for (; a >= 0 || c < t.length; ) {
    if (a >= 0) {
      if ((d = t[a]) && (131072 & d.__u) == 0 && i == d.key && s === d.type) return a;
      a--;
    }
    if (c < t.length) {
      if ((d = t[c]) && (131072 & d.__u) == 0 && i == d.key && s === d.type) return c;
      c++;
    }
  }
  return -1;
}
o(uu, "L");
function Gi(e, t, r) {
  t[0] === "-" ? e.setProperty(t, r ?? "") : e[t] = r == null ? "" : typeof r != "number" || au.test(t) ? r : r + "px";
}
o(Gi, "T");
function Sr(e, t, r, n, i) {
  var s;
  e: if (t === "style") if (typeof r == "string") e.style.cssText = r;
  else {
    if (typeof n == "string" && (e.style.cssText = n = ""), n) for (t in n) r && t in r || Gi(e.style, t, "");
    if (r) for (t in r) n && r[t] === n[t] || Gi(e.style, t, r[t]);
  }
  else if (t[0] === "o" && t[1] === "n") s = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e || t === "onFocusOut" || t === "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + s] = r, r ? n ? r.u = n.u : (r.u = $n, e.addEventListener(t, s ? Nn : Kn, s)) : e.removeEventListener(t, s ? Nn : Kn, s);
  else {
    if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = r ?? "";
      break e;
    } catch {
    }
    typeof r == "function" || (r == null || r === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && r == 1 ? "" : r));
  }
}
o(Sr, "A");
function qi(e) {
  return function(t) {
    if (this.l) {
      var r = this.l[t.type + e];
      if (t.t == null) t.t = $n++;
      else if (t.t < r.u) return;
      return r(D.event ? D.event(t) : t);
    }
  };
}
o(qi, "F");
function os(e, t, r, n, i, s, a, c, d, u) {
  var f, l, y, p, m, S, I, A, b, k, P, Z, V, ve, He, tt, re = t.type;
  if (t.constructor !== void 0) return null;
  128 & r.__u && (d = !!(32 & r.__u), s = [c = t.__e = r.__e]), (f = D.__b) && f(t);
  e: if (typeof re == "function") try {
    if (A = t.props, b = "prototype" in re && re.prototype.render, k = (f = re.contextType) && n[f.__c], P = f ? k ? k.props.value : f.__ : n, r.__c ? I = (l = t.__c = r.__c).__ = l.__E : (b ? t.__c = l = new re(A, P) : (t.__c = l = new vr(A, P), l.constructor = re, l.render = fu), k && k.sub(l), l.props = A, l.state || (l.state = {}), l.context = P, l.__n = n, y = l.__d = !0, l.__h = [], l._sb = []), b && l.__s == null && (l.__s = l.state), b && re.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = ge({}, l.__s)), ge(l.__s, re.getDerivedStateFromProps(A, l.__s))), p = l.props, m = l.state, l.__v = t, y) b && re.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), b && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (b && re.getDerivedStateFromProps == null && A !== p && l.componentWillReceiveProps != null && l.componentWillReceiveProps(A, P), !l.__e && (l.shouldComponentUpdate != null && l.shouldComponentUpdate(A, l.__s, P) === !1 || t.__v === r.__v)) {
        for (t.__v !== r.__v && (l.props = A, l.state = l.__s, l.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.some(function(Ct) {
          Ct && (Ct.__ = t);
        }), Z = 0; Z < l._sb.length; Z++) l.__h.push(l._sb[Z]);
        l._sb = [], l.__h.length && a.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(A, l.__s, P), b && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(p, m, S);
      });
    }
    if (l.context = P, l.props = A, l.__P = e, l.__e = !1, V = D.__r, ve = 0, b) {
      for (l.state = l.__s, l.__d = !1, V && V(t), f = l.render(l.props, l.state, l.context), He = 0; He < l._sb.length; He++) l.__h.push(l._sb[He]);
      l._sb = [];
    } else do
      l.__d = !1, V && V(t), f = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++ve < 25);
    l.state = l.__s, l.getChildContext != null && (n = ge(ge({}, n), l.getChildContext())), b && !y && l.getSnapshotBeforeUpdate != null && (S = l.getSnapshotBeforeUpdate(p, m)), rs(e, Bn(tt = f != null && f.type === Pe && f.key == null ? f.props.children : f) ? tt : [tt], t, r, n, i, s, a, c, d, u), l.base = t.__e, t.__u &= -161, l.__h.length && a.push(l), I && (l.__E = l.__ = null);
  } catch (Ct) {
    if (t.__v = null, d || s != null) {
      for (t.__u |= d ? 160 : 128; c && c.nodeType === 8 && c.nextSibling; ) c = c.nextSibling;
      s[s.indexOf(c)] = null, t.__e = c;
    } else t.__e = r.__e, t.__k = r.__k;
    D.__e(Ct, t, r);
  }
  else s == null && t.__v === r.__v ? (t.__k = r.__k, t.__e = r.__e) : t.__e = lu(r.__e, t, r, n, i, s, a, d, u);
  (f = D.diffed) && f(t);
}
o(os, "O");
function du(e, t, r) {
  t.__d = void 0;
  for (var n = 0; n < r.length; n++) Jn(r[n], r[++n], r[++n]);
  D.__c && D.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(s) {
        s.call(i);
      });
    } catch (s) {
      D.__e(s, i.__v);
    }
  });
}
o(du, "j");
function lu(e, t, r, n, i, s, a, c, d) {
  var u, f, l, y, p, m, S, I = r.props, A = t.props, b = t.type;
  if (b === "svg" ? i = "http://www.w3.org/2000/svg" : b === "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), s != null) {
    for (u = 0; u < s.length; u++) if ((p = s[u]) && "setAttribute" in p == !!b && (b ? p.localName === b : p.nodeType === 3)) {
      e = p, s[u] = null;
      break;
    }
  }
  if (e == null) {
    if (b === null) return document.createTextNode(A);
    e = document.createElementNS(i, b, A.is && A), c && (D.__m && D.__m(t, s), c = !1), s = null;
  }
  if (b === null) I === A || c && e.data === A || (e.data = A);
  else {
    if (s = s && Xi.call(e.childNodes), I = r.props || Wn, !c && s != null) for (I = {}, u = 0; u < e.attributes.length; u++) I[(p = e.attributes[u]).name] = p.value;
    for (u in I) if (p = I[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") l = p;
      else if (!(u in A)) {
        if (u == "value" && "defaultValue" in A || u == "checked" && "defaultChecked" in A) continue;
        Sr(e, u, null, p, i);
      }
    }
    for (u in A) p = A[u], u == "children" ? y = p : u == "dangerouslySetInnerHTML" ? f = p : u == "value" ? m = p : u == "checked" ? S = p : c && typeof p != "function" || I[u] === p || Sr(e, u, p, I[u], i);
    if (f) c || l && (f.__html === l.__html || f.__html === e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
    else if (l && (e.innerHTML = ""), rs(e, Bn(y) ? y : [y], t, r, n, b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, s, a, s ? s[0] : r.__k && Xe(r, 0), c, d), s != null) for (u = s.length; u--; ) es(s[u]);
    c || (u = "value", b === "progress" && m == null ? e.removeAttribute("value") : m !== void 0 && (m !== e[u] || b === "progress" && !m || b === "option" && m !== I[u]) && Sr(e, u, m, I[u], i), u = "checked", S !== void 0 && S !== e[u] && Sr(e, u, S, I[u], i));
  }
  return e;
}
o(lu, "z");
function Jn(e, t, r) {
  try {
    if (typeof e == "function") {
      var n = typeof e.__u == "function";
      n && e.__u(), n && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (i) {
    D.__e(i, r);
  }
}
o(Jn, "N");
function is(e, t, r) {
  var n, i;
  if (D.unmount && D.unmount(e), (n = e.ref) && (n.current && n.current !== e.__e || Jn(n, null, t)), (n = e.__c) != null) {
    if (n.componentWillUnmount) try {
      n.componentWillUnmount();
    } catch (s) {
      D.__e(s, t);
    }
    n.base = n.__P = null;
  }
  if (n = e.__k) for (i = 0; i < n.length; i++) n[i] && is(n[i], t, r || typeof e.type != "function");
  r || es(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
}
o(is, "V");
function fu(e, t, r) {
  return this.constructor(e, r);
}
o(fu, "q");
Xi = Yi.slice, D = { __e: /* @__PURE__ */ o(function(e, t, r, n) {
  for (var i, s, a; t = t.__; ) if ((i = t.__c) && !i.__) try {
    if ((s = i.constructor) && s.getDerivedStateFromError != null && (i.setState(s.getDerivedStateFromError(e)), a = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, n || {}), a = i.__d), a) return i.__E = i;
  } catch (c) {
    e = c;
  }
  throw e;
}, "__e") }, Zi = 0, iu = /* @__PURE__ */ o(function(e) {
  return e != null && e.constructor == null;
}, "t"), vr.prototype.setState = function(e, t) {
  var r;
  r = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ge({}, this.state), typeof e == "function" && (e = e(ge({}, r), this.props)), e && ge(r, e), e != null && this.__v && (t && this._sb.push(t), Fi(this));
}, vr.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), Fi(this));
}, vr.prototype.render = Pe, Ce = [], Qi = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Dn = /* @__PURE__ */ o(function(e, t) {
  return e.__v.__b - t.__v.__b;
}, "f"), Ar.__r = 0, $n = 0, Kn = qi(!1), Nn = qi(!0), su = 0;

// node_modules/oauth4webapi/build/index.js
var jn;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (jn = "oauth4webapi/v3.8.3");
function vt(e, t) {
  if (e == null)
    return !1;
  try {
    return e instanceof t || Object.getPrototypeOf(e)[Symbol.toStringTag] === t.prototype[Symbol.toStringTag];
  } catch {
    return !1;
  }
}
o(vt, "looseInstanceOf");
var Y = "ERR_INVALID_ARG_VALUE", q = "ERR_INVALID_ARG_TYPE";
function C(e, t, r) {
  let n = new TypeError(e, { cause: r });
  return Object.assign(n, { code: t }), n;
}
o(C, "CodedTypeError");
var le = Symbol(), us = Symbol(), hu = Symbol(), _e = Symbol(), Tr = Symbol(), Vn = Symbol(), Tg = Symbol(), mu = new TextEncoder(), yu = new TextDecoder();
function ae(e) {
  return typeof e == "string" ? mu.encode(e) : yu.decode(e);
}
o(ae, "buf");
var Fn;
Uint8Array.prototype.toBase64 ? Fn = /* @__PURE__ */ o((e) => (e instanceof ArrayBuffer && (e = new Uint8Array(e)), e.toBase64({ alphabet: "base64url", omitPadding: !0 })), "encodeBase64Url") : Fn = /* @__PURE__ */ o((t) => {
  t instanceof ArrayBuffer && (t = new Uint8Array(t));
  let r = [];
  for (let n = 0; n < t.byteLength; n += 32768)
    r.push(String.fromCharCode.apply(null, t.subarray(n, n + 32768)));
  return btoa(r.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}, "encodeBase64Url");
var Gn;
Uint8Array.fromBase64 ? Gn = /* @__PURE__ */ o((e) => {
  try {
    return Uint8Array.fromBase64(e, { alphabet: "base64url" });
  } catch (t) {
    throw C("The input to be decoded is not correctly encoded.", Y, t);
  }
}, "decodeBase64Url") : Gn = /* @__PURE__ */ o((e) => {
  try {
    let t = atob(e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
      r[n] = t.charCodeAt(n);
    return r;
  } catch (t) {
    throw C("The input to be decoded is not correctly encoded.", Y, t);
  }
}, "decodeBase64Url");
function ce(e) {
  return typeof e == "string" ? Gn(e) : Fn(e);
}
o(ce, "b64u");
var X = class extends Error {
  static {
    o(this, "UnsupportedOperationError");
  }
  code;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = rd, Error.captureStackTrace?.(this, this.constructor);
  }
}, qn = class extends Error {
  static {
    o(this, "OperationProcessingError");
  }
  code;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, r?.code && (this.code = r?.code), Error.captureStackTrace?.(this, this.constructor);
  }
};
function x(e, t, r) {
  return new qn(e, { code: t, cause: r });
}
o(x, "OPE");
function wu(e, t) {
  if (!(e instanceof CryptoKey))
    throw C(`${t} must be a CryptoKey`, q);
}
o(wu, "assertCryptoKey");
function gu(e, t) {
  if (wu(e, t), e.type !== "private")
    throw C(`${t} must be a private CryptoKey`, Y);
}
o(gu, "assertPrivateKey");
function Er(e) {
  return !(e === null || typeof e != "object" || Array.isArray(e));
}
o(Er, "isJsonObject");
function Rr(e) {
  vt(e, Headers) && (e = Object.fromEntries(e.entries()));
  let t = new Headers(e ?? {});
  if (jn && !t.has("user-agent") && t.set("user-agent", jn), t.has("authorization"))
    throw C('"options.headers" must not include the "authorization" header name', Y);
  return t;
}
o(Rr, "prepareHeaders");
function Yn(e, t) {
  if (t !== void 0) {
    if (typeof t == "function" && (t = t(e.href)), !(t instanceof AbortSignal))
      throw C('"options.signal" must return or be an instance of AbortSignal', q);
    return t;
  }
}
o(Yn, "signal");
function ds(e) {
  return e.includes("//") ? e.replace("//", "/") : e;
}
o(ds, "replaceDoubleSlash");
function bu(e, t, r = !1) {
  return e.pathname === "/" ? e.pathname = t : e.pathname = ds(`${t}/${r ? e.pathname : e.pathname.replace(/(\/)$/, "")}`), e;
}
o(bu, "prependWellKnown");
function _u(e, t) {
  return e.pathname = ds(`${e.pathname}/${t}`), e;
}
o(_u, "appendWellKnown");
async function xu(e, t, r, n) {
  if (!(e instanceof URL))
    throw C(`"${t}" must be an instance of URL`, q);
  eo(e, n?.[le] !== !0);
  let i = r(new URL(e.href)), s = Rr(n?.headers);
  return s.set("accept", "application/json"), (n?.[_e] || fetch)(i.href, {
    body: void 0,
    headers: Object.fromEntries(s.entries()),
    method: "GET",
    redirect: "manual",
    signal: Yn(i, n?.signal)
  });
}
o(xu, "performDiscovery");
async function ls(e, t) {
  return xu(e, "issuerIdentifier", (r) => {
    switch (t?.algorithm) {
      case void 0:
      case "oidc":
        _u(r, ".well-known/openid-configuration");
        break;
      case "oauth2":
        bu(r, ".well-known/oauth-authorization-server");
        break;
      default:
        throw C('"options.algorithm" must be "oidc" (default), or "oauth2"', Y);
    }
    return r;
  }, t);
}
o(ls, "discoveryRequest");
function xt(e, t, r, n, i) {
  try {
    if (typeof e != "number" || !Number.isFinite(e))
      throw C(`${r} must be a number`, q, i);
    if (e > 0)
      return;
    if (t) {
      if (e !== 0)
        throw C(`${r} must be a non-negative number`, Y, i);
      return;
    }
    throw C(`${r} must be a positive number`, Y, i);
  } catch (s) {
    throw n ? x(s.message, n, i) : s;
  }
}
o(xt, "assertNumber");
function $(e, t, r, n) {
  try {
    if (typeof e != "string")
      throw C(`${t} must be a string`, q, n);
    if (e.length === 0)
      throw C(`${t} must not be empty`, Y, n);
  } catch (i) {
    throw r ? x(i.message, r, n) : i;
  }
}
o($, "assertString");
async function fs(e, t) {
  let r = e;
  if (!(r instanceof URL) && r !== cs)
    throw C('"expectedIssuerIdentifier" must be an instance of URL', q);
  if (!vt(t, Response))
    throw C('"response" must be an instance of Response', q);
  if (t.status !== 200)
    throw x('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', no, t);
  Nr(t);
  let n = await io(t);
  if ($(n.issuer, '"response" body "issuer" property', R, { body: n }), r !== cs && new URL(n.issuer).href !== r.href)
    throw x('"response" body "issuer" property does not match the expected value', Cs, { expected: r.href, body: n, attribute: "issuer" });
  return n;
}
o(fs, "processDiscoveryResponse");
function ps(e) {
  vu(e, "application/json");
}
o(ps, "assertApplicationJson");
function Su(e, ...t) {
  let r = '"response" content-type must be ';
  if (t.length > 2) {
    let n = t.pop();
    r += `${t.join(", ")}, or ${n}`;
  } else t.length === 2 ? r += `${t[0]} or ${t[1]}` : r += t[0];
  return x(r, id, e);
}
o(Su, "notJson");
function vu(e, t) {
  if (_s(e) !== t)
    throw Su(e, t);
}
o(vu, "assertContentType");
function Cr() {
  return ce(crypto.getRandomValues(new Uint8Array(32)));
}
o(Cr, "randomBytes");
function Pr() {
  return Cr();
}
o(Pr, "generateRandomCodeVerifier");
function Ur() {
  return Cr();
}
o(Ur, "generateRandomState");
function Or() {
  return Cr();
}
o(Or, "generateRandomNonce");
async function Lr(e) {
  return $(e, "codeVerifier"), ce(await crypto.subtle.digest("SHA-256", ae(e)));
}
o(Lr, "calculatePKCECodeChallenge");
function Au(e) {
  return e instanceof CryptoKey ? { key: e } : e?.key instanceof CryptoKey ? (e.kid !== void 0 && $(e.kid, '"kid"'), {
    key: e.key,
    kid: e.kid
  }) : {};
}
o(Au, "getKeyAndKid");
function Eu(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "PS256";
    case "SHA-384":
      return "PS384";
    case "SHA-512":
      return "PS512";
    default:
      throw new X("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
o(Eu, "psAlg");
function ku(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "RS256";
    case "SHA-384":
      return "RS384";
    case "SHA-512":
      return "RS512";
    default:
      throw new X("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
o(ku, "rsAlg");
function Iu(e) {
  switch (e.algorithm.namedCurve) {
    case "P-256":
      return "ES256";
    case "P-384":
      return "ES384";
    case "P-521":
      return "ES512";
    default:
      throw new X("unsupported EcKeyAlgorithm namedCurve", { cause: e });
  }
}
o(Iu, "esAlg");
function Tu(e) {
  switch (e.algorithm.name) {
    case "RSA-PSS":
      return Eu(e);
    case "RSASSA-PKCS1-v1_5":
      return ku(e);
    case "ECDSA":
      return Iu(e);
    case "Ed25519":
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return e.algorithm.name;
    case "EdDSA":
      return "Ed25519";
    default:
      throw new X("unsupported CryptoKey algorithm name", { cause: e });
  }
}
o(Tu, "keyToJws");
function Ze(e) {
  let t = e?.[us];
  return typeof t == "number" && Number.isFinite(t) ? t : 0;
}
o(Ze, "getClockSkew");
function Hr(e) {
  let t = e?.[hu];
  return typeof t == "number" && Number.isFinite(t) && Math.sign(t) !== -1 ? t : 30;
}
o(Hr, "getClockTolerance");
function Dr() {
  return Math.floor(Date.now() / 1e3);
}
o(Dr, "epochTime");
function At(e) {
  if (typeof e != "object" || e === null)
    throw C('"as" must be an object', q);
  $(e.issuer, '"as.issuer"');
}
o(At, "assertAs");
function Et(e) {
  if (typeof e != "object" || e === null)
    throw C('"client" must be an object', q);
  $(e.client_id, '"client.client_id"');
}
o(Et, "assertClient");
function hs(e) {
  return $(e, '"clientSecret"'), (t, r, n, i) => {
    n.set("client_id", r.client_id), n.set("client_secret", e);
  };
}
o(hs, "ClientSecretPost");
function ms(e, t) {
  let r = Dr() + Ze(t);
  return {
    jti: Cr(),
    aud: e.issuer,
    exp: r + 60,
    iat: r,
    nbf: r,
    iss: t.client_id,
    sub: t.client_id
  };
}
o(ms, "clientAssertionPayload");
function ys(e, t) {
  let { key: r, kid: n } = Au(e);
  return gu(r, '"clientPrivateKey.key"'), async (i, s, a, c) => {
    let d = { alg: Tu(r), kid: n }, u = ms(i, s);
    t?.[Tr]?.(d, u), a.set("client_id", s.client_id), a.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a.set("client_assertion", await Ru(d, u, r));
  };
}
o(ys, "PrivateKeyJwt");
function ws(e, t) {
  $(e, '"clientSecret"');
  let r = t?.[Tr], n;
  return async (i, s, a, c) => {
    n ||= await crypto.subtle.importKey("raw", ae(e), { hash: "SHA-256", name: "HMAC" }, !1, ["sign"]);
    let d = { alg: "HS256" }, u = ms(i, s);
    r?.(d, u);
    let f = `${ce(ae(JSON.stringify(d)))}.${ce(ae(JSON.stringify(u)))}`, l = await crypto.subtle.sign(n.algorithm, n, ae(f));
    a.set("client_id", s.client_id), a.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a.set("client_assertion", `${f}.${ce(new Uint8Array(l))}`);
  };
}
o(ws, "ClientSecretJwt");
async function Ru(e, t, r) {
  if (!r.usages.includes("sign"))
    throw C('CryptoKey instances used for signing assertions must include "sign" in their "usages"', Y);
  let n = `${ce(ae(JSON.stringify(e)))}.${ce(ae(JSON.stringify(t)))}`, i = ce(await crypto.subtle.sign(ld(r), r, ae(n)));
  return `${n}.${i}`;
}
o(Ru, "signJwt");
var Cu = URL.parse ? (e, t) => URL.parse(e, t) : (e, t) => {
  try {
    return new URL(e, t);
  } catch {
    return null;
  }
};
function eo(e, t) {
  if (t && e.protocol !== "https:")
    throw x("only requests to HTTPS are allowed", sd, e);
  if (e.protocol !== "https:" && e.protocol !== "http:")
    throw x("only HTTP and HTTPS requests are allowed", ad, e);
}
o(eo, "checkProtocol");
function ss(e, t, r, n) {
  let i;
  if (typeof e != "string" || !(i = Cu(e)))
    throw x(`authorization server metadata does not contain a valid ${r ? `"as.mtls_endpoint_aliases.${t}"` : `"as.${t}"`}`, e === void 0 ? cd : ud, { attribute: r ? `mtls_endpoint_aliases.${t}` : t });
  return eo(i, n), i;
}
o(ss, "validateEndpoint");
function gs(e, t, r, n) {
  return r && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases ? ss(e.mtls_endpoint_aliases[t], t, r, n) : ss(e[t], t, r, n);
}
o(gs, "resolveEndpoint");
var Xn = class extends Error {
  static {
    o(this, "ResponseBodyError");
  }
  cause;
  code;
  error;
  status;
  error_description;
  response;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = td, this.cause = r.cause, this.error = r.cause.error, this.status = r.response.status, this.error_description = r.cause.error_description, Object.defineProperty(this, "response", { enumerable: !1, value: r.response }), Error.captureStackTrace?.(this, this.constructor);
  }
}, St = class extends Error {
  static {
    o(this, "AuthorizationResponseError");
  }
  cause;
  code;
  error;
  error_description;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = nd, this.cause = r.cause, this.error = r.cause.get("error"), this.error_description = r.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
  }
}, Zn = class extends Error {
  static {
    o(this, "WWWAuthenticateChallengeError");
  }
  cause;
  code;
  response;
  status;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = ed, this.cause = r.cause, this.status = r.response.status, this.response = r.response, Object.defineProperty(this, "response", { enumerable: !1 }), Error.captureStackTrace?.(this, this.constructor);
  }
}, kr = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", Pu = "[a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2}", Uu = '"((?:[^"\\\\]|\\\\[\\s\\S])*)"', Ou = "(" + kr + ")\\s*=\\s*" + Uu, Lu = "(" + kr + ")\\s*=\\s*(" + kr + ")", Hu = new RegExp("^[,\\s]*(" + kr + ")"), Du = new RegExp("^[,\\s]*" + Ou + "[,\\s]*(.*)"), Ku = new RegExp("^[,\\s]*" + Lu + "[,\\s]*(.*)"), Nu = new RegExp("^(" + Pu + ")(?:$|[,\\s])(.*)");
function Wu(e) {
  if (!vt(e, Response))
    throw C('"response" must be an instance of Response', q);
  let t = e.headers.get("www-authenticate");
  if (t === null)
    return;
  let r = [], n = t;
  for (; n; ) {
    let i = n.match(Hu), s = i?.[1].toLowerCase();
    if (!s)
      return;
    let a = n.substring(i[0].length);
    if (a && !a.match(/^[\s,]/))
      return;
    let c = a.match(/^\s+(.*)$/), d = !!c;
    n = c ? c[1] : void 0;
    let u = {}, f;
    if (d)
      for (; n; ) {
        let y, p;
        if (i = n.match(Du)) {
          if ([, y, p, n] = i, p.includes("\\"))
            try {
              p = JSON.parse(`"${p}"`);
            } catch {
            }
          u[y.toLowerCase()] = p;
          continue;
        }
        if (i = n.match(Ku)) {
          [, y, p, n] = i, u[y.toLowerCase()] = p;
          continue;
        }
        if (i = n.match(Nu)) {
          if (Object.keys(u).length)
            break;
          [, f, n] = i;
          break;
        }
        return;
      }
    else
      n = a || void 0;
    let l = { scheme: s, parameters: u };
    f && (l.token68 = f), r.push(l);
  }
  if (r.length)
    return r;
}
o(Wu, "parseWwwAuthenticateChallenges");
async function $u(e) {
  if (e.status > 399 && e.status < 500) {
    Nr(e), ps(e);
    try {
      let t = await e.clone().json();
      if (Er(t) && typeof t.error == "string" && t.error.length)
        return t;
    } catch {
    }
  }
}
o($u, "parseOAuthResponseErrorBody");
async function Bu(e, t, r) {
  if (e.status !== t) {
    Es(e);
    let n;
    throw (n = await $u(e)) ? (await e.body?.cancel(), new Xn("server responded with an error in the response body", {
      cause: n,
      response: e
    })) : x(`"response" is not a conform ${r} response (unexpected HTTP status code)`, no, e);
  }
}
o(Bu, "checkOAuthBodyError");
function bs(e) {
  if (!ro.has(e))
    throw C('"options.DPoP" is not a valid DPoPHandle', Y);
}
o(bs, "assertDPoP");
async function Ju(e, t, r, n, i, s) {
  if ($(e, '"accessToken"'), !(r instanceof URL))
    throw C('"url" must be an instance of URL', q);
  eo(r, s?.[le] !== !0), n = Rr(n), s?.DPoP && (bs(s.DPoP), await s.DPoP.addProof(r, n, t.toUpperCase(), e)), n.set("authorization", `${n.has("dpop") ? "DPoP" : "Bearer"} ${e}`);
  let a = await (s?.[_e] || fetch)(r.href, {
    body: i,
    headers: Object.fromEntries(n.entries()),
    method: t,
    redirect: "manual",
    signal: Yn(r, s?.signal)
  });
  return s?.DPoP?.cacheNonce(a, r), a;
}
o(Ju, "resourceRequest");
async function to(e, t, r, n) {
  At(e), Et(t);
  let i = gs(e, "userinfo_endpoint", t.use_mtls_endpoint_aliases, n?.[le] !== !0), s = Rr(n?.headers);
  return t.userinfo_signed_response_alg ? s.set("accept", "application/jwt") : (s.set("accept", "application/json"), s.append("accept", "application/jwt")), Ju(r, "GET", i, s, null, {
    ...n,
    [us]: Ze(t)
  });
}
o(to, "userInfoRequest");
var Mu = Symbol();
function _s(e) {
  return e.headers.get("content-type")?.split(";")[0];
}
o(_s, "getContentType");
async function xs(e, t, r, n, i) {
  if (At(e), Et(t), !vt(n, Response))
    throw C('"response" must be an instance of Response', q);
  if (Es(n), n.status !== 200)
    throw x('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', no, n);
  Nr(n);
  let s;
  if (_s(n) === "application/jwt") {
    let { claims: a, jwt: c } = await Ps(await n.text(), Us.bind(void 0, t.userinfo_signed_response_alg, e.userinfo_signing_alg_values_supported, void 0), Ze(t), Hr(t), i?.[Vn]).then(Vu.bind(void 0, t.client_id)).then(Fu.bind(void 0, e));
    vs.set(n, c), s = a;
  } else {
    if (t.userinfo_signed_response_alg)
      throw x("JWT UserInfo Response expected", od, n);
    s = await io(n);
  }
  switch ($(s.sub, '"response" body "sub" property', R, { body: s }), r) {
    case Mu:
      break;
    default:
      if ($(r, '"expectedSubject"'), s.sub !== r)
        throw x('unexpected "response" body "sub" property value', Cs, {
          expected: r,
          body: s,
          attribute: "sub"
        });
  }
  return s;
}
o(xs, "processUserInfoResponse");
async function zu(e, t, r, n, i, s, a) {
  return await r(e, t, i, s), s.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (a?.[_e] || fetch)(n.href, {
    body: i,
    headers: Object.fromEntries(s.entries()),
    method: "POST",
    redirect: "manual",
    signal: Yn(n, a?.signal)
  });
}
o(zu, "authenticatedRequest");
async function ju(e, t, r, n, i, s) {
  let a = gs(e, "token_endpoint", t.use_mtls_endpoint_aliases, s?.[le] !== !0);
  i.set("grant_type", n);
  let c = Rr(s?.headers);
  c.set("accept", "application/json"), s?.DPoP !== void 0 && (bs(s.DPoP), await s.DPoP.addProof(a, c, "POST"));
  let d = await zu(e, t, r, a, i, c, s);
  return s?.DPoP?.cacheNonce(d, a), d;
}
o(ju, "tokenEndpointRequest");
var Ss = /* @__PURE__ */ new WeakMap(), vs = /* @__PURE__ */ new WeakMap();
function Kr(e) {
  if (!e.id_token)
    return;
  let t = Ss.get(e);
  if (!t)
    throw C('"ref" was already garbage collected or did not resolve from the proper sources', Y);
  return t;
}
o(Kr, "getValidatedIdTokenClaims");
async function As(e, t, r, n, i, s) {
  if (At(e), Et(t), !vt(r, Response))
    throw C('"response" must be an instance of Response', q);
  await Bu(r, 200, "Token Endpoint"), Nr(r);
  let a = await io(r);
  if ($(a.access_token, '"response" body "access_token" property', R, {
    body: a
  }), $(a.token_type, '"response" body "token_type" property', R, {
    body: a
  }), a.token_type = a.token_type.toLowerCase(), a.expires_in !== void 0) {
    let c = typeof a.expires_in != "number" ? parseFloat(a.expires_in) : a.expires_in;
    xt(c, !0, '"response" body "expires_in" property', R, {
      body: a
    }), a.expires_in = c;
  }
  if (a.refresh_token !== void 0 && $(a.refresh_token, '"response" body "refresh_token" property', R, {
    body: a
  }), a.scope !== void 0 && typeof a.scope != "string")
    throw x('"response" body "scope" property must be a string', R, { body: a });
  if (a.id_token !== void 0) {
    $(a.id_token, '"response" body "id_token" property', R, {
      body: a
    });
    let c = ["aud", "exp", "iat", "iss", "sub"];
    t.require_auth_time === !0 && c.push("auth_time"), t.default_max_age !== void 0 && (xt(t.default_max_age, !0, '"client.default_max_age"'), c.push("auth_time")), n?.length && c.push(...n);
    let { claims: d, jwt: u } = await Ps(a.id_token, Us.bind(void 0, t.id_token_signed_response_alg, e.id_token_signing_alg_values_supported, "RS256"), Ze(t), Hr(t), i).then(Zu.bind(void 0, c)).then(Is.bind(void 0, e)).then(ks.bind(void 0, t.client_id));
    if (Array.isArray(d.aud) && d.aud.length !== 1) {
      if (d.azp === void 0)
        throw x('ID Token "aud" (audience) claim includes additional untrusted audiences', be, { claims: d, claim: "aud" });
      if (d.azp !== t.client_id)
        throw x('unexpected ID Token "azp" (authorized party) claim value', be, { expected: t.client_id, claims: d, claim: "azp" });
    }
    d.auth_time !== void 0 && xt(d.auth_time, !0, 'ID Token "auth_time" (authentication time)', R, { claims: d }), vs.set(r, u), Ss.set(a, d);
  }
  if (s?.[a.token_type] !== void 0)
    s[a.token_type](r, a);
  else if (a.token_type !== "dpop" && a.token_type !== "bearer")
    throw new X("unsupported `token_type` value", { cause: { body: a } });
  return a;
}
o(As, "processGenericAccessTokenResponse");
function Es(e) {
  let t;
  if (t = Wu(e))
    throw new Zn("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t, response: e });
}
o(Es, "checkAuthenticationChallenges");
function Vu(e, t) {
  return t.claims.aud !== void 0 ? ks(e, t) : t;
}
o(Vu, "validateOptionalAudience");
function ks(e, t) {
  if (Array.isArray(t.claims.aud)) {
    if (!t.claims.aud.includes(e))
      throw x('unexpected JWT "aud" (audience) claim value', be, {
        expected: e,
        claims: t.claims,
        claim: "aud"
      });
  } else if (t.claims.aud !== e)
    throw x('unexpected JWT "aud" (audience) claim value', be, {
      expected: e,
      claims: t.claims,
      claim: "aud"
    });
  return t;
}
o(ks, "validateAudience");
function Fu(e, t) {
  return t.claims.iss !== void 0 ? Is(e, t) : t;
}
o(Fu, "validateOptionalIssuer");
function Is(e, t) {
  let r = e[pd]?.(t) ?? e.issuer;
  if (t.claims.iss !== r)
    throw x('unexpected JWT "iss" (issuer) claim value', be, {
      expected: r,
      claims: t.claims,
      claim: "iss"
    });
  return t;
}
o(Is, "validateIssuer");
var ro = /* @__PURE__ */ new WeakSet();
function Gu(e) {
  return ro.add(e), e;
}
o(Gu, "brand");
var qu = Symbol();
async function Ts(e, t, r, n, i, s, a) {
  if (At(e), Et(t), !ro.has(n))
    throw C('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', Y);
  $(i, '"redirectUri"');
  let c = Oe(n, "code");
  if (!c)
    throw x('no authorization code in "callbackParameters"', R);
  let d = new URLSearchParams(a?.additionalParameters);
  return d.set("redirect_uri", i), d.set("code", c), s !== qu && ($(s, '"codeVerifier"'), d.set("code_verifier", s)), ju(e, t, r, "authorization_code", d, a);
}
o(Ts, "authorizationCodeGrantRequest");
var Xu = {
  aud: "audience",
  c_hash: "code hash",
  client_id: "client id",
  exp: "expiration time",
  iat: "issued at",
  iss: "issuer",
  jti: "jwt id",
  nonce: "nonce",
  s_hash: "state hash",
  sub: "subject",
  ath: "access token hash",
  htm: "http method",
  htu: "http uri",
  cnf: "confirmation",
  auth_time: "authentication time"
};
function Zu(e, t) {
  for (let r of e)
    if (t.claims[r] === void 0)
      throw x(`JWT "${r}" (${Xu[r]}) claim missing`, R, {
        claims: t.claims
      });
  return t;
}
o(Zu, "validatePresence");
var Mn = Symbol(), zn = Symbol();
async function Rs(e, t, r, n) {
  return typeof n?.expectedNonce == "string" || typeof n?.maxAge == "number" || n?.requireIdToken ? Qu(e, t, r, n.expectedNonce, n.maxAge, n[Vn], n.recognizedTokenTypes) : Yu(e, t, r, n?.[Vn], n?.recognizedTokenTypes);
}
o(Rs, "processAuthorizationCodeResponse");
async function Qu(e, t, r, n, i, s, a) {
  let c = [];
  switch (n) {
    case void 0:
      n = Mn;
      break;
    case Mn:
      break;
    default:
      $(n, '"expectedNonce" argument'), c.push("nonce");
  }
  switch (i ??= t.default_max_age, i) {
    case void 0:
      i = zn;
      break;
    case zn:
      break;
    default:
      xt(i, !0, '"maxAge" argument'), c.push("auth_time");
  }
  let d = await As(e, t, r, c, s, a);
  $(d.id_token, '"response" body "id_token" property', R, {
    body: d
  });
  let u = Kr(d);
  if (i !== zn) {
    let f = Dr() + Ze(t), l = Hr(t);
    if (u.auth_time + i < f - l)
      throw x("too much time has elapsed since the last End-User authentication", Ir, { claims: u, now: f, tolerance: l, claim: "auth_time" });
  }
  if (n === Mn) {
    if (u.nonce !== void 0)
      throw x('unexpected ID Token "nonce" claim value', be, {
        expected: void 0,
        claims: u,
        claim: "nonce"
      });
  } else if (u.nonce !== n)
    throw x('unexpected ID Token "nonce" claim value', be, {
      expected: n,
      claims: u,
      claim: "nonce"
    });
  return d;
}
o(Qu, "processAuthorizationCodeOpenIDResponse");
async function Yu(e, t, r, n, i) {
  let s = await As(e, t, r, void 0, n, i), a = Kr(s);
  if (a) {
    if (t.default_max_age !== void 0) {
      xt(t.default_max_age, !0, '"client.default_max_age"');
      let c = Dr() + Ze(t), d = Hr(t);
      if (a.auth_time + t.default_max_age < c - d)
        throw x("too much time has elapsed since the last End-User authentication", Ir, { claims: a, now: c, tolerance: d, claim: "auth_time" });
    }
    if (a.nonce !== void 0)
      throw x('unexpected ID Token "nonce" claim value', be, {
        expected: void 0,
        claims: a,
        claim: "nonce"
      });
  }
  return s;
}
o(Yu, "processAuthorizationCodeOAuth2Response");
var ed = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", td = "OAUTH_RESPONSE_BODY_ERROR", rd = "OAUTH_UNSUPPORTED_OPERATION", nd = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", od = "OAUTH_JWT_USERINFO_EXPECTED", Qn = "OAUTH_PARSE_ERROR", R = "OAUTH_INVALID_RESPONSE";
var id = "OAUTH_RESPONSE_IS_NOT_JSON", no = "OAUTH_RESPONSE_IS_NOT_CONFORM", sd = "OAUTH_HTTP_REQUEST_FORBIDDEN", ad = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", Ir = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", be = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", Cs = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";
var cd = "OAUTH_MISSING_SERVER_METADATA", ud = "OAUTH_INVALID_SERVER_METADATA";
function Nr(e) {
  if (e.bodyUsed)
    throw C('"response" body has been used already', Y);
}
o(Nr, "assertReadableResponse");
function as(e) {
  let { algorithm: t } = e;
  if (typeof t.modulusLength != "number" || t.modulusLength < 2048)
    throw new X(`unsupported ${t.name} modulusLength`, {
      cause: e
    });
}
o(as, "checkRsaKeyAlgorithm");
function dd(e) {
  let { algorithm: t } = e;
  switch (t.namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new X("unsupported ECDSA namedCurve", { cause: e });
  }
}
o(dd, "ecdsaHashName");
function ld(e) {
  switch (e.algorithm.name) {
    case "ECDSA":
      return {
        name: e.algorithm.name,
        hash: dd(e)
      };
    case "RSA-PSS":
      switch (as(e), e.algorithm.hash.name) {
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          return {
            name: e.algorithm.name,
            saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3
          };
        default:
          throw new X("unsupported RSA-PSS hash name", { cause: e });
      }
    case "RSASSA-PKCS1-v1_5":
      return as(e), e.algorithm.name;
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
    case "Ed25519":
      return e.algorithm.name;
  }
  throw new X("unsupported CryptoKey algorithm name", { cause: e });
}
o(ld, "keyToSubtle");
async function Ps(e, t, r, n, i) {
  let { 0: s, 1: a, length: c } = e.split(".");
  if (c === 5)
    if (i !== void 0)
      e = await i(e), { 0: s, 1: a, length: c } = e.split(".");
    else
      throw new X("JWE decryption is not configured", { cause: e });
  if (c !== 3)
    throw x("Invalid JWT", R, e);
  let d;
  try {
    d = JSON.parse(ae(ce(s)));
  } catch (l) {
    throw x("failed to parse JWT Header body as base64url encoded JSON", Qn, l);
  }
  if (!Er(d))
    throw x("JWT Header must be a top level object", R, e);
  if (t(d), d.crit !== void 0)
    throw new X('no JWT "crit" header parameter extensions are supported', {
      cause: { header: d }
    });
  let u;
  try {
    u = JSON.parse(ae(ce(a)));
  } catch (l) {
    throw x("failed to parse JWT Payload body as base64url encoded JSON", Qn, l);
  }
  if (!Er(u))
    throw x("JWT Payload must be a top level object", R, e);
  let f = Dr() + r;
  if (u.exp !== void 0) {
    if (typeof u.exp != "number")
      throw x('unexpected JWT "exp" (expiration time) claim type', R, { claims: u });
    if (u.exp <= f - n)
      throw x('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', Ir, { claims: u, now: f, tolerance: n, claim: "exp" });
  }
  if (u.iat !== void 0 && typeof u.iat != "number")
    throw x('unexpected JWT "iat" (issued at) claim type', R, { claims: u });
  if (u.iss !== void 0 && typeof u.iss != "string")
    throw x('unexpected JWT "iss" (issuer) claim type', R, { claims: u });
  if (u.nbf !== void 0) {
    if (typeof u.nbf != "number")
      throw x('unexpected JWT "nbf" (not before) claim type', R, { claims: u });
    if (u.nbf > f + n)
      throw x('unexpected JWT "nbf" (not before) claim value', Ir, {
        claims: u,
        now: f,
        tolerance: n,
        claim: "nbf"
      });
  }
  if (u.aud !== void 0 && typeof u.aud != "string" && !Array.isArray(u.aud))
    throw x('unexpected JWT "aud" (audience) claim type', R, { claims: u });
  return { header: d, claims: u, jwt: e };
}
o(Ps, "validateJwt");
function Us(e, t, r, n) {
  if (e !== void 0) {
    if (typeof e == "string" ? n.alg !== e : !e.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', R, {
        header: n,
        expected: e,
        reason: "client configuration"
      });
    return;
  }
  if (Array.isArray(t)) {
    if (!t.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', R, {
        header: n,
        expected: t,
        reason: "authorization server metadata"
      });
    return;
  }
  if (r !== void 0) {
    if (typeof r == "string" ? n.alg !== r : typeof r == "function" ? !r(n.alg) : !r.includes(n.alg))
      throw x('unexpected JWT "alg" header parameter', R, {
        header: n,
        expected: r,
        reason: "default value"
      });
    return;
  }
  throw x('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e, issuer: t, fallback: r });
}
o(Us, "checkSigningAlgorithm");
function Oe(e, t) {
  let { 0: r, length: n } = e.getAll(t);
  if (n > 1)
    throw x(`"${t}" parameter must be provided only once`, R);
  return r;
}
o(Oe, "getURLSearchParameter");
var oo = Symbol(), fd = Symbol();
function Os(e, t, r, n) {
  if (At(e), Et(t), r instanceof URL && (r = r.searchParams), !(r instanceof URLSearchParams))
    throw C('"parameters" must be an instance of URLSearchParams, or URL', q);
  if (Oe(r, "response"))
    throw x('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', R, { parameters: r });
  let i = Oe(r, "iss"), s = Oe(r, "state");
  if (!i && e.authorization_response_iss_parameter_supported)
    throw x('response parameter "iss" (issuer) missing', R, { parameters: r });
  if (i && i !== e.issuer)
    throw x('unexpected "iss" (issuer) response parameter value', R, {
      expected: e.issuer,
      parameters: r
    });
  switch (n) {
    case void 0:
    case fd:
      if (s !== void 0)
        throw x('unexpected "state" response parameter encountered', R, {
          expected: void 0,
          parameters: r
        });
      break;
    case oo:
      break;
    default:
      if ($(n, '"expectedState" argument'), s !== n)
        throw x(s === void 0 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', R, { expected: n, parameters: r });
  }
  if (Oe(r, "error"))
    throw new St("authorization response from the server is an error", {
      cause: r
    });
  let c = Oe(r, "id_token"), d = Oe(r, "token");
  if (c !== void 0 || d !== void 0)
    throw new X("implicit and hybrid flows are not supported");
  return Gu(new URLSearchParams(r));
}
o(Os, "validateAuthResponse");
async function io(e, t = ps) {
  let r;
  try {
    r = await e.json();
  } catch (n) {
    throw t(e), x('failed to parse "response" body as JSON', Qn, n);
  }
  if (!Er(r))
    throw x('"response" body must be a top level object', R, { body: r });
  return r;
}
o(io, "getResponseJsonBody");
var cs = Symbol(), pd = Symbol();

// node_modules/@auth/core/lib/actions/callback/oauth/checks.js
var so = 900;
async function ao(e, t, r) {
  let { cookies: n, logger: i } = r, s = n[e], a = /* @__PURE__ */ new Date();
  a.setTime(a.getTime() + so * 1e3), i.debug(`CREATE_${e.toUpperCase()}`, {
    name: s.name,
    payload: t,
    COOKIE_TTL: so,
    expires: a
  });
  let c = await _r({
    ...r.jwt,
    maxAge: so,
    token: { value: t },
    salt: s.name
  }), d = { ...s.options, expires: a };
  return { name: s.name, value: c, options: d };
}
o(ao, "sealCookie");
async function hd(e, t, r) {
  try {
    let { logger: n, cookies: i, jwt: s } = r;
    if (n.debug(`PARSE_${e.toUpperCase()}`, { cookie: t }), !t)
      throw new pe(`${e} cookie was missing`);
    let a = await xr({
      ...s,
      token: t,
      salt: i[e].name
    });
    if (a?.value)
      return a.value;
    throw new Error("Invalid cookie");
  } catch (n) {
    throw new pe(`${e} value could not be parsed`, {
      cause: n
    });
  }
}
o(hd, "parseCookie");
function md(e, t, r) {
  let { logger: n, cookies: i } = t, s = i[e];
  n.debug(`CLEAR_${e.toUpperCase()}`, { cookie: s }), r.push({
    name: s.name,
    value: "",
    options: { ...i[e].options, maxAge: 0 }
  });
}
o(md, "clearCookie");
function co(e, t) {
  return async function(r, n, i) {
    let { provider: s, logger: a } = i;
    if (!s?.checks?.includes(e))
      return;
    let c = r?.[i.cookies[t].name];
    a.debug(`USE_${t.toUpperCase()}`, { value: c });
    let d = await hd(t, c, i);
    return md(t, i, n), d;
  };
}
o(co, "useCookie");
var Hs = {
  /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */
  async create(e) {
    let t = Pr(), r = await Lr(t);
    return { cookie: await ao("pkceCodeVerifier", t, e), value: r };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   */
  use: co("pkce", "pkceCodeVerifier")
}, yd = 900, Ls = "encodedState", uo = {
  /** Creates a state cookie with an optionally encoded body. */
  async create(e, t) {
    let { provider: r } = e;
    if (!r.checks.includes("state")) {
      if (t)
        throw new pe("State data was provided but the provider is not configured to use state");
      return;
    }
    let n = {
      origin: t,
      random: Ur()
    }, i = await _r({
      secret: e.jwt.secret,
      token: n,
      salt: Ls,
      maxAge: yd
    });
    return { cookie: await ao("state", i, e), value: i };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   */
  use: co("state", "state"),
  /** Decodes the state. If it could not be decoded, it throws an error. */
  async decode(e, t) {
    try {
      t.logger.debug("DECODE_STATE", { state: e });
      let r = await xr({
        secret: t.jwt.secret,
        token: e,
        salt: Ls
      });
      if (r)
        return r;
      throw new Error("Invalid state");
    } catch (r) {
      throw new pe("State could not be decoded", { cause: r });
    }
  }
}, Ds = {
  async create(e) {
    if (!e.provider.checks.includes("nonce"))
      return;
    let t = Or();
    return { cookie: await ao("nonce", t, e), value: t };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  use: co("nonce", "nonce")
};

// node_modules/@auth/core/lib/utils/env.js
function lo(e, t, r = !1) {
  try {
    let n = e.AUTH_URL;
    n && (t.basePath ? r || _t(t).warn("env-url-basepath-redundant") : t.basePath = new URL(n).pathname);
  } catch {
  } finally {
    t.basePath ?? (t.basePath = "/auth");
  }
  if (!t.secret?.length) {
    t.secret = [];
    let n = e.AUTH_SECRET;
    n && t.secret.push(n);
    for (let i of [1, 2, 3]) {
      let s = e[`AUTH_SECRET_${i}`];
      s && t.secret.unshift(s);
    }
  }
  t.redirectProxyUrl ?? (t.redirectProxyUrl = e.AUTH_REDIRECT_PROXY_URL), t.trustHost ?? (t.trustHost = !!(e.AUTH_URL ?? e.AUTH_TRUST_HOST ?? e.VERCEL ?? e.CF_PAGES ?? e.NODE_ENV !== "production")), t.providers = t.providers.map((n) => {
    let { id: i } = typeof n == "function" ? n({}) : n, s = i.toUpperCase().replace(/-/g, "_"), a = e[`AUTH_${s}_ID`], c = e[`AUTH_${s}_SECRET`], d = e[`AUTH_${s}_ISSUER`], u = e[`AUTH_${s}_KEY`], f = typeof n == "function" ? n({ clientId: a, clientSecret: c, issuer: d, apiKey: u }) : n;
    return f.type === "oauth" || f.type === "oidc" ? (f.clientId ?? (f.clientId = a), f.clientSecret ?? (f.clientSecret = c), f.issuer ?? (f.issuer = d)) : f.type === "email" && (f.apiKey ?? (f.apiKey = u)), f;
  });
}
o(lo, "setEnvDefaults");

// node_modules/@convex-dev/auth/dist/server/provider_utils.js
function Ns(e) {
  let t = ho(e), r = t.providers.filter((n) => n.type === "credentials").map((n) => n.extraProviders).flat().filter((n) => n !== void 0);
  return {
    ...t,
    extraProviders: Ed(r),
    theme: t.theme ?? {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    }
  };
}
o(Ns, "configDefaults");
function Ws(e) {
  let t = { providers: [e] };
  return ho(t), t.providers[0];
}
o(Ws, "materializeProvider");
function Ed(e) {
  let t = { providers: e };
  return ho(t), t.providers;
}
o(Ed, "materializeProviders");
function ho(e) {
  let t = e.providers.map((n) => kd(typeof n == "function" ? n() : n)), r = { ...e, providers: t };
  return lo(process.env, r), r.providers.forEach((n) => {
    if (n.type === "phone") {
      let i = n.id.toUpperCase().replace(/-/g, "_");
      n.apiKey ??= process.env[`AUTH_${i}_KEY`];
    }
  }), r;
}
o(ho, "materializeAndDefaultProviders");
function kd(e) {
  let t = po(e, e.options);
  return t.type === "oauth" || t.type === "oidc" ? Rd(t) : t;
}
o(kd, "providerDefaults");
var Id = /* @__PURE__ */ o((e) => $s({
  id: e.sub ?? e.id ?? crypto.randomUUID(),
  name: e.name ?? e.nickname ?? e.preferred_username,
  email: e.email ?? void 0,
  image: e.picture ?? void 0
}), "defaultProfile"), Td = /* @__PURE__ */ o((e) => $s({
  access_token: e.access_token,
  id_token: e.id_token,
  refresh_token: e.refresh_token,
  expires_at: e.expires_at,
  scope: e.scope,
  token_type: e.token_type,
  session_state: e.session_state
}), "defaultAccount");
function $s(e) {
  let t = {};
  for (let [r, n] of Object.entries(e))
    n !== void 0 && (t[r] = n);
  return t;
}
o($s, "stripUndefined");
function Rd(e) {
  e.issuer && (e.wellKnown ??= `${e.issuer}/.well-known/openid-configuration`);
  let t = e.checks ?? ["pkce"];
  return e.redirectProxyUrl && (t.includes("state") || t.push("state"), e.redirectProxyUrl = `${e.redirectProxyUrl}/callback/${e.id}`), {
    ...e,
    checks: t,
    profile: e.profile ?? Id,
    account: e.account ?? Td
  };
}
o(Rd, "normalizeOAuth");
var Cd = "convexauth.mumbojumbo", Pd = `https://${Cd}`;
function Le(e, t) {
  if (!e && t)
    return;
  if (typeof e == "string")
    return { url: new URL(e) };
  let r = new URL(e?.url ?? Pd);
  if (e?.params != null)
    for (let [n, i] of Object.entries(e.params))
      r.searchParams.set(n, String(n === "claims" ? JSON.stringify(i) : i));
  return { url: r, request: e?.request, conform: e?.conform };
}
o(Le, "normalizeEndpoint");
function po(e, ...t) {
  if (!t.length)
    return e;
  let r = t.shift();
  if (fo(e) && fo(r))
    for (let n in r)
      fo(r[n]) ? (e[n] || Object.assign(e, { [n]: {} }), po(e[n], r[n])) : Object.assign(e, { [n]: r[n] });
  return po(e, ...t);
}
o(po, "merge");
function fo(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
o(fo, "isObject");
function Bs(e, t) {
  let r = e.providers.concat(t ? e.extraProviders : []).map((n) => `\`${n.id}\``);
  return r.length > 0 ? r.join(", ") : "no providers have been configured";
}
o(Bs, "listAvailableProviders");

// node_modules/@oslojs/binary/dist/uint.js
var mo = class {
  static {
    o(this, "BigEndian");
  }
  uint8(t, r) {
    if (t.byteLength < r + 1)
      throw new TypeError("Insufficient bytes");
    return t[r];
  }
  uint16(t, r) {
    if (t.byteLength < r + 2)
      throw new TypeError("Insufficient bytes");
    return t[r] << 8 | t[r + 1];
  }
  uint32(t, r) {
    if (t.byteLength < r + 4)
      throw new TypeError("Insufficient bytes");
    let n = 0;
    for (let i = 0; i < 4; i++)
      n |= t[r + i] << 24 - i * 8;
    return n;
  }
  uint64(t, r) {
    if (t.byteLength < r + 8)
      throw new TypeError("Insufficient bytes");
    let n = 0n;
    for (let i = 0; i < 8; i++)
      n |= BigInt(t[r + i]) << BigInt(56 - i * 8);
    return n;
  }
  putUint8(t, r, n) {
    if (t.length < n + 1)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 255)
      throw new TypeError("Invalid uint8 value");
    t[n] = r;
  }
  putUint16(t, r, n) {
    if (t.length < n + 2)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 65535)
      throw new TypeError("Invalid uint16 value");
    t[n] = r >> 8, t[n + 1] = r & 255;
  }
  putUint32(t, r, n) {
    if (t.length < n + 4)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 4294967295)
      throw new TypeError("Invalid uint32 value");
    for (let i = 0; i < 4; i++)
      t[n + i] = r >> (3 - i) * 8 & 255;
  }
  putUint64(t, r, n) {
    if (t.length < n + 8)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 18446744073709551615n)
      throw new TypeError("Invalid uint64 value");
    for (let i = 0; i < 8; i++)
      t[n + i] = Number(r >> BigInt((7 - i) * 8) & 0xffn);
  }
}, yo = class {
  static {
    o(this, "LittleEndian");
  }
  uint8(t, r) {
    if (t.byteLength < r + 1)
      throw new TypeError("Insufficient bytes");
    return t[r];
  }
  uint16(t, r) {
    if (t.byteLength < r + 2)
      throw new TypeError("Insufficient bytes");
    return t[r] | t[r + 1] << 8;
  }
  uint32(t, r) {
    if (t.byteLength < r + 4)
      throw new TypeError("Insufficient bytes");
    let n = 0;
    for (let i = 0; i < 4; i++)
      n |= t[r + i] << i * 8;
    return n;
  }
  uint64(t, r) {
    if (t.byteLength < r + 8)
      throw new TypeError("Insufficient bytes");
    let n = 0n;
    for (let i = 0; i < 8; i++)
      n |= BigInt(t[r + i]) << BigInt(i * 8);
    return n;
  }
  putUint8(t, r, n) {
    if (t.length < 1 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 255)
      throw new TypeError("Invalid uint8 value");
    t[n] = r;
  }
  putUint16(t, r, n) {
    if (t.length < 2 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 65535)
      throw new TypeError("Invalid uint16 value");
    t[n + 1] = r >> 8, t[n] = r & 255;
  }
  putUint32(t, r, n) {
    if (t.length < 4 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 4294967295)
      throw new TypeError("Invalid uint32 value");
    for (let i = 0; i < 4; i++)
      t[n + i] = r >> i * 8 & 255;
  }
  putUint64(t, r, n) {
    if (t.length < 8 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 18446744073709551615n)
      throw new TypeError("Invalid uint64 value");
    for (let i = 0; i < 8; i++)
      t[n + i] = Number(r >> BigInt(i * 8) & 0xffn);
  }
}, Qe = new mo(), Ud = new yo();

// node_modules/@oslojs/binary/dist/bits.js
function ee(e, t) {
  return (e << 32 - t | e >>> t) >>> 0;
}
o(ee, "rotr32");

// node_modules/@oslojs/binary/dist/big.js
function Wr(e) {
  if (e.byteLength < 1)
    throw new TypeError("Empty Uint8Array");
  let t = 0n;
  for (let r = 0; r < e.byteLength; r++)
    t += BigInt(e[r]) << BigInt((e.byteLength - 1 - r) * 8);
  return t;
}
o(Wr, "bigIntFromBytes");

// node_modules/@oslojs/crypto/dist/sha2/sha224.js
var $_ = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);

// node_modules/@oslojs/crypto/dist/sha2/sha256.js
function wo(e) {
  let t = new $r();
  return t.update(e), t.digest();
}
o(wo, "sha256");
var $r = class {
  static {
    o(this, "SHA256");
  }
  blockSize = 64;
  size = 32;
  blocks = new Uint8Array(64);
  currentBlockSize = 0;
  H = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  l = 0n;
  w = new Uint32Array(64);
  update(t) {
    if (this.l += BigInt(t.byteLength) * 8n, this.currentBlockSize + t.byteLength < 64) {
      this.blocks.set(t, this.currentBlockSize), this.currentBlockSize += t.byteLength;
      return;
    }
    let r = 0;
    if (this.currentBlockSize > 0) {
      let n = t.slice(0, 64 - this.currentBlockSize);
      this.blocks.set(n, this.currentBlockSize), this.process(), r += n.byteLength, this.currentBlockSize = 0;
    }
    for (; r + 64 <= t.byteLength; ) {
      let n = t.slice(r, r + 64);
      this.blocks.set(n), this.process(), r += 64;
    }
    if (t.byteLength - r > 0) {
      let n = t.slice(r);
      this.blocks.set(n), this.currentBlockSize = n.byteLength;
    }
  }
  digest() {
    this.blocks[this.currentBlockSize] = 128, this.currentBlockSize += 1, 64 - this.currentBlockSize < 8 && (this.blocks.fill(0, this.currentBlockSize), this.process(), this.currentBlockSize = 0), this.blocks.fill(0, this.currentBlockSize), Qe.putUint64(this.blocks, this.l, this.blockSize - 8), this.process();
    let t = new Uint8Array(32);
    for (let r = 0; r < 8; r++)
      Qe.putUint32(t, this.H[r], r * 4);
    return t;
  }
  process() {
    for (let u = 0; u < 16; u++)
      this.w[u] = (this.blocks[u * 4] << 24 | this.blocks[u * 4 + 1] << 16 | this.blocks[u * 4 + 2] << 8 | this.blocks[u * 4 + 3]) >>> 0;
    for (let u = 16; u < 64; u++) {
      let f = (ee(this.w[u - 2], 17) ^ ee(this.w[u - 2], 19) ^ this.w[u - 2] >>> 10) >>> 0, l = (ee(this.w[u - 15], 7) ^ ee(this.w[u - 15], 18) ^ this.w[u - 15] >>> 3) >>> 0;
      this.w[u] = f + this.w[u - 7] + l + this.w[u - 16] | 0;
    }
    let t = this.H[0], r = this.H[1], n = this.H[2], i = this.H[3], s = this.H[4], a = this.H[5], c = this.H[6], d = this.H[7];
    for (let u = 0; u < 64; u++) {
      let f = (ee(s, 6) ^ ee(s, 11) ^ ee(s, 25)) >>> 0, l = (s & a ^ ~s & c) >>> 0, y = d + f + l + Ld[u] + this.w[u] | 0, p = (ee(t, 2) ^ ee(t, 13) ^ ee(t, 22)) >>> 0, m = (t & r ^ t & n ^ r & n) >>> 0, S = p + m | 0;
      d = c, c = a, a = s, s = i + y | 0, i = n, n = r, r = t, t = y + S | 0;
    }
    this.H[0] = t + this.H[0] | 0, this.H[1] = r + this.H[1] | 0, this.H[2] = n + this.H[2] | 0, this.H[3] = i + this.H[3] | 0, this.H[4] = s + this.H[4] | 0, this.H[5] = a + this.H[5] | 0, this.H[6] = c + this.H[6] | 0, this.H[7] = d + this.H[7] | 0;
  }
}, Ld = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);

// node_modules/@oslojs/crypto/dist/sha2/sha512.js
var q_ = new BigUint64Array([
  0x428a2f98d728ae22n,
  0x7137449123ef65cdn,
  0xb5c0fbcfec4d3b2fn,
  0xe9b5dba58189dbbcn,
  0x3956c25bf348b538n,
  0x59f111f1b605d019n,
  0x923f82a4af194f9bn,
  0xab1c5ed5da6d8118n,
  0xd807aa98a3030242n,
  0x12835b0145706fben,
  0x243185be4ee4b28cn,
  0x550c7dc3d5ffb4e2n,
  0x72be5d74f27b896fn,
  0x80deb1fe3b1696b1n,
  0x9bdc06a725c71235n,
  0xc19bf174cf692694n,
  0xe49b69c19ef14ad2n,
  0xefbe4786384f25e3n,
  0x0fc19dc68b8cd5b5n,
  0x240ca1cc77ac9c65n,
  0x2de92c6f592b0275n,
  0x4a7484aa6ea6e483n,
  0x5cb0a9dcbd41fbd4n,
  0x76f988da831153b5n,
  0x983e5152ee66dfabn,
  0xa831c66d2db43210n,
  0xb00327c898fb213fn,
  0xbf597fc7beef0ee4n,
  0xc6e00bf33da88fc2n,
  0xd5a79147930aa725n,
  0x06ca6351e003826fn,
  0x142929670a0e6e70n,
  0x27b70a8546d22ffcn,
  0x2e1b21385c26c926n,
  0x4d2c6dfc5ac42aedn,
  0x53380d139d95b3dfn,
  0x650a73548baf63den,
  0x766a0abb3c77b2a8n,
  0x81c2c92e47edaee6n,
  0x92722c851482353bn,
  0xa2bfe8a14cf10364n,
  0xa81a664bbc423001n,
  0xc24b8b70d0f89791n,
  0xc76c51a30654be30n,
  0xd192e819d6ef5218n,
  0xd69906245565a910n,
  0xf40e35855771202an,
  0x106aa07032bbd1b8n,
  0x19a4c116b8d2d0c8n,
  0x1e376c085141ab53n,
  0x2748774cdf8eeb99n,
  0x34b0bcb5e19b48a8n,
  0x391c0cb3c5c95a63n,
  0x4ed8aa4ae3418acbn,
  0x5b9cca4f7763e373n,
  0x682e6ff3d6b2b8a3n,
  0x748f82ee5defb2fcn,
  0x78a5636f43172f60n,
  0x84c87814a1f0ab72n,
  0x8cc702081a6439ecn,
  0x90befffa23631e28n,
  0xa4506cebde82bde9n,
  0xbef9a3f7b2c67915n,
  0xc67178f2e372532bn,
  0xca273eceea26619cn,
  0xd186b8c721c0c207n,
  0xeada7dd6cde0eb1en,
  0xf57d4f7fee6ed178n,
  0x06f067aa72176fban,
  0x0a637dc5a2c898a6n,
  0x113f9804bef90daen,
  0x1b710b35131c471bn,
  0x28db77f523047d84n,
  0x32caab7b40c72493n,
  0x3c9ebe0a15c9bebcn,
  0x431d67c49c100d4cn,
  0x4cc5d4becb3e42b6n,
  0x597f299cfc657e2an,
  0x5fcb6fab3ad6faecn,
  0x6c44198c4a475817n
]);

// node_modules/@oslojs/encoding/dist/hex.js
function go(e) {
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += Ms[e[r] >> 4], t += Ms[e[r] & 15];
  return t;
}
o(go, "encodeHexLowerCase");
function Hd(e) {
  if (e.length % 2 !== 0)
    throw new Error("Invalid hex string");
  let t = new Uint8Array(e.length / 2);
  for (let r = 0; r < e.length; r += 2) {
    if (!(e[r] in Br))
      throw new Error("Invalid character");
    if (!(e[r + 1] in Br))
      throw new Error("Invalid character");
    t[r / 2] |= Br[e[r]] << 4, t[r / 2] |= Br[e[r + 1]];
  }
  return t;
}
o(Hd, "decodeHex");
var Ms = "0123456789abcdef", Br = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};

// node_modules/@oslojs/encoding/dist/base32.js
var zs;
(function(e) {
  e[e.Include = 0] = "Include", e[e.None = 1] = "None";
})(zs || (zs = {}));
var js;
(function(e) {
  e[e.Required = 0] = "Required", e[e.Ignore = 1] = "Ignore";
})(js || (js = {}));

// node_modules/@oslojs/encoding/dist/base64.js
var Vs;
(function(e) {
  e[e.Include = 0] = "Include", e[e.None = 1] = "None";
})(Vs || (Vs = {}));
var Fs;
(function(e) {
  e[e.Required = 0] = "Required", e[e.Ignore = 1] = "Ignore";
})(Fs || (Fs = {}));

// node_modules/@oslojs/crypto/dist/random/index.js
function Dd(e, t) {
  if (t < 2)
    throw new Error("Argument 'max' must be a positive integer larger than 1");
  let r = (t - 1n).toString(2).length, n = r % 8, i = new Uint8Array(Math.ceil(r / 8));
  try {
    e.read(i);
  } catch (a) {
    throw new Error("Failed to retrieve random bytes", {
      cause: a
    });
  }
  n !== 0 && (i[0] &= (1 << n) - 1);
  let s = Wr(i);
  for (; s >= t; ) {
    try {
      e.read(i);
    } catch (a) {
      throw new Error("Failed to retrieve random bytes", {
        cause: a
      });
    }
    n !== 0 && (i[0] &= (1 << n) - 1), s = Wr(i);
  }
  return s;
}
o(Dd, "generateRandomInteger");
function Kd(e, t) {
  if (t < 2 || t > Number.MAX_SAFE_INTEGER)
    throw new Error("Argument 'max' must be a positive integer larger than 1");
  return Number(Dd(e, BigInt(t)));
}
o(Kd, "generateRandomIntegerNumber");
function Gs(e, t, r) {
  let n = "";
  for (let i = 0; i < r; i++)
    n += t[Kd(e, t.length)];
  return n;
}
o(Gs, "generateRandomString");

// node_modules/@convex-dev/auth/dist/server/implementation/utils.js
var xe = "|", _o = "|";
function Jr(e) {
  return e !== void 0 ? Number(e) : void 0;
}
o(Jr, "stringToNumber");
async function Ye(e) {
  return go(wo(new TextEncoder().encode(e)));
}
o(Ye, "sha256");
function Mr(e, t) {
  return Gs({
    read(n) {
      crypto.getRandomValues(n);
    }
  }, t, e);
}
o(Mr, "generateRandomString");
function xo(e) {
  g(v.ERROR, e instanceof Error ? e.message + `
` + e.stack?.replace("\\n", `
`) : e);
}
o(xo, "logError");
var v = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG"
};
function g(e, ...t) {
  let r = v[process.env.AUTH_LOG_LEVEL ?? "INFO"] ?? "INFO";
  switch (e) {
    case "ERROR":
      console.error(...t);
      break;
    case "WARN":
      r !== "ERROR" && console.warn(...t);
      break;
    case "INFO":
      (r === "INFO" || r === "DEBUG") && console.info(...t);
      break;
    case "DEBUG":
      r === "DEBUG" && console.debug(...t);
      break;
  }
}
o(g, "logWithLevel");
var bo = 5;
function L(e) {
  return e === "" ? "" : process.env.AUTH_LOG_SECRETS !== "true" ? e.length < bo * 2 ? "<redacted>" : e.substring(0, bo) + "<redacted>" + e.substring(e.length - bo) : e;
}
o(L, "maybeRedact");

// node_modules/@convex-dev/auth/dist/server/implementation/tokens.js
var Nd = 1e3 * 60 * 60;
async function qs(e, t) {
  let r = await En(F("JWT_PRIVATE_KEY"), "RS256"), n = new Date(Date.now() + (t.jwt?.durationMs ?? Nd));
  return await new mt({
    sub: e.userId + xe + e.sessionId
  }).setProtectedHeader({ alg: "RS256" }).setIssuedAt().setIssuer(F("CONVEX_SITE_URL")).setAudience("convex").setExpirationTime(n).sign(r);
}
o(qs, "generateToken");

// node_modules/@convex-dev/auth/dist/server/implementation/refreshTokens.js
var Wd = 1e3 * 60 * 60 * 24 * 30, zr = 10 * 1e3;
async function Xs(e, t, r, n) {
  let i = Date.now() + (t.session?.inactiveDurationMs ?? Jr(process.env.AUTH_SESSION_INACTIVE_DURATION_MS) ?? Wd);
  return await e.db.insert("authRefreshTokens", {
    sessionId: r,
    expirationTime: i,
    parentRefreshTokenId: n ?? void 0
  });
}
o(Xs, "createRefreshToken");
var Zs = /* @__PURE__ */ o((e, t) => `${e}${_o}${t}`, "formatRefreshToken"), jr = /* @__PURE__ */ o((e) => {
  let [t, r] = e.split(_o);
  if (!t || !r)
    throw new Error(`Can't parse refresh token: ${L(e)}`);
  return {
    refreshTokenId: t,
    sessionId: r
  };
}, "parseRefreshToken");
async function Qs(e, t) {
  let r = [t], n = [t._id];
  for (; n.length > 0; ) {
    let i = [];
    for (let s of n) {
      let a = await e.db.query("authRefreshTokens").withIndex("sessionIdAndParentRefreshTokenId", (c) => c.eq("sessionId", t.sessionId).eq("parentRefreshTokenId", s)).collect();
      r.push(...a), i.push(...a.map((c) => c._id));
    }
    n = i;
  }
  for (let i of r)
    (i.firstUsedTime === void 0 || i.firstUsedTime > Date.now() - zr) && await e.db.patch(i._id, {
      firstUsedTime: Date.now() - zr
    });
  return r;
}
o(Qs, "invalidateRefreshTokensInSubtree");
async function Vr(e, t) {
  let r = await e.db.query("authRefreshTokens").withIndex("sessionIdAndParentRefreshTokenId", (n) => n.eq("sessionId", t)).collect();
  for (let n of r)
    await e.db.delete(n._id);
}
o(Vr, "deleteAllRefreshTokens");
async function Ys(e, t, r) {
  let n = await e.db.get(t);
  if (n === null)
    return g(v.ERROR, "Invalid refresh token"), null;
  if (n.expirationTime < Date.now())
    return g(v.ERROR, "Expired refresh token"), null;
  if (n.sessionId !== r)
    return g(v.ERROR, "Invalid refresh token session ID"), null;
  let i = await e.db.get(n.sessionId);
  return i === null ? (g(v.ERROR, "Invalid refresh token session"), null) : i.expirationTime < Date.now() ? (g(v.ERROR, "Expired refresh token session"), null) : { session: i, refreshTokenDoc: n };
}
o(Ys, "refreshTokenIfValid");
async function ea(e, t) {
  return e.db.query("authRefreshTokens").withIndex("sessionId", (r) => r.eq("sessionId", t)).filter((r) => r.eq(r.field("firstUsedTime"), void 0)).order("desc").first();
}
o(ea, "loadActiveRefreshToken");

// node_modules/@convex-dev/auth/dist/server/implementation/sessions.js
var $d = 1e3 * 60 * 60 * 24 * 30;
async function Fr(e, t, r, n, i) {
  return {
    userId: r,
    sessionId: n,
    tokens: i ? await It(e, t, {
      userId: r,
      sessionId: n,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: null
    }) : null
  };
}
o(Fr, "maybeGenerateTokensForSession");
async function Gr(e, t, r) {
  let n = await te(e);
  if (n !== null) {
    let i = await e.db.get(n);
    i !== null && await Tt(e, i);
  }
  return await Bd(e, r, t);
}
o(Gr, "createNewAndDeleteExistingSession");
async function It(e, t, r) {
  let n = { userId: r.userId, sessionId: r.sessionId }, i = r.issuedRefreshTokenId ?? await Xs(e, t, r.sessionId, r.parentRefreshTokenId), s = {
    token: await qs(n, t),
    refreshToken: Zs(i, r.sessionId)
  };
  return g(v.DEBUG, `Generated token ${L(s.token)} and refresh token ${L(i)} for session ${L(r.sessionId)}`), s;
}
o(It, "generateTokensForSession");
async function Bd(e, t, r) {
  let n = Date.now() + (r.session?.totalDurationMs ?? Jr(process.env.AUTH_SESSION_TOTAL_DURATION_MS) ?? $d);
  return await e.db.insert("authSessions", { expirationTime: n, userId: t });
}
o(Bd, "createSession");
async function Tt(e, t) {
  await e.db.delete(t._id), await Vr(e, t._id);
}
o(Tt, "deleteSession");
async function te(e) {
  let t = await e.auth.getUserIdentity();
  if (t === null)
    return null;
  let [, r] = t.subject.split(xe);
  return r;
}
o(te, "getAuthSessionId");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/signIn.js
var ta = h.object({
  userId: h.id("users"),
  sessionId: h.optional(h.id("authSessions")),
  generateTokens: h.boolean()
});
async function ra(e, t, r) {
  g(v.DEBUG, "signInImpl args:", t);
  let { userId: n, sessionId: i, generateTokens: s } = t, a = i ?? await Gr(e, r, n);
  return await Fr(e, r, n, a, s);
}
o(ra, "signInImpl");
var So = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "signIn",
    ...t
  }
}), "callSignIn");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/signOut.js
async function na(e) {
  let t = await te(e);
  if (t !== null) {
    let r = await e.db.get(t);
    if (r !== null)
      return await Tt(e, r), { userId: r.userId, sessionId: r._id };
  }
  return null;
}
o(na, "signOutImpl");
var vo = /* @__PURE__ */ o(async (e) => e.runMutation("auth:store", {
  args: {
    type: "signOut"
  }
}), "callSignOut");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/refreshSession.js
var oa = h.object({
  refreshToken: h.string()
});
async function ia(e, t, r, n) {
  let { refreshToken: i } = t, { refreshTokenId: s, sessionId: a } = jr(i);
  g("DEBUG", `refreshSessionImpl args: Token ID: ${L(s)} Session ID: ${L(a)}`);
  let c = await Ys(e, s, a);
  if (c === null) {
    let p = await e.db.get(a);
    return p !== null && await e.db.delete(p._id), await Vr(e, a), null;
  }
  let { session: d } = c, u = d._id, f = d.userId, l = c.refreshTokenDoc.firstUsedTime;
  if (l === void 0) {
    await e.db.patch(s, {
      firstUsedTime: Date.now()
    });
    let p = await It(e, n, {
      userId: f,
      sessionId: u,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: s
    }), { refreshTokenId: m } = jr(p.refreshToken);
    return g("DEBUG", `Exchanged ${L(c.refreshTokenDoc._id)} (first use) for new refresh token ${L(m)}`), p;
  }
  let y = await ea(e, a);
  if (g("DEBUG", `Active refresh token: ${L(y?._id ?? "(none)")}, parent ${L(y?.parentRefreshTokenId ?? "(none)")}`), y !== null && y.parentRefreshTokenId === s)
    return g("DEBUG", `Token ${L(c.refreshTokenDoc._id)} is parent of active refresh token ${L(y._id)}, so returning that token`), await It(e, n, {
      userId: f,
      sessionId: u,
      issuedRefreshTokenId: y._id,
      parentRefreshTokenId: s
    });
  if (l + zr > Date.now()) {
    let p = await It(e, n, {
      userId: f,
      sessionId: u,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: s
    }), { refreshTokenId: m } = jr(p.refreshToken);
    return g("DEBUG", `Exchanged ${L(c.refreshTokenDoc._id)} (reuse) for new refresh token ${L(m)}`), p;
  } else {
    g("ERROR", "Refresh token used outside of reuse window"), g("DEBUG", `Token ${L(c.refreshTokenDoc._id)} being used outside of reuse window, so invalidating all refresh tokens in subtree`);
    let p = await Qs(e, c.refreshTokenDoc);
    return g("DEBUG", `Invalidated ${p.length} refresh tokens in subtree: ${p.map((m) => L(m._id)).join(", ")}`), null;
  }
}
o(ia, "refreshSessionImpl");
var Ao = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "refreshSession",
    ...t
  }
}), "callRefreshSession");

// node_modules/@convex-dev/auth/dist/server/implementation/rateLimit.js
async function qr(e, t, r) {
  let n = await sa(e, t, r);
  return n === null ? !1 : n.attempsLeft < 1;
}
o(qr, "isSignInRateLimited");
async function Xr(e, t, r) {
  let n = await sa(e, t, r);
  if (n !== null)
    await e.db.patch(n.limit._id, {
      attemptsLeft: n.attempsLeft - 1,
      lastAttemptTime: Date.now()
    });
  else {
    let i = aa(r);
    await e.db.insert("authRateLimits", {
      identifier: t,
      attemptsLeft: i - 1,
      lastAttemptTime: Date.now()
    });
  }
}
o(Xr, "recordFailedSignIn");
async function Zr(e, t) {
  let r = await e.db.query("authRateLimits").withIndex("identifier", (n) => n.eq("identifier", t)).unique();
  r !== null && await e.db.delete(r._id);
}
o(Zr, "resetSignInRateLimit");
async function sa(e, t, r) {
  let n = Date.now(), i = aa(r), s = await e.db.query("authRateLimits").withIndex("identifier", (u) => u.eq("identifier", t)).unique();
  if (s === null)
    return null;
  let a = n - s.lastAttemptTime, c = i / (3600 * 1e3), d = Math.min(i, s.attemptsLeft + a * c);
  return { limit: s, attempsLeft: d };
}
o(sa, "getRateLimitState");
function aa(e) {
  return e.signIn?.maxFailedAttempsPerHour ?? 10;
}
o(aa, "configuredMaxAttempsPerHour");

// node_modules/@convex-dev/auth/dist/server/implementation/users.js
async function Se(e, t, r, n, i) {
  let s = await Jd(e, t, "existingAccount" in r ? r.existingAccount : null, n, i), a = await jd(e, s, r, n);
  return { userId: s, accountId: a };
}
o(Se, "upsertUserAndAccount");
async function Jd(e, t, r, n, i) {
  g(v.DEBUG, "defaultCreateOrUpdateUser args:", {
    existingAccountId: r?._id,
    existingSessionId: t,
    args: n
  });
  let s = r?.userId ?? null;
  if (i.callbacks?.createOrUpdateUser !== void 0)
    return g(v.DEBUG, "Using custom createOrUpdateUser callback"), await i.callbacks.createOrUpdateUser(e, {
      existingUserId: s,
      ...n
    });
  let { provider: a, profile: { emailVerified: c, phoneVerified: d, ...u } } = n, f = c ?? ((a.type === "oauth" || a.type === "oidc") && a.allowDangerousEmailAccountLinking !== !1), l = d ?? !1, y = n.shouldLinkViaEmail || f || a.type === "email", p = n.shouldLinkViaPhone || l || a.type === "phone", m = s;
  if (s === null) {
    let b = typeof u.email == "string" && y ? (await Md(e, u.email))?._id ?? null : null, k = typeof u.phone == "string" && p ? (await zd(e, u.phone))?._id ?? null : null;
    b !== null && k !== null ? (g(v.DEBUG, `Found existing email and phone verified users, so not linking: email: ${b}, phone: ${k}`), m = null) : b !== null ? (g(v.DEBUG, `Found existing email verified user, linking: ${b}`), m = b) : k !== null ? (g(v.DEBUG, `Found existing phone verified user, linking: ${k}`), m = k) : (g(v.DEBUG, "No existing verified users found, creating new user"), m = null);
  }
  let S = {
    ...f ? { emailVerificationTime: Date.now() } : null,
    ...l ? { phoneVerificationTime: Date.now() } : null,
    ...u
  }, I = m;
  if (m !== null)
    try {
      await e.db.patch(m, S);
    } catch (b) {
      throw new Error(`Could not update user document with ID \`${m}\`, either the user has been deleted but their account has not, or the profile data doesn't match the \`users\` table schema: ${b.message}`);
    }
  else
    m = await e.db.insert("users", S);
  let A = i.callbacks?.afterUserCreatedOrUpdated;
  return A !== void 0 ? (g(v.DEBUG, "Calling custom afterUserCreatedOrUpdated callback"), await A(e, {
    userId: m,
    existingUserId: I,
    ...n
  })) : g(v.DEBUG, "No custom afterUserCreatedOrUpdated callback, skipping"), m;
}
o(Jd, "defaultCreateOrUpdateUser");
async function Md(e, t) {
  let r = await e.db.query("users").withIndex("email", (n) => n.eq("email", t)).filter((n) => n.neq(n.field("emailVerificationTime"), void 0)).take(2);
  return r.length === 1 ? r[0] : null;
}
o(Md, "uniqueUserWithVerifiedEmail");
async function zd(e, t) {
  let r = await e.db.query("users").withIndex("phone", (n) => n.eq("phone", t)).filter((n) => n.neq(n.field("phoneVerificationTime"), void 0)).take(2);
  return r.length === 1 ? r[0] : null;
}
o(zd, "uniqueUserWithVerifiedPhone");
async function jd(e, t, r, n) {
  let i = "existingAccount" in r ? r.existingAccount._id : await e.db.insert("authAccounts", {
    userId: t,
    provider: n.provider.id,
    providerAccountId: r.providerAccountId,
    secret: r.secret
  });
  return "existingAccount" in r && r.existingAccount.userId !== t && await e.db.patch(i, { userId: t }), n.profile.emailVerified && await e.db.patch(i, { emailVerified: n.profile.email }), n.profile.phoneVerified && await e.db.patch(i, { phoneVerified: n.profile.phone }), i;
}
o(jd, "createOrUpdateAccount");
async function ca(e, t) {
  let r = await e.db.get(t);
  if (r === null)
    throw new Error(`Expected an account to exist for ID "${t}"`);
  return r;
}
o(ca, "getAccountOrThrow");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifyCodeAndSignIn.js
var ua = h.object({
  params: h.any(),
  provider: h.optional(h.string()),
  verifier: h.optional(h.string()),
  generateTokens: h.boolean(),
  allowExtraProviders: h.boolean()
});
async function da(e, t, r, n) {
  g(v.DEBUG, "verifyCodeAndSignInImpl args:", {
    params: { email: t.params.email, phone: t.params.phone },
    provider: t.provider,
    verifier: t.verifier,
    generateTokens: t.generateTokens,
    allowExtraProviders: t.allowExtraProviders
  });
  let { generateTokens: i, provider: s, allowExtraProviders: a } = t, c = t.params.email ?? t.params.phone;
  if (c !== void 0 && await qr(e, c, n))
    return g(v.ERROR, "Too many failed attempts to verify code for this email"), null;
  let d = await Vd(e, t, s ?? null, r, a, n, await te(e));
  if (d === null)
    return c !== void 0 && await Xr(e, c, n), null;
  c !== void 0 && await Zr(e, c);
  let { userId: u } = d, f = await Gr(e, n, u);
  return await Fr(e, n, u, f, i);
}
o(da, "verifyCodeAndSignInImpl");
var Rt = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "verifyCodeAndSignIn",
    ...t
  }
}), "callVerifyCodeAndSignIn");
async function Vd(e, t, r, n, i, s, a) {
  let { params: c, verifier: d } = t, u = await Ye(c.code), f = await e.db.query("authVerificationCodes").withIndex("code", (b) => b.eq("code", u)).unique();
  if (f === null)
    return g(v.ERROR, "Invalid verification code"), null;
  if (await e.db.delete(f._id), f.verifier !== d)
    return g(v.ERROR, "Invalid verifier"), null;
  if (f.expirationTime < Date.now())
    return g(v.ERROR, "Expired verification code"), null;
  let { accountId: l, emailVerified: y, phoneVerified: p } = f, m = await e.db.get(l);
  if (m === null)
    return g(v.ERROR, "Account associated with this email has been deleted"), null;
  if (r !== null && f.provider !== r)
    return g(v.ERROR, `Invalid provider "${r}" for given \`code\`, which was generated by provider "${f.provider}"`), null;
  let S = n(f.provider, i);
  S !== null && (S.type === "email" || S.type === "phone") && S.authorize !== void 0 && await S.authorize(t.params, m);
  let I = m.userId, A = n(m.provider);
  return A.type === "oauth" || A.type === "oidc" || ({ userId: I } = await Se(e, a, { existingAccount: m }, {
    type: "verification",
    provider: A,
    profile: {
      ...y !== void 0 ? { email: y, emailVerified: !0 } : {},
      ...p !== void 0 ? { phone: p, phoneVerified: !0 } : {}
    }
  }, s)), { providerAccountId: m.providerAccountId, userId: I };
}
o(Vd, "verifyCodeOnly");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifierSignature.js
var la = h.object({
  verifier: h.string(),
  signature: h.string()
});
async function fa(e, t) {
  let { verifier: r, signature: n } = t, i = await e.db.get(r);
  if (i === null)
    throw new Error("Invalid verifier");
  return await e.db.patch(i._id, { signature: n });
}
o(fa, "verifierSignatureImpl");
var Eo = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "verifierSignature",
    ...t
  }
}), "callVerifierSignature");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/userOAuth.js
var Fd = 1e3 * 60 * 2, pa = h.object({
  provider: h.string(),
  providerAccountId: h.string(),
  profile: h.any(),
  signature: h.string()
});
async function ha(e, t, r, n) {
  g("DEBUG", "userOAuthImpl args:", t);
  let { profile: i, provider: s, providerAccountId: a, signature: c } = t, d = r(s), u = await e.db.query("authAccounts").withIndex("providerAndAccountId", (m) => m.eq("provider", s).eq("providerAccountId", a)).unique(), f = await e.db.query("authVerifiers").withIndex("signature", (m) => m.eq("signature", c)).unique();
  if (f === null)
    throw new Error("Invalid state");
  let { accountId: l } = await Se(e, f.sessionId ?? null, u !== null ? { existingAccount: u } : { providerAccountId: a }, { type: "oauth", provider: d, profile: i }, n), y = Mr(8, "0123456789");
  await e.db.delete(f._id);
  let p = await e.db.query("authVerificationCodes").withIndex("accountId", (m) => m.eq("accountId", l)).unique();
  return p !== null && await e.db.delete(p._id), await e.db.insert("authVerificationCodes", {
    code: await Ye(y),
    accountId: l,
    provider: s,
    expirationTime: Date.now() + Fd,
    // The use of a verifier means we don't need an identifier
    // during verification.
    verifier: f._id
  }), y;
}
o(ha, "userOAuthImpl");
var ko = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "userOAuth",
    ...t
  }
}), "callUserOAuth");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/createVerificationCode.js
var ma = h.object({
  accountId: h.optional(h.id("authAccounts")),
  provider: h.string(),
  email: h.optional(h.string()),
  phone: h.optional(h.string()),
  code: h.string(),
  expirationTime: h.number(),
  allowExtraProviders: h.boolean()
});
async function ya(e, t, r, n) {
  g(v.DEBUG, "createVerificationCodeImpl args:", t);
  let { email: i, phone: s, code: a, expirationTime: c, provider: d, accountId: u, allowExtraProviders: f } = t, l = u !== void 0 ? await ca(e, u) : await e.db.query("authAccounts").withIndex("providerAndAccountId", (m) => m.eq("provider", d).eq("providerAccountId", i ?? s)).unique(), y = r(d, f), { accountId: p } = await Se(e, await te(e), l !== null ? { existingAccount: l } : { providerAccountId: i ?? s }, y.type === "email" ? { type: "email", provider: y, profile: { email: i } } : { type: "phone", provider: y, profile: { phone: s } }, n);
  return await Gd(e, p, d, a, c, { email: i, phone: s }), i ?? s;
}
o(ya, "createVerificationCodeImpl");
var Io = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "createVerificationCode",
    ...t
  }
}), "callCreateVerificationCode");
async function Gd(e, t, r, n, i, { email: s, phone: a }) {
  let c = await e.db.query("authVerificationCodes").withIndex("accountId", (d) => d.eq("accountId", t)).unique();
  c !== null && await e.db.delete(c._id), await e.db.insert("authVerificationCodes", {
    accountId: t,
    provider: r,
    code: await Ye(n),
    expirationTime: i,
    emailVerified: s,
    phoneVerified: a
  });
}
o(Gd, "generateUniqueVerificationCode");

// node_modules/@convex-dev/auth/dist/server/implementation/provider.js
async function Qr(e, t) {
  if (e.type !== "credentials")
    throw new Error(`Provider ${e.id} is not a credentials provider`);
  let r = e.crypto?.hashSecret;
  if (r === void 0)
    throw new Error(`Provider ${e.id} does not have a \`crypto.hashSecret\` function`);
  return await r(t);
}
o(Qr, "hash");
async function Yr(e, t, r) {
  if (e.type !== "credentials")
    throw new Error(`Provider ${e.id} is not a credentials provider`);
  let n = e.crypto?.verifySecret;
  if (n === void 0)
    throw new Error(`Provider ${e.id} does not have a \`crypto.verifySecret\` function`);
  return await n(t, r);
}
o(Yr, "verify");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/createAccountFromCredentials.js
var ga = h.object({
  provider: h.string(),
  account: h.object({ id: h.string(), secret: h.optional(h.string()) }),
  profile: h.any(),
  shouldLinkViaEmail: h.optional(h.boolean()),
  shouldLinkViaPhone: h.optional(h.boolean())
});
async function ba(e, t, r, n) {
  g(v.DEBUG, "createAccountFromCredentialsImpl args:", {
    provider: t.provider,
    account: {
      id: t.account.id,
      secret: L(t.account.secret ?? "")
    }
  });
  let { provider: i, account: s, profile: a, shouldLinkViaEmail: c, shouldLinkViaPhone: d } = t, u = r(i), f = await e.db.query("authAccounts").withIndex("providerAndAccountId", (m) => m.eq("provider", u.id).eq("providerAccountId", s.id)).unique();
  if (f !== null) {
    if (s.secret !== void 0 && !await Yr(u, s.secret, f.secret ?? ""))
      throw new Error(`Account ${s.id} already exists`);
    return {
      account: f,
      // TODO: Ian removed this,
      user: await e.db.get(f.userId)
    };
  }
  let l = s.secret !== void 0 ? await Qr(u, s.secret) : void 0, { userId: y, accountId: p } = await Se(e, await te(e), { providerAccountId: s.id, secret: l }, {
    type: "credentials",
    provider: u,
    profile: a,
    shouldLinkViaEmail: c,
    shouldLinkViaPhone: d
  }, n);
  return {
    account: await e.db.get(p),
    user: await e.db.get(y)
  };
}
o(ba, "createAccountFromCredentialsImpl");
var To = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "createAccountFromCredentials",
    ...t
  }
}), "callCreateAccountFromCredentials");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/retrieveAccountWithCredentials.js
var _a = h.object({
  provider: h.string(),
  account: h.object({ id: h.string(), secret: h.optional(h.string()) })
});
async function xa(e, t, r, n) {
  let { provider: i, account: s } = t;
  g(v.DEBUG, "retrieveAccountWithCredentialsImpl args:", {
    provider: i,
    account: {
      id: s.id,
      secret: L(s.secret ?? "")
    }
  });
  let a = await e.db.query("authAccounts").withIndex("providerAndAccountId", (c) => c.eq("provider", i).eq("providerAccountId", s.id)).unique();
  if (a === null)
    return "InvalidAccountId";
  if (s.secret !== void 0) {
    if (await qr(e, a._id, n))
      return "TooManyFailedAttempts";
    if (!await Yr(r(i), s.secret, a.secret ?? ""))
      return await Xr(e, a._id, n), "InvalidSecret";
    await Zr(e, a._id);
  }
  return {
    account: a,
    // TODO: Ian removed this
    user: await e.db.get(a.userId)
  };
}
o(xa, "retrieveAccountWithCredentialsImpl");
var Ro = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "retrieveAccountWithCredentials",
    ...t
  }
}), "callRetreiveAccountWithCredentials");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/modifyAccount.js
var Sa = h.object({
  provider: h.string(),
  account: h.object({ id: h.string(), secret: h.string() })
});
async function va(e, t, r) {
  let { provider: n, account: i } = t;
  g(v.DEBUG, "retrieveAccountWithCredentialsImpl args:", {
    provider: n,
    account: {
      id: i.id,
      secret: L(i.secret ?? "")
    }
  });
  let s = await e.db.query("authAccounts").withIndex("providerAndAccountId", (a) => a.eq("provider", n).eq("providerAccountId", i.id)).unique();
  if (s === null)
    throw new Error(`Cannot modify account with ID ${i.id} because it does not exist`);
  await e.db.patch(s._id, {
    secret: await Qr(r(n), i.secret)
  });
}
o(va, "modifyAccountImpl");
var Co = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "modifyAccount",
    ...t
  }
}), "callModifyAccount");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/invalidateSessions.js
var Aa = h.object({
  userId: h.id("users"),
  except: h.optional(h.array(h.id("authSessions")))
}), Po = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "invalidateSessions",
    ...t
  }
}), "callInvalidateSessions"), Ea = /* @__PURE__ */ o(async (e, t) => {
  g(v.DEBUG, "invalidateSessionsImpl args:", t);
  let { userId: r, except: n } = t, i = new Set(n ?? []), s = await e.db.query("authSessions").withIndex("userId", (a) => a.eq("userId", r)).collect();
  for (let a of s)
    i.has(a._id) || await Tt(e, a);
}, "invalidateSessionsImpl");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifier.js
async function ka(e) {
  return await e.db.insert("authVerifiers", {
    sessionId: await te(e) ?? void 0
  });
}
o(ka, "verifierImpl");
var Uo = /* @__PURE__ */ o(async (e) => e.runMutation("auth:store", {
  args: {
    type: "verifier"
  }
}), "callVerifier");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/index.js
var Ia = h.object({
  args: h.union(h.object({
    type: h.literal("signIn"),
    ...ta.fields
  }), h.object({
    type: h.literal("signOut")
  }), h.object({
    type: h.literal("refreshSession"),
    ...oa.fields
  }), h.object({
    type: h.literal("verifyCodeAndSignIn"),
    ...ua.fields
  }), h.object({
    type: h.literal("verifier")
  }), h.object({
    type: h.literal("verifierSignature"),
    ...la.fields
  }), h.object({
    type: h.literal("userOAuth"),
    ...pa.fields
  }), h.object({
    type: h.literal("createVerificationCode"),
    ...ma.fields
  }), h.object({
    type: h.literal("createAccountFromCredentials"),
    ...ga.fields
  }), h.object({
    type: h.literal("retrieveAccountWithCredentials"),
    ..._a.fields
  }), h.object({
    type: h.literal("modifyAccount"),
    ...Sa.fields
  }), h.object({
    type: h.literal("invalidateSessions"),
    ...Aa.fields
  }))
}), Ta = /* @__PURE__ */ o(async (e, t, r, n) => {
  let i = t.args;
  switch (g(v.INFO, `\`auth:store\` type: ${i.type}`), i.type) {
    case "signIn":
      return ra(e, i, n);
    case "signOut":
      return na(e);
    case "refreshSession":
      return ia(e, i, r, n);
    case "verifyCodeAndSignIn":
      return da(e, i, r, n);
    case "verifier":
      return ka(e);
    case "verifierSignature":
      return fa(e, i);
    case "userOAuth":
      return ha(e, i, r, n);
    case "createVerificationCode":
      return ya(e, i, r, n);
    case "createAccountFromCredentials":
      return ba(e, i, r, n);
    case "retrieveAccountWithCredentials":
      return xa(e, i, r, n);
    case "modifyAccount":
      return va(e, i, r);
    case "invalidateSessions":
      return Ea(e, i);
    default:
  }
}, "storeImpl");

// node_modules/@convex-dev/auth/dist/server/implementation/redirects.js
async function en(e, t) {
  if (t.redirectTo !== void 0) {
    if (typeof t.redirectTo != "string")
      throw new Error(`Expected \`redirectTo\` to be a string, got ${t.redirectTo}`);
    return await (e.callbacks?.redirect ?? qd)(t);
  }
  return Ra();
}
o(en, "redirectAbsoluteUrl");
async function qd({ redirectTo: e }) {
  let t = Ra();
  if (e.startsWith("?") || e.startsWith("/"))
    return `${t}${e}`;
  if (e.startsWith(t)) {
    let r = e[t.length];
    if (r === void 0 || r === "?" || r === "/")
      return e;
  }
  throw new Error(`Invalid \`redirectTo\` ${e} for configured SITE_URL: ${t.toString()}`);
}
o(qd, "defaultRedirectCallback");
function tn(e, t, r) {
  let n = /([^:]+):(.*)/, [, i, s] = e.match(n), a = /^\/\/(?:\/|$|\?)/.test(s), c = a && s.startsWith("///"), d = new URL(`http:${a ? "//googblibok" + s.slice(2) : s}`);
  d.searchParams.set(t, r);
  let [, , u] = d.toString().match(n);
  return `${i}:${a ? (c ? "/" : "") + "//" + u.slice(13) : u}`;
}
o(tn, "setURLSearchParam");
function Ra() {
  return F("SITE_URL").replace(/\/$/, "");
}
o(Ra, "siteUrl");

// node_modules/@convex-dev/auth/dist/server/implementation/signIn.js
var Xd = 3600 * 24;
async function Oo(e, t, r, n) {
  if (t === null && r.refreshToken)
    return { kind: "refreshTokens", signedIn: { tokens: await Ao(e, {
      refreshToken: r.refreshToken
    }) } };
  if (t === null && r.params?.code !== void 0)
    return {
      kind: "signedIn",
      signedIn: await Rt(e, {
        params: r.params,
        verifier: r.verifier,
        generateTokens: !0,
        allowExtraProviders: n.allowExtraProviders
      })
    };
  if (t === null)
    throw new Error("Cannot sign in: Missing `provider`, `params.code` or `refreshToken`");
  if (t.type === "email" || t.type === "phone")
    return Zd(e, t, r, n);
  if (t.type === "credentials")
    return Qd(e, t, r, n);
  if (t.type === "oauth" || t.type === "oidc")
    return Yd(e, t, r, n);
  let i = t;
  throw new Error(`Provider type ${t.type} is not supported yet`);
}
o(Oo, "signInImpl");
async function Zd(e, t, r, n) {
  if (r.params?.code !== void 0) {
    let f = await Rt(e, {
      params: r.params,
      provider: t.id,
      generateTokens: n.generateTokens,
      allowExtraProviders: n.allowExtraProviders
    });
    if (f === null)
      throw new Error("Could not verify code");
    return {
      kind: "signedIn",
      signedIn: f
    };
  }
  let s = t.generateVerificationToken ? await t.generateVerificationToken() : Mr(32, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), a = Date.now() + (t.maxAge ?? Xd) * 1e3, c = await Io(e, {
    provider: t.id,
    accountId: r.accountId,
    email: r.params?.email,
    phone: r.params?.phone,
    code: s,
    expirationTime: a,
    allowExtraProviders: n.allowExtraProviders
  }), d = await en(e.auth.config, r.params ?? {}), u = {
    identifier: c,
    url: tn(d, "code", s),
    token: s,
    expires: new Date(a)
  };
  return t.type === "email" ? await t.sendVerificationRequest(
    {
      ...u,
      provider: {
        ...t,
        from: (
          // Simplifies demo configuration of Resend
          t.from === "Auth.js <no-reply@authjs.dev>" && t.id === "resend" ? "My App <onboarding@resend.dev>" : t.from
        )
      },
      request: new Request("http://localhost"),
      // TODO: Document
      theme: e.auth.config.theme
    },
    // @ts-expect-error Figure out typing for email providers so they can
    // access ctx.
    e
  ) : t.type === "phone" && await t.sendVerificationRequest({ ...u, provider: t }, e), { kind: "started", started: !0 };
}
o(Zd, "handleEmailAndPhoneProvider");
async function Qd(e, t, r, n) {
  let i = await t.authorize(r.params ?? {}, e);
  return i === null ? { kind: "signedIn", signedIn: null } : {
    kind: "signedIn",
    signedIn: await So(e, {
      userId: i.userId,
      sessionId: i.sessionId,
      generateTokens: n.generateTokens
    })
  };
}
o(Qd, "handleCredentials");
async function Yd(e, t, r, n) {
  if (r.params?.code !== void 0)
    return {
      kind: "signedIn",
      signedIn: await Rt(e, {
        params: r.params,
        verifier: r.verifier,
        generateTokens: !0,
        allowExtraProviders: n.allowExtraProviders
      })
    };
  let i = new URL((process.env.CUSTOM_AUTH_SITE_URL ?? F("CONVEX_SITE_URL")) + `/api/auth/signin/${t.id}`), s = await Uo(e);
  if (i.searchParams.set("code", s), r.params?.redirectTo !== void 0) {
    if (typeof r.params.redirectTo != "string")
      throw new Error(`Expected \`redirectTo\` to be a string, got ${r.params.redirectTo}`);
    i.searchParams.set("redirectTo", r.params.redirectTo);
  }
  return { kind: "redirect", redirect: i.toString(), verifier: s };
}
o(Yd, "handleOAuthProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/checks.js
var Ca = 900;
async function Lo(e, t, r) {
  let { cookies: n } = r, i = n[e], s = /* @__PURE__ */ new Date();
  s.setTime(s.getTime() + Ca * 1e3), g("DEBUG", `CREATE_${e.toUpperCase()}`, {
    name: i.name,
    payload: t,
    COOKIE_TTL: Ca,
    expires: s
  });
  let a = { ...i.options, expires: s };
  return { name: i.name, value: t, options: a };
}
o(Lo, "createCookie");
function el(e, t, r) {
  let { cookies: n } = t, i = n[e];
  g("DEBUG", `CLEAR_${e.toUpperCase()}`, { cookie: i }), r.push({
    name: i.name,
    value: "",
    options: { ...n[e].options, maxAge: 0 }
  });
}
o(el, "clearCookie");
function Ho(e, t) {
  return async function(r, n, i) {
    let { provider: s } = i;
    if (!s?.checks?.includes(e))
      return;
    let a = r?.[i.cookies[t].name];
    return g("DEBUG", `USE_${t.toUpperCase()}`, { value: a }), el(t, i, n), a;
  };
}
o(Ho, "useCookie");
var rn = {
  /** Creates a PKCE code challenge and verifier pair. The verifier is stored in the cookie. */
  async create(e) {
    let t = Pr(), r = await Lr(t);
    return { cookie: await Lo("pkceCodeVerifier", t, e), codeChallenge: r, codeVerifier: t };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   */
  use: Ho("pkce", "pkceCodeVerifier")
}, nn = {
  /** Creates a state cookie with an optionally encoded body. */
  async create(e, t) {
    let { provider: r } = e;
    if (!r.checks.includes("state")) {
      if (t)
        throw new Error("State data was provided but the provider is not configured to use state");
      return;
    }
    let n = Ur();
    return { cookie: await Lo("state", n, e), value: n };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   */
  use: Ho("state", "state")
}, on = {
  async create(e) {
    if (!e.provider.checks.includes("nonce"))
      return;
    let t = Or();
    return { cookie: await Lo("nonce", t, e), value: t };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  use: Ho("nonce", "nonce")
};

// node_modules/@convex-dev/auth/dist/server/oauth/lib/utils/customFetch.js
function et(e) {
  return { [_e]: e[we] ?? fetch };
}
o(et, "fetchOpt");

// node_modules/@convex-dev/auth/dist/server/oauth/convexAuth.js
function sn(e) {
  return (process.env.CUSTOM_AUTH_SITE_URL ?? F("CONVEX_SITE_URL")) + "/api/auth/callback/" + e;
}
o(sn, "callbackUrl");
function an({ codeVerifier: e, state: t, nonce: r }) {
  return [e, t, r].filter((n) => n !== void 0).join(" ");
}
o(an, "getAuthorizationSignature");
function Do(e, t) {
  return (Ut(process.env.CONVEX_SITE_URL) ? "" : "__Host-") + t + "OAuth" + e;
}
o(Do, "oauthStateCookieName");
var Ko = /* @__PURE__ */ o((e) => ({
  pkceCodeVerifier: {
    name: Do("pkce", e),
    options: {
      ...oe
    }
  },
  state: {
    name: Do("state", e),
    options: {
      ...oe
    }
  },
  nonce: {
    name: Do("nonce", e),
    options: {
      ...oe
    }
  },
  // ConvexAuth: We don't support webauthn, so this value doesn't actually matter
  webauthnChallenge: {
    name: "ConvexAuth_shouldNotBeUsed_webauthnChallenge",
    options: {
      ...oe
    }
  },
  // ConvexAuth: We don't use these cookies, so their values should never be used
  sessionToken: {
    name: "ConvexAuth_shouldNotBeUsed_sessionToken",
    options: {
      ...oe
    }
  },
  callbackUrl: {
    name: "ConvexAuth_shouldNotBeUsed_callbackUrl",
    options: {
      ...oe
    }
  },
  csrfToken: {
    name: "ConvexAuth_shouldNotBeUsed_csrfToken",
    options: {
      ...oe
    }
  }
}), "defaultCookiesOptions");
async function No(e) {
  if (!e.authorization || !e.token || !e.userinfo) {
    if (!e.issuer)
      throw new Error(`Provider \`${e.id}\` is missing an \`issuer\` URL configuration. Consult the provider docs.`);
    let i = new URL(e.issuer), s = await ls(i, {
      ...et(e),
      [le]: !0
    }), a = await fs(i, s);
    if (!a.token_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
    let c = a;
    return {
      ...e,
      checks: e.checks,
      profile: e.profile,
      account: e.account,
      clientId: e.clientId,
      idToken: e.type === "oidc" ? e.idToken : void 0,
      // ConvexAuth: Apparently it's important for us to normalize the endpoint after
      // service discovery (https://github.com/get-convex/convex-auth/commit/35bf716bfb0d29dbce1cbca318973b0732f75015)
      authorization: Le({
        ...e.authorization,
        url: c.authorization_endpoint
      }),
      token: Le({
        ...e.token,
        url: c.token_endpoint
      }),
      userinfo: c.userinfo_endpoint ? Le({
        ...e.userinfo,
        url: c.userinfo_endpoint
      }) : e.userinfo,
      as: c,
      configSource: "discovered"
    };
  }
  let t = Le(e.authorization), r = Le(e.token), n = e.userinfo ? Le(e.userinfo) : void 0;
  return {
    ...e,
    checks: e.checks,
    profile: e.profile,
    account: e.account,
    clientId: e.clientId,
    idToken: e.type === "oidc" ? e.idToken : void 0,
    authorization: t,
    token: r,
    userinfo: n,
    as: {
      issuer: e.issuer ?? "theremustbeastringhere.dev",
      authorization_endpoint: t?.url.toString(),
      token_endpoint: r?.url.toString(),
      userinfo_endpoint: n?.url.toString()
    },
    configSource: "provided"
  };
}
o(No, "oAuthConfigToInternalProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/authorizationUrl.js
async function Ua(e) {
  let { provider: t } = e, r = t.authorization?.url, { as: n, authorization: i, configSource: s } = t;
  if (!i)
    throw new TypeError("Could not determine the authorization endpoint.");
  r || (r = new URL(i.url));
  let a = r.searchParams, c = sn(t.id), d = Object.assign({
    response_type: "code",
    // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
    client_id: t.clientId,
    redirect_uri: c,
    // @ts-expect-error TODO:
    ...t.authorization?.params
  }, Object.fromEntries(r.searchParams.entries() ?? []));
  for (let m in d)
    a.set(m, d[m]);
  let u = [], f = await nn.create(e);
  f && (a.set("state", f.value), u.push(f.cookie));
  let l;
  if (t.checks?.includes("pkce"))
    if (s === "discovered" && !n.code_challenge_methods_supported?.includes("S256"))
      t.type === "oidc" && (t.checks = ["nonce"]);
    else {
      let m = await rn.create(e);
      a.set("code_challenge", m.codeChallenge), a.set("code_challenge_method", "S256"), u.push(m.cookie), l = m.codeVerifier;
    }
  let y = await on.create(e);
  y && (a.set("nonce", y.value), u.push(y.cookie)), t.type === "oidc" && !r.searchParams.has("scope") && r.searchParams.set("scope", "openid profile email"), g("DEBUG", "authorization url is ready", {
    url: r,
    cookies: u,
    provider: t
  });
  let p = an({
    codeVerifier: l,
    state: a.get("state") ?? void 0,
    nonce: a.get("nonce") ?? void 0
  });
  return { redirect: r.toString(), cookies: u, signature: p };
}
o(Ua, "getAuthorizationUrl");

// node_modules/@convex-dev/auth/dist/server/oauth/lib/utils/providers.js
function Oa(e) {
  return e.type === "oidc";
}
o(Oa, "isOIDCProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/callback.js
function La(e) {
  return encodeURIComponent(e).replace(/%20/g, "+");
}
o(La, "formUrlEncode");
function tl(e, t) {
  let r = La(e), n = La(t);
  return `Basic ${btoa(`${r}:${n}`)}`;
}
o(tl, "clientSecretBasic");
async function Ha(e, t, r) {
  let { provider: n } = r, { userinfo: i, as: s } = n, a = {
    client_id: n.clientId,
    ...n.client
  }, c;
  switch (a.token_endpoint_auth_method) {
    // TODO: in the next breaking major version have undefined be `client_secret_post`
    case void 0:
    case "client_secret_basic":
      c = /* @__PURE__ */ o((k, P, Z, V) => {
        V.set("authorization", tl(n.clientId, n.clientSecret));
      }, "clientAuth");
      break;
    case "client_secret_post":
      c = hs(n.clientSecret);
      break;
    case "client_secret_jwt":
      c = ws(n.clientSecret);
      break;
    case "private_key_jwt":
      c = ys(n.token.clientPrivateKey, {
        // TODO: review in the next breaking change
        [Tr](k, P) {
          P.aud = [s.issuer, s.token_endpoint];
        }
      });
      break;
    default:
      throw new Error("unsupported client authentication method");
  }
  let d = [], u = await nn.use(t, d, r), f;
  try {
    f = Os(s, a, new URLSearchParams(e), n.checks.includes("state") ? u : oo);
  } catch (k) {
    if (k instanceof St) {
      let P = {
        providerId: n.id,
        ...Object.fromEntries(k.cause.entries())
      };
      throw g("DEBUG", "OAuthCallbackError", P), new Error("OAuth Provider returned an error", { cause: P });
    }
    throw k;
  }
  let l = await rn.use(t, d, r), y = sn(n.id), p = await Ts(s, a, c, f, y, l ?? "decoy", {
    // TODO: move away from allowing insecure HTTP requests
    [le]: !0,
    [_e]: (...k) => (n.checks.includes("pkce") || k[1].body.delete("code_verifier"), et(n)[_e](...k))
  });
  n.token?.conform && (p = await n.token.conform(p.clone()) ?? p);
  let m = {}, S = await on.use(t, d, r), I = Oa(n), A = await Rs(s, a, p, {
    expectedNonce: S,
    requireIdToken: I
  }), b = A;
  if (I) {
    let k = Kr(A);
    if (k === void 0)
      throw new Error("ID Token claims are missing");
    let P = k;
    if (m = P, n.id === "apple")
      try {
        m.user = JSON.parse(e?.user);
      } catch {
      }
    if (n.idToken === !1) {
      let Z = await to(s, a, A.access_token, {
        ...et(n),
        // TODO: move away from allowing insecure HTTP requests
        [le]: !0
      });
      m = await xs(s, a, P.sub, Z);
    }
  } else if (i?.request) {
    let k = await i.request({ tokens: b, provider: n });
    k instanceof Object && (m = k);
  } else if (i?.url)
    m = await (await to(s, a, A.access_token, et(n))).json();
  else
    throw new TypeError("No userinfo endpoint configured");
  return b.expires_in && (b.expires_at = Math.floor(Date.now() / 1e3) + Number(b.expires_in)), {
    profile: m,
    tokens: b,
    cookies: d,
    signature: an({ codeVerifier: l, state: u, nonce: S })
  };
}
o(Ha, "handleOAuth");

// node_modules/@convex-dev/auth/dist/server/implementation/index.js
function rl(e) {
  let t = Ns(e), r = t.providers.some((c) => c.type === "oauth" || c.type === "oidc"), n = /* @__PURE__ */ o((c, d = !1) => t.providers.find((u) => u.id === c) ?? (d ? t.extraProviders.find((u) => u.id === c) : void 0), "getProvider"), i = /* @__PURE__ */ o((c, d = !1) => {
    let u = n(c, d);
    if (u === void 0) {
      let f = `Provider \`${c}\` is not configured, available providers are ${Bs(t, d)}.`;
      throw g(v.ERROR, f), new Error(f);
    }
    return u;
  }, "getProviderOrThrow"), s = /* @__PURE__ */ o((c) => ({ ...c, auth: { ...c.auth, config: t } }), "enrichCtx");
  return {
    /**
     * Helper for configuring HTTP actions.
     */
    auth: {
      /**
       * @deprecated - Use `getAuthUserId` from "@convex-dev/auth/server":
       *
       * ```ts
       * import { getAuthUserId } from "@convex-dev/auth/server";
       * ```
       *
       * @hidden
       */
      getUserId: /* @__PURE__ */ o(async (c) => {
        let d = await c.auth.getUserIdentity();
        if (d === null)
          return null;
        let [u] = d.subject.split(xe);
        return u;
      }, "getUserId"),
      /**
       * @deprecated - Use `getAuthSessionId` from "@convex-dev/auth/server":
       *
       * ```
       * import { getAuthSessionId } from "@convex-dev/auth/server";
       * ```
       *
       * @hidden
       */
      getSessionId: /* @__PURE__ */ o(async (c) => {
        let d = await c.auth.getUserIdentity();
        if (d === null)
          return null;
        let [, u] = d.subject.split(xe);
        return u;
      }, "getSessionId"),
      /**
       * Add HTTP actions for JWT verification and OAuth sign-in.
       *
       * ```ts
       * import { httpRouter } from "convex/server";
       * import { auth } from "./auth.js";
       *
       * const http = httpRouter();
       *
       * auth.addHttpRoutes(http);
       *
       * export default http;
       * ```
       *
       * The following routes are handled always:
       *
       * - `/.well-known/openid-configuration`
       * - `/.well-known/jwks.json`
       *
       * The following routes are handled if OAuth is configured:
       *
       * - `/api/auth/signin/*`
       * - `/api/auth/callback/*`
       *
       * @param http your HTTP router
       */
      addHttpRoutes: /* @__PURE__ */ o((c) => {
        if (c.route({
          path: "/.well-known/openid-configuration",
          method: "GET",
          handler: rt(async () => new Response(JSON.stringify({
            issuer: F("CONVEX_SITE_URL"),
            jwks_uri: F("CONVEX_SITE_URL") + "/.well-known/jwks.json",
            authorization_endpoint: F("CONVEX_SITE_URL") + "/oauth/authorize"
          }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
            }
          }))
        }), c.route({
          path: "/.well-known/jwks.json",
          method: "GET",
          handler: rt(async () => new Response(F("JWKS"), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
            }
          }))
        }), r) {
          c.route({
            pathPrefix: "/api/auth/signin/",
            method: "GET",
            handler: rt(ul(400, async (u, f) => {
              let l = new URL(f.url), p = l.pathname.split("/").at(-1);
              if (p === null)
                throw new Error("Missing provider id");
              let m = l.searchParams.get("code");
              if (m === null)
                throw new Error("Missing sign-in verifier");
              let S = i(p), { redirect: I, cookies: A, signature: b } = await Ua({
                provider: await No(S),
                cookies: Ko(p)
              });
              await Eo(u, {
                verifier: m,
                signature: b
              });
              let k = l.searchParams.get("redirectTo");
              k !== null && A.push(Go(p, k));
              let P = new Headers({ Location: I });
              for (let { name: Z, value: V, options: ve } of A)
                P.append("Set-Cookie", (0, cn.serialize)(Z, V, ve));
              return new Response(null, { status: 302, headers: P });
            }))
          });
          let d = rt(async (u, f) => {
            let l = u, y = new URL(f.url), m = y.pathname.split("/").at(-1);
            g(v.DEBUG, "Handling OAuth callback for provider:", m);
            let S = i(m), I = dl(f), A = qo(S.id, I), b = await en(t, {
              redirectTo: A?.redirectTo
            }), k = y.searchParams;
            if (f.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
              let P = await f.formData();
              for (let [Z, V] of P.entries())
                typeof V == "string" && k.append(Z, V);
            }
            try {
              let { profile: P, tokens: Z, signature: V } = await Ha(Object.fromEntries(k.entries()), I, {
                provider: await No(S),
                cookies: Ko(S.id)
              }), { id: ve, ...He } = await S.profile(P, Z);
              if (typeof ve != "string")
                throw new Error(`The profile method of the ${m} config must return a string ID`);
              let tt = await ko(l, {
                provider: m,
                providerAccountId: ve,
                profile: He,
                signature: V
              });
              return new Response(null, {
                status: 302,
                headers: {
                  Location: tn(b, "code", tt),
                  "Cache-Control": "must-revalidate"
                }
              });
            } catch (P) {
              return xo(P), Response.redirect(b);
            }
          });
          c.route({
            pathPrefix: "/api/auth/callback/",
            method: "GET",
            handler: d
          }), c.route({
            pathPrefix: "/api/auth/callback/",
            method: "POST",
            handler: d
          });
        }
      }, "addHttpRoutes")
    },
    /**
     * Action called by the client to sign the user in.
     *
     * Also used for refreshing the session.
     */
    signIn: un({
      args: {
        provider: h.optional(h.string()),
        params: h.optional(h.any()),
        verifier: h.optional(h.string()),
        refreshToken: h.optional(h.string()),
        calledBy: h.optional(h.string())
      },
      handler: /* @__PURE__ */ o(async (c, d) => {
        d.calledBy !== void 0 && g("INFO", `\`auth:signIn\` called by ${d.calledBy}`);
        let u = d.provider !== void 0 ? i(d.provider) : null, f = await Oo(s(c), u, d, {
          generateTokens: !0,
          allowExtraProviders: !1
        });
        switch (f.kind) {
          case "redirect":
            return { redirect: f.redirect, verifier: f.verifier };
          case "signedIn":
          case "refreshTokens":
            return { tokens: f.signedIn?.tokens ?? null };
          case "started":
            return { started: !0 };
          default: {
            let l = f;
            throw new Error(`Unexpected result from signIn, ${f}`);
          }
        }
      }, "handler")
    }),
    /**
     * Action called by the client to invalidate the current session.
     */
    signOut: un({
      args: {},
      handler: /* @__PURE__ */ o(async (c) => {
        await vo(c);
      }, "handler")
    }),
    /**
     * Internal mutation used by the library to read and write
     * to the database during signin and signout.
     */
    store: Bo({
      args: Ia,
      handler: /* @__PURE__ */ o(async (c, d) => Ta(c, d, i, t), "handler")
    }),
    /**
     * Utility function for frameworks to use to get the current auth state
     * based on credentials that they've supplied separately.
     */
    isAuthenticated: Jo({
      args: {},
      handler: /* @__PURE__ */ o(async (c, d) => await c.auth.getUserIdentity() !== null, "handler")
    })
  };
}
o(rl, "convexAuth");
async function nl(e) {
  let t = await e.auth.getUserIdentity();
  if (t === null)
    return null;
  let [r] = t.subject.split(xe);
  return r;
}
o(nl, "getAuthUserId");
async function ol(e, t) {
  return await To(e, t);
}
o(ol, "createAccount");
async function il(e, t) {
  let n = await Ro(e, t);
  if (typeof n == "string")
    throw new Error(n);
  return n;
}
o(il, "retrieveAccount");
async function sl(e, t) {
  return await Co(e, t);
}
o(sl, "modifyAccountCredentials");
async function al(e, t) {
  return await Po(e, t);
}
o(al, "invalidateSessions");
async function cl(e, t, r) {
  let n = await Oo(e, Ws(t), r, {
    generateTokens: !1,
    allowExtraProviders: !0
  });
  return n.kind === "signedIn" && n.signedIn !== null ? { userId: n.signedIn.userId, sessionId: n.signedIn.sessionId } : null;
}
o(cl, "signInViaProvider");
function ul(e, t) {
  return async (r, n) => {
    try {
      return await t(r, n);
    } catch (i) {
      return i instanceof $o ? new Response(null, {
        status: e,
        statusText: i.data
      }) : (xo(i), new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
      }));
    }
  };
}
o(ul, "convertErrorsToResponse");
function dl(e) {
  return (0, cn.parse)(e.headers.get("Cookie") ?? "");
}
o(dl, "getCookies");

export {
  go as a,
  Hd as b,
  rl as c,
  nl as d,
  ol as e,
  il as f,
  sl as g,
  al as h,
  cl as i
};
/*! Bundled license information:

@auth/core/lib/vendored/cookie.js:
  (**
   * @source https://github.com/jshttp/cookie
   * @author blakeembrey
   * @license MIT
   *)
*/
//# sourceMappingURL=HCQKE6P2.js.map
