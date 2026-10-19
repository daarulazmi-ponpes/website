# Pondok Pesantren Daarul Azmi

Static website for Pondok Pesantren Daarul Azmi. The redesigned homepage is in `index.html`; pages and assets reachable on the official website when mirrored are included in `source-site/`. Links from the homepage to profile, news, gallery, video, and contact pages open their local copies.

The mirror is static: search and contact forms still rely on the official website's backend, while social media, maps, video embeds, and third-party libraries continue to use their external services. WhatsApp contact links use **+62 888 0100 5284**.

## Preview locally

Run a local static file server from the repository root:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

The mirrored pages are available under <http://localhost:8000/source-site/>.

## Content manager

Open <https://heartfelt-baklava-006ca7.netlify.app/admin/> to use Decap CMS. Its Git Gateway backend uses the production site's Netlify Identity and Git Gateway services, including when the CMS is opened from a preview or another hosting address.

CMS access requires an Identity account for this Netlify project. Manage users and invitations in the project's Netlify Identity settings. Identity and Git Gateway must both stay enabled in the Netlify project configuration. A local static server or GitHub Pages does not provide these services itself.

## Publish with GitHub Pages

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main` and the `/ (root)` folder, then save.
