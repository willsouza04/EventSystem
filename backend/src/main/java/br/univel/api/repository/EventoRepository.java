package br.univel.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import br.univel.api.model.Evento;

public interface EventoRepository extends CrudRepository<Evento, Long> {

	@Modifying
	@Transactional
	@Query("delete from Evento e where e.id = ?1")
	void deleteById(Long id);

	@Modifying
	@Transactional
	@Query("update from Evento e set id_local = ?1, nome = ?2 , data = ?3, hora = ?4 where e.id = ?5")
	void updateById(Long id_local, String nome, String data, String hora, Long id);

	@Modifying
	@Transactional
	@Query("select e from Evento e where e.id in (select id_evento from Convite c where c.id_pessoa = ?1)")
	List<Evento> findByPessoa(Long id_pessoa);
	
}
