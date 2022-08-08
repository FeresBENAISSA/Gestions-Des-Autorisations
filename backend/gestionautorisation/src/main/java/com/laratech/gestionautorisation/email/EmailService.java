package com.laratech.gestionautorisation.email;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService  implements EmailSender{
	private final static Logger LOGGER= org.slf4j.LoggerFactory.getLogger(EmailService.class) ; 
	private final JavaMailSender mailSender;
	@Async 
	@Override
	public void send(String to, String message) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom("feres.benaissa14@gmail.com");
		simpleMailMessage.setTo(to);
		simpleMailMessage.setSubject("Your Laratech Autorisation Account");
		simpleMailMessage.setText(message);
		this.mailSender.send(simpleMailMessage);
	} 
	

	
	
	
	
	/*public void send(String to, String email) {
		try {
			javax.mail.internet.MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,"utf-8");
			helper.setText(email,true);
			helper.setTo(to);
			helper.setSubject();
			helper.setFrom("feres.benaissa15@gmail.com");
		}catch(MessagingException e ) {
			LOGGER.error("failed to send email ",e);
			throw new IllegalStateException("failed to send mail");
		}
	}*/

}
