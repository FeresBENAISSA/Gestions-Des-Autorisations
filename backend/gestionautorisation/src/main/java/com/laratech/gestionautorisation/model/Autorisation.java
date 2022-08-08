package com.laratech.gestionautorisation.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Autorisation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idAuto;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date date;
	@JsonFormat(pattern = "hh:mm")
	private Date exitTime;
	@JsonFormat(pattern = "hh:mm")
	private Date returnTime;
	private String state;
	private String description;
	@ManyToOne
    @JoinColumn(name="id", nullable=false)
    private User user;
}
