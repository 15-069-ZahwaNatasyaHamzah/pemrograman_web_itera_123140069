let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const daftarTugas = document.getElementById("daftarTugas");
const modal = document.getElementById("modalForm");
const form = document.getElementById("formTugas");
const btnTambah = document.getElementById("btnTambah");
const batalBtn = document.getElementById("batalBtn");
const totalTugas = document.getElementById("totalTugas");
const selesaiTugas = document.getElementById("selesaiTugas");
const belumTugas = document.getElementById("belumTugas");
const cariTugas = document.getElementById("cariTugas");
let editIndex = null;

function renderTugas() {
  daftarTugas.innerHTML = "";
  const hasilCari = cariTugas.value.toLowerCase();

  const filteredTasks = tasks.filter(t =>
    t.nama.toLowerCase().includes(hasilCari) ||
    t.mataKuliah.toLowerCase().includes(hasilCari)
  );

  if (filteredTasks.length === 0) {
    daftarTugas.innerHTML = "<p style='text-align:center;color:#777;'>Tidak ada tugas.</p>";
  } else {
    filteredTasks.forEach((tugas, index) => {
      const div = document.createElement("div");
      div.className = `tugas ${tugas.selesai ? "done" : ""}`;
      div.innerHTML = `
        <div>
          <b>${tugas.nama}</b><br>
          <small>${tugas.mataKuliah} — Deadline: ${tugas.deadline}</small>
        </div>
        <div>
          <button class="btn-done">${tugas.selesai ? "Belum" : "Selesai"}</button>
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Hapus</button>
        </div>
      `;
      div.querySelector(".btn-done").onclick = () => toggleSelesai(index);
      div.querySelector(".btn-edit").onclick = () => editTugas(index);
      div.querySelector(".btn-delete").onclick = () => hapusTugas(index);
      daftarTugas.appendChild(div);
    });
  }

  totalTugas.textContent = tasks.length;
  selesaiTugas.textContent = tasks.filter(t => t.selesai).length;
  belumTugas.textContent = tasks.filter(t => !t.selesai).length;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

btnTambah.onclick = () => {
  editIndex = null;
  form.reset();
  modal.style.display = "flex";
};
batalBtn.onclick = () => modal.style.display = "none";

form.onsubmit = (e) => {
  e.preventDefault();
  const nama = document.getElementById("namaTugas").value.trim();
  const mk = document.getElementById("mataKuliah").value.trim();
  const deadline = document.getElementById("deadline").value;
  if (!nama || !mk || !deadline) return alert("Semua field wajib diisi!");

  const tugasBaru = { nama, mataKuliah: mk, deadline, selesai: false };
  if (editIndex !== null) tasks[editIndex] = tugasBaru;
  else tasks.push(tugasBaru);
  modal.style.display = "none";
  renderTugas();
};

function toggleSelesai(index) {
  tasks[index].selesai = !tasks[index].selesai;
  renderTugas();
}

function editTugas(index) {
  editIndex = index;
  const t = tasks[index];
  document.getElementById("namaTugas").value = t.nama;
  document.getElementById("mataKuliah").value = t.mataKuliah;
  document.getElementById("deadline").value = t.deadline;
  modal.style.display = "flex";
}

function hapusTugas(index) {
  if (confirm("Yakin ingin menghapus tugas ini?")) {
    tasks.splice(index, 1);
    renderTugas();
  }
}

cariTugas.oninput = renderTugas;

renderTugas();
