package com.laratech.gestionautorisation.service;

import java.util.List;

import com.laratech.gestionautorisation.model.Role;
import com.laratech.gestionautorisation.model.User;

public interface UserService {
	User saveUser (User user);
	Role saveRole (Role role);
	void addRoleToUser(String username ,String roleName);
	User getUser(String username);
	User getUserByEmail(String email);
	List <User> getUsers();
	List <Role> getRoles();
	void deleteUser(Long id);
}
