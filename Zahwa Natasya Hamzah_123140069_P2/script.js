// Menunggu DOM siap sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // SELEKSI ELEMEN DOM
    // ==========================================================
    const waktuDisplay = document.getElementById('waktu-display');
    const jadwalList = document.getElementById('jadwal-list');
    const tugasForm = document.getElementById('tugas-form');
    const tugasInput = document.getElementById('tugas-input');
    const tugasList = document.getElementById('tugas-list');
    const catatanArea = document.getElementById('catatan-area');
    const simpanCatatanBtn = document.getElementById('simpan-catatan');

    // Variabel state
    let daftarTugas = [];

    // Teks default untuk catatan (sudah dikosongkan)
    const defaultCatatan = ``;


    // ==========================================================
    // FITUR: WAKTU (Jam Berjalan / Ticking Clock)
    // ==========================================================
    /**
     * Mengupdate tampilan jam setiap detik.
     * Fitur ES6+ Wajib: Arrow Function, Template Literals, const
     */
    const updateJam = () => {
        const now = new Date();
        const zona = 'Asia/Jakarta';

        const opsiTanggal = {
            timeZone: zona,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const opsiWaktu = {
            timeZone: zona,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        const tanggalString = now.toLocaleDateString('id-ID', opsiTanggal);
        const waktuString = now.toLocaleTimeString('id-ID', opsiWaktu).replace(/\./g, ':');

        // Menggunakan Template Literals untuk rendering dinamis
        waktuDisplay.innerHTML = `
            <div class="tanggal">${tanggalString}</div>
            <div class="waktu">${waktuString}</div>
            <div class="zona">(${zona})</div>
        `;
    };

    /**
     * Memulai jam agar berjalan.
     */
    const mulaiJam = () => {
        updateJam(); // Jalankan sekali saat memuat
        setInterval(updateJam, 1000); // Ulangi setiap 1 detik
    };


    // ==========================================================
    // FITUR: JADWAL KULIAH (Data Baru)
    // ==========================================================
    /**
     * Merender daftar jadwal kuliah (data baru dari Anda).
     * Fitur ES6+ Wajib: Arrow Function, Template Literals, const
     */
    const renderJadwal = () => {
        // Data jadwal baru
        const jadwal = [
            {
                hari: 'Senin',
                matkul: 'Inteligensi Buatan RB',
                detail: '(07.30-10.10) 📍GKU2 219'
            },
            {
                hari: 'Selasa',
                matkul: 'Jaringan Komputer RC',
                detail: '(10.00-12.00) 📍IoT'
            },
            {
                hari: 'Rabu',
                matkul: 'Kapita Selekta RD',
                detail: '(13.30-15.40) 📍GKU2 311'
            },
            {
                hari: 'Kamis',
                matkul: 'MPTI RB<br>(07.30-10.10) 📍GKU2 223<br><br>Praktikum Jarkom RC<br>(10.00 - 11.30) 📍IoT<br><br>METOPEN RD<br>(13.00-15.40) 📍GKU2 315<br><br>Sistem Informasi RA<br>(15.45-17.30) 📍GKU2 310',
                detail: '' // Detail dikosongkan karena sudah di matkul
            },
            {
                hari: 'Jumat',
                matkul: 'Desain Interaksi RB<br>(09.45-12.00) 📍GKU2 113<br><br>Pengembangan Aplikasi Web RB<br>(13.00-15.40) 📍GKU2 123',
                detail: '' // Detail dikosongkan
            }
        ];

        jadwalList.innerHTML = ''; // Kosongkan list
        jadwal.forEach(item => {
            const li = document.createElement('li');
            // Template literal yang disesuaikan untuk jadwal baru
            li.innerHTML = `
                <div class="hari">${item.hari}</div>
                <span class="matkul">${item.matkul}</span>
                <span class="waktu-lokasi">${item.detail}</span>
            `;
            jadwalList.appendChild(li);
        });
    };

    // ==========================================================
    // FITUR: DAFTAR TUGAS (Class, localStorage, Arrow Functions)
    // ==========================================================
    /**
     * Mendefinisikan struktur objek tugas.
     * Fitur ES6+ Wajib: Classes
     */
    class Tugas {
        constructor(teks) {
            this.id = Date.now();
            this.teks = teks;
        }
    }

    /**
     * Merender daftarTugas ke DOM.
     */
    const renderTugas = () => {
        tugasList.innerHTML = '';
        daftarTugas.forEach(tugas => {
            const li = document.createElement('li');
            li.setAttribute('data-id', tugas.id);
            li.innerHTML = `
                <span>${tugas.teks}</span>
                <button class="hapus-tugas">Hapus</button>
            `;
            // Style khusus untuk item tugas
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            tugasList.appendChild(li);
        });
    };

    /**
     * Menambah tugas baru.
     */
    const tambahTugas = (e) => {
        e.preventDefault();
        const teksTugas = tugasInput.value.trim();
        if (teksTugas !== '') {
            const tugasBaru = new Tugas(teksTugas);
            daftarTugas.push(tugasBaru);
            simpanTugasKeStorage();
            renderTugas();
            tugasInput.value = '';
        }
    };

    /**
     * Menghapus tugas.
     */
    const hapusTugas = (e) => {
        if (e.target.classList.contains('hapus-tugas')) {
            const idTugas = Number(e.target.parentElement.getAttribute('data-id'));
            daftarTugas = daftarTugas.filter(tugas => tugas.id !== idTugas);
            simpanTugasKeStorage();
            renderTugas();
        }
    };

    // --- Manajemen localStorage untuk Tugas ---
    const simpanTugasKeStorage = () => {
        localStorage.setItem('daftarTugas', JSON.stringify(daftarTugas));
    };

    const muatTugasDariStorage = () => {
        const dataStorage = localStorage.getItem('daftarTugas');
        if (dataStorage) {
            daftarTugas = JSON.parse(dataStorage);
            renderTugas();
        }
    };


    // ==========================================================
    // FITUR: CATATAN (Data Baru)
    // ==========================================================
    /**
     * Menyimpan teks dari textarea ke localStorage.
     */
    const simpanCatatan = () => {
        const teksCatatan = catatanArea.value;
        localStorage.setItem('catatan', teksCatatan);
        alert('Catatan disimpan!');
    };

    /**
     * Memuat catatan dari localStorage, atau data default jika kosong.
     */
    const muatCatatan = () => {
        const catatanTersimpan = localStorage.getItem('catatan');
        if (catatanTersimpan) {
            catatanArea.value = catatanTersimpan;
        } else {
            // Memuat catatan default Anda
            catatanArea.value = defaultCatatan;
        }
    };


    // ==========================================================
    // INISIALISASI APLIKASI
    // ==========================================================
    
    // Menjalankan fungsi-fungsi saat halaman dimuat
    mulaiJam(); // Memanggil fungsi jam baru
    renderJadwal();
    muatTugasDariStorage();
    muatCatatan();

    // Menambahkan Event Listeners
    tugasForm.addEventListener('submit', tambahTugas);
    tugasList.addEventListener('click', hapusTugas);
    simpanCatatanBtn.addEventListener('click', simpanCatatan);

}); // Akhir dari DOMContentLoaded