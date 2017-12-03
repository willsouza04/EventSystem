package br.univel.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.univel.api.model.Local;
import br.univel.api.repository.LocalRepository;

@RestController
public class LocalController {

	@Autowired
	LocalRepository localRepository;
	
	// Url: api/local/save?nome=Univel&rua=Titto&numero=1234&cidade=Cascavel
	@RequestMapping("api/local/save")
	public String save(@RequestParam("nome") String nome, @RequestParam("rua") String rua, 
			@RequestParam("numero") int numero, @RequestParam("cidade") String cidade){
		try {
			localRepository.save(new Local(nome, rua, numero, cidade));
			return "Done";
		} catch (Exception error) {
			return "Error";
		}
	}
	
	// Url: api/local/findAll
	@RequestMapping("api/local/findAll")
	public List<Local> findAll(){
		try {
			return (List<Local>) localRepository.findAll();
		} catch (Exception error) {
			return null;
		}
	}
	
	// Url: api/local/findById?1
	@RequestMapping("api/local/findById")
	public Local findById(@RequestParam("id") long id){
		try {
			return localRepository.findOne(id);
		}catch (Exception error) {
			return null;
		}
	}
}
