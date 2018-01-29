package org.ap.auxpro.helpers;

import java.time.LocalDateTime;

public class TimeEvent {

	/* ATTRIBUTES */
	
	private LocalDateTime _start;
	private LocalDateTime _end;
	
	/* CONSTRUCTOR */
	
	public TimeEvent(LocalDateTime start, LocalDateTime end) {
		_start = start;
		_end = end;
	}
	
	/* METHODS */
	
	public LocalDateTime getStart() {
		return _start;
	}
	
	public LocalDateTime getEnd() {
		return _end;
	}
	
	public boolean hasOverlap(TimeEvent event) {
		return (getStart().isAfter(event.getStart()) && getStart().isBefore(event.getEnd())) || (getEnd().isAfter(event.getStart()) && getEnd().isBefore(event.getEnd()));
	}
}
