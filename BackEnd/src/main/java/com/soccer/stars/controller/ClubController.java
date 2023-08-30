package com.soccer.stars.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soccer.stars.model.Club;
import com.soccer.stars.model.Coach;
import com.soccer.stars.model.TrainingGroup;
import com.soccer.stars.service.ClubService;
import com.soccer.stars.service.CoachService;
import com.soccer.stars.service.TrainingGroupService;

@RestController
@RequestMapping(value="/club")
public class ClubController implements CrudController<Club, Integer>{
	@Autowired
	ClubService service;
	
	@Autowired
	CoachService coachService;
	
	@Autowired
	TrainingGroupService trainingService;


	@Override
	@PostMapping("/add")
	public int add(@RequestBody Club model) {
		// TODO Auto-generated method stub
		service.add(model);
		return 1;
	}

	@Override
	@GetMapping("/delete/{id}")
	public int delete(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub
		service.delete(id);
		return 1;
	}

	@Override
	@PostMapping("/update")
	public int update(@RequestBody Club model) {
		// TODO Auto-generated method stub
		service.update(model);
		return 1;
	}

	@Override
	@GetMapping("/all")
	public List<Club> getAll() {
		// TODO Auto-generated method stub
		return service.getAll();
	}

	@Override
	@GetMapping("/get/{id}")
	public Club getById(@PathVariable("id") Integer id) {
		// TODO Auto-generated method stub
		return service.getById(id);
	}
	
	@GetMapping("/getAllTrainingGroup/{clubid}")
	public List<TrainingGroup> getAllTrainingGroup(@PathVariable("clubid") Integer id) {
		Club club = service.getById(id);
		if(club == null)
			return null;
		return club.getBatches();
	}
	
	@PostMapping(value="/addTrainingGroup/{coachid}/{clubid}", consumes = { "application/json" })
	public int addGroup(@PathVariable("coachid") Integer coachid, @PathVariable("clubid") Integer clubid, @RequestBody TrainingGroup group) {
		Club club = service.getById(clubid);
		
		if(club == null)
			return 0;
		List<TrainingGroup> groups = club.getBatches();
		if(groups == null) {
			groups = new ArrayList<TrainingGroup>();
		}
		groups.add(group);
		club.setBatches(groups);
		group.setClub(club);
		if(group.getPlayerCount() == null) {
			group.setPlayerCount(0);
		}else {
			group.setPlayerCount(0);
		}
		
		service.update(club);
		trainingService.update(group);
		
		Coach coach = coachService.getById(coachid);
		List<TrainingGroup> coachGroups = coach.getGroup(); // training groups under a coach
		if(coachGroups == null) {
			coachGroups = new ArrayList<TrainingGroup>();
		}
		coachGroups.add(group);
		coach.setGroup(coachGroups);
		group.setCoach(coach);
		coachService.update(coach);
		trainingService.update(group);
		
		return 1;
	}
	
	
	
}
