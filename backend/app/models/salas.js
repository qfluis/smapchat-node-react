class Salas {
    constructor() {
        this.salas = [];//["general", "petanca", "ganchillo", "taxidermismo"];
    }

    addSala(sala) {
        
        if (this.salas.map(s => s.nombre).indexOf(sala.nombre) === -1) this.salas.push(sala);
    }

    getSalas(){
        return this.salas;
    }
}

module.exports = Salas;