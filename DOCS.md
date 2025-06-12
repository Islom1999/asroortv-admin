Sizda git `commit` qilayotgan paytda Husky ishlamoqda, ammo quyidagi xatolik kelib chiqyapti:

```
✖ No valid configuration found.
husky - pre-commit script failed (code 1)
```

Bu xato odatda Husky, ESLint yoki Prettier konfiguratsiyasi noto‘g‘ri yoki mavjud emasligidan kelib chiqadi.

---

## ✅ 1. Husky sozlamalarini tekshiring

### `.husky/pre-commit` faylini ochib ko‘ring:

```bash
cat .husky/pre-commit
```

U quyidagidek bo‘lishi kerak (minimal holatda):

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
```

Agar sizda `npm run lint` yo‘q bo‘lsa yoki `eslint` noto‘g‘ri konfiguratsiya qilingan bo‘lsa — xato chiqadi.

---

## ✅ 2. ESLint konfiguratsiyasi mavjudligini tekshiring

Sizning `package.json` faylingizda quyidagilar bo‘lishi kerak:

### `scripts`:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.html",
  "lint:fix": "eslint . --ext .ts,.html --fix",
  ...
}
```

### ESLint fayli: `.eslintrc.json` yoki `eslint.config.js` mavjudligini tekshiring

Agar siz `eslint.config.js` ishlatayotgan bo‘lsangiz, `.eslintrc.json` kerak emas.

Misol:

#### `eslint.config.js`:

```js
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
  }
);
```

Agar bu fayl mavjud bo‘lmasa yoki noto‘g‘ri bo‘lsa — `eslint` ishlamaydi va Husky commit’ni to‘xtatadi.

---

## ✅ 3. Husky ni to‘liq qayta sozlash (agar kerak bo‘lsa)

Agar yuqoridagilarni tekshirgach ham muammo qolsa, quyidagicha qayta sozlab ko‘ring:

```bash
# Husky o‘rnatish
npx husky install

# pre-commit hook yaratish
npx husky add .husky/pre-commit "npm run lint"

# Husky ni har safar o‘zi ishlashi uchun:
npm set-script prepare "husky install"
npm run prepare
```

---

## ✅ 4. ESLint buyruqlarini sinab ko‘ring

Manually quyidagilarni terminalda bajaring:

```bash
npx eslint . --ext .ts,.html
```

Agar xatolik ko‘rsatsa — xatolikni hal qilmaguningizcha `git commit` ishlamaydi (Husky to‘xtatadi).

---

## 🧠 Xulosa

Sizning muammoingiz quyidagilardan biri bo‘lishi mumkin:

1. `.husky/pre-commit` faylida noto‘g‘ri buyruq
2. `eslint` konfiguratsiyasi yo‘q yoki yaroqsiz
3. `npm run lint` scriptda mavjud emas
4. `eslint.config.js` fayli noto‘g‘ri yoki yo‘q

Agar hohlasangiz, `.husky/pre-commit`, `eslint.config.js` yoki `.eslintrc.json`, va `package.json` fayllarini tashlab berishingiz mumkin — tekshirib, aniq yechim beraman.
