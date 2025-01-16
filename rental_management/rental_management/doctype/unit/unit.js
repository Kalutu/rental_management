// Copyright (c) 2025, Kalutu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Unit", {
	property(frm) {
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Property",
				name: frm.doc.property,
			},
			callback: ({ message: property_doc }) => {
				if (!property_doc) {
					frappe.msgprint(__("Unable to fetch Property details."));
					return;
				}

				// Add rows from the fetched Property's chargeable_services
				(property_doc.chargeable_services || []).forEach(({ item, rate }) => {
					let new_row = frm.add_child("chargeable_services");
					Object.assign(new_row, { item, rate });
				});

				// Refresh the table to display the rows
				frm.refresh_field("chargeable_services");
			},
		});
	},
});
