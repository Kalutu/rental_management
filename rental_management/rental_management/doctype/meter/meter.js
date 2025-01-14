// Copyright (c) 2025, Kalutu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Meter", {
	refresh(frm) {
		frm.set_query("unit", () => {
			return {
				filters: {
					property: frm.doc.property,
				},
			};
		});
	},

	property(frm) {
		frappe.call({
			method: "rental_management.rental_management.doctype.meter.meter.get_initial_reading",
			args: {
				meter_method: frm.doc.meter_method,
				property: frm.doc.property,
				unit: frm.doc.unit,
				meter_type: frm.doc.meter_type,
			},
			callback: (r) => {
				console.log(r.message);
				frm.set_value("initial_reading", r.message);
			},
		});
	},
	unit(frm) {
		frappe.call({
			method: "rental_management.rental_management.doctype.meter.meter.get_initial_reading",
			args: {
				meter_method: frm.doc.meter_method,
				property: frm.doc.property,
				unit: frm.doc.unit,
				meter_type: frm.doc.meter_type,
			},
			callback: (r) => {
				console.log(r.message);
				frm.set_value("initial_reading", r.message);
			},
		});
	},

	meter_type(frm) {
		frappe.call({
			method: "rental_management.rental_management.doctype.meter.meter.get_initial_reading",
			args: {
				unit: frm.doc.unit,
				meter_type: frm.doc.meter_type,
			},
			callback: (r) => {
				console.log(r.message);
				frm.set_value("initial_reading", r.message);
			},
		});
	},

	// initial_reading(frm) {
	// 	frm.set_value("token_used", frm.doc.current_reading - frm.doc.initial_reading);
	// },

	current_reading(frm) {
		frm.set_value("token_used", frm.doc.current_reading - frm.doc.initial_reading);
		if (frm.doc.meter_method === "Full Property") {
			frappe.call({
				method: "rental_management.rental_management.doctype.meter.meter.get_unit_count",
				args: {
					property: frm.doc.property,
				},
				callback: (r) => {
					if (r.message) {
						const unit_count = r.message;
						console.log(`Unit count: ${unit_count}`);

						// Calculate token_per_unit
						if (unit_count > 0) {
							frm.set_value("token_per_unit", frm.doc.token_used / unit_count);
						} else {
							frappe.msgprint(__("No units found for the selected property."));
							frm.set_value("token_per_unit", 0);
						}
					}
				},
			});
		}
	},
});
