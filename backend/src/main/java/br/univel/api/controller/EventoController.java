package br.univel.api.controller;

import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.univel.api.model.Evento;
import br.univel.api.repository.EventoRepository;

@RestController
public class EventoController {

	@Autowired
	EventoRepository eventoRepository;

	// Url: api/evento/save?id_local=1&nome=Cervejada&data=25/12/2017&hora=23:00
	
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/save")
	public String save(@RequestParam("id_local") Long id_local, @RequestParam("nome") String nome,
			@RequestParam("data") String data, @RequestParam("hora") String hora) throws ParseException {
		try {
			eventoRepository.save(new Evento(id_local, nome, data, hora));
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/evento/findAll
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/findAll")
	public List<Evento> findAll() {
		try {
			return (List<Evento>) eventoRepository.findAll();
		} catch (Exception error) {
			return null;
		}
	}

	// Url: api/evento/findById?id=1
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/findById")
	public Evento findById(@RequestParam("id") long id) {
		try {
			return eventoRepository.findOne(id);
		} catch (NullPointerException error) {
			return null;
		}
	}

	// Url: api/evento/deleteById?id=1
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/deleteById")
	public String deleteById(@RequestParam("id") Long id) {
		try {
			eventoRepository.deleteById(id);
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url:
	// api/evento/updateById?id=1&id_local=1&nome=Cervejada&data=25/12/2017&hora=23:00
	// 23:00:00
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/updateById")
	public String updateById(@RequestParam("id") Long id, @RequestParam("id_local") Long id_local,
			@RequestParam("nome") String nome, @RequestParam("data") String data, @RequestParam("hora") String hora)
			throws ParseException {
		try {
			eventoRepository.updateById(id_local, nome, data, hora, id);
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/evento/findByPessoa?id_pessoa=1
	@CrossOrigin(origins = "*")
	@RequestMapping("api/evento/findByPessoa")
	public List<Evento> findByPessoa(@RequestParam("id_pessoa") Long id_pessoa) {
		try {
			return (List<Evento>) eventoRepository.findByPessoa(id_pessoa);
		} catch (Exception error) {
			return null;
		}
	}
}
