package br.univel.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.univel.api.repository.*;

@SpringBootApplication
public class Application implements CommandLineRunner{

	@Autowired
	PessoaRepository pessoaRepositoryApi;
	@Autowired
	EventoRepository eventoRepositoryApi;
	@Autowired
	LocalRepository localRepositoryApi;
	@Autowired
	ConviteRepository conviteRepositoryApi;
	
	public static void main(String[] args){
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		// TODO Auto-generated method stub		
	}
}
