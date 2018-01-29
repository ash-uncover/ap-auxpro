package org.ap.auxpro.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.ap.auxpro.constants.EIndisponibilityRecurencePeriod;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.common.time.TimeHelper;

public class TimeEventHelper {

	public static TimeEvent[] buildEvents(IndisponibilityData indisponibility) {
		List<TimeEvent> result = new ArrayList<TimeEvent>();
		
		LocalDate startLocalDate, endLocalDate, currentDate;
		Date startDate, endDate;
		EIndisponibilityRecurencePeriod period = EIndisponibilityRecurencePeriod.getByName(indisponibility.getPeriod());
		switch (period) {
		case _HOURS:
			LocalDateTime startTime = LocalDateTime.of(TimeHelper.indisponibility.getStartDate(), indisponibility.getStartTime());
			return new TimeEvent[] { 
					new TimeEvent(TimeHelper.toIntegers(indisponibility.getStartDate()), indisponibility.getStartTime(), indisponibility.getEndTime()) 
					};
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
		
		return result.toArray(new TimeEvent[result.size()]);
	}
	
	public static TimeEvent[] buildEvents(InterventionData intervention) {
		List<TimeEvent> result = new ArrayList<TimeEvent>();
		return result.toArray(new TimeEvent[result.size()]);
	}
}
