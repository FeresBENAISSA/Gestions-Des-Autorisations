package com.laratech.gestionautorisation.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laratech.gestionautorisation.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
	User findByUsername(String username);
	User findByEmail(String email);
	void deleteUserById(Long id);
}
