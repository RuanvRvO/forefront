import {
  a as $,
  b as _,
  c as X,
  e as G,
  f as M,
  g as J,
  h as Q,
  i as F
} from "./HCQKE6P2.js";
import {
  a
} from "./Q5VBJYR5.js";

// node_modules/@convex-dev/auth/dist/providers/ConvexCredentials.js
function Y(e) {
  return {
    id: "credentials",
    type: "credentials",
    authorize: /* @__PURE__ */ a(async () => null, "authorize"),
    // @ts-expect-error Internal
    options: e
  };
}
a(Y, "ConvexCredentials");

// node_modules/@oslojs/crypto/dist/subtle/index.js
function Z(e, r) {
  if (e.length !== r.length)
    return !1;
  let s = 0;
  for (let t = 0; t < e.length; t++)
    s |= e[t] ^ r[t];
  return s === 0;
}
a(Z, "constantTimeEqual");

// node_modules/lucia/dist/scrypt/index.js
async function se(e, r, s) {
  let { N: t, r: n, p: i } = s, u = s.dkLen ?? 32, c = 1024 ** 3 + 1024, d = 128 * n, f = d / 4;
  if (t <= 1 || (t & t - 1) !== 0 || t >= 2 ** (d / 8) || t > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, less than 2^(128 * r / 8) and less than 2^32");
  if (i < 0 || i > (2 ** 32 - 1) * 32 / d)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (u < 0 || u > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  let y = d * (t + i);
  if (y > c)
    throw new Error(`Scrypt: parameters too large, ${y} (128 * r * (N + p)) > ${c} (maxmem)`);
  let l = await te(e, r, { c: 1, dkLen: d * i }), p = H(l), w = H(new Uint8Array(d * t)), x = H(new Uint8Array(d));
  for (let V = 0; V < i; V++) {
    let k = f * V;
    for (let h = 0; h < f; h++)
      w[h] = p[k + h];
    for (let h = 0, S = 0; h < t - 1; h++)
      O(w, S, w, S += f, n), await new Promise((m) => m());
    O(w, (t - 1) * f, p, k, n);
    for (let h = 0; h < t; h++) {
      let S = p[k + f - 16] % t;
      for (let m = 0; m < f; m++)
        x[m] = p[k + m] ^ w[S * f + m];
      O(x, 0, p, k, n), await new Promise((m) => m());
    }
  }
  let T = await te(e, l, { c: 1, dkLen: u });
  return l.fill(0), w.fill(0), x.fill(0), T;
}
a(se, "scrypt");
function o(e, r) {
  return e << r | e >>> 32 - r;
}
a(o, "rotl");
function ee(e, r, s, t, n, i) {
  let u = e[r++] ^ s[t++], c = e[r++] ^ s[t++], d = e[r++] ^ s[t++], f = e[r++] ^ s[t++], y = e[r++] ^ s[t++], l = e[r++] ^ s[t++], p = e[r++] ^ s[t++], w = e[r++] ^ s[t++], x = e[r++] ^ s[t++], T = e[r++] ^ s[t++], V = e[r++] ^ s[t++], k = e[r++] ^ s[t++], h = e[r++] ^ s[t++], S = e[r++] ^ s[t++], m = e[r++] ^ s[t++], j = e[r++] ^ s[t++], g = u, A = c, C = d, E = f, I = y, v = l, b = p, U = w, P = x, N = T, R = V, z = k, B = h, K = S, L = m, D = j;
  for (let W = 0; W < 8; W += 2)
    I ^= o(g + B | 0, 7), P ^= o(I + g | 0, 9), B ^= o(P + I | 0, 13), g ^= o(B + P | 0, 18), N ^= o(v + A | 0, 7), K ^= o(N + v | 0, 9), A ^= o(K + N | 0, 13), v ^= o(A + K | 0, 18), L ^= o(R + b | 0, 7), C ^= o(L + R | 0, 9), b ^= o(C + L | 0, 13), R ^= o(b + C | 0, 18), E ^= o(D + z | 0, 7), U ^= o(E + D | 0, 9), z ^= o(U + E | 0, 13), D ^= o(z + U | 0, 18), A ^= o(g + E | 0, 7), C ^= o(A + g | 0, 9), E ^= o(C + A | 0, 13), g ^= o(E + C | 0, 18), b ^= o(v + I | 0, 7), U ^= o(b + v | 0, 9), I ^= o(U + b | 0, 13), v ^= o(I + U | 0, 18), z ^= o(R + N | 0, 7), P ^= o(z + R | 0, 9), N ^= o(P + z | 0, 13), R ^= o(N + P | 0, 18), B ^= o(D + L | 0, 7), K ^= o(B + D | 0, 9), L ^= o(K + B | 0, 13), D ^= o(L + K | 0, 18);
  n[i++] = u + g | 0, n[i++] = c + A | 0, n[i++] = d + C | 0, n[i++] = f + E | 0, n[i++] = y + I | 0, n[i++] = l + v | 0, n[i++] = p + b | 0, n[i++] = w + U | 0, n[i++] = x + P | 0, n[i++] = T + N | 0, n[i++] = V + R | 0, n[i++] = k + z | 0, n[i++] = h + B | 0, n[i++] = S + K | 0, n[i++] = m + L | 0, n[i++] = j + D | 0;
}
a(ee, "XorAndSalsa");
async function te(e, r, s) {
  let t = await crypto.subtle.importKey("raw", e, "PBKDF2", !1, ["deriveBits"]), n = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt: r,
    iterations: s.c
  }, t, s.dkLen * 8);
  return new Uint8Array(n);
}
a(te, "pbkdf2");
function O(e, r, s, t, n) {
  let i = t + 0, u = t + 16 * n;
  for (let c = 0; c < 16; c++)
    s[u + c] = e[r + (2 * n - 1) * 16 + c];
  for (let c = 0; c < n; c++, i += 16, r += 16)
    ee(s, u, e, r, s, i), c > 0 && (u += 16), ee(s, i, e, r += 16, s, u);
}
a(O, "BlockMix");
function H(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
a(H, "u32");

// node_modules/lucia/dist/crypto.js
async function re(e, r, s = 16) {
  let t = new TextEncoder().encode(e), n = new TextEncoder().encode(r), i = await se(t, n, {
    N: 16384,
    r: s,
    p: 1,
    dkLen: 64
  });
  return new Uint8Array(i);
}
a(re, "generateScryptKey");
var q = class {
  static {
    a(this, "Scrypt");
  }
  async hash(r) {
    let s = $(crypto.getRandomValues(new Uint8Array(16))), t = await re(r.normalize("NFKC"), s);
    return `${s}:${$(t)}`;
  }
  async verify(r, s) {
    let t = r.split(":");
    if (t.length !== 2)
      return !1;
    let [n, i] = t, u = await re(s.normalize("NFKC"), n);
    return Z(u, _(i));
  }
};

// node_modules/@convex-dev/auth/dist/providers/Password.js
function ne(e = {}) {
  let r = e.id ?? "password";
  return Y({
    id: "password",
    authorize: /* @__PURE__ */ a(async (s, t) => {
      let n = s.flow, i = n === "signUp" ? s.password : n === "reset-verification" ? s.newPassword : null;
      i !== null && (e.validatePasswordRequirements !== void 0 ? e.validatePasswordRequirements(i) : ae(i));
      let u = e.profile?.(s, t) ?? ce(s), { email: c } = u, d = s.password, f, y;
      if (n === "signUp") {
        if (d === void 0)
          throw new Error("Missing `password` param for `signUp` flow");
        ({ account: f, user: y } = await G(t, {
          provider: r,
          account: { id: c, secret: d },
          profile: u,
          shouldLinkViaEmail: e.verify !== void 0,
          shouldLinkViaPhone: !1
        }));
      } else if (n === "signIn") {
        if (d === void 0)
          throw new Error("Missing `password` param for `signIn` flow");
        let l = await M(t, {
          provider: r,
          account: { id: c, secret: d }
        });
        if (l === null)
          throw new Error("Invalid credentials");
        ({ account: f, user: y } = l);
      } else if (n === "reset") {
        if (!e.reset)
          throw new Error(`Password reset is not enabled for ${r}`);
        let { account: l } = await M(t, {
          provider: r,
          account: { id: c }
        });
        return await F(t, e.reset, {
          accountId: l._id,
          params: s
        });
      } else if (n === "reset-verification") {
        if (!e.reset)
          throw new Error(`Password reset is not enabled for ${r}`);
        if (s.newPassword === void 0)
          throw new Error("Missing `newPassword` param for `reset-verification` flow");
        let l = await F(t, e.reset, { params: s });
        if (l === null)
          throw new Error("Invalid code");
        let { userId: p, sessionId: w } = l, x = s.newPassword;
        return await J(t, {
          provider: r,
          account: { id: c, secret: x }
        }), await Q(t, { userId: p, except: [w] }), { userId: p, sessionId: w };
      } else if (n === "email-verification") {
        if (!e.verify)
          throw new Error(`Email verification is not enabled for ${r}`);
        let { account: l } = await M(t, {
          provider: r,
          account: { id: c }
        });
        return await F(t, e.verify, {
          accountId: l._id,
          params: s
        });
      } else
        throw new Error('Missing `flow` param, it must be one of "signUp", "signIn", "reset", "reset-verification" or "email-verification"!');
      return e.verify && !f.emailVerified ? await F(t, e.verify, {
        accountId: f._id,
        params: s
      }) : { userId: y._id };
    }, "authorize"),
    crypto: {
      async hashSecret(s) {
        return await new q().hash(s);
      },
      async verifySecret(s, t) {
        return await new q().verify(t, s);
      }
    },
    extraProviders: [e.reset, e.verify],
    ...e
  });
}
a(ne, "Password");
function ae(e) {
  if (!e || e.length < 8)
    throw new Error("Invalid password");
}
a(ae, "validateDefaultPasswordRequirements");
function ce(e) {
  return {
    email: e.email
  };
}
a(ce, "defaultProfile");

// convex/auth.ts
var { auth: tt, signIn: st, signOut: rt, store: nt, isAuthenticated: it } = X({
  providers: [ne]
});

export {
  tt as a,
  st as b,
  rt as c,
  nt as d,
  it as e
};
//# sourceMappingURL=ZY6YXHCM.js.map
