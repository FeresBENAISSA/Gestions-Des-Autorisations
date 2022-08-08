package com.laratech.gestionautorisation.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laratech.gestionautorisation.model.Role;

public interface RoleRepo extends JpaRepository<Role, Long>{
  Role	findByName(String name);
}
