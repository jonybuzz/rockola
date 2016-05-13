var chai = require('chai');
var expect = chai.expect;
var temaService = require('../service/temaService');

// para correr los test debe instalarse mocha
// npm install –g mocha@1.16.2

describe('TemaService', function () {

    it('agregarTema() debe retornar true cuando se pasa tema correcto', function () {
        var resultado = temaService.agregarTema('https://www.youtube.com/watch?v=btPJPFnesV4');
        expect(resultado).to.equal(true);
    });

//    it('obtenerTemas() debe retornar todos los temas de la rockola', function (done) {
//        var temas = temaService.obtenerTemas().then(
//                function (temas) {
//                    Promise.resolve(temas.length).should.eventually.equal(0);
//                  
//                });
//    });
});