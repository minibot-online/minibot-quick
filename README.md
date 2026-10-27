# MiniBot Quick — اپ مدیریت سریع

پنل وب + اپ اندروید برای کارهای روزمره‌ی مدیریت مینی‌بات. ساخته شده برای یک نفر: خودت. سریع‌تر از پنل مدیریت کامل، مخصوص تصمیم‌های فوری.

نسخه: 1.0 دامنه: `quick.minibot.online` بسته: `online.minibot.quick`

## امکانات

1. `home` — داشبورد سلامت سرورها و کاربران در یک نگاه
2. `users` — فعال‌سازی سریع پلن (پرو ۳۰ روز / ویژه ۶۰ روز)، قفل و آزادسازی ارسال داپ، تأیید مخاطب
3. `reqs` — تأیید و رد سریع درخواست‌های پلن با دیدن رسید
4. `servers` — تست سلامت، ویرایش آدرس و یادداشت هر سرور

نصب به‌صورت اپ کامل: PWA از پنل وب، یا APK اندروید با GitHub Actions.

## ساختار

```
app/            اپ اندروید (Kotlin + WebView + Material 3)
web/index.html  پنل وب تک‌فایل
worker.js       پروکسی Cloudflare
wrangler.jsonc  کانفیگ دیپلوی + دامنه
```

## آدرس‌ها

در `app/src/main/java/online/minibot/quick/MainActivity.kt`:

```kotlin
private const val PANEL_HOST    = "quick.minibot.online"
private const val FALLBACK_HOST = "minibot-quick.bashirtaheri2008.workers.dev"
```

اگر دامنه اصلی بالا نیاید، اپ خودکار به آدرس پشتیبان workers.dev می‌رود. هر دو هاست داخل اپ مجازند و بقیه‌ی لینک‌ها بیرونی باز می‌شوند.

## دیپلوی وب

```
npx wrangler deploy
```

`wrangler.jsonc` دامنه‌ی `quick.minibot.online` را به‌صورت custom domain تنظیم کرده و `workers_dev` هم روشن است، پس نسخه‌ی workers.dev همیشه در دسترس می‌ماند.

## ساخت APK

هر push روی `main` خودکار APK می‌سازد. برای انتشار نسخه:

```
git tag v1.1 && git push origin v1.1
```

دانلود آخرین نسخه:

```
https://github.com/minibot-online/minibot-quick/releases/latest/download/MiniBotQuick.apk
```

## نکته‌ی امنیتی

این پنل به همان API مدیریت وصل می‌شود. اگر `workers.dev` عمومی بماند، حتماً کلید مدیریت قوی باشد و در کد ذخیره نشود.
