package org.ap.auxpro.helpers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.ap.auxpro.constants.EIndisponibilityRecurencePeriod;
import org.ap.auxpro.constants.EInterventionRecurencePeriod;
import org.ap.auxpro.storage.indisponibility.IndisponibilityData;
import org.ap.auxpro.storage.intervention.InterventionData;
import org.ap.auxpro.storage.mission.MissionData;
import org.ap.common.time.TimeEvent;
import org.ap.common.time.TimeHelper;
import org.ap.common.time.TimeUtils;
import org.junit.Test;

import junit.framework.TestCase;

@SuppressWarnings("deprecation")
public class TimeEventDefinitionTest {

	/* TEST DATA */
	
	private static Date DATE0 = new Date(118, 0, 31); // a wenesday
	private static Date DATE1 = new Date(118, 1, 7);  // a wenesday
	private static Date DATE2 = new Date(118, 1, 26); // a monday
	private static LocalDate LOCAL_DATE0;
	private static LocalDate LOCAL_DATE1;
	private static LocalDate LOCAL_DATE2;
	
	private static List<Integer> TIME0 = new ArrayList<Integer>();
	private static List<Integer> TIME1 = new ArrayList<Integer>();
	private static List<Integer> TIME2 = new ArrayList<Integer>();
	private static LocalTime LOCAL_TIME0;
	private static LocalTime LOCAL_TIME1;
	private static LocalTime LOCAL_TIME2;
	
	private static List<DayOfWeek> DAYS0 = new ArrayList<DayOfWeek>();
	private static List<DayOfWeek> DAYS1 = new ArrayList<DayOfWeek>();
	
	static {
		TIME0.add(12);
		TIME0.add(0);
		TIME1.add(16);
		TIME1.add(30);
		TIME2.add(20);
		TIME2.add(0);
		
		LOCAL_DATE0 = TimeHelper.toLocalDate(DATE0);
		LOCAL_DATE1 = TimeHelper.toLocalDate(DATE1);
		LOCAL_DATE2 = TimeHelper.toLocalDate(DATE2);
		
		LOCAL_TIME0 = TimeHelper.toLocalTime(TIME0);
		LOCAL_TIME1 = TimeHelper.toLocalTime(TIME1);
		LOCAL_TIME2 = TimeHelper.toLocalTime(TIME2);
		
		DAYS0.add(DayOfWeek.MONDAY);
		DAYS0.add(DayOfWeek.WEDNESDAY);
		
		DAYS1.add(DayOfWeek.TUESDAY);
	}
	
	/* TEST CASES */
	
	@Test
	public void testV_constructorIndisponibility_basic() {
		IndisponibilityData indisponibility = new IndisponibilityData();
		indisponibility.setStartDate(DATE0);
		indisponibility.setStartTime(TIME0);
		indisponibility.setEndTime(TIME1);
		indisponibility.setPeriod(EIndisponibilityRecurencePeriod._HOURS.getName());
		TimeEventDefinition definition = new TimeEventDefinition(indisponibility);
		TestCase.assertEquals(LOCAL_DATE0, definition.getStartDate());
		TestCase.assertEquals(LOCAL_TIME0, definition.getStartTime());
		TestCase.assertEquals(LOCAL_TIME1, definition.getEndTime());
		TestCase.assertEquals(ChronoUnit.HOURS, definition.getPeriodUnit());
	}
	
	@Test
	public void testV_constructorIndisponibility_days() {
		IndisponibilityData indisponibility = new IndisponibilityData();
		indisponibility.setStartDate(DATE0);
		indisponibility.setEndDate(DATE1);
		indisponibility.setStartTime(TIME0);
		indisponibility.setEndTime(TIME1);
		indisponibility.setPeriod(EIndisponibilityRecurencePeriod._DAYS.getName());
		TimeEventDefinition definition = new TimeEventDefinition(indisponibility);
		TestCase.assertEquals(LOCAL_DATE0, definition.getStartDate());
		TestCase.assertEquals(LOCAL_DATE1, definition.getEndDate());
		TestCase.assertEquals(LOCAL_TIME0, definition.getStartTime());
		TestCase.assertEquals(LOCAL_TIME1, definition.getEndTime());
		TestCase.assertEquals(ChronoUnit.DAYS, definition.getPeriodUnit());
	}
	
	@Test
	public void testV_constructorIntervention_weeks() {
		InterventionData intervention = new InterventionData();
		intervention.setStartDate(DATE0);
		intervention.setEndDate(DATE2);
		intervention.setStartTime(TIME0);
		intervention.setEndTime(TIME1);
		intervention.setPeriod(EInterventionRecurencePeriod._WEEK2.getName());
		TimeEventDefinition definition = new TimeEventDefinition(intervention);
		TestCase.assertEquals(LOCAL_DATE0, definition.getStartDate());
		TestCase.assertEquals(LOCAL_DATE2, definition.getEndDate());
		TestCase.assertEquals(LOCAL_TIME0, definition.getStartTime());
		TestCase.assertEquals(LOCAL_TIME1, definition.getEndTime());
		TestCase.assertEquals(ChronoUnit.WEEKS, definition.getPeriodUnit());
		TestCase.assertEquals(2, definition.getPeriodValue());
	}
	
	@Test
	public void testV_constructorMission() {
		MissionData mission = new MissionData();
		mission.setDate(DATE1);
		InterventionData intervention = new InterventionData();
		intervention.setStartDate(DATE0);
		intervention.setEndDate(DATE2);
		intervention.setStartTime(TIME0);
		intervention.setEndTime(TIME1);
		intervention.setPeriod(EInterventionRecurencePeriod._WEEK2.getName());
		TimeEventDefinition definition = new TimeEventDefinition(mission, intervention);
		TestCase.assertEquals(LOCAL_DATE1, definition.getStartDate());
		TestCase.assertEquals(LOCAL_TIME0, definition.getStartTime());
		TestCase.assertEquals(LOCAL_TIME1, definition.getEndTime());
		TestCase.assertEquals(ChronoUnit.HOURS, definition.getPeriodUnit());
	}
	
	@Test
	public void testV_getEvents_hours() {
		TimeEventDefinition definition = new TimeEventDefinition(LOCAL_DATE0, null, LOCAL_TIME0, LOCAL_TIME1, null, ChronoUnit.HOURS, 0);
		List<TimeEvent> events = definition.getEvents();
		TestCase.assertEquals(1, events.size());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0, LOCAL_TIME0), events.get(0).getStart());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0, LOCAL_TIME1), events.get(0).getEnd());
	}
	
	@Test
	public void testV_getEvents_hoursNight() {
		TimeEventDefinition definition = new TimeEventDefinition(LOCAL_DATE0, null, LOCAL_TIME2, LOCAL_TIME0, null, ChronoUnit.HOURS, 0);
		List<TimeEvent> events = definition.getEvents();
		TestCase.assertEquals(1, events.size());
		TestCase.assertEquals(LocalDateTime.of(TimeHelper.toLocalDate(DATE0), LOCAL_TIME2), events.get(0).getStart());
		TestCase.assertEquals(LocalDateTime.of(TimeHelper.toLocalDate(DATE0).plusDays(1), LOCAL_TIME0), events.get(0).getEnd());
	}
	
	@Test
	public void testV_getEvents_days() {
		TimeEventDefinition definition = new TimeEventDefinition(LOCAL_DATE0, LOCAL_DATE1, LOCAL_TIME2, LOCAL_TIME0, null, ChronoUnit.DAYS, 0);
		List<TimeEvent> events = definition.getEvents();
		TestCase.assertEquals(8, events.size());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0, LocalTime.MIN), events.get(0).getStart());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0, LocalTime.MAX), events.get(0).getEnd());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0.plusDays(7), LocalTime.MIN), events.get(7).getStart());
		TestCase.assertEquals(LocalDateTime.of(LOCAL_DATE0.plusDays(7), LocalTime.MAX), events.get(7).getEnd());
	}

	@Test
	public void testV_getEvents_weeks() {
		TimeEventDefinition definition = new TimeEventDefinition(LOCAL_DATE0, LOCAL_DATE2, LOCAL_TIME0, LOCAL_TIME1, DAYS0, ChronoUnit.WEEKS, 1);
		List<TimeEvent> events = definition.getEvents();
		TestCase.assertEquals(8, events.size());
		TestCase.assertEquals(LocalDateTime.of(TimeUtils.getNextOfDay(LOCAL_DATE0, DayOfWeek.WEDNESDAY), LOCAL_TIME0), events.get(0).getStart());
		TestCase.assertEquals(LocalDateTime.of(TimeUtils.getNextOfDay(LOCAL_DATE0, DayOfWeek.WEDNESDAY), LOCAL_TIME1), events.get(0).getEnd());
		TestCase.assertEquals(LocalDateTime.of(TimeUtils.getPreviousOfDay(LOCAL_DATE2, DayOfWeek.MONDAY), LOCAL_TIME0), events.get(7).getStart());
		TestCase.assertEquals(LocalDateTime.of(TimeUtils.getPreviousOfDay(LOCAL_DATE2, DayOfWeek.MONDAY), LOCAL_TIME1), events.get(7).getEnd());
	}
	
}