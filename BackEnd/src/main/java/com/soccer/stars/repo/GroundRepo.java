package com.soccer.stars.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.Ground;

@Repository
public interface GroundRepo extends JpaRepository<Ground, Integer>{

}
