(function(){
  "use strict";
  const $ = id => document.getElementById(id);
  const form = $("inheritance-form");
  const formError = $("form-error");
  const sexInputs = [...document.querySelectorAll('input[name="deceasedSex"]')];
  const defaultValues = {estate:"500000000",sex:"male",spouseCount:"1",sons:"2",daughters:"1",fatherAlive:false,motherAlive:true};
  const formatMoney = n => "Rp"+BigInt(n).toLocaleString("id-ID");
  const readInput = () => {
    const sex = document.querySelector('input[name="deceasedSex"]:checked').value;
    return {
      estate:Number($("estate").value),
      deceasedSex:sex,
      spouseCount:Number($("spouseCount").value),
      sons:Number($("sons").value),
      daughters:Number($("daughters").value),
      fatherAlive:$("fatherAlive").checked,
      motherAlive:$("motherAlive").checked,
      otherDescendants:$("otherDescendants").checked,
      grandparents:$("grandparents").checked,
      siblings:$("siblings").checked,
      extendedKin:$("extendedKin").checked,
      specialCase:$("specialCase").checked
    };
  };
  function updateSpouseField(){
    const sex = document.querySelector('input[name="deceasedSex"]:checked').value;
    const label = $("spouse-label");
    const select = $("spouseCount");
    const hint = $("spouse-hint");
    label.textContent = sex === "male" ? "Istri pewaris" : "Suami pewaris";
    hint.textContent = "Pasangan dari orang yang meninggal.";
    [...select.options].forEach(option => {
      if (sex === "female") {
        option.hidden = !["0","1"].includes(option.value);
        option.disabled = !["0","1"].includes(option.value);
      } else {
        option.hidden = false; option.disabled = false;
      }
    });
    if (sex === "female" && Number(select.value) > 1) select.value = "1";
  }
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }
  function render(result){
    const input = result.input;
    $("estate-total").textContent = formatMoney(input.estate);
    if (!result.ok) {
      $("result-list").innerHTML = "";
      $("result-alert").hidden = false;
      $("result-alert").className = "result-alert error";
      $("result-alert").innerHTML = result.errors.map(e=>"• "+escapeHtml(e)).join("<br>");
      $("result-status").textContent = "Perlu diperbaiki";
      $("heir-count").textContent = "Belum dihitung";
      $("allocated-percent").textContent = "—";
      $("allocation-bar").style.width = "0%";
      $("reconciliation").textContent = "Periksa input sebelum menghitung.";
      $("calculation-steps").innerHTML = "<li>Perbaiki data yang ditandai, lalu hitung kembali.</li>";
      return;
    }
    $("result-status").textContent = result.warnings.length ? "Perlu ditinjau" : "Simulasi";
    const alert = $("result-alert");
    if (result.warnings.length) {
      alert.hidden = false;
      alert.className = "result-alert";
      alert.innerHTML = "<strong>Perlu pemeriksaan:</strong><br>"+result.warnings.map(w=>"• "+escapeHtml(w)).join("<br>");
    } else { alert.hidden = true; alert.innerHTML = ""; }

    const totalAllocated = result.heirs.reduce((s,h)=>s+h.groupAmount,0n);
    const pct = Number(totalAllocated)*100/input.estate;
    $("heir-count").textContent = result.heirs.length+" kelompok penerima";
    $("allocated-percent").textContent = pct.toLocaleString("id-ID",{maximumFractionDigits:2})+"% nominal tampil";
    $("allocation-bar").style.width = Math.min(100,Math.max(0,pct))+"%";
    const initials = {wives:"IS",husband:"SU",mother:"IB",father:"AY",sons:"AL",daughters:"AP"};
    $("result-list").innerHTML = result.heirs.map(h => {
      const perPersonAmount = h.count > 1 && !h.shareIsGroup ? (BigInt(input.estate) * h.share.n / h.share.d) : (h.count > 1 ? h.groupAmount / BigInt(h.count) : h.groupAmount);
      const groupText = h.count > 1 ? `${h.count} orang · per orang sekitar ${formatMoney(perPersonAmount)}` : h.detail;
      const groupAmountLabel = h.count > 1 ? "total kelompok" : "nominal";
      return `<div class="result-row">
        <div class="heir-info"><span class="heir-avatar">${initials[h.key]||"AH"}</span><div><div class="heir-name">${escapeHtml(h.name)}</div><div class="heir-detail">${escapeHtml(groupText)}</div></div></div>
        <div class="share-info"><span class="share-amount">${formatMoney(h.groupAmount)}</span><span class="share-fraction">${escapeHtml(h.fraction)} · ${escapeHtml(h.percent)}</span><span class="heir-detail">${groupAmountLabel}</span></div>
      </div>`;
    }).join("");
    const remaining = BigInt(input.estate)-totalAllocated;
    if (remaining === 0n) {
      $("reconciliation").textContent = "Nominal yang ditampilkan sama dengan harta bersih.";
    } else if (remaining > 0n) {
      $("reconciliation").textContent = formatMoney(remaining)+" belum dialokasikan dalam tampilan (sisa/pembulatan atau hak lain; jangan otomatis dibagikan).";
    } else {
      $("reconciliation").textContent = "Nominal tampilan melebihi harta bersih. Jangan gunakan hasil ini.";
    }
    $("calculation-steps").innerHTML = result.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join("");
    if (result.warnings.length) {
      $("calculation-steps").innerHTML += `<li><strong>Validasi:</strong> hasil ditandai perlu ditinjau karena cakupan mesin terbatas atau ada ahli waris/kondisi tambahan.</li>`;
    }
  }
  function calculate(){
    formError.hidden = true;
    const input = readInput();
    const result = FaraidEngine.calculate(input);
    render(result);
  }
  sexInputs.forEach(input=>input.addEventListener("change",updateSpouseField));
  form.addEventListener("submit",e=>{e.preventDefault();$("results-column").hidden=false;calculate();});
  $("reset-button").addEventListener("click",()=>{
    $("estate").value=defaultValues.estate;
    document.querySelector('input[name="deceasedSex"][value="male"]').checked=true;
    $("spouseCount").value="1";$("sons").value="2";$("daughters").value="1";
    $("fatherAlive").checked=false;$("motherAlive").checked=true;
    ["otherDescendants","grandparents","siblings","extendedKin","specialCase"].forEach(id=>$(id).checked=false);
    updateSpouseField();$("results-column").hidden=false;calculate();
  });
  updateSpouseField();
})();
