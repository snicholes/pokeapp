package com.revature.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="person_item")
public class PersonItem {
	@ManyToOne
	@JoinColumn(name="person_id")
	private Person person;
	@ManyToOne
	@JoinColumn(name="item_id")
	private Item item;
	@Column
	private Integer quantity;
}
