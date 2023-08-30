package com.soccer.stars.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.TrainingGroup;

@Repository
public interface TrainingGroupRepo extends JpaRepository<TrainingGroup, Integer>{

}
