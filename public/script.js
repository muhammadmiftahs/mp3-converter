document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('converter-form');
    const urlInput = document.getElementById('youtube-url');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');
    const loader = document.querySelector('.loader');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoTitle = document.getElementById('video-title');
    const downloadLink = document.getElementById('download-link');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const youtubeUrl = urlInput.value.trim();

        if (!youtubeUrl) {
            showError("Link YouTube tidak boleh kosong!");
            return;
        }

        // Tampilkan UI loading
        showLoading();

        // **PENTING: Ganti URL ini dengan URL API backend Anda**
        // Contoh API yang bisa Anda buat sendiri di platform lain (seperti Render/Heroku)
        // atau gunakan layanan API pihak ketiga.
        const API_ENDPOINT = 'https://your-backend-api-here.com/api/convert';

        try {
            // Kita akan MENSIMULASIKAN panggilan API di sini
            // karena backend sesungguhnya tidak bisa berjalan di Vercel.
            // Ganti bagian `simulateApiCall` ini dengan `fetch` sesungguhnya
            // saat Anda punya backend yang aktif.
            
            // const response = await fetch(API_ENDPOINT, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ url: youtubeUrl })
            // });
            // const data = await response.json();
            
            const data = await simulateApiCall(youtubeUrl); // Hapus baris ini jika sudah pakai API asli

            if (data.success) {
                showSuccess(data);
            } else {
                showError(data.message || 'Terjadi kesalahan saat konversi.');
            }

        } catch (error) {
            console.error('Fetch error:', error);
            showError('Tidak dapat terhubung ke server. Coba lagi nanti.');
        }
    });

    function showLoading() {
        resultDiv.classList.remove('hidden');
        loader.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        convertBtn.disabled = true;
        convertBtn.querySelector('.btn-text').textContent = 'Memproses...';
    }

    function showError(message) {
        loader.classList.add('hidden');
        successMessage.classList.add('hidden');
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        resetButton();
    }

    function showSuccess(data) {
        loader.classList.add('hidden');
        errorMessage.classList.add('hidden');
        videoThumbnail.src = data.thumbnail;
        videoTitle.textContent = data.title;
        downloadLink.href = data.downloadUrl;
        successMessage.classList.remove('hidden');
        resultDiv.classList.remove('hidden');
        resetButton();
    }
    
    function resetButton() {
        convertBtn.disabled = false;
        convertBtn.querySelector('.btn-text').textContent = 'Konversi';
    }

    // --- FUNGSI SIMULASI (HAPUS JIKA SUDAH PUNYA API ASLI) ---
    // Fungsi ini hanya untuk demo agar tampilan frontend berfungsi.
    async function simulateApiCall(url) {
        console.log("Simulating API call for:", url);
        return new Promise(resolve => {
            setTimeout(() => {
                if (url.includes("youtube.com")) {
                    resolve({
                        success: true,
                        title: "Contoh Judul Video - Simulasi Berhasil",
                        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg", // Contoh thumbnail
                        downloadUrl: "#" // Di sini seharusnya link MP3 asli
                    });
                } else {
                    resolve({
                        success: false,
                        message: "URL yang Anda masukkan tidak valid."
                    });
                }
            }, 2500); // Simulasi jeda waktu 2.5 detik
        });
    }
});