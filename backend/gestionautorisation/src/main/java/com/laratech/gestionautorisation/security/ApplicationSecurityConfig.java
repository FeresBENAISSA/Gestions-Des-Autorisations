package com.laratech.gestionautorisation.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.laratech.gestionautorisation.service.UserServiceImpl;

@Configuration
@EnableWebSecurity

public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

	private final PasswordEncoder passwordEncoder;
	private final UserServiceImpl userService;

	@Autowired
	public ApplicationSecurityConfig(PasswordEncoder passwordEncoder, UserServiceImpl userService) {
		super();
		this.passwordEncoder = passwordEncoder;
		this.userService = userService;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http 
//		 .cors()
//		 .and()
//		 .csrf().disable()
//		 .authorizeRequests()
//		// .antMatchers("apiuser/users").permitAll()
//		// .antMatchers("apiauth/**","/apiuser/**").hasRole("ADMIN")
//		// .antMatchers("apiauth/**").hasRole("EMP")
//		 .antMatchers("/login").permitAll()
//		 .anyRequest()
//		 .authenticated()
//		 .and()	
//		 .formLogin()
//		 .and()	
//		 .logout()
//		 	.clearAuthentication(true)
//		 	.invalidateHttpSession(true)
//		 	.deleteCookies("JSESSIONID");
//		// .loginPage("/login")
//		// .permitAll();	
		
		http
		 	 .cors()
		     .and()
		     .csrf().disable()
			 .authorizeRequests()
			 .anyRequest()
			 .authenticated()
			 .and()
			 .formLogin()
			 .successHandler(new AuthenticationSuccessHandler() {
				
				@Override
				public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
						Authentication authentication) throws IOException, ServletException {					
				}
			})
			// .loginPage("/login")
			// .permitAll()
			 .and()
				.logout()
					.clearAuthentication(true)
					.invalidateHttpSession(true)
					.deleteCookies("JSESSIONID");
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(daoAuthenticationProvider());
	}

	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder);
		provider.setUserDetailsService(userService);
		return provider;
	}

}
