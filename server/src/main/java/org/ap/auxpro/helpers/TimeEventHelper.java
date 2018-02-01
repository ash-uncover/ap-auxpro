package org.ap.auxpro.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.ap.auxpro.constants.EIndisponibilityRecurencePeriod;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.common.time.TimeEvent;
import org.ap.common.time.TimeHelper;
import org.ap.common.time.TimeSlot;

public class TimeEventHelper {

	public static TimeEvent[] buildEvents(IndisponibilityData indisponibility) {
		List<TimeEvent> result = new ArrayList<TimeEvent>();

		LocalDate startDate = TimeHelper.toLocalDate(indisponibility.getStartDate());
		LocalDate endDate = indisponibility.getEndDate() != null ? TimeHelper.toLocalDate(indisponibility.getStartDate()) : null;
		LocalTime startTime = indisponibility.getStartTime() != null ? TimeHelper.toLocalTime(indisponibility.getStartTime()) : null;
		LocalTime endTime = indisponibility.getEndTime() != null ? TimeHelper.toLocalTime(indisponibility.getEndTime()) : null;
		int days = 0;

		if (endTime.isBefore(startTime)) {
			days = 1;
			LocalTime tmpTime = startTime.plusHours(0);
			startTime = endTime.plusHours(0);
			endTime = tmpTime.plusHours(0);
		}

		LocalDate currentDate = startDate.plusDays(0);
		EIndisponibilityRecurencePeriod period = EIndisponibilityRecurencePeriod.getByName(indisponibility.getPeriod());
		switch (period) {
		case _HOURS:
			TimeSlot slot = new TimeSlot(startTime, endTime, days);
			result.add(new TimeEvent(slot, startDate));
			break;
		case _DAYS:
			while (!currentDate.isAfter(endDate)) {
				result.add(new TimeEvent(new TimeSlot(LocalTime.MIN, LocalTime.MAX), currentDate));
				currentDate = currentDate.plusDays(1);
			}
			break;
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			slot = new TimeSlot(startTime, endTime, days);
			List<DayOfWeek> daysOfWeek = TimeHelper.toDayOfWeeks(indisponibility.getDays());
			while (!currentDate.isAfter(endDate)) {
				if (daysOfWeek.contains(currentDate.getDayOfWeek())) {
					result.add(new TimeEvent(slot, currentDate));
				}
				currentDate = currentDate.plusDays(1);
			}
			break;
		default:
			break;
		}
		return result.toArray(new TimeEvent[result.size()]);
	}

	public static TimeEvent[] buildEvents(InterventionData intervention) {
		List<TimeEvent> result = new ArrayList<TimeEvent>();

		LocalDate startDate = TimeHelper.toLocalDate(intervention.getStartDate());
		LocalDate endDate = intervention.getEndDate() != null ? TimeHelper.toLocalDate(intervention.getStartDate()) : null;
		LocalTime startTime = intervention.getStartTime() != null ? TimeHelper.toLocalTime(intervention.getStartTime()) : null;
		LocalTime endTime = intervention.getEndTime() != null ? TimeHelper.toLocalTime(intervention.getEndTime()) : null;
		int days = 0;

		if (endTime.isBefore(startTime)) {
			days = 1;
			LocalTime tmpTime = startTime.plusHours(0);
			startTime = endTime.plusHours(0);
			endTime = tmpTime.plusHours(0);
		}

		LocalDate currentDate = startDate.plusDays(0);
		EInterventionRecurencePeriod period = EInterventionRecurencePeriod.getByName(intervention.getPeriod());
		switch (period) {
		case _HOURS:
			TimeSlot slot = new TimeSlot(startTime, endTime, days);
			result.add(new TimeEvent(slot, startDate));
			break;
		case _WEEK1:
		case _WEEK2:
		case _WEEK3:
		case _WEEK4:
			slot = new TimeSlot(startTime, endTime, days);
			List<DayOfWeek> daysOfWeek = TimeHelper.toDayOfWeeks(intervention.getDays());
			while (!currentDate.isAfter(endDate)) {
				if (daysOfWeek.contains(currentDate.getDayOfWeek())) {
					result.add(new TimeEvent(slot, currentDate));
				}
				currentDate = currentDate.plusDays(1);
			}
			break;
		default:
			break;
		}
		return result.toArray(new TimeEvent[result.size()]);
	}
}
