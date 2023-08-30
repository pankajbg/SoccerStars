package com.soccer.stars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;

import com.soccer.stars.model.ContactUs;
import com.soccer.stars.repo.ContactUsRepo;

@RestController
@RequestMapping(value  ="/api")
public class ContactUsController {
	
	@Autowired
	private ContactUsRepo contactUsRepo;
	
	@PostMapping("/contact")
	public ResponseEntity<?> submitContactUs(@RequestBody ContactUs contactUs){
		
		try {
			ContactUs c = new ContactUs();
			
			c.setEmail(contactUs.getEmail());
			c.setMessage(contactUs.getMessage());
			c.setName(contactUs.getName());
			
			contactUsRepo.save(c);
			return ResponseEntity.ok("FeedBack Submitted ");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to Submit "+ e.getMessage());

		}
		
		
		
		
		
	}
}
