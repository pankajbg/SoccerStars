package com.soccer.stars.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.soccer.stars.model.BookingSlot;
import com.soccer.stars.model.Club;
import com.soccer.stars.model.Coach;
import com.soccer.stars.model.Ground;
import com.soccer.stars.model.PersonalTrainingRequest;
import com.soccer.stars.model.Player;
import com.soccer.stars.repo.BookingRepo;
import com.soccer.stars.service.ClubService;
import com.soccer.stars.service.CoachService;
import com.soccer.stars.service.GroundService;
import com.soccer.stars.service.PersonalTrainingService;
import com.soccer.stars.service.PlayerService;

@RestController
@RequestMapping(value="/admin")
public class AdminController{
	@Autowired
	PersonalTrainingService personalTrainingService;

	@Autowired
	GroundService groundService;
	
	@Autowired
	ClubService clubService;
	
	@Autowired
	PlayerService playerService;
	
	@Autowired
	CoachService coachService;

	

	@GetMapping("/getAllPersonalCoachRequest")
	public List<PersonalTrainingRequest> getAllPersonalCoachRequest() {
		return personalTrainingService.getAll();
	}
	

	@PostMapping("/approvePersonalCoachRequest/{requestid}")
	public int approveAllPersonalCoachRequest(@PathVariable("requestid") Integer requestid) {
		PersonalTrainingRequest request = personalTrainingService.getById(requestid);
		if(request == null)
			return 0;
		request.setStatus("APPROVED");
		personalTrainingService.update(request);
		try {
			Player player= playerService.getById(request.getPlayer().getPid());
			Coach coach = coachService.getById(request.getCoach().getCoach_id());
			
			player.setPersonalCoach(coach);
			List<Player> players = coach.getPlayers();	
			if(players == null) {
				players = new ArrayList<Player>();
			}
			players.add(player);
			coach.setPlayers(players);
			
			coachService.update(coach);
			playerService.update(player);
			
		}catch(Exception e) {
			return 0;
		}
		return 1;
	}
	
	@PostMapping("/addGround/{clubid}")
	public int addGround(@PathVariable Integer clubid, @RequestBody Ground ground) {
		Club club = clubService.getById(clubid);
		if(club == null)
			return 0;
		List<Ground> grounds = club.getGrounds();
		if(grounds == null) {
			grounds = new ArrayList<Ground>();
		}
		grounds.add(ground);
		
		club.setGrounds(grounds);
		ground.setClub(club);
		
		groundService.update(ground);
		clubService.update(club);
		return 1;
	}
	
	@GetMapping("/getAllGround/{clubid}")
	public List<Ground> addGround(@PathVariable Integer clubid) {
		Club club = clubService.getById(clubid);
		if(club == null)
			return null;
		return club.getGrounds();
	}
	
	@PostMapping("/getBookedSlots/{gid}")
	public List<BookingSlot> getBookedSlots(@PathVariable Integer gid, @RequestParam String date) {
		Ground ground = groundService.getById(gid);
		if(ground == null)
			return null;
		List<BookingSlot> slots = ground.getSlots();
		if(slots == null) {
			slots = new ArrayList<BookingSlot>();
		}else {
			slots = slots.stream().filter((s)->s.getDate().equals(date)).toList();
		}
		return slots;
	}
	

	
	
}
