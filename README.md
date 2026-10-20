# Pondok Pesantren Daarul Azmi

Static website for Pondok Pesantren Daarul Azmi. The redesigned homepage is in `index.html`; pages and assets reachable on the official website when mirrored are included in `source-site/`. Links from the homepage to profile, news, gallery, video, and contact pages open their local copies.

The mirror is static: search and contact forms still rely on the official website's backend, while social media, maps, video embeds, and third-party libraries continue to use their external services. WhatsApp contact links use **+62 888 0100 5284**.

The PPDB account-request page is available at `/ppdb/`. This GitHub Pages site has no server-side form or email service configured, so submitting the form opens the visitor's email application with a message addressed to **admin@daarulazmi.ponpes.id**; the visitor must send it there. The email includes the submitted student and parent/guardian biodata, registration details, document-readiness statuses, and any optional note. The static form cannot upload or attach documents; applicants should follow the committee's instructions after contact. No account is created automatically, and the page never confirms that an email was delivered. A reliable automated workflow requires a trusted server-side endpoint and credentials configured outside this static repository.

The primary GitHub Pages site is configured to publish `main` at **daarulazmi.ponpes.id**, using the root `CNAME`; do not replace it to host PPDB. DNS currently points **ppdb.daarulazmi.ponpes.id** to `daarulazmi-ponpes.github.io`, but this repository's Pages site is not bound to that subdomain and the organization has no separate accessible Pages repository for the PPDB deployment. To publish the redesign at the subdomain without affecting the main site, configure a separate GitHub Pages site/repository with custom domain `ppdb.daarulazmi.ponpes.id`, publish the PPDB page at that site's root (including its assets and a `CNAME` file for the subdomain), and verify that the existing subdomain DNS CNAME resolves to the GitHub Pages host. No primary-domain DNS or CNAME change is needed.

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

The CMS includes **Berita & Artikel** and **Galeri Foto** collections. News and articles support a category, publication date, cover image, summary, and Markdown body; photo entries support an uploaded image and caption. New uploads are stored under `assets/uploads/`. Published entries appear on the homepage, and news articles also have their own page under `/berita/`.
