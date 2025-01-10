# Copyright (c) 2025, Kalutu and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Landlord(Document):
	pass

@frappe.whitelist()
def create_company(**args):
	name = args.get('name')
	landlord_name = args.get('landlord_name')

	# create a new document
	company = frappe.get_doc({
		'doctype': 'Customer',
		'customer_name': landlord_name,
		'customer_type': "Company",
	})
	company.insert()

	company_doc = frappe.get_last_doc("Customer")

	landlord_doc =frappe.get_doc("Landlord",name)
	landlord_doc.company = company_doc.customer_name
	landlord_doc.save(ignore_permissions = True)
