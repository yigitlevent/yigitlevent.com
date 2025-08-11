export const Localisation = {
	cycleName: {
		en: "Year",
		tr: "Yıl"
	},
	cycleCount: {
		en: (count: number): string => `Cycle ${count}`,
		tr: (count: number): string => `Döngü ${count}`
	},
	noEvents: {
		en: "No events this year.",
		tr: "Bu yıl olay yok."
	},
	events: {
		en: "Events",
		tr: "Olaylar"
	},
	noRumors: {
		en: "No rumors.",
		tr: "Söylenti yok."
	},
	rumors: {
		en: "Rumors",
		tr: "Söylentiler"
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
	}
};
