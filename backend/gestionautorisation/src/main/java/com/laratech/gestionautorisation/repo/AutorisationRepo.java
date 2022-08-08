package com.laratech.gestionautorisation.repo;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laratech.gestionautorisation.model.Autorisation;
import com.laratech.gestionautorisation.model.DateOfYear;
import com.laratech.gestionautorisation.model.User;

public interface AutorisationRepo extends JpaRepository<Autorisation, Long>{
	Optional <Autorisation> findAutorisationByIdAuto (Long id);
	List<Autorisation> findAllByDate (Date date);
	
	Optional <List<Autorisation>> findAutorisationByUser(User user);
	
	//List<Autorisation> findAllByDate(Date date);

  //  List<Autorisation> findAllBydateBetween(Date startDate,Date endDate);

    @Query("select a from Autorisation a where a.date <= :todayDate and a.date >=:yearBefore group by a.date")
    List<Autorisation> findAllYear(
     @Param("todayDate") Date todayDate, @Param("yearBefore") Date yearBefore);
	

    @Query("select a from Autorisation a where a.user=:user and a.date <=:todayDate and a.date >=:yearBefore group by a.date")
    List<Autorisation> findAllYearByUsername(
     @Param("todayDate") Date todayDate, @Param("yearBefore") Date yearBefore,@Param("user") User user);
	
    @Query("select a from Autorisation a where a.date =:date and a.state =:state")
    List<Autorisation> findAllAutoByStateAndDate(
     @Param("date") Date date,@Param("state") String state);
	
   /* @Query("select a from Autorisation a where a.user=:user and a.date = :date and a.state =:state")
    List<Autorisation> findAllAutoByStateAndDate(
     @Param("date") Date date,@Param("state") String state);*/
	
}
