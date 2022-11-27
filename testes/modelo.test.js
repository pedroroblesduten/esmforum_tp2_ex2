const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');  
  const perguntas = modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  modelo.cadastrar_resposta(perguntas[0].id_pergunta, '2');
  modelo.cadastrar_resposta(perguntas[1].id_pergunta, '4');
  modelo.cadastrar_resposta(perguntas[2].id_pergunta, '6');
  const respostas0 = modelo.get_respostas(perguntas[0].id_pergunta);
  const respostas1 = modelo.get_respostas(perguntas[1].id_pergunta);
  const respostas2 = modelo.get_respostas(perguntas[2].id_pergunta);
  expect(respostas0[0].texto).toBe('2');
  expect(respostas1[0].texto).toBe('4');
  expect(respostas2[0].texto).toBe('6');
});

test('Testando get_pergunta de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  const pergunta1 = modelo.get_pergunta(perguntas[0].id_pergunta);
  const pergunta2 = modelo.get_pergunta(perguntas[1].id_pergunta);
  const pergunta3 = modelo.get_pergunta(perguntas[2].id_pergunta);
  expect(pergunta1.texto).toBe(perguntas[0].texto);
  expect(pergunta2.texto).toBe(perguntas[1].texto);
  expect(pergunta3.texto).toBe(perguntas[2].texto);
});
