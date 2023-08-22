package com.soccer.stars.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.Coach;
import com.soccer.stars.model.Player;
import com.soccer.stars.model.Users;

@Repository
public interface CoachRepo extends JpaRepository<Coach, Integer>{
	public Coach findByUser(Users user);
}
