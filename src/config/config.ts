// ============================================================
// 🎂 BIRTHDAY WEBSITE — FILE KONFIGURASI UTAMA
// Ubah semua data di sini tanpa perlu mengubah komponen
// ============================================================

export const birthdayConfig = {
  // ── Identitas ──────────────────────────────────────────────
  recipient: {
    name: "Debby",
    fullName: "Debby Sayanggku",
  },
  sender: {
    name: "Sayanggku",
  },

  // ── Halaman Intro ──────────────────────────────────────────
  intro: {
    title: "Happy Birthday",
    subtitle: "Untuk seseorang yang sangat istimewa di hatiku 🤍",
    buttonText: "Start Journey",
  },

  // ── Halaman 1: Pesan ───────────────────────────────────────
  message: {
    title: "yeyyy pacaarrr akuuu tambahh tuaaa",
    typingMessages: [
      "syudahhhh setahunnn tidakkk terasaaaaa hubungann kitaaa, yangg menandakan bertambah nya jugaa umulll pacall aku tercintaa 💕",
      "tapi tenangg pacall akuuu, kamuuu tetapp yangg tercantik di mata akuu",
      "Dan akuuu jugaa makinn sayangg samaa kamuu setiapp halinyaaa",
      "makanyaaa jangann sedihhh yaa cincaaaaa, karenaa inii halinyaaa bidadalii akuu turunn ke bumii",
      "Yaituu kamuuu kesayangann mamass, Debby kuu❤️❤️",
    ],
  },

  // ── Halaman 2: Timeline ────────────────────────────────────
  timeline: {
    title: "Perjalanan Kita ✨",
    items: [
      {
        id: 1,
        date: "🎂 Setahun Lalu",
        caption: "Tepat setahun yang lalu, kita mulai menulis cerita indah ini bersama 💕",
        image: "/images/timeline-1.jpg",
        gradient: "from-blue-400 to-indigo-600",
      },
      {
        id: 2,
        date: "🌸 Hari-Hari Bersamamu",
        caption: "Setiap hari bersamamu adalah hadiah yang paling aku syukuri 🥰",
        image: "/images/timeline-2.jpg",
        gradient: "from-purple-400 to-pink-500",
      },
      {
        id: 3,
        date: "🌊 Petualangan Kita",
        caption: "Setiap momen denganmu selalu jadi kenangan terindah yang aku pegang 💙",
        image: "/images/timeline-3.jpg",
        gradient: "from-cyan-400 to-blue-600",
      },
      {
        id: 4,
        date: "🕯️ Setahun Penuh Cinta",
        caption: "Sudah setahun dan aku makin yakin, kamu adalah yang terbaik untukku ❤️",
        image: "/images/timeline-4.jpg",
        gradient: "from-amber-400 to-rose-500",
      },
      {
        id: 5,
        date: "🎉 Happy Birthday!",
        caption: "Selamat ulang tahun sayang! Semoga tahun ini makin indah bersama kita 🎂✨",
        image: null,
        gradient: "from-pink-600 to-rose-700",
      },
    ],
  },

  // ── Halaman 3: Gallery ─────────────────────────────────────
  gallery: {
    title: "Memory Gallery 📸",
    subtitle: "Klik foto untuk melihat lebih dekat",
    photos: [
      {
        id: 1,
        src: "/images/debby-1.jpg",
        caption: "inii kamuu pertama kalii mulaii mauu show upp mukaa masihh malu maluu",
        rotation: -3,
        gradient: "from-rose-300 to-pink-400",
      },
      {
        id: 2,
        src: "/images/debby-2.jpg",
        caption: "inii kamuu pass cemberuttt garaa garaaa habiss akuu ejekk hehee",
        rotation: 2,
        gradient: "from-blue-300 to-indigo-400",
      },
      {
        id: 3,
        src: "/images/debby-3.jpg",
        caption: "udahh beberapa kali punn masih malu maluu, kadangg pake alasann \"ihh akuu gakpakee hijabb\"",
        rotation: -5,
        gradient: "from-purple-300 to-violet-400",
      },
      {
        id: 4,
        src: "/images/debby-4.jpg",
        caption: "inii kamuuu udahh beranii buatt gakk makee penutuupp rambuttt, manaa suka bangett gelapp gelapan",
        rotation: 4,
        gradient: "from-amber-300 to-orange-400",
      },
      {
        id: 5,
        src: "/images/debby-5.jpg",
        caption: "disinii kamuu habisss nangiss gara gara kependekann potong rambutnyaa, padahal inii cantikkk bangettt tauuuuu",
        rotation: -2,
        gradient: "from-emerald-300 to-teal-400",
      },
      {
        id: 6,
        src: "/images/debby-6.jpg",
        caption: "nihhh tengill bangett diaaa mauu pamerrr makee upp blinkk blinnkk darii kondangannn",
        rotation: 3,
        gradient: "from-pink-300 to-rose-400",
      },
    ],
  },

  // ── Halaman 4: Gift ────────────────────────────────────────
  gift: {
    buttonText: "Open Gift 🎁",
    message: "Happy Birthday kesayangannn akuuu!!! semoga semua hal yang kamu pengenin dan semua hal yang ingin kamu capaii bisa kesampeann",
    subMessage: "Tunggu hadiahh yangg mamass kirimm nyampekk yaaa",
  },

  // ── Halaman 5: Music ───────────────────────────────────────
  music: {
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    cover: "/images/music-cover.jpg",
    src: "/music/birthday-song.mp3",
    // Jika tidak ada file audio, player tetap muncul tapi tidak bisa play
    coverGradient: "from-blue-900 via-indigo-800 to-purple-900",
  },

  // ── Halaman Penutup ────────────────────────────────────────
  closing: {
    title: "Happy Birthday",
    message:
      "Semoga hari ini menjadi awal dari kebahagiaan yang lebih besar. Terima kasih sudah hadir di hidupku. Semoga sehat selalu, panjang umur, dan semua impianmu menjadi nyata.",
    withLoveText: "With Love,",
  },
};

export type BirthdayConfig = typeof birthdayConfig;
