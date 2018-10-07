package org.ap.auxpro.helpers;

import java.lang.reflect.Field;
import java.util.Set;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.auxpro.bean.CustomerBean;
import org.ap.auxpro.constants.EAuxiliarySkills;
import org.ap.auxpro.constants.EPeopleCategory;
import org.ap.auxpro.storage.customer.CustomerCollection;
import org.ap.auxpro.storage.customer.CustomerData;
import org.ap.common.web.exception.APWebException;

public class CustomerHelper {

	public static void checkSkills(CustomerBean customer) {
		Set<EAuxiliarySkills> skillsAvailable = DiplomaHelper.getCategorySkills(EPeopleCategory.getByName(customer.category));

		for (EAuxiliarySkills skill: EAuxiliarySkills.values()) {
			try {
				Field field = CustomerBean.class.getField(skill.getName());
				Integer value = (Integer)field.get(customer);
				if (value == null) {
					value = 0;
				}
				if (value < 0) value = 0;
				if (value > 5) value = 5;
				if (!skillsAvailable.contains(skill)) {
					value = 0;
				}
				field.set(customer, value);
			} catch (Exception e) {
				System.err.println("Error while setting auxiliary skill: " + skill);
			}
		}
	}
	
	public static void beforePutCustomer(SecurityContext sc, String id, CustomerBean customerBean) throws APWebException {
		CustomerData data = CustomerCollection.getById(id);
		if (!sc.isUserInRole(data.getServiceId())) {
			throw new APWebException("forbidden", Status.FORBIDDEN);
		}
		CustomerHelper.checkSkills(customerBean);
	}
}
