var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  // Initialize ARIA attributes
  acc[i].setAttribute("aria-expanded", "false"); // Set to collapsed by default
  acc[i].setAttribute("aria-controls", "panel-" + i); // Control ID for the panel

  var panel = acc[i].nextElementSibling;
  panel.setAttribute("id", "panel-" + i); // Unique ID for the panel
  panel.setAttribute("aria-hidden", "true"); // Hidden by default

  // Make focusable elements in the panel non-focusable by default
  panel.querySelectorAll('a, button, input').forEach(function(focusableElement) {
    focusableElement.setAttribute('tabindex', '-1');
  });

  acc[i].addEventListener("click", toggleAccordion); // Click event to toggle accordion

  // Keydown event for Enter and Escape keys on the header
  acc[i].addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      toggleAccordion.call(this); // Call toggle function with the current context
      event.preventDefault(); // Prevent default action to avoid any unintended behavior
      // Move focus to the header when entering
      if (this.getAttribute("aria-expanded") === "false") {
        this.focus(); // Focus back on the header
      }
    } else if (event.key === "Escape") {
      toggleAccordion.call(this); // Call toggle function to close
      event.preventDefault(); // Prevent default action to avoid any unintended behavior
    }
  });

  // Add keydown event to the panel for Escape key
  panel.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      var header = this.previousElementSibling; // Get the corresponding accordion header
      toggleAccordion.call(header); // Call toggle function with the header context
      event.preventDefault(); // Prevent default action to avoid any unintended behavior
      header.focus(); // Move focus to the header after closing
    }
  });
}

// Function to toggle accordion
function toggleAccordion() {
  var panel = this.nextElementSibling;
  var isExpanded = this.getAttribute("aria-expanded") === "true"; // Check current state

  // Toggle ARIA attributes
  this.setAttribute("aria-expanded", !isExpanded); // Toggle expanded state
  panel.setAttribute("aria-hidden", isExpanded); // Toggle hidden state

  // Toggle accordian_active class and maxHeight for animation
  this.classList.toggle("accordian_active");
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;

    // Set focusable elements to non-focusable when panel is closed
    panel.querySelectorAll('a, button, input').forEach(function(focusableElement) {
      focusableElement.setAttribute('tabindex', '-1');
    });
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px"; // Set to the scroll height of the panel

    // Set focusable elements to focusable when panel is open
    panel.querySelectorAll('a, button, input').forEach(function(focusableElement) {
      focusableElement.setAttribute('tabindex', '0');
    });
  }
}
