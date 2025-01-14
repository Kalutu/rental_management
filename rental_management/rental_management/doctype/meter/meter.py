# Copyright (c) 2025, Kalutu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Meter(Document):
	pass

@frappe.whitelist()
def get_initial_reading(**args):
	meter_method = args.get('meter_method')
	asset = args.get('property')
	unit = args.get('unit')
	meter_type = args.get('meter_type')

	if meter_method == "Per Unit":
		# Check for an existing meter record with the same property, unit, and meter type
		previous_meter = frappe.get_all(
			'Meter',
			filters={
				'unit': unit,
				'meter_type': meter_type
			},
			fields=['current_reading'],
			order_by='creation desc',
			limit_page_length=1
		)
		
		# If a previous meter exists, set the initial reading from the current reading
		if previous_meter:
			return previous_meter[0].current_reading or 0
		return 0

	elif meter_method == "Full Property":
		# Check for an existing meter record with the same property and meter type
		previous_meter = frappe.get_all(
			'Meter',
			filters={
				'property': asset,
				'meter_type': meter_type
			},
			fields=['current_reading'],
			order_by='creation desc',
			limit_page_length=1
		)
		
		# If a previous meter exists, set the initial reading from the current reading
		if previous_meter:
			return previous_meter[0].current_reading or 0
		return 0
		
@frappe.whitelist()
def get_unit_count(property):
    if not property:
        frappe.throw(_("Property is required to fetch the number of units."))
    # Count the number of units linked to the property
    return frappe.db.count("Unit", {"property": property})
