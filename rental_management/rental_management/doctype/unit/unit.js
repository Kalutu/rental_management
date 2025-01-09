// Copyright (c) 2025, Kalutu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Unit", {
	property: function (frm) {
		// Triggered when `property` is changed
		if (frm.doc.property) {
			// 1) Call the server to get the source Doc and its child table
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Property",
					name: frm.doc.property,
				},
				callback: function (r) {
					if (r.message) {
						let property_doc = r.message;

						// 2) Clear the existing child table rows in the target doctype
						frm.clear_table("chargeable_services");

						// 3) Loop through each child row in the source doctype
						$.each(property_doc.chargeable_services || [], function (i, row_data) {
							// 4) Add a new child row in the target child table
							let new_row = frm.add_child("chargeable_services");

							// 5) Copy fields from the source row into the new row
							new_row.item = row_data.item;
							new_row.rate = row_data.rate;

							// ...repeat for any other fields you need...
						});

						// 6) Refresh the field so changes appear in the UI
						frm.refresh_field("chargeable_services");
					}
				},
			});
		} else {
			// If `property` is blank, also clear child table
			frm.clear_table("chargeable_services");
			frm.refresh_field("chargeable_services");
		}
	},
});
