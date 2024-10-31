// src/WindowManager.js

class WindowManager {
	#windows;
	#count;
	#id;
	#winData;
	#winShapeChangeCallback;
	#winChangeCallback;

	constructor() {
		const that = this;

		// Listen for localStorage changes across windows
		window.addEventListener("storage", (event) => {
			if (event.key === "windows") {
				const newWindows = JSON.parse(event.newValue);
				const winChange = that.#didWindowsChange(that.#windows, newWindows);
				that.#windows = newWindows;

				if (winChange && that.#winChangeCallback) {
					that.#winChangeCallback();
				}
			}
		});

		// Remove window from the list on unload
		window.addEventListener("beforeunload", () => {
			const index = that.getWindowIndexFromId(that.#id);
			that.#windows.splice(index, 1);
			that.updateWindowsLocalStorage();
		});
	}

	#didWindowsChange(pWins, nWins) {
		if (pWins.length !== nWins.length) return true;
		return pWins.some((win, i) => win.id !== nWins[i].id);
	}

	init(metaData) {
		this.#windows = JSON.parse(localStorage.getItem("windows")) || [];
		this.#count = parseInt(localStorage.getItem("count"), 10) || 0;
		this.#count++;
		this.#id = this.#count;

		const shape = this.getWinShape();
		this.#winData = { id: this.#id, shape, metaData };
		this.#windows.push(this.#winData);

		localStorage.setItem("count", this.#count);
		this.updateWindowsLocalStorage();
	}

	getWinShape() {
		return {
			x: window.screenX,
			y: window.screenY,
			w: window.innerWidth,
			h: window.innerHeight,
		};
	}

	getWindowIndexFromId(id) {
		return this.#windows.findIndex((win) => win.id === id);
	}

	updateWindowsLocalStorage() {
		localStorage.setItem("windows", JSON.stringify(this.#windows));
	}

	update() {
		const winShape = this.getWinShape();
		if (
			winShape.x !== this.#winData.shape.x ||
			winShape.y !== this.#winData.shape.y ||
			winShape.w !== this.#winData.shape.w ||
			winShape.h !== this.#winData.shape.h
		) {
			this.#winData.shape = winShape;
			const index = this.getWindowIndexFromId(this.#id);
			this.#windows[index].shape = winShape;
			if (this.#winShapeChangeCallback) this.#winShapeChangeCallback();
			this.updateWindowsLocalStorage();
		}
	}

	setWinShapeChangeCallback(callback) {
		this.#winShapeChangeCallback = callback;
	}

	setWinChangeCallback(callback) {
		this.#winChangeCallback = callback;
	}

	getWindows() {
		return this.#windows;
	}

	getThisWindowData() {
		return this.#winData;
	}

	getThisWindowID() {
		return this.#id;
	}
}

export default WindowManager;
