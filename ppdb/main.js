const registrationForm = document.querySelector(".registration-form");
const formStatus = document.querySelector(".form-status");

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(registrationForm);
  const emailBody = [
    "Permintaan akun PPDB Daarul Azmi 2027/2028",
    "",
    `Nama calon santri: ${formData.get("Nama calon santri")}`,
    `Email untuk akun: ${formData.get("Email untuk akun")}`,
    `WhatsApp orang tua/wali: ${formData.get("WhatsApp orang tua/wali")}`,
    `Jenjang yang diminati: ${formData.get("Jenjang yang diminati")}`,
    "",
    "Persetujuan dihubungi: Ya",
  ].join("\n");
  const mailto = new URL("mailto:admin@daarulazmi.ponpes.id");
  mailto.searchParams.set("subject", "Permintaan akun PPDB 2027/2028");
  mailto.searchParams.set("body", emailBody);

  formStatus.textContent = "Aplikasi email sedang dibuka. Permintaan belum terkirim sampai Anda menekan Kirim di aplikasi email.";
  window.location.assign(mailto.href);
});
