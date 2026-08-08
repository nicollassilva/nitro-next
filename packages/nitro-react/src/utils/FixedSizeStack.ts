export class FixedSizeStack {
    private _data: number[] = [];
    private _index = 0;

    constructor(private readonly _maxSize: number) {
    }

    public reset(): void {
        this._data = [];
        this._index = 0;
    }

    public addValue(value: number): void {
        if (this._data.length < this._maxSize) {
            this._data.push(value);
        }
        else {
            this._data[this._index] = value;
        }

        this._index = (this._index + 1) % this._maxSize;
    }

    public getMax(): number {
        if (this._data.length === 0) return -Infinity;

        let max = this._data[0];

        for (let i = 1; i < this._data.length; i++) if (this._data[i] > max) max = this._data[i];

        return max;
    }

    public getMin(): number {
        if (this._data.length === 0) return Infinity;

        let min = this._data[0];

        for (let i = 1; i < this._data.length; i++) if (this._data[i] < min) min = this._data[i];

        return min;
    }
}