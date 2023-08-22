package com.soccer.stars.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.soccer.stars.model.BookingSlot;

@Repository
public interface SlotRepo extends JpaRepository<BookingSlot, Integer>{

}
