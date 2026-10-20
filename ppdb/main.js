const registrationForm = document.querySelector(".registration-form");
const formStatus = document.querySelector(".form-status");
const ticker = document.querySelector(".ticker-bar");
const tickerToggle = document.querySelector(".ticker-toggle");

tickerToggle.addEventListener("click", () => {
  const isPaused = ticker.classList.toggle("is-paused");
  tickerToggle.setAttribute("aria-pressed", String(isPaused));
  tickerToggle.textContent = isPaused ? "Lanjutkan pengumuman berjalan" : "Jeda pengumuman berjalan";
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const emailBody = [
    "PERMINTAAN PENDAFTARAN AKUN PPDB PONDOK PESANTREN DAARUL AZMI",
    "Tahun ajaran: 2027/2028",
    "",
    "DATA CALON SANTRI",
    `Nama calon santri: ${formData.get("Nama calon santri")}`,
    `Tempat lahir: ${formData.get("Tempat lahir")}`,
    `Tanggal lahir: ${formData.get("Tanggal lahir")}`,
    `Jenis kelamin: ${formData.get("Jenis kelamin")}`,
    `Jenjang yang diminati: ${formData.get("Jenjang yang diminati")}`,
    `Asal sekolah: ${formData.get("Asal sekolah")}`,
    `Alamat calon santri: ${formData.get("Alamat calon santri")}`,
    "",
    "DATA ORANG TUA/WALI",
    `Nama orang tua/wali: ${formData.get("Nama orang tua/wali")}`,
    `Hubungan wali dengan calon santri: ${formData.get("Hubungan wali dengan calon santri")}`,
    `WhatsApp orang tua/wali: ${formData.get("WhatsApp orang tua/wali")}`,
    `Email aktif pendaftar: ${formData.get("Email aktif pendaftar")}`,
    `Pekerjaan orang tua/wali: ${formData.get("Pekerjaan orang tua/wali") || "Tidak diisi."}`,
    "",
    "PERSYARATAN BERKAS",
    `Ijazah atau surat kelulusan: ${formData.get("Status ijazah atau surat kelulusan")}`,
    `KTP orang tua/wali: ${formData.get("Status KTP orang tua/wali")}`,
    "Status lampiran: Tidak ada dokumen yang dilampirkan melalui formulir ini.",
    "",
    "CATATAN TAMBAHAN",
    formData.get("Catatan untuk panitia") || "Tidak ada.",
    "",
    `Persetujuan untuk dihubungi: ${formData.get("Persetujuan dihubungi")}`,
  ].join("\n");
  const mailto = new URL("mailto:admin@daarulazmi.ponpes.id");
  mailto.searchParams.set(
    "subject",
    `Permintaan akun PPDB 2027/2028 - ${formData.get("Nama calon santri")}`,
  );
  mailto.searchParams.set("body", emailBody);

  formStatus.textContent = "Aplikasi email sedang dibuka. Permintaan belum terkirim sampai Anda menekan Kirim di aplikasi email.";
  window.location.assign(mailto.href);
});
