package com.soccer.stars.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soccer.stars.model.Coach;
import com.soccer.stars.model.Player;
import com.soccer.stars.model.Users;
import com.soccer.stars.repo.CoachRepo;

@Service
public class CoachService implements CrudService<Coach, Integer>{

	@Autowired
	CoachRepo repo;
	
	@Override
	public void add(Coach t) {
		// TODO Auto-generated method stub
		repo.save(t);
	}

	@Override
	public Coach getById(Integer id) {
		// TODO Auto-generated method stub
		return (repo.findById(id).equals(Optional.empty()))?null:repo.findById(id).get();
	}

	@Override
	public List<Coach> getAll() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public void update(Coach t) {
		// TODO Auto-generated method stub
		repo.save(t);
	}

	@Override
	public Integer delete(Integer id) {
		// TODO Auto-generated method stub
		if(repo.findById(id).equals(Optional.empty())) return -1;
		repo.deleteById(id);
		return id;
	}

	public Coach getByUser(Users user) {
		// TODO Auto-generated method stub
		return repo.findByUser(user);
	}

	
}
