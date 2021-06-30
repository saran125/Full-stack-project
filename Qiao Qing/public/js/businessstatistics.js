/**
 * Initialization function after all HTML elements are loaded.
 * This is called before the loading of images stylesheets
 * @param {Event} event The triggered dom event
 */
 document.addEventListener("DOMContentLoaded", function (event) {
	console.log("DOM Initialized");
});

$(document).ready(function () {
    $('#dtVerticalScrollExample').DataTable({
    "scrollY": "200px",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
    });

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
    });