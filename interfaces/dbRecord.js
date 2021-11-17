class DbRecord {
    #success = false;
    #length = null;
    #record = null;

    constructor( success, length, record ) {
        this.#success = success;
        this.#length = length;
        this.#record = record;
    }

    get success() {
        return this.#success;
    }

    set success( value ) {
        this.#success = value;
    }

    get length() {
        return this.#length;
    }

    set length( value ) {
        this.#length = value;
    }

    get record() {
        return this.#record;
    }

    set record( value ) {
        this.#record = value;
    }
}

module.exports = DbRecord;
