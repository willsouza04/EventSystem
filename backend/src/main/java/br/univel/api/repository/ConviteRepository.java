package br.univel.api.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import br.univel.api.model.Convite;

public interface ConviteRepository extends CrudRepository<Convite, Long> {

	@Modifying
	@Transactional
	@Query("delete from Convite c where c.id_pessoa = ?1 and c.id_evento = ?2")
	void deleteByIds(Long id_pessoa, Long id_evento);

}
