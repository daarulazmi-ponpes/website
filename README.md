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

## Publish with GitHub Pages

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main` and the `/ (root)` folder, then save.

## Edit content with Decap CMS

The CMS is available at <https://daarulazmi.ponpes.id/admin/> and uses Decap Turbo's GitHub backend to edit this repository's `main` branch. GitHub Pages only serves the static CMS files; it does not provide CMS authentication.

The `turbo_site_id` is configured in `admin/config.yml`. In the Decap Turbo dashboard, connect the site to this GitHub repository and `main` branch, and add <https://daarulazmi.ponpes.id/admin/> under **Admin interface URLs**. Give CMS access to each editor in Turbo. Authentication requires the Turbo site and GitHub connection to be set up in the dashboard.

See the [Decap Turbo guide](https://decapcms.org/docs/turbo-connecting-a-site/) for setup details. Do not add OAuth client secrets to this repository.
