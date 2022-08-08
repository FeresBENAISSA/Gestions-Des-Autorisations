package com.laratech.gestionautorisation.service;

import java.util.Date;
import java.util.List;

import com.laratech.gestionautorisation.exception.AutorisationNotFoundException;
import com.laratech.gestionautorisation.model.Autorisation;
import com.laratech.gestionautorisation.model.DateOfYear;
import com.laratech.gestionautorisation.model.User;


public interface AutorisationService {
	Autorisation saveAutorisation(Autorisation autorisation);
	Autorisation getAutorisationById(Long id) throws AutorisationNotFoundException;
	Autorisation updateAutorisation (Autorisation autorisation);
	List<Autorisation >getAutorisationsByUser(User user)throws AutorisationNotFoundException;;
	List <Autorisation> getAutorisationsByStateAndDate(Date date , String state);
	List <Autorisation> getAutorisations();
	List<DateOfYear> getByYear( Date beginYear, Date endYear);
	List<DateOfYear> getByYearByUsername( Date beginYear, Date endYear,String username);
}
