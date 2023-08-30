package com.soccer.stars.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users,String> {
	
	@Query("SELECT u FROM Users u WHERE u.email = ?1")
	Users findByEmail(String email);
	
}