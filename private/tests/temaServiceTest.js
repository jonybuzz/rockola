var chai = require('chai');
var expect = chai.expect;
var temaService = require('../service/temaService');

// para correr los test debe instalarse mocha
// npm install –g mocha@1.16.2

describe('TemaService',function() {
   it('agregarTema() debe retornar true cuando se pasa tema correcto', function() {
        var resultado = temaService.agregarTema('https://www.youtube.com/watch?v=btPJPFnesV4');
        expect(resultado).to.equal(true);
   });
});