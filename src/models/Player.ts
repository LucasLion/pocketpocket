import { ref, type Ref } from "vue";

class Player {

  cardsPossessed: Ref<string[]>;

	constructor() {
		this.cardsPossessed = ref([]);
	}

	addCardToCollection(card: string) {
		this.cardsPossessed.value.push(card);
	}
}

export default Player;
