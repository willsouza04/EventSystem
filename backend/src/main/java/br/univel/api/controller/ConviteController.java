package br.univel.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.univel.api.model.Convite;
import br.univel.api.repository.ConviteRepository;

@RestController
public class ConviteController {

	@Autowired
	ConviteRepository conviteRepository;

	// Url: api/convite/save?id_pessoa=1&numero=3
	@RequestMapping("api/convite/save")
	public String save(@RequestParam("id_pessoa") Long id_pessoa, @RequestParam("id_evento") Long id_evento) {
		try {
			conviteRepository.save(new Convite(id_pessoa, id_evento));
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}

	// Url: api/convite/deleteByIds?id_pessoa=16&id_evento=11
	@RequestMapping("api/convite/deleteByIds")
	public String deleteByIds(@RequestParam("id_pessoa") Long id_pessoa, @RequestParam("id_evento") Long id_evento) {
		try {
			conviteRepository.deleteByIds(id_pessoa, id_evento);
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}
}
