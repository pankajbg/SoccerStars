package com.soccer.stars.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.Player;
import com.soccer.stars.model.Users;

@Repository
public interface PlayerRepo extends JpaRepository<Player, Integer>{
	public Player findByUser(Users user);
}
