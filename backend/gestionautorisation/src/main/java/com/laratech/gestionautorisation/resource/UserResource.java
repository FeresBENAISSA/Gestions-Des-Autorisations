package com.laratech.gestionautorisation.resource;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.catalina.mapper.Mapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.laratech.gestionautorisation.email.EmailService;
import com.laratech.gestionautorisation.model.Role;
import com.laratech.gestionautorisation.model.User;
import com.laratech.gestionautorisation.service.UserServiceImpl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/apiuser")
public class UserResource {

	private final UserServiceImpl userService;
	private final EmailService  emailService;
	 public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";
	//get requests (all users - all roles )
	@GetMapping("/all")
	public ResponseEntity<List<User>>getUsers(){
		return new ResponseEntity<List<User>>(userService.getUsers(),HttpStatus.OK);
	}
	@GetMapping("/user/find/{username}")
	public ResponseEntity<User>getUser(@PathVariable("username") String username ){
		return new ResponseEntity<User>(userService.getUser(username),HttpStatus.OK);
	}
	@GetMapping("/user/find/email/{email}")
	public ResponseEntity<User>getUserByEmail(@PathVariable("email") String email ){
		return new ResponseEntity<User>(userService.getUserByEmail(email),HttpStatus.OK);
	}
	
	@GetMapping("/roles")
	public ResponseEntity<List<Role>>getRoles(){
		return new ResponseEntity<List<Role>>(userService.getRoles(),HttpStatus.OK);
	}
	// post request saving user - role - roleToUser
	@PostMapping("/user/save")
	public ResponseEntity<User>saveUser(@RequestBody User user){

		return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
	}
	
	@PutMapping("/user/update")
	public ResponseEntity<User>updateUser(@RequestBody User user){

		return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
	}
	
	@PostMapping("/role/save")
	public ResponseEntity<Role>saveRole(@RequestBody Role role){
		log.error("erreur");
		return new ResponseEntity<Role>(userService.saveRole(role),HttpStatus.CREATED);
	}
	
	@PostMapping("/role/addroletouser")
	public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm roleToUserForm){
		userService.addRoleToUser(roleToUserForm.getUsername(), roleToUserForm.getRoleName());
		return ResponseEntity.ok().build();
	}
	@DeleteMapping("/user/delete/{id}")
	public ResponseEntity<?>deleteUser(@PathVariable("id") Long id ){
		userService.deleteUser(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/email")
	public ResponseEntity<?> sendEmail( @RequestBody EmailMessage emailMessage){
		this.emailService.send(emailMessage.getTo(), emailMessage.getMessage());
		return ResponseEntity.ok().build();
	}
	
	
//	  @GetMapping
//	 @ResponseBody
//	    public List<UserDto> getUsers() {
//	        return userService.getAll()
//	          .stream()
//	          .map(mapper::toDto)
//	          .collect(toList/me());
//	    }

	
	@Data
	class RoleToUserForm {
		private String username; 
		private String roleName ;
	}
	@Data
	class EmailMessage {
		private String to; 
		private String Message ;
	}
	
	
	@GetMapping("/me")
	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		User user = userService.getUser(currentPrincipalName);
		return user;
	}
	
	

	
}
	