package com.laratech.gestionautorisation.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laratech.gestionautorisation.exception.AutorisationNotFoundException;
import com.laratech.gestionautorisation.model.Autorisation;
import com.laratech.gestionautorisation.model.DateOfYear;
import com.laratech.gestionautorisation.model.User;
import com.laratech.gestionautorisation.service.AutorisationServiceImpl;
import com.laratech.gestionautorisation.service.UserServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/apiauto")
@RequiredArgsConstructor
@Slf4j
public class AutorisationResource {
	private final AutorisationServiceImpl autorisationService;
	private final UserServiceImpl userService;
	@GetMapping("/all")
	public ResponseEntity<List<Autorisation>> getAutorisations (){
		return new ResponseEntity<> (autorisationService.getAutorisations(),HttpStatus.OK);
	}
	
	@GetMapping("/year")
	public ResponseEntity<List<DateOfYear>> getAutorisationsByYear (){

		Calendar cal = Calendar.getInstance();
		Date today = cal.getTime();
		int yearFirst = cal.get(Calendar.YEAR);
		
		System.out.println(yearFirst-5);
		System.out.println(today);
		cal.add(Calendar.YEAR, -1); 
		Date LastYear = cal.getTime();
		System.out.println(LastYear);
		Calendar cal2 = Calendar.getInstance();
		cal2.set(Calendar.YEAR, yearFirst-5);
		cal2.set(Calendar.DAY_OF_YEAR, 1);    	
		Date td = cal2.getTime();
		System.out.println(td);
		cal2.set(Calendar.YEAR, yearFirst+5);
		cal2.set(Calendar.MONTH, 11); // 11 = december
		cal2.set(Calendar.DAY_OF_MONTH, 31); // new years eve
		//cal.add(Calendar.YEAR, -1); 
		Date ly = cal2.getTime();
		System.out.println(ly);
		return new ResponseEntity<> (autorisationService.getByYear(ly, td),HttpStatus.OK);
	}
	
	@GetMapping("/year/{username}")
	public ResponseEntity<List<DateOfYear>> getAutorisationsByYearByUsername (@PathVariable("username") String username){
		
		Calendar cal = Calendar.getInstance();
		Date today = cal.getTime();
		System.out.println(today);
		cal.add(Calendar.YEAR, -1); 
		Date LastYear = cal.getTime();
		System.out.println(LastYear);
		Calendar cal2 = Calendar.getInstance();
		cal2.set(Calendar.YEAR, 2021);
		cal2.set(Calendar.DAY_OF_YEAR, 1);    	
		Date td = cal2.getTime();
		System.out.println(td);
		cal2.set(Calendar.YEAR, 2025);
		cal2.set(Calendar.MONTH, 11); // 11 = december
		cal2.set(Calendar.DAY_OF_MONTH, 31); // new years eve
		//cal.add(Calendar.YEAR, -1); 
		Date ly = cal2.getTime();
		System.out.println(ly);
		return new ResponseEntity<> (autorisationService.getByYearByUsername(ly, td,username),HttpStatus.OK);
	}
	
	@GetMapping("/find/{date}/{state}")
	public ResponseEntity<List<Autorisation>> getAutorisationsByDateAndState (@PathVariable("date") String date,@PathVariable("state")String state) throws ParseException{
		Date convertedDate =new SimpleDateFormat("yyyy-MM-dd").parse(date);
		System.out.println(convertedDate);
		System.out.println(date);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d = sdf.parse(date);
		System.out.println(d);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EE MMM dd HH:mm:ss zzz yyyy", Locale.ENGLISH);
		LocalDate da = LocalDate.parse(date, formatter);
		System.out.println(da);
		
		return new ResponseEntity<> (autorisationService.getAutorisationsByStateAndDate(convertedDate,state),HttpStatus.OK);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Autorisation> getAutorisationById (@PathVariable("id") Long id) throws AutorisationNotFoundException{
		Autorisation auto = autorisationService.getAutorisationById(id);
		return new ResponseEntity<>(auto,HttpStatus.OK);
	}
	@GetMapping("/find/user/{username}")
	public ResponseEntity<List<Autorisation>> getAutorisationByUsername (@PathVariable("username") String username) throws AutorisationNotFoundException{
		User user = userService.getUser(username);
		List<Autorisation> autos = autorisationService.getAutorisationsByUser(user);
		return new ResponseEntity<>(autos,HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<Autorisation> saveAutorisation(@RequestBody Autorisation autorisation) {
		return new ResponseEntity<>(autorisationService.saveAutorisation(autorisation),HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Autorisation> updateAutorisation(@RequestBody Autorisation autorisation) {
		return new ResponseEntity<>(autorisationService.saveAutorisation(autorisation),HttpStatus.OK);
	}
	

	
	
	
	
	
	
	
}
