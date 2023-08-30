package com.soccer.stars.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.Club;

@Repository
public interface ClubRepo extends JpaRepository<Club, Integer>{

}
