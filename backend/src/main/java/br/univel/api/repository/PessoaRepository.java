package br.univel.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import br.univel.api.model.Pessoa;

@Transactional(readOnly = true)
public interface PessoaRepository extends CrudRepository<Pessoa, Long> {

	@Modifying
	@Transactional
	@Query("delete from Pessoa p where p.id = ?1")
	void deleteById(Long id);

	@Modifying
	@Transactional
	@Query("update from Pessoa p set nome = ?1, idade = ?2 , cpf = ?3 where p.id = ?4")
	void updateById(String nome, int idade, String cpf, Long id);

	@Modifying
	@Transactional
	@Query("select p from Pessoa p where p.id in (select id_pessoa from Convite c where c.id_evento = ?1)")
	List<Pessoa> findByEvent(Long id_evento);

	@Modifying
	@Transactional
	@Query("select p from Pessoa p where p.id not in (select id_pessoa from Convite c where c.id_evento = ?1)")
	List<Pessoa> findByNotEvent(Long id_evento);
	
}
