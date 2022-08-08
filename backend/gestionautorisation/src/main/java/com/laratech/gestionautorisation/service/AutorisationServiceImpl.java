package com.laratech.gestionautorisation.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.laratech.gestionautorisation.exception.AutorisationNotFoundException;
import com.laratech.gestionautorisation.model.Autorisation;
import com.laratech.gestionautorisation.model.DateOfYear;
import com.laratech.gestionautorisation.model.User;
import com.laratech.gestionautorisation.repo.AutorisationRepo;
import com.laratech.gestionautorisation.repo.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AutorisationServiceImpl implements AutorisationService{
	
	private final AutorisationRepo autorisationRepo;
	private final UserRepo userRepo; 
	@Override
	public Autorisation saveAutorisation(Autorisation autorisation) {
		
		return autorisationRepo.save(autorisation);
	}

	@Override
	public Autorisation getAutorisationById(Long id) throws AutorisationNotFoundException {
		
		return autorisationRepo.findAutorisationByIdAuto(id)
				.orElseThrow(()->new AutorisationNotFoundException("Authorization by id "+ id +"not found"));
	}

	@Override
	public Autorisation updateAutorisation(Autorisation autorisation) {
		
		return autorisationRepo.save(autorisation);
	}

	@Override
	public List<Autorisation> getAutorisations() {
		
		return autorisationRepo.findAll();
	}

	@Override
	public List<Autorisation> getAutorisationsByUser(User user) throws AutorisationNotFoundException {
	//	User user = userRepo.findByUsername(username);
		//log.info(user.toString());
		return autorisationRepo.findAutorisationByUser(user)
				.orElseThrow(()->new AutorisationNotFoundException("user by username  not found"));
	}

	@Override
	public List<DateOfYear> getByYear(Date todayDate, Date yearBefore) {
		return autorisationRepo.findAllYear(todayDate,yearBefore)
				.stream()
				.map(this::convertAutorisationToDto)
				.collect(Collectors.toList())
				;
	
	}
	
	private DateOfYear convertAutorisationToDto(Autorisation auto) {
		DateOfYear dateOfYear = new DateOfYear();
		int numAuto = 0 ; 
		dateOfYear.setDay(auto.getDate()); 
		List<Autorisation> liste = autorisationRepo.findAllByDate(dateOfYear.getDay());
		System.out.println(liste.size());
		numAuto = liste.size();
		dateOfYear.setNumAuto(numAuto);
		liste.clear();
		return dateOfYear;
	}
	
	@Override
	public List<DateOfYear> getByYearByUsername(Date beginYear, Date endYear, String username) {
		User user = userRepo.findByUsername(username);
		return autorisationRepo.findAllYearByUsername(beginYear,endYear,user)
				.stream()
				.map(this::convertAutorisationToDto)
				.collect(Collectors.toList())
				;
	}

	@Override
	public List<Autorisation> getAutorisationsByStateAndDate(Date date , String state) {
		return autorisationRepo.findAllAutoByStateAndDate(date, state);
	}


	
}
