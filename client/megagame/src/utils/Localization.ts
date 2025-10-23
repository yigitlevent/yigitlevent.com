export const Localisation = {
	cycleName: {
		en: "Year",
		tr: "Yıl"
	},
	cycleCount: {
		en: (count: number): string => `Cycle ${count}`,
		tr: (count: number): string => `Döngü ${count}`
	},
	countdownMinutesAndSeconds: {
		en: (minutes: number, seconds: number): string => `${minutes} minutes and ${seconds} seconds until next cycle.`,
		tr: (minutes: number, seconds: number): string => `${minutes} dakika ve ${seconds} saniye sonra yeni döngü başlayacak.`
	},
	countdownMinutes: {
		en: (minutes: number): string => `${minutes} minutes until next cycle.`,
		tr: (minutes: number): string => `${minutes} dakika sonra yeni döngü başlayacak.`
	},
	countdownSeconds: {
		en: (seconds: number): string => `${seconds} seconds until next cycle.`,
		tr: (seconds: number): string => `${seconds} saniye sonra yeni döngü başlayacak.`
	},
	countdownNewCycle: {
		en: "New cycle started.",
		tr: "Yeni döngü başladı."
	},
	noNewsItems: {
		en: "No news available.",
		tr: "Mevcut haber yok."
	},
	newsItems: {
		en: "News",
		tr: "Haberler"
	},
	addNewsItem: {
		en: "Add News Item",
		tr: "Haber Öğesi Ekle"
	},
	enterNewsText: {
		en: "Enter news text...",
		tr: "Haber metnini girin..."
	},
	enterQueue: {
		en: "Enter Order Queue",
		tr: "Emir Kuyruğuna Gir"
	},
	queues: {
		en: "Order Queues",
		tr: "Emir Kuyrukları"
	},
	noQueueItemsFound: {
		en: "No queue items found.",
		tr: "Kuyruk öğesi bulunamadı."
	},
	yourPositionInQueue: {
		en: "Position",
		tr: "Sıra"
	},
	deadline: {
		en: "Voting deadline",
		tr: "Oylama sonu"
	},
	enterFactionCode: {
		en: "Enter faction code...",
		tr: "Fraksiyon kodunu girin..."
	},
	submit: {
		en: "Submit",
		tr: "Gönder"
	},
	invalidFactionCode: {
		en: "Invalid faction code.",
		tr: "Geçersiz fraksiyon kodu."
	},
	factionSelection: {
		en: "Faction Selection",
		tr: "Fraksiyon Seçimi"
	},
	loading: {
		en: "Loading...",
		tr: "Yükleniyor..."
	},
	failedToFetchMegagameData: {
		en: "Failed to fetch megagame data.",
		tr: "Megagame verileri alınamadı."
	},
	deadlinePassed: {
		en: "Deadline Passed",
		tr: "Son Tarih Geçti"
	},
	events: {
		en: "Events",
		tr: "Olaylar"
	}
};
