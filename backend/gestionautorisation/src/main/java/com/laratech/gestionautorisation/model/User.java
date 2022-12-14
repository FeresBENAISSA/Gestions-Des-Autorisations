package com.laratech.gestionautorisation.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long 	id ; 
	private String  name ; 
	@Column(unique=true)
	private String  username; 
	private String  password; 
	@Column(unique=true)
	private String  email ; 
//	@OneToMany(mappedBy="user")
   // private List<Autorisation> autorisation;
	
	@ManyToMany(fetch = FetchType.EAGER)//loading users = loading roles 
	private Collection<Role> roles = new ArrayList<Role>();
}
