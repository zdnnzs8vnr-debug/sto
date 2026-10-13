# GUSTAVOEURO — v4.1

Sito single-page stile dark-web/hacker. Zero build step: apri `index.html` e funziona.

## File da caricare accanto a index.html
- `note10.png`  → foto banconota 10 EUR
- `qr-sol.png`  → QR wallet Solana
- `qr-btc.png`  → QR wallet Bitcoin
- `qr-ltc.png`  → QR wallet Litecoin

Se mancano, scattano i fallback automatici (immagini remote + QR generato via api.qrserver.com).

## Dove cambiare le foto (10 secondi)
Apri `index.html`, cerca il blocco:

    var PHOTO = { ... }

- `eur10.main` → foto taglio 10
- `eur20.main` / `eur50.main` → foto di TUTTE le card di quel taglio (sono identiche per design)
- `eur20.gallery` / `eur50.gallery` → solo pagina Verifica Qualità

## Deploy
- **GitHub Pages**: carica tutto nella root del repo. `.nojekyll` disattiva Jekyll.
- **Netlify / Cloudflare Pages**: `_headers` e `_redirects` vengono letti automaticamente.
- **VPS**: usa `nginx.conf` o `Caddyfile` + `firewall.conf`.

⚠️ Su GitHub Pages `_headers`, `_redirects` e `.htaccess` **sono ignorati**: gli header di sicurezza NON vengono applicati.
Metti **Cloudflare in proxy davanti al dominio** per: header veri, rate limit, anti-scanner e protezione dell'IP reale.

## Note
- Nessun backend: carrello/ordini in localStorage, sessione in sessionStorage.
- Password gate offuscata (char codes).
- 5 lingue complete: it/en/es/de/fr.
