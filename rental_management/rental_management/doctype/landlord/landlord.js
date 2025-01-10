// Copyright (c) 2025, Kalutu and contributors
// For license information, please see license.txt

frappe.ui.form.on("Landlord", {
	after_save(frm) {
		frappe.call({
			method: "rental_management.rental_management.doctype.landlord.landlord.create_company",
			args: {
				name: frm.doc.name,
				landlord_name: frm.doc.landlord_name,
			},
			callback: (r) => {
				console.log("Landlord details fetched");
			},
		});
	},
});
