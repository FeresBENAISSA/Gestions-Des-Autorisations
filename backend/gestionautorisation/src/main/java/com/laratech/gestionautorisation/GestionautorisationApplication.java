package com.laratech.gestionautorisation;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.laratech.gestionautorisation.model.Autorisation;
import com.laratech.gestionautorisation.model.Role;
import com.laratech.gestionautorisation.model.User;
import com.laratech.gestionautorisation.repo.AutorisationRepo;
import com.laratech.gestionautorisation.service.AutorisationService;
import com.laratech.gestionautorisation.service.UserService;
import com.laratech.gestionautorisation.service.UserServiceImpl;

@SpringBootApplication
public class GestionautorisationApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionautorisationApplication.class, args);
	}
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);}
	/*@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(null,"ROLE_ADMIN"));
			userService.saveRole(new Role(null,"ROLE_EMP"));
			userService.saveUser(new User (null,"feres","feres","password","feres@email.com",new ArrayList<>()));
			userService.saveUser(new User (null,"ala","ala","password","ala@email.com",new ArrayList<>()));
			userService.addRoleToUser("feres", "ROLE_ADMIN");
			userService.addRoleToUser("ala", "ROLE_EMP");

		};
	}*/
	/*
	@Bean
	CommandLineRunner run(AutorisationService  autorisationService,UserService userService) {
		return args -> {
			autorisationService.saveAutorisation(new Autorisation(null,new Date(),new Date(),new Date(),"En Cours","nn",userService.getUser("feres")));
			
			

		};
	}*/
	/*
	@Bean
	CommandLineRunner run(AutorisationService  autorisationService,UserService userService) {
		return args -> {
			
			Calendar cal = Calendar.getInstance();
			Date today = cal.getTime();
			System.out.println(today);
			cal.add(Calendar.YEAR, -1); 
			Date LastYear = cal.getTime();
			System.out.println(LastYear);
			//-------------
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			System.out.println(format.format(LastYear));
			System.out.println(format.format(LastYear));
			System.out.println(format.parse(format.format(LastYear)));
			
			autorisationService.getByYear(today, LastYear);
			
			

		};
		
	}*/
}
