'use strict';
class Dto {
    #success = false;
    #length = null;
    #data = null;

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

    get data() {
        return this.#data;
    }

    set data( value ) {
        this.#data = value;
    }
}

class DtoProvider {
    static getDTO() {
        return new Dto();
    }
}

module.exports = DtoProvider;
