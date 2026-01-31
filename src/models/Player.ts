import { ref, type Ref } from "vue";

const STORAGE_KEY = "pocketpocket_save";

class Player {

  cardsPossessed: Ref<number[]>;

	constructor() {
		this.cardsPossessed = ref([]);
		this.load();
	}

	addCardToCollection(card: number) {
		this.cardsPossessed.value.push(card);
		this.save();
	}

	save() {
		const data = {
			cardsPossessed: this.cardsPossessed.value,
			savedAt: new Date().toISOString()
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}

	load() {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const data = JSON.parse(saved);
			this.cardsPossessed.value = data.cardsPossessed || [];
		}
	}

	reset() {
		this.cardsPossessed.value = [];
		localStorage.removeItem(STORAGE_KEY);
	}

	exportSave(): string {
		return JSON.stringify({
			cardsPossessed: this.cardsPossessed.value,
			exportedAt: new Date().toISOString()
		});
	}

	importSave(jsonString: string): boolean {
		try {
			const data = JSON.parse(jsonString);
			if (Array.isArray(data.cardsPossessed)) {
				this.cardsPossessed.value = data.cardsPossessed;
				this.save();
				return true;
			}
			return false;
		} catch {
			return false;
		}
	}

	downloadSave() {
		const blob = new Blob([this.exportSave()], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `pocketpocket_save_${new Date().toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}
}

export default Player;
