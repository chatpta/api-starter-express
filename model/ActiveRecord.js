class ActiveRecord {
    constructor( dbConnection ) {
        this._recordName = this.constructor.name;
        this._className = new.target.name;
        this._dbConnection = dbConnection;
    }

    getById( id ) {
        return { record: "HI I am here" }
    }

    getByName( name ) {
        return { record: "HI I am here" }
    }

}

module.exports = ActiveRecord;
