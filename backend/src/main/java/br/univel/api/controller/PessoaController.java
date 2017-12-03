package br.univel.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import br.univel.api.model.Pessoa;
import br.univel.api.repository.PessoaRepository;

@RestController
public class PessoaController {

	@Autowired
	PessoaRepository pessoaRepository;

	// Url: api/pessoa/save?nome=William&idade=18&cpf=12345678910
	@RequestMapping("api/pessoa/save")
	public String save(@RequestParam("nome") String nome, @RequestParam("idade") int idade,
			@RequestParam("cpf") String cpf) {
		try {
			pessoaRepository.save(new Pessoa(nome, idade, cpf));
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/pessoa/findById?id=1
	@RequestMapping("api/pessoa/findById")
	public Pessoa findById(@RequestParam("id") long id) {
		try {
			return pessoaRepository.findOne(id);
		} catch (Exception error) {
			return null;
		}
	}

	// Url: api/pessoa/deleteById?id=1
	@RequestMapping("api/pessoa/deleteById")
	public String deleteById(@RequestParam("id") Long id) {
		try {
			pessoaRepository.deleteById(id);
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/pessoa/updateById?id=1&nome=William&idade=19&cpf=12345678910
	@RequestMapping("api/pessoa/updateById")
	public String updateById(@RequestParam("id") Long id, @RequestParam("nome") String nome,
			@RequestParam("idade") int idade, @RequestParam("cpf") String cpf) {
		try {
			pessoaRepository.updateById(nome, idade, cpf, id);
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/pessoa/findByEvent?id_evento=11
	@CrossOrigin(origins = "*")
	@RequestMapping("api/pessoa/findByEvent")
	public List<Pessoa> findByEvent(@RequestParam("id_evento") Long id_evento) {
		try {
			return (List<Pessoa>) pessoaRepository.findByEvent(id_evento);
		} catch (Exception error) {
			return null;
		}
	}

	// Url: api/pessoa/findByNotEvent?id_evento=11
	@CrossOrigin(origins = "*")
	@RequestMapping("api/pessoa/findByNotEvent")
	public List<Pessoa> findByNotEvent(@RequestParam("id_evento") Long id_evento) {
		try {
			return (List<Pessoa>) pessoaRepository.findByNotEvent(id_evento);
		} catch (Exception error) {
			return null;
		}
	}
}
