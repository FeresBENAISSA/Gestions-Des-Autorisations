package com.laratech.gestionautorisation.dto;

import org.springframework.stereotype.Component;

import com.laratech.gestionautorisation.model.Role;
import com.laratech.gestionautorisation.model.User;

@Component
public class Mapper {
	public UserDTO toDto (User user) {
//		String name = user.getName();
//        List<String> roles = user
//          .getRoles()
//          .stream()
//          .map(Role::getName)
//          .collect(toList());

        return new UserDTO();
	}
}
