/* Mesin faraid edukatif — cakupan terbatas.
 * Pecahan disimpan sebagai BigInt agar perhitungan tidak bergantung pada floating point.
 * Wajib diverifikasi ahli faraid sebelum dipakai pada kasus nyata.
 */
(function (global) {
  "use strict";

  function gcd(a, b) {
    a = a < 0n ? -a : a; b = b < 0n ? -b : b;
    while (b !== 0n) { const t = b; b = a % b; a = t; }
    return a || 1n;
  }
  function frac(n, d) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error("Penyebut pecahan tidak boleh nol.");
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  }
  const add = (a,b) => frac(a.n*b.d+b.n*a.d,a.d*b.d);
  const sub = (a,b) => frac(a.n*b.d-b.n*a.d,a.d*b.d);
  const mul = (a,b) => frac(a.n*b.n,a.d*b.d);
  const div = (a,b) => frac(a.n*b.d,a.d*b.n);
  const compare = (a,b) => {
    const x=a.n*b.d, y=b.n*a.d;
    return x<y?-1:x>y?1:0;
  };
  const zero = () => frac(0n,1n);
  const one = () => frac(1n,1n);
  const isZero = a => a.n === 0n;
  const fractionText = a => a.d === 1n ? String(a.n) : `${a.n}/${a.d}`;
  const percentText = a => (Number(a.n) / Number(a.d) * 100).toLocaleString("id-ID",{maximumFractionDigits:4})+"%";
  const rupiah = n => "Rp"+BigInt(n).toLocaleString("id-ID");
  const exactMultiplyMoney = (money, share) => frac(BigInt(money)*share.n,share.d);

  function validate(input) {
    const errors = [];
    const warnings = [];
    if (!Number.isSafeInteger(input.estate) || input.estate <= 0) errors.push("Harta bersih harus berupa bilangan rupiah bulat yang lebih besar dari nol.");
    for (const key of ["spouseCount","sons","daughters"]) {
      if (!Number.isInteger(input[key]) || input[key] < 0) errors.push("Jumlah ahli waris tidak valid: "+key+".");
    }
    if (input.sons > 0 && input.daughters > 0) {
      // This is supported for descendants sharing residuary estate.
    }
    if (input.deceasedSex === "male" && input.spouseCount > 4) errors.push("Jumlah istri tidak boleh melebihi empat pada input ini.");
    if (input.deceasedSex === "female" && input.spouseCount !== 1) errors.push("Untuk pewaris perempuan, masukkan satu suami yang masih hidup atau nol jika tidak ada.");
    if (input.deceasedSex === "female" && input.spouseCount === 0) {
      // A widowed/unmarried female decedent can have no surviving husband.
    }
    if (input.fatherAlive && input.grandparents) warnings.push("Kakek/nenek terdeteksi bersama ayah atau orang tua lain; perlu diperiksa manual.");
    if (input.otherDescendants) warnings.push("Ada cucu atau keturunan lain. Statusnya dan kemungkinan terhalang harus diperiksa manual.");
    if (input.grandparents) warnings.push("Ada kakek/nenek. Kedudukan dan penghalangannya belum dihitung oleh versi ini.");
    if (input.siblings) warnings.push("Ada saudara. Pengaruh jumlah/jenis saudara terhadap ibu dan hak saudara belum dihitung penuh.");
    if (input.extendedKin) warnings.push("Ada kerabat lain. Hak 'ashabah atau dzawil arham belum dihitung oleh versi ini.");
    if (input.specialCase) warnings.push("Kondisi khusus ditandai. Jangan gunakan hasil ini sebagai pembagian final.");
    if (!input.motherAlive && !input.fatherAlive && input.sons === 0 && input.daughters === 0 && input.spouseCount === 0) {
      warnings.push("Ahli waris inti tidak ada pada input. Perlu inventarisasi ahli waris lainnya.");
    }
    if (input.sons === 0 && input.daughters === 0 && (input.fatherAlive || input.motherAlive)) {
      warnings.push("Tidak ada anak pada input. Bagian orang tua dapat berubah menurut ahli waris lain dan keadaan kasus; periksa manual.");
    }
    return { errors, warnings };
  }

  function calculate(input) {
    const validation = validate(input);
    if (validation.errors.length) return { ok:false, errors:validation.errors, warnings:validation.warnings };
    const heirs = [];
    const steps = [];
    const addHeir = (key,name,count,share,detail,shareIsGroup=false) => {
      if (count > 0 && !isZero(share)) heirs.push({key,name,count,share,detail,shareIsGroup});
    };
    const childExists = input.sons > 0 || input.daughters > 0;

    // Spouse's fixed share, under the Qur'anic descendants rule.
    if (input.deceasedSex === "male" && input.spouseCount > 0) {
      const share = childExists ? frac(1n,8n) : frac(1n,4n);
      addHeir("wives", input.spouseCount > 1 ? "Para istri" : "Istri", input.spouseCount, share, "Bagian bersama seluruh istri", true);
      steps.push(`Istri/para istri mendapat bagian bersama ${fractionText(share)} karena ${childExists ? "pewaris memiliki keturunan" : "tidak ada keturunan pada input"}.`);
    } else if (input.deceasedSex === "female" && input.spouseCount > 0) {
      const share = childExists ? frac(1n,4n) : frac(1n,2n);
      addHeir("husband","Suami",1,share,"Bagian suami");
      steps.push(`Suami mendapat ${fractionText(share)} karena ${childExists ? "pewaris memiliki keturunan" : "tidak ada keturunan pada input"}.`);
    }

    // Mother: basic one-sixth when descendants exist. Sibling-count and special cases
    // are intentionally flagged for manual review rather than silently guessed.
    if (input.motherAlive) {
      let share;
      if (childExists) share = frac(1n,6n);
      else share = frac(1n,3n);
      addHeir("mother","Ibu",1,share,childExists ? "Bagian tetap karena ada keturunan" : "Bagian dasar; periksa ahli waris lain dan kasus khusus");
      steps.push(`Ibu mendapat bagian dasar ${fractionText(share)}${childExists ? " karena ada keturunan" : " pada kondisi tanpa keturunan yang dimasukkan"}.`);
    }

    // Father: if descendants exist, father receives 1/6 as a fixed share in this limited model.
    // If there are daughters but no sons, residue rules and 'aul/radd may need full faraid engine.
    if (input.fatherAlive) {
      if (childExists) {
        addHeir("father","Ayah",1,frac(1n,6n),"Bagian tetap dasar saat ada keturunan; kasus anak perempuan perlu pemeriksaan residu");
        steps.push("Ayah diberi bagian dasar 1/6 karena ada keturunan. Kedudukan ayah atas sisa harta pada konfigurasi tertentu memerlukan pemeriksaan lanjutan.");
      } else {
        addHeir("father","Ayah",1,zero(),"Dalam versi terbatas, hak sisa ayah belum dihitung");
        validation.warnings.push("Ayah tanpa keturunan dapat menjadi penerima sisa ('ashabah); versi ini belum menghitung skenario tersebut.");
      }
    }

    // Descendants: if sons exist, take residue as 'asabah with male:female 2:1.
    // Daughter-only fixed shares are supported only as a basic scenario, but a complete
    // model must account for father, 'aul/radd and other asabah; flagged below.
    if (input.sons > 0) {
      const fixedTotal = heirs.reduce((acc,h)=>add(acc, h.shareIsGroup ? h.share : mul(h.share,frac(BigInt(h.count),1n))),zero());
      const residue = sub(one(),fixedTotal);
      if (compare(residue,zero()) < 0) {
        validation.warnings.push("Jumlah bagian tetap melebihi harta (potensi 'aul). Hasil tidak dihitung sebagai pembagian final.");
      } else {
        const units = BigInt(input.sons*2 + input.daughters);
        if (units > 0n) {
          const unitShare = div(residue,frac(units,1n));
          const sonShare = mul(unitShare,frac(2n,1n));
          const daughterShare = unitShare;
          addHeir("sons","Anak laki-laki",input.sons,sonShare,"Per orang; dua unit bagian");
          if (input.daughters > 0) addHeir("daughters","Anak perempuan",input.daughters,daughterShare,"Per orang; satu unit bagian");
          steps.push(`Sisa harta ${fractionText(residue)} dibagikan kepada anak sebagai 'ashabah dengan perbandingan 2:1. Jumlah unit: ${input.sons} × 2 + ${input.daughters} = ${units}.`);
        }
      }
    } else if (input.daughters > 0) {
      const daughterFixed = input.daughters === 1 ? frac(1n,2n) : frac(2n,3n);
      addHeir("daughters","Anak perempuan",input.daughters,daughterFixed,"Bagian bersama jika tidak ada anak laki-laki; konfigurasi lain perlu verifikasi");
      steps.push(`Anak perempuan mendapat bagian dasar bersama ${fractionText(daughterFixed)} karena tidak ada anak laki-laki pada input.`);
      validation.warnings.push("Anak perempuan tanpa anak laki-laki: sisa harta dan kemungkinan hak ayah/ashabah, radd, atau 'aul belum diselesaikan oleh versi awal.");
    }

    // If no descendants, the mother's one-third can be affected by siblings or Umariyyatain.
    if (!childExists && input.motherAlive && input.spouseCount > 0 && input.fatherAlive) {
      validation.warnings.push("Kemungkinan kasus Umariyyatain (suami/istri, ayah, ibu) terdeteksi; bagian ibu harus dihitung dengan aturan khusus, bukan sepertiga biasa.");
    }

    const fixedTotal = heirs.reduce((acc,h)=>add(acc, h.shareIsGroup ? h.share : mul(h.share,frac(BigInt(h.count),1n))),zero());
    if (compare(fixedTotal,one()) > 0) {
      validation.warnings.push("Total pecahan bagian melampaui 1 (potensi 'aul). Versi ini tidak menerapkan 'aul secara otomatis.");
    }

    const moneyRows = heirs.map(h => {
      const exact = exactMultiplyMoney(input.estate,h.share);
      // Largest-remainder allocation in rupiah is performed at group level; per-person shares
      // remain exact fractions. For multi-member groups, group total is rounded once.
      const groupShare = h.shareIsGroup ? h.share : mul(h.share,frac(BigInt(h.count),1n));
      const groupExact = exactMultiplyMoney(input.estate, groupShare);
      const groupFloor = groupExact.n / groupExact.d;
      return {...h, groupShare, groupAmount:groupFloor, exactAmount:exact, fraction:fractionText(groupShare), percent:percentText(groupShare), perPersonFraction:fractionText(h.share)};
    });
    const allocated = moneyRows.reduce((sum,h)=>sum+h.groupAmount,0n);
    const hasSons = input.sons > 0;
    const supportedSimple = hasSons && input.motherAlive && !input.fatherAlive &&
      (input.deceasedSex === "male" ? input.spouseCount > 0 : input.spouseCount > 0) &&
      !input.otherDescendants && !input.grandparents && !input.siblings && !input.extendedKin && !input.specialCase;
    if (!supportedSimple && validation.warnings.length === 0) {
      validation.warnings.push("Kombinasi ini berada di luar skenario uji utama versi awal. Mohon verifikasi manual sebelum memakai hasil.");
    }
    const hasOverAllocation = compare(fixedTotal,one()) > 0;
    const result = {
      ok:true, input, heirs:moneyRows, steps, warnings:[...new Set(validation.warnings)],
      totalShare:fixedTotal, allocatedFloor:allocated, remainder:BigInt(input.estate)-allocated,
      exactTotalIsOne:compare(fixedTotal,one())===0,
      supportedSimple, hasOverAllocation,
      notes: [
        "Perhitungan pecahan memakai BigInt; nominal kelompok dibulatkan ke bawah ke rupiah penuh pada tampilan.",
        "Jika ada pecahan rupiah atau beberapa penerima dalam satu kelompok, aturan pembulatan/distribusi harus disepakati dan dicatat.",
        "Versi ini belum merupakan implementasi lengkap seluruh bab faraid."
      ]
    };
    return result;
  }

  global.FaraidEngine = { calculate, validate, fractionText, percentText, rupiah, frac };
})(window);
