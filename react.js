export class InputCell {
	constructor(value){
		this.value = value;
		this.listeners = [];
	}

	setValue(value){
		this.value = value;
		this.listeners.map(l => l());
	}
}

export class ComputeCell {
	constructor(inputCells, fn){
		this.listeners = [];
		this.callbacks = [];
		this.fn = () => fn(inputCells);
		this._value = this.fn();

		inputCells.map(cell =>
			cell.listeners.push(() => {
				if(this._value != this.value){
					this.callbacks.map(c => c.update(this));
					this.listeners.map(l => l());
				}
			})
		);
	}

	get value(){
		return this._value = this.fn();
	}

	addCallback(cb){
		this.callbacks.push(cb);
	}

	removeCallback(cb){
		this.callbacks = this.callbacks.filter(c => c != cb);
	}
}

export class CallbackCell {
	constructor(fn){
		this.values = [];
		this.update = c => this.values.push(fn(c));
	}
};