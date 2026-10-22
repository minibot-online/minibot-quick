# MiniBot Quick — اپ مدیریت سریع

اپ اندروید (APK) + پنل وب برای مدیریت سریع مینی‌بات — فقط برای خودم.

## امکانات
* داشبورد سلامت سرورها و کاربرها در یک نگاه
* کاربرها: فعال‌سازی سریع پلن (پرو ۳۰ / ویژه ۶۰ روز)، قفل/آزادسازی ارسال داپ و تأیید مخاطب
* درخواست‌های پلن: تأیید و رد سریع با دیدن رسید
* سرورها: تست سلامت، ویرایش آدرس و یادداشت
* نصب به‌صورت اپ کامل (PWA وب + APK اندروید)

## ساخت APK
هر push روی main با GitHub Actions خودکار APK می‌سازد.
دانلود مستقیم (آخرین نسخه):
```
https://github.com/minibot-online/minibot-quick/releases/latest/download/MiniBotQuick.apk
```
برای انتشار نسخه جدید: `git tag v1.0 && git push origin v1.0`

## پنل وب
`https://quick.minibot.online` — فایل‌های وب در پوشه `web/` و روی Cloudflare Workers (ورکر `minibot-quick`) دیپلوی می‌شوند.
اگر دامنه اصلی در دسترس نباشد، اپ خودکار به آدرس پشتیبان workers.dev می‌رود.

## معماری
Kotlin + WebView بومی + Material 3 — الهام‌گرفته از minibot-android، بدون فریمورک اضافه.
