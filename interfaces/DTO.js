'use strict';
class DTO {
    #success = false;
    #length = null;
    #record = null;

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

module.exports = DTO;
