# Pondok Pesantren Daarul Azmi

Static website for Pondok Pesantren Daarul Azmi. The redesigned homepage is in `index.html`; pages and assets reachable on the official website when mirrored are included in `source-site/`. Links from the homepage to profile, news, gallery, video, and contact pages open their local copies.

The mirror is static: search and contact forms still rely on the official website's backend, while social media, maps, video embeds, and third-party libraries continue to use their external services. WhatsApp contact links use **+62 888 0100 5284**.

The PPDB account-request page is available at `/ppdb/`. This GitHub Pages site has no server-side form or email service configured, so submitting the form opens the visitor's email application with a message addressed to **admin@daarulazmi.ponpes.id**; the visitor must send it there. The email includes the submitted student and parent/guardian biodata, registration details, document-readiness statuses, and any optional note. The static form cannot upload or attach documents; applicants should follow the committee's instructions after contact. No account is created automatically, and the page never confirms that an email was delivered. A reliable automated workflow requires a trusted server-side endpoint and credentials configured outside this static repository.

The educational Faraid calculator is available at `/waris/`; its files and usage notes are in `waris/`.

The primary GitHub Pages site is configured to publish `main` at **daarulazmi.ponpes.id**, using the root `CNAME`; do not replace it to host PPDB. The redesigned PPDB site is published independently from [`daarulazmi-ponpes/daarulazmi-ponpes.github.io`](https://github.com/daarulazmi-ponpes/daarulazmi-ponpes.github.io), and its default GitHub Pages URL is live. GitHub currently rejects binding **ppdb.daarulazmi.ponpes.id** to that site because the custom domain is already claimed by another Pages site. The remaining host-side step is to release that existing claim (or verify domain ownership and transfer the claim) and then bind the subdomain to the dedicated repository. Its DNS already points to `daarulazmi-ponpes.github.io`; do not change DNS or the primary site's `CNAME`.

The homepage links to the Qur’an Digital reader at <https://quran.daarulazmi.ponpes.id/> with a dismissible floating banner. Homepage sharing previews use the supplied 1200×630 Qur’an Digital artwork. The root `manifest.webmanifest` and Daarul Azmi app icons let visitors add the main site to an Android home screen or install it from a supported desktop browser over HTTPS.

## Preview locally

The homepage and several top-level pages use Jekyll front matter and Liquid
templates. A plain static file server does not process them and will show
template tags as text, making dynamic news and gallery sections appear broken.
Install Jekyll, then run it from the repository root:

```sh
gem install jekyll
jekyll serve
```

Then visit <http://localhost:4000>. GitHub Pages also processes these templates
when publishing the `main` branch.

The mirrored pages are available under <http://localhost:4000/source-site/>.
The Faraid calculator is available at <http://localhost:4000/waris/>.

## Publish with GitHub Pages

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose `main` and the `/ (root)` folder, then save.

## Edit content with Decap CMS

The CMS is available at <https://daarulazmi.ponpes.id/admin/> and uses Decap Turbo's GitHub backend to edit this repository's `main` branch. GitHub Pages only serves the static CMS files; it does not provide CMS authentication.

The `turbo_site_id` is configured in `admin/config.yml`. In the Decap Turbo dashboard, connect the site to this GitHub repository and `main` branch, and add <https://daarulazmi.ponpes.id/admin/> under **Admin interface URLs**. Give CMS access to each editor in Turbo. Authentication requires the Turbo site and GitHub connection to be set up in the dashboard.

See the [Decap Turbo guide](https://decapcms.org/docs/turbo-connecting-a-site/) for setup details. Do not add OAuth client secrets to this repository.

The CMS includes **Berita & Artikel** and **Galeri Foto** collections. News and articles support a category, publication date, cover image, summary, and Markdown body; photo entries support an uploaded image and caption. New uploads are stored under `assets/uploads/`. Published entries appear on the homepage, and news articles also have their own page under `/berita/`.
