package com.laratech.gestionautorisation.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laratech.gestionautorisation.model.Role;
import com.laratech.gestionautorisation.model.User;
import com.laratech.gestionautorisation.repo.RoleRepo;
import com.laratech.gestionautorisation.repo.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService,UserDetailsService {

	private final UserRepo userRepo;
	private final RoleRepo roleRepo; 
	private final PasswordEncoder bycrypt;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username);
		System.out.println(username);
		System.out.println(user);
		if(user == null ) {
			log.error("ERROR : User not found in database ");
			throw new UsernameNotFoundException("ERROR : User not found in database ");
		}else {
			log.info("INFO : user found {}",username);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(	
				role ->{authorities.add(new SimpleGrantedAuthority(role.getName()));
				
				});
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
	}
	@Override
	public User saveUser(User user) {
		user.setPassword(bycrypt.encode(user.getPassword()));
		return userRepo.save(user);
	}

	@Override
	public Role saveRole(Role role) {
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) {
		User user = userRepo.findByUsername(username);
		Role role = roleRepo.findByName(roleName);
		user.getRoles().add(role);
	}

	@Override
	public User getUser(String username) {

		return userRepo.findByUsername(username);
	}

	@Override
	public List<User> getUsers() {
		return userRepo.findAll();
	}
	@Override
	public void deleteUser(Long id) {
		userRepo.deleteUserById(id);
	}
	@Override
	public List<Role> getRoles() {
		
		return roleRepo.findAll();
	}
	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}



}
