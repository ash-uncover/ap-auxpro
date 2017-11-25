package org.ap.auxpro.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.ap.auxpro.constants.EIndisponibilityRecurencePeriod;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.common.TimeHelper;

public class Event {
	public LocalDate date;
	public LocalTime start;
	public LocalTime end;

	public Event() {
	}

	public Event(List<Integer> date, List<Integer> start, List<Integer> end) {
		this.date = TimeHelper.toLocalDate(date);
		this.start = TimeHelper.toLocalTime(start);
		this.end = TimeHelper.toLocalTime(end);
	}

	public Event(LocalDate date, LocalTime start, LocalTime end) {
		this.date = date;
		this.start = start;
		this.end = end;
	}

	public static Event[] buildEvents(IndisponibilityData indisponibility) {
		List<Event> result = new ArrayList<Event>();
		LocalDate startLocalDate, endLocalDate, currentDate;
		Date startDate, endDate;
		EIndisponibilityRecurencePeriod period = EIndisponibilityRecurencePeriod.getByName(indisponibility.getPeriod());
		switch (period) {
		case _HOURS:
			return new Event[] { new Event(TimeHelper.toIntegers(indisponibility.getStartDate()), indisponibility.getStartTime(), indisponibility.getEndTime()) };
		case _DAYS:
			startDate = indisponibility.getStartDate();
			startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			endDate = indisponibility.getEndDate();
			endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			currentDate = startLocalDate.plusDays(0);
			while (!currentDate.isAfter(endLocalDate)) {
				result.add(new Event(currentDate, LocalTime.MIN, LocalTime.MAX));
				currentDate = currentDate.plusDays(1);
			}
			return result.toArray(new Event[result.size()]);
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			List<DayOfWeek> days = TimeHelper.toDayOfWeeks(indisponibility.getDays());
			startDate = indisponibility.getStartDate();
			startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			endDate = indisponibility.getEndDate();
			endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			currentDate = startLocalDate.plusDays(0);
			while (!currentDate.isAfter(endLocalDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					result.add(new Event(currentDate, TimeHelper.toLocalTime(indisponibility.getStartTime()), TimeHelper.toLocalTime(indisponibility.getEndTime())));
				}
				currentDate = currentDate.plusDays(1);
			}
			return result.toArray(new Event[result.size()]);
		default:
			return new Event[0];
		}
	}
	
	public static Period getJumpPeriod(EIndisponibilityRecurencePeriod period) {
		switch(period) {
		case _HOURS: return Period.ofWeeks(0);
		case _DAYS: return Period.ofWeeks(0);
		case _WEEK1: return Period.ofWeeks(1);
		case _WEEK2: return Period.ofWeeks(2);
		case _WEEK3: return Period.ofWeeks(3);
		case _WEEK4: return Period.ofWeeks(4);
		default: return Period.ofWeeks(0);
		}
	}

	public static Event[] buildEvents(InterventionData intervention) {
		EInterventionRecurencePeriod period = EInterventionRecurencePeriod.getByName(intervention.getPeriod());
		switch (period) {
		case _HOURS:
			return new Event[] { new Event(TimeHelper.toIntegers(intervention.getStartDate()), intervention.getStartTime(), intervention.getEndTime()) };
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			List<Event> result = new ArrayList<Event>();
			List<DayOfWeek> days = TimeHelper.toDayOfWeeks(intervention.getDays());
			Date startDate = intervention.getStartDate();
			LocalDate startLocalDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			Date endDate = intervention.getEndDate();
			LocalDate endLocalDate = endDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			LocalDate currentDate = startLocalDate.plusDays(0);
			while (!currentDate.isAfter(endLocalDate)) {
				if (days.contains(currentDate.getDayOfWeek())) {
					result.add(new Event(currentDate, TimeHelper.toLocalTime(intervention.getStartTime()), TimeHelper.toLocalTime(intervention.getEndTime())));
				}
				currentDate = currentDate.plusDays(1);
				if (currentDate.getDayOfWeek().equals(DayOfWeek.MONDAY)) {
					currentDate = currentDate.plusDays(getJumpPeriod(period).getDays());
				}
			}
			return result.toArray(new Event[result.size()]);
		default:
			return new Event[0];
		}
	}

	public static Period getJumpPeriod(EInterventionRecurencePeriod period) {
		switch(period) {
		case _HOURS: return Period.ofWeeks(0);
		case _WEEK1: return Period.ofWeeks(1);
		case _WEEK2: return Period.ofWeeks(2);
		case _WEEK3: return Period.ofWeeks(3);
		case _WEEK4: return Period.ofWeeks(4);
		default: return Period.ofWeeks(0);
		}
	}

	public static Event[] buildEvents(MissionData mission, InterventionData intervention) {
		return new Event[] { new Event(TimeHelper.toIntegers(mission.getDate()), intervention.getStartTime(), intervention.getEndTime()) };
	}

	public static boolean hasOverlap(Event e1, Event e2) {
		return (e1.date.isEqual(e2.date) && (e1.start.isBefore(e2.end) || e1.end.isAfter(e2.start)) );
	}
	public static boolean hasOverlap(Event[] events, Event e2) {
		for (Event e1 : events) {
			if (hasOverlap(e1, e2)) {
				return true;
			}
		}
		return false;
	}
	public static boolean hasOverlap(Event[] events1, Event[] events2) {
		for (Event e1 : events1) {
			for (Event e2 : events2) {
				if (hasOverlap(e1, e2)) {
					return true;
				}
			}
		}
		return false;
	}
}
