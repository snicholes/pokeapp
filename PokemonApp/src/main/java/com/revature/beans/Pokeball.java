package com.revature.beans;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

@Entity
@Table
@PrimaryKeyJoinColumn(name="item_id")
public class Pokeball extends Item {
	private Integer multiplier;

	public Integer getMultiplier() {
		return multiplier;
	}

	public void setMultiplier(Integer multiplier) {
		this.multiplier = multiplier;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((multiplier == null) ? 0 : multiplier.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pokeball other = (Pokeball) obj;
		if (multiplier == null) {
			if (other.multiplier != null)
				return false;
		} else if (!multiplier.equals(other.multiplier))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Pokeball [multiplier=" + multiplier + "]";
	}
	
}
