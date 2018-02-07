package org.ap.auxpro.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.ap.auxpro.constants.EIndisponibilityRecurencePeriod;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.common.time.TimeEvent;
import org.ap.common.time.TimeHelper;
import org.ap.common.time.TimeSlot;
import org.ap.common.time.TimeUtils;

public class TimeEventDefinition {
		
	/* ATTRIBUTES */
	
	private LocalTime _startTime;
	private LocalTime _endTime;
	private LocalDate _startDate;
	private LocalDate _endDate;
	private List<DayOfWeek> _days = new ArrayList<DayOfWeek>();
	
	private ChronoUnit _periodUnit;
	private int _periodValue;
	
	/* CONSTRUCTOR */
	
	public TimeEventDefinition(IndisponibilityData indisponibility) {
		if (indisponibility.getStartDate() != null) {
			_startDate = TimeHelper.toLocalDate(indisponibility.getStartDate());
		}
		if (indisponibility.getEndDate() != null) {
			_endDate = TimeHelper.toLocalDate(indisponibility.getEndDate());
		}
		if (indisponibility.getStartTime() != null) {
			_startTime = TimeHelper.toLocalTime(indisponibility.getStartTime());
		}
		if (indisponibility.getEndTime() != null) {
			_endTime = TimeHelper.toLocalTime(indisponibility.getEndTime());
		}
		if (indisponibility.getDays() != null) {
			_days = TimeHelper.toDayOfWeeks(indisponibility.getDays());
		}
		EIndisponibilityRecurencePeriod period = EIndisponibilityRecurencePeriod.getByName(indisponibility.getPeriod());
		switch (period) {
		case _HOURS:
			_periodUnit = ChronoUnit.HOURS;
			break;
		case _DAYS:
			_periodUnit = ChronoUnit.DAYS;
			break;
		case _WEEK1:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 1; 
			break;
		case _WEEK2:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 2; 
			break;
		case _WEEK3:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 3; 
			break;
		case _WEEK4:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 4; 
			break;
		}
	}
	
	public TimeEventDefinition(InterventionData intervention) {
		if (intervention.getStartDate() != null) {
			_startDate = TimeHelper.toLocalDate(intervention.getStartDate());
		}
		if (intervention.getEndDate() != null) {
			_endDate = TimeHelper.toLocalDate(intervention.getEndDate());
		}
		if (intervention.getStartTime() != null) {
			_startTime = TimeHelper.toLocalTime(intervention.getStartTime());
		}
		if (intervention.getEndTime() != null) {
			_endTime = TimeHelper.toLocalTime(intervention.getEndTime());
		}
		if (intervention.getDays() != null) {
			_days = TimeHelper.toDayOfWeeks(intervention.getDays());
		}
		EInterventionRecurencePeriod period = EInterventionRecurencePeriod.getByName(intervention.getPeriod());
		switch (period) {
		case _HOURS:
			_periodUnit = ChronoUnit.HOURS;
			break;
		case _WEEK1:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 1; 
			break;
		case _WEEK2:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 2; 
			break;
		case _WEEK3:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 3; 
			break;
		case _WEEK4:
			_periodUnit = ChronoUnit.WEEKS;
			_periodValue = 4; 
			break;
		}
	}
	
	public TimeEventDefinition(MissionData mission, InterventionData intervention) {
		_startDate = TimeHelper.toLocalDate(mission.getDate());
		_startTime = TimeHelper.toLocalTime(intervention.getStartTime());
		_endTime = TimeHelper.toLocalTime(intervention.getEndTime());
		_periodUnit = ChronoUnit.HOURS;
	}
	
	public TimeEventDefinition(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, List<DayOfWeek> days, ChronoUnit periodUnit, int periodValue) {
		_startDate = startDate;
		_endDate = endDate;
		_startTime = startTime;
		_endTime = endTime;
		_days = days;
		_periodUnit = periodUnit;
		_periodValue = periodValue;
	}
	
	/* METHODS */
	
	public LocalDate getStartDate() {
		return _startDate;
	}
	public LocalDate getEndDate() {
		return _endDate;
	}
	public LocalTime getStartTime() {
		return _startTime;
	}
	public LocalTime getEndTime() {
		return _endTime;
	}
	public List<DayOfWeek> getDays() {
		return _days;
	}
	public ChronoUnit getPeriodUnit() {
		return _periodUnit;
	}
	public int getPeriodValue() {
		return _periodValue;
	}
	
	public List<TimeEvent> getEvents() {
		List<TimeEvent> result = new ArrayList<TimeEvent>();
		int days = getEndTime().isBefore(getStartTime()) ? 1 : 0;

		LocalDate currentDate = getStartDate().plusDays(0);
		switch (getPeriodUnit()) {
		case HOURS:
			TimeSlot slot = new TimeSlot(getStartTime(), getEndTime(), days);
			result.add(new TimeEvent(slot, getStartDate()));
			break;
		case DAYS:
			while (!currentDate.isAfter(getEndDate())) {
				result.add(new TimeEvent(new TimeSlot(LocalTime.MIN, LocalTime.MAX), currentDate));
				currentDate = currentDate.plusDays(1);
			}
			break;
		case WEEKS:
			slot = new TimeSlot(getStartTime(), getEndTime(), days);
			while (!currentDate.isAfter(getEndDate())) {
				currentDate = TimeUtils.getPreviousOfDay(currentDate, DayOfWeek.MONDAY);
				for (int i = 0; i < 7; i++) {
					if (getDays().contains(currentDate.getDayOfWeek()) && !currentDate.isBefore(getStartDate()) && !currentDate.isAfter(getEndDate())) {
						result.add(new TimeEvent(slot, currentDate));
					}
					currentDate = currentDate.plusDays(1);
				}
				currentDate = currentDate.plusWeeks(getPeriodValue() - 1);
			}
			break;
		default:
			break;
		}
		return result;
	}
}