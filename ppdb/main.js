const registrationForm = document.querySelector(".registration-form");
const formStatus = document.querySelector(".form-status");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const emailBody = [
    "PERMINTAAN PENDAFTARAN AKUN PPDB PONDOK PESANTREN DAARUL AZMI",
    "Tahun ajaran: 2027/2028",
    "",
    "DATA PENDAFTAR",
    `Nama calon santri: ${formData.get("Nama calon santri")}`,
    `Nama orang tua/wali: ${formData.get("Nama orang tua/wali")}`,
    `Email untuk akun PPDB: ${formData.get("Email untuk akun")}`,
    `WhatsApp orang tua/wali: ${formData.get("WhatsApp orang tua/wali")}`,
    `Jenjang yang diminati: ${formData.get("Jenjang yang diminati")}`,
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
